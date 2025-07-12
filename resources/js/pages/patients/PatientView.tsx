import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Heart, Mail, MapPin, Phone, User } from 'lucide-react';

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

interface PatientViewProps {
    patient: Patient;
    userRole: string;
}

export default function PatientView({ patient, userRole }: PatientViewProps) {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const calculateAge = (dateOfBirth: string) => {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const isAdmin = userRole === 'admin';
    const isPatient = userRole === 'patient';

    return (
        <AppLayout>
            <Head title={patient.user.name} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button asChild variant="outline" size="sm">
                            <Link href={route('patients.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Patients
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{patient.user.name}</h1>
                            <p className="text-muted-foreground">Patient Profile</p>
                        </div>
                    </div>
                    {(isAdmin || isPatient) && (
                        <Button asChild>
                            <Link href={route('patients.edit', patient.id)}>
                                Edit Profile
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Patient Profile Card */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="text-lg">
                                        {getInitials(patient.user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-xl">{patient.user.name}</CardTitle>
                                    <CardDescription>
                                        {patient.gender} • {calculateAge(patient.date_of_birth)} years old
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{patient.user.email}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{patient.user.phone}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">Born: {formatDate(patient.date_of_birth)}</span>
                                </div>
                                {patient.blood_type && (
                                    <div className="flex items-center space-x-2">
                                        <Heart className="h-4 w-4 text-muted-foreground" />
                                        <Badge variant="outline">{patient.blood_type}</Badge>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Patient Details */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{patient.address}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            Emergency Contact: {patient.emergency_contact_name}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            Emergency Phone: {patient.emergency_contact_phone}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Medical Information */}
                        <div className="grid gap-6 md:grid-cols-2">
                            {patient.allergies && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Allergies</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm leading-relaxed">{patient.allergies}</p>
                                    </CardContent>
                                </Card>
                            )}

                            {patient.medical_history && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Medical History</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm leading-relaxed">{patient.medical_history}</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-3 md:grid-cols-2">
                                    <Button asChild variant="outline" className="justify-start">
                                        <Link href={route('appointments.create')}>
                                            <Calendar className="mr-2 h-4 w-4" />
                                            Book Appointment
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" className="justify-start">
                                        <Link href={route('medical-records.create')}>
                                            <User className="mr-2 h-4 w-4" />
                                            View Medical Records
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

