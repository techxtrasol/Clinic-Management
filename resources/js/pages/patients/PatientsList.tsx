import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Mail, Phone, Plus, User } from 'lucide-react';

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
    emergency_contact: string;
    emergency_phone: string;
    blood_type?: string;
    allergies?: string;
    medical_history?: string;
}

interface PatientsListProps {
    patients: Patient[];
    userRole: string;
}

export default function PatientsList({ patients, userRole }: PatientsListProps) {
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

    const isAdmin = userRole === 'admin';
    const isDoctor = userRole === 'doctor';

    return (
        <AppLayout>
            <Head title="Patients" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
                        <p className="text-muted-foreground">
                            {isAdmin || isDoctor ? 'All registered patients' : 'Your patient profile'}
                        </p>
                    </div>
                    {(isAdmin || isDoctor) && (
                        <Button asChild>
                            <Link href={route('patients.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Patient
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {patients.length === 0 ? (
                        <Card className="col-span-full">
                            <CardContent className="flex flex-col items-center justify-center py-8">
                                <User className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No patients found</h3>
                                <p className="text-muted-foreground text-center">
                                    {isAdmin || isDoctor
                                        ? 'No patients have been registered yet.'
                                        : 'You don\'t have a patient profile yet.'}
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        patients.map((patient) => (
                            <Card key={patient.id} className="hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src="" />
                                            <AvatarFallback>
                                                {getInitials(patient.user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-lg">{patient.user.name}</CardTitle>
                                            <CardDescription>
                                                {patient.gender} • {formatDate(patient.date_of_birth)}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span>{patient.user.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span>{patient.user.phone}</span>
                                    </div>
                                    {patient.blood_type && (
                                        <div className="flex items-center space-x-2">
                                            <Badge variant="outline">{patient.blood_type}</Badge>
                                        </div>
                                    )}
                                    <div className="flex space-x-2 pt-2">
                                        <Button asChild size="sm" variant="outline">
                                            <Link href={route('patients.show', patient.id)}>
                                                View Details
                                            </Link>
                                        </Button>
                                        {(isAdmin || isDoctor) && (
                                            <Button asChild size="sm" variant="outline">
                                                <Link href={route('patients.edit', patient.id)}>
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


