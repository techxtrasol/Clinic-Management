import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    Edit,
    Mail,
    MapPin,
    Phone,
    Stethoscope,
    User
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';

interface Appointment {
    id: number;
    appointment_date: string;
    status: string;
    reason: string;
    notes?: string;
    patient: {
        id: number;
        user: {
            name: string;
            email: string;
            phone: string;
        };
        date_of_birth?: string;
        gender?: string;
        address?: string;
    };
    doctor: {
        id: number;
        user: {
            name: string;
            email: string;
            phone: string;
        };
        specialization: string;
    };
}

interface AppointmentViewProps {
    appointment: Appointment;
}

export default function AppointmentView({ appointment }: AppointmentViewProps) {
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            full: date.toLocaleString(),
        };
    };

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'no_show':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const calculateAge = (dateOfBirth?: string) => {
        if (!dateOfBirth) return null;
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const dateTime = formatDateTime(appointment.appointment_date);
    const patientAge = calculateAge(appointment.patient.date_of_birth);

    return (
        <AppLayout>
            <Head title="Appointment Details" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={route('appointments.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Appointments
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Appointment Details</h1>
                            <p className="text-muted-foreground">
                                View detailed information about this appointment
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={route('appointments.edit', appointment.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Appointment
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Appointment Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Calendar className="h-5 w-5" />
                                <span>Appointment Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Status</span>
                                <Badge className={getStatusBadgeColor(appointment.status)}>
                                    {appointment.status}
                                </Badge>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Date</span>
                                <span className="text-sm">{dateTime.date}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Time</span>
                                <span className="text-sm">{dateTime.time}</span>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="font-medium mb-2">Reason for Visit</h4>
                                <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                            </div>

                            {appointment.notes && (
                                <>
                                    <Separator />
                                    <div>
                                        <h4 className="font-medium mb-2">Additional Notes</h4>
                                        <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Patient Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <User className="h-5 w-5" />
                                <span>Patient Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src="" />
                                    <AvatarFallback>
                                        {getInitials(appointment.patient.user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold">{appointment.patient.user.name}</h3>
                                    <p className="text-sm text-muted-foreground">{appointment.patient.user.email}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{appointment.patient.user.phone}</span>
                                </div>

                                {appointment.patient.date_of_birth && (
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>
                                            {new Date(appointment.patient.date_of_birth).toLocaleDateString()}
                                            {patientAge && ` (${patientAge} years old)`}
                                        </span>
                                    </div>
                                )}

                                {appointment.patient.gender && (
                                    <div className="flex items-center space-x-2 text-sm">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="capitalize">{appointment.patient.gender}</span>
                                    </div>
                                )}

                                {appointment.patient.address && (
                                    <div className="flex items-start space-x-2 text-sm">
                                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                        <span>{appointment.patient.address}</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Doctor Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Stethoscope className="h-5 w-5" />
                                <span>Doctor Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src="" />
                                    <AvatarFallback>
                                        {getInitials(appointment.doctor.user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold">{appointment.doctor.user.name}</h3>
                                    <p className="text-sm text-muted-foreground">{appointment.doctor.specialization}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{appointment.doctor.user.email}</span>
                                </div>

                                <div className="flex items-center space-x-2 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{appointment.doctor.user.phone}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Common actions for this appointment
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button className="w-full" asChild>
                                <Link href={route('appointments.edit', appointment.id)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Appointment
                                </Link>
                            </Button>

                            <Button variant="outline" className="w-full" asChild>
                                <Link href={`mailto:${appointment.patient.user.email}?subject=Appointment on ${dateTime.date}`}>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Send Email to Patient
                                </Link>
                            </Button>

                            <Button variant="outline" className="w-full" asChild>
                                <Link href={`tel:${appointment.patient.user.phone}`}>
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call Patient
                                </Link>
                            </Button>

                            {appointment.status === 'scheduled' && (
                                <Button variant="destructive" className="w-full">
                                    Cancel Appointment
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
