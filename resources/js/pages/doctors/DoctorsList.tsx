import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Award, Mail, Phone, Plus, User } from 'lucide-react';

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

interface DoctorsListProps {
    doctors: Doctor[];
    userRole: string;
}

export default function DoctorsList({ doctors, userRole }: DoctorsListProps) {
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
            <Head title="Doctors" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Doctors</h1>
                        <p className="text-muted-foreground">
                            {isAdmin || isDoctor ? 'All registered doctors' : 'Available doctors'}
                        </p>
                    </div>
                    {isAdmin && (
                        <Button asChild>
                            <Link href={route('doctors.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Doctor
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {doctors.length === 0 ? (
                        <Card className="col-span-full">
                            <CardContent className="flex flex-col items-center justify-center py-8">
                                <User className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No doctors found</h3>
                                <p className="text-muted-foreground text-center">
                                    No doctors have been registered yet.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        doctors.map((doctor) => (
                            <Card key={doctor.id} className="hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src="" />
                                            <AvatarFallback>
                                                {getInitials(doctor.user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-lg">{doctor.user.name}</CardTitle>
                                            <CardDescription>
                                                {doctor.specialization} • {doctor.experience_years} years experience
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span>{doctor.user.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span>{doctor.user.phone}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Award className="h-4 w-4 text-muted-foreground" />
                                        <Badge variant="outline">{doctor.license_number}</Badge>
                                    </div>
                                    <div className="flex space-x-2 pt-2">
                                        <Button asChild size="sm" variant="outline">
                                            <Link href={route('doctors.show', doctor.id)}>
                                                View Details
                                            </Link>
                                        </Button>
                                        {(isAdmin || (isDoctor && doctor.user.id === 1)) && (
                                            <Button asChild size="sm" variant="outline">
                                                <Link href={route('doctors.edit', doctor.id)}>
                                                    Edit
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

