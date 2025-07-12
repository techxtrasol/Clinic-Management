import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import React from 'react';

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
    emergency_contact_name: string;
    emergency_contact_phone: string;
    blood_type?: string;
    allergies?: string;
    medical_history?: string;
}

interface PatientFormProps {
    patient?: Patient;
    userRole: string;
}

export default function PatientForm({ patient, userRole }: PatientFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: patient?.user.name || '',
        email: patient?.user.email || '',
        phone: patient?.user.phone || '',
        date_of_birth: patient?.date_of_birth || '',
        gender: patient?.gender || '',
        address: patient?.address || '',
        emergency_contact_name: patient?.emergency_contact_name || '',
        emergency_contact_phone: patient?.emergency_contact_phone || '',
        blood_type: patient?.blood_type || '',
        allergies: patient?.allergies || '',
        medical_history: patient?.medical_history || '',
    });

    const isEditing = !!patient;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing) {
            put(route('patients.update', patient.id));
        } else {
            post(route('patients.store'));
        }
    };

    return (
        <AppLayout>
            <Head title={isEditing ? 'Edit Patient' : 'Add Patient'} />

            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Button asChild variant="outline" size="sm">
                        <Link href={route('patients.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Patients
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEditing ? 'Edit Patient' : 'Add Patient'}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEditing ? 'Update patient information' : 'Add a new patient to the system'}
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Patient Information</CardTitle>
                        <CardDescription>
                            Fill in the patient's personal and medical information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="John Smith"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="john.smith@example.com"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="+1 (555) 123-4567"
                                        required
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-red-600">{errors.phone}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                                    <Input
                                        id="date_of_birth"
                                        type="date"
                                        value={data.date_of_birth}
                                        onChange={(e) => setData('date_of_birth', e.target.value)}
                                        required
                                    />
                                    {errors.date_of_birth && (
                                        <p className="text-sm text-red-600">{errors.date_of_birth}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Select value={data.gender} onValueChange={(value) => setData('gender', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.gender && (
                                        <p className="text-sm text-red-600">{errors.gender}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="blood_type">Blood Type</Label>
                                    <Select value={data.blood_type} onValueChange={(value) => setData('blood_type', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select blood type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="A+">A+</SelectItem>
                                            <SelectItem value="A-">A-</SelectItem>
                                            <SelectItem value="B+">B+</SelectItem>
                                            <SelectItem value="B-">B-</SelectItem>
                                            <SelectItem value="AB+">AB+</SelectItem>
                                            <SelectItem value="AB-">AB-</SelectItem>
                                            <SelectItem value="O+">O+</SelectItem>
                                            <SelectItem value="O-">O-</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.blood_type && (
                                        <p className="text-sm text-red-600">{errors.blood_type}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    placeholder="123 Main St, City, State, ZIP"
                                    rows={2}
                                    required
                                />
                                {errors.address && (
                                    <p className="text-sm text-red-600">{errors.address}</p>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
                                    <Input
                                        id="emergency_contact_name"
                                        value={data.emergency_contact_name}
                                        onChange={(e) => setData('emergency_contact_name', e.target.value)}
                                        placeholder="Emergency Contact"
                                        required
                                    />
                                    {errors.emergency_contact_name && (
                                        <p className="text-sm text-red-600">{errors.emergency_contact_name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
                                    <Input
                                        id="emergency_contact_phone"
                                        value={data.emergency_contact_phone}
                                        onChange={(e) => setData('emergency_contact_phone', e.target.value)}
                                        placeholder="+1 (555) 987-6543"
                                        required
                                    />
                                    {errors.emergency_contact_phone && (
                                        <p className="text-sm text-red-600">{errors.emergency_contact_phone}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="allergies">Allergies (Optional)</Label>
                                <Textarea
                                    id="allergies"
                                    value={data.allergies}
                                    onChange={(e) => setData('allergies', e.target.value)}
                                    placeholder="List any known allergies..."
                                    rows={3}
                                />
                                {errors.allergies && (
                                    <p className="text-sm text-red-600">{errors.allergies}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="medical_history">Medical History (Optional)</Label>
                                <Textarea
                                    id="medical_history"
                                    value={data.medical_history}
                                    onChange={(e) => setData('medical_history', e.target.value)}
                                    placeholder="Relevant medical history, conditions, surgeries..."
                                    rows={4}
                                />
                                {errors.medical_history && (
                                    <p className="text-sm text-red-600">{errors.medical_history}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button asChild variant="outline">
                                    <Link href={route('patients.index')}>
                                        Cancel
                                    </Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : (isEditing ? 'Update Patient' : 'Add Patient')}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

