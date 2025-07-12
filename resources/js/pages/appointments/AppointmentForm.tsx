import { Head, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar,
    Clock,
    LoaderCircle,
    Stethoscope
} from 'lucide-react';
import { useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';

interface Doctor {
    id: number;
    user: {
        name: string;
        email: string;
        phone: string;
    };
    specialization: string;
    qualifications: string;
    license_number: string;
}

interface Patient {
    id: number;
    user: {
        name: string;
        email: string;
        phone: string;
    };
    date_of_birth: string;
    gender: string;
    address: string;
}

interface AppointmentFormProps {
    doctors: Doctor[];
    patients: Patient[];
    userRole: string;
    appointment?: {
        id: number;
        patient_id: number;
        doctor_id: number;
        appointment_date: string;
        status: string;
        reason: string;
        notes?: string;
    };
}

export default function AppointmentForm({ doctors, patients, userRole, appointment }: AppointmentFormProps) {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        patient_id: appointment?.patient_id || (patients.length > 0 ? patients[0].id : ''),
        doctor_id: appointment?.doctor_id || '',
        appointment_date: appointment?.appointment_date || '',
        status: appointment?.status || 'scheduled',
        reason: appointment?.reason || '',
        notes: appointment?.notes || '',
    });

    // Load available slots when doctor and date are selected
    useEffect(() => {
        if (data.doctor_id && selectedDate) {
            loadAvailableSlots();
        }
    }, [data.doctor_id, selectedDate]);

    const loadAvailableSlots = async () => {
        if (!data.doctor_id || !selectedDate) return;

        setLoadingSlots(true);
        try {
            const response = await fetch(`/appointments/slots/available?doctor_id=${data.doctor_id}&date=${selectedDate}`);
            const result = await response.json();
            setAvailableSlots(result.available_slots || []);
        } catch (error) {
            console.error('Error loading available slots:', error);
        } finally {
            setLoadingSlots(false);
        }
    };

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
        setSelectedTime('');
        if (date && data.doctor_id) {
            loadAvailableSlots();
        }
    };

    const handleTimeChange = (time: string) => {
        setSelectedTime(time);
        if (selectedDate && time) {
            const dateTime = `${selectedDate}T${time}`;
            setData('appointment_date', dateTime);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (appointment) {
            put(route('appointments.update', appointment.id));
        } else {
            post(route('appointments.store'));
        }
    };

    const isPatient = userRole === 'patient';
    const isAdmin = userRole === 'admin';

    return (
        <AppLayout>
            <Head title={appointment ? 'Edit Appointment' : 'Book Appointment'} />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {appointment ? 'Edit Appointment' : 'Book Appointment'}
                    </h1>
                    <p className="text-muted-foreground">
                        {appointment ? 'Update your appointment details' : 'Schedule a new appointment with a doctor'}
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Calendar className="h-5 w-5" />
                            <span>Appointment Details</span>
                        </CardTitle>
                        <CardDescription>
                            Fill in the details below to {appointment ? 'update' : 'book'} your appointment
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Patient Selection (Admin only) */}
                            {isAdmin && (
                                <div className="grid gap-2">
                                    <Label htmlFor="patient_id">Patient</Label>
                                    <Select
                                        value={data.patient_id.toString()}
                                        onValueChange={(value) => setData('patient_id', parseInt(value))}
                                        disabled={processing}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a patient" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {patients.map((patient) => (
                                                <SelectItem key={patient.id} value={patient.id.toString()}>
                                                    {patient.user.name} - {patient.user.email}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.patient_id} />
                                </div>
                            )}

                            {/* Doctor Selection */}
                            <div className="grid gap-2">
                                <Label htmlFor="doctor_id">Doctor</Label>
                                <Select
                                    value={data.doctor_id.toString()}
                                    onValueChange={(value) => setData('doctor_id', parseInt(value))}
                                    disabled={processing}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a doctor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {doctors.map((doctor) => (
                                            <SelectItem key={doctor.id} value={doctor.id.toString()}>
                                                <div className="flex items-center space-x-2">
                                                    <Stethoscope className="h-4 w-4" />
                                                    <span>{doctor.user.name}</span>
                                                    <Badge variant="secondary">{doctor.specialization}</Badge>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.doctor_id} />
                            </div>

                            {/* Date and Time Selection */}
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => handleDateChange(e.target.value)}
                                        disabled={processing}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                    <InputError message={errors.appointment_date} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="time">Time</Label>
                                    <Select
                                        value={selectedTime}
                                        onValueChange={handleTimeChange}
                                        disabled={processing || loadingSlots || !selectedDate}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={loadingSlots ? "Loading..." : "Select time"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableSlots.map((slot) => (
                                                <SelectItem key={slot} value={slot}>
                                                    <div className="flex items-center space-x-2">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{slot}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {loadingSlots && (
                                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                            <LoaderCircle className="h-4 w-4 animate-spin" />
                                            <span>Loading available slots...</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Status (Admin/Doctor only) */}
                            {(isAdmin || userRole === 'doctor') && (
                                <div className="grid gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) => setData('status', value)}
                                        disabled={processing}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="scheduled">Scheduled</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                            <SelectItem value="no_show">No Show</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} />
                                </div>
                            )}

                            {/* Reason */}
                            <div className="grid gap-2">
                                <Label htmlFor="reason">Reason for Visit</Label>
                                <Textarea
                                    id="reason"
                                    value={data.reason}
                                    onChange={(e) => setData('reason', e.target.value)}
                                    disabled={processing}
                                    placeholder="Describe the reason for your appointment..."
                                    rows={3}
                                />
                                <InputError message={errors.reason} />
                            </div>

                            {/* Notes */}
                            <div className="grid gap-2">
                                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    disabled={processing}
                                    placeholder="Any additional information..."
                                    rows={2}
                                />
                                <InputError message={errors.notes} />
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center justify-end space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                    disabled={processing}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                    {appointment ? 'Update Appointment' : 'Book Appointment'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Information Alert */}
                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        <strong>Important:</strong> Please arrive 10 minutes before your scheduled appointment time.
                        If you need to cancel or reschedule, please do so at least 24 hours in advance.
                    </AlertDescription>
                </Alert>
            </div>
        </AppLayout>
    );
}
