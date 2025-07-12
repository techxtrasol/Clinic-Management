import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { FileText, Plus } from 'lucide-react';

interface MedicalRecord {
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
    diagnosis: string;
    symptoms: string;
    treatment: string;
    visit_date: string;
    created_at: string;
}

interface RecordsListProps {
    medicalRecords: MedicalRecord[];
    userRole: string;
}

export default function RecordsList({ medicalRecords, userRole }: RecordsListProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const isAdmin = userRole === 'admin';
    const isDoctor = userRole === 'doctor';

    return (
        <AppLayout>
            <Head title="Medical Records" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Medical Records</h1>
                        <p className="text-muted-foreground">
                            {isAdmin || isDoctor ? 'All medical records' : 'Your medical records'}
                        </p>
                    </div>
                    {(isAdmin || isDoctor) && (
                        <Button asChild>
                            <Link href={route('medical-records.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Record
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="space-y-4">
                    {medicalRecords.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-8">
                                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No medical records found</h3>
                                <p className="text-muted-foreground text-center">
                                    {isAdmin || isDoctor
                                        ? 'No medical records have been created yet.'
                                        : 'You don\'t have any medical records yet.'}
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        medicalRecords.map((record) => (
                            <Card key={record.id} className="hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg">
                                                {record.patient?.user?.name || 'Unknown Patient'}
                                            </CardTitle>
                                            <CardDescription>
                                                Dr. {record.doctor?.user?.name || 'Unknown Doctor'} • {formatDate(record.visit_date)}
                                            </CardDescription>
                                        </div>
                                        <Badge variant="outline">
                                            {formatDate(record.created_at)}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <h4 className="font-semibold text-sm text-muted-foreground">Diagnosis</h4>
                                        <p className="text-sm">{record.diagnosis}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm text-muted-foreground">Symptoms</h4>
                                        <p className="text-sm">{record.symptoms}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm text-muted-foreground">Treatment</h4>
                                        <p className="text-sm">{record.treatment}</p>
                                    </div>
                                    <div className="flex space-x-2 pt-2">
                                        <Button asChild size="sm" variant="outline">
                                            <Link href={route('medical-records.show', record.id)}>
                                                View Details
                                            </Link>
                                        </Button>
                                        {(isAdmin || isDoctor) && (
                                            <Button asChild size="sm" variant="outline">
                                                <Link href={route('medical-records.edit', record.id)}>
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

