import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Pill, Plus } from 'lucide-react';

interface Prescription {
    id: number;
    patient: {
        user: {
            name: string;
        };
    };
    doctor: {
        user: {
            name: string;
        };
    };
    medication_name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
    prescribed_date: string;
    status: string;
}

interface PrescriptionsListProps {
    prescriptions: Prescription[];
    userRole: string;
}

export default function PrescriptionsList({ prescriptions, userRole }: PrescriptionsListProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            case 'discontinued':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const isAdmin = userRole === 'admin';
    const isDoctor = userRole === 'doctor';

    return (
        <AppLayout>
            <Head title="Prescriptions" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Prescriptions</h1>
                        <p className="text-muted-foreground">
                            {isAdmin || isDoctor ? 'All prescriptions' : 'Your prescriptions'}
                        </p>
                    </div>
                    {(isAdmin || isDoctor) && (
                        <Button asChild>
                            <Link href={route('prescriptions.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Prescription
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="space-y-4">
                    {prescriptions.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-8">
                                <Pill className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No prescriptions found</h3>
                                <p className="text-muted-foreground text-center">
                                    {isAdmin || isDoctor
                                        ? 'No prescriptions have been created yet.'
                                        : 'You don\'t have any prescriptions yet.'}
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        prescriptions.map((prescription) => (
                            <Card key={prescription.id} className="hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg">
                                                {prescription.medication_name}
                                            </CardTitle>
                                            <CardDescription>
                                                {prescription.patient?.user?.name || 'Unknown Patient'} • Dr. {prescription.doctor?.user?.name || 'Unknown Doctor'}
                                            </CardDescription>
                                        </div>
                                        <Badge className={getStatusBadgeColor(prescription.status)}>
                                            {prescription.status}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="font-semibold text-muted-foreground">Dosage:</span>
                                            <p>{prescription.dosage}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-muted-foreground">Frequency:</span>
                                            <p>{prescription.frequency}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-muted-foreground">Duration:</span>
                                            <p>{prescription.duration}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-muted-foreground">Prescribed:</span>
                                            <p>{formatDate(prescription.prescribed_date)}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-sm text-muted-foreground">Instructions:</span>
                                        <p className="text-sm">{prescription.instructions}</p>
                                    </div>
                                    <div className="flex space-x-2 pt-2">
                                        <Button asChild size="sm" variant="outline">
                                            <Link href={route('prescriptions.show', prescription.id)}>
                                                View Details
                                            </Link>
                                        </Button>
                                        {(isAdmin || isDoctor) && (
                                            <Button asChild size="sm" variant="outline">
                                                <Link href={route('prescriptions.edit', prescription.id)}>
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

