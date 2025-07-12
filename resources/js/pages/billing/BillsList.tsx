import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { DollarSign, Plus } from 'lucide-react';

interface Bill {
    id: number;
    patient: {
        user: {
            name: string;
        };
    };
    appointment?: {
        doctor: {
            user: {
                name: string;
            };
        };
    };
    amount: number;
    description: string;
    billing_date: string;
    due_date: string;
    status: string;
    payment_method?: string;
}

interface BillsListProps {
    bills: Bill[];
    userRole: string;
}

export default function BillsList({ bills, userRole }: BillsListProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'overdue':
                return 'bg-red-100 text-red-800';
            case 'cancelled':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const isAdmin = userRole === 'admin';

    return (
        <AppLayout>
            <Head title="Billing" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
                        <p className="text-muted-foreground">
                            {isAdmin ? 'All bills' : 'Your bills'}
                        </p>
                    </div>
                    {isAdmin && (
                        <Button asChild>
                            <Link href={route('billing.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Create Bill
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="space-y-4">
                    {bills.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-8">
                                <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No bills found</h3>
                                <p className="text-muted-foreground text-center">
                                    {isAdmin
                                        ? 'No bills have been created yet.'
                                        : 'You don\'t have any bills yet.'}
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        bills.map((bill) => (
                            <Card key={bill.id} className="hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg">
                                                {bill.patient?.user?.name || 'Unknown Patient'}
                                            </CardTitle>
                                            <CardDescription>
                                                {bill.appointment?.doctor?.user?.name
                                                    ? `Dr. ${bill.appointment.doctor.user.name}`
                                                    : 'No appointment linked'} • {formatDate(bill.billing_date)}
                                            </CardDescription>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-green-600">
                                                {formatCurrency(bill.amount)}
                                            </div>
                                            <Badge className={getStatusBadgeColor(bill.status)}>
                                                {bill.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <span className="font-semibold text-sm text-muted-foreground">Description:</span>
                                        <p className="text-sm">{bill.description}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="font-semibold text-muted-foreground">Billing Date:</span>
                                            <p>{formatDate(bill.billing_date)}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-muted-foreground">Due Date:</span>
                                            <p>{formatDate(bill.due_date)}</p>
                                        </div>
                                        {bill.payment_method && (
                                            <div>
                                                <span className="font-semibold text-muted-foreground">Payment Method:</span>
                                                <p>{bill.payment_method}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex space-x-2 pt-2">
                                        <Button asChild size="sm" variant="outline">
                                            <Link href={route('billing.show', bill.id)}>
                                                View Details
                                            </Link>
                                        </Button>
                                        {isAdmin && (
                                            <Button asChild size="sm" variant="outline">
                                                <Link href={route('billing.edit', bill.id)}>
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

