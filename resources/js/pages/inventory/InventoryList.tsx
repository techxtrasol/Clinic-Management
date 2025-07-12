import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Package, DollarSign, Calendar } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface InventoryItem {
    id: number;
    name: string;
    description: string;
    category: string;
    quantity: number;
    unit_price: number;
    supplier?: string;
    expiry_date?: string;
    location?: string;
    status: string;
}

interface InventoryListProps {
    inventory: InventoryItem[];
    userRole: string;
}

export default function InventoryList({ inventory, userRole }: InventoryListProps) {
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
            case 'available':
                return 'bg-green-100 text-green-800';
            case 'low_stock':
                return 'bg-yellow-100 text-yellow-800';
            case 'out_of_stock':
                return 'bg-red-100 text-red-800';
            case 'expired':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const isAdmin = userRole === 'admin';
    const isDoctor = userRole === 'doctor';

    return (
        <AppLayout>
            <Head title="Inventory" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
                        <p className="text-muted-foreground">
                            {isAdmin || isDoctor ? 'All inventory items' : 'Available inventory'}
                        </p>
                    </div>
                    {isAdmin && (
                        <Button asChild>
                            <Link href={route('inventory.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Item
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {inventory.length === 0 ? (
                        <Card className="col-span-full">
                            <CardContent className="flex flex-col items-center justify-center py-8">
                                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No inventory items found</h3>
                                <p className="text-muted-foreground text-center">
                                    No inventory items have been added yet.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        inventory.map((item) => (
                            <Card key={item.id} className="hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg">{item.name}</CardTitle>
                                            <CardDescription>
                                                {item.category} • {item.supplier || 'No supplier'}
                                            </CardDescription>
                                        </div>
                                        <Badge className={getStatusBadgeColor(item.status)}>
                                            {item.status}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <span className="font-semibold text-sm text-muted-foreground">Description:</span>
                                        <p className="text-sm">{item.description}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="font-semibold text-muted-foreground">Quantity:</span>
                                            <p className="text-lg font-bold">{item.quantity}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-muted-foreground">Unit Price:</span>
                                            <p className="text-lg font-bold text-green-600">
                                                {formatCurrency(item.unit_price)}
                                            </p>
                                        </div>
                                        {item.location && (
                                            <div>
                                                <span className="font-semibold text-muted-foreground">Location:</span>
                                                <p>{item.location}</p>
                                            </div>
                                        )}
                                        {item.expiry_date && (
                                            <div>
                                                <span className="font-semibold text-muted-foreground">Expiry:</span>
                                                <p>{formatDate(item.expiry_date)}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex space-x-2 pt-2">
                                        <Button asChild size="sm" variant="outline">
                                            <Link href={route('inventory.show', item.id)}>
                                                View Details
                                            </Link>
                                        </Button>
                                        {isAdmin && (
                                            <Button asChild size="sm" variant="outline">
                                                <Link href={route('inventory.edit', item.id)}>
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

