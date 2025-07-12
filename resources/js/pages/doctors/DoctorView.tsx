import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Award, Calendar, Mail, Phone, User } from 'lucide-react';

interface Doctor {
    id: number;
    user: {
        name: string;
        email: string;
        phone: string;
    };
    specialization: string;
    license_number: string;
    experience_years: number;
    qualifications: string;
    bio?: string;
}

interface DoctorViewProps {
    doctor: Doctor;
    userRole: string;
}

export default function DoctorView({ doctor, userRole }: DoctorViewProps) {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const isAdmin = userRole === 'admin';
    const isDoctor = userRole === 'doctor';

    return (
        <AppLayout>
            <Head title={`Dr. ${doctor.user.name}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button asChild variant="outline" size="sm">
                            <Link href={route('doctors.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Doctors
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Dr. {doctor.user.name}</h1>
                            <p className="text-muted-foreground">{doctor.specialization}</p>
                        </div>
                    </div>
                    {(isAdmin || (isDoctor && doctor.user.id === 1)) && (
                        <Button asChild>
                            <Link href={route('doctors.edit', doctor.id)}>
                                Edit Profile
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Doctor Profile Card */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="text-lg">
                                        {getInitials(doctor.user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-xl">Dr. {doctor.user.name}</CardTitle>
                                    <CardDescription>{doctor.specialization}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{doctor.user.email}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{doctor.user.phone}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Award className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">License: {doctor.license_number}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{doctor.experience_years} years experience</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Doctor Details */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Qualifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Qualifications</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm leading-relaxed">{doctor.qualifications}</p>
                            </CardContent>
                        </Card>

                        {/* Bio */}
                        {doctor.bio && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Biography</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm leading-relaxed">{doctor.bio}</p>
                                </CardContent>
                            </Card>
                        )}

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
                                            Create Medical Record
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

