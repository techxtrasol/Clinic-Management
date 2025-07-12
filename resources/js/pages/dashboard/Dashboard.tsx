import { Head, usePage } from '@inertiajs/react';
import {
    Activity,
    Calendar,
    CreditCard,
    FileText,
    Mail,
    Phone,
    Pill,
    Shield,
    User,
    Users
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type SharedData } from '@/types';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'bg-red-100 text-red-800';
            case 'doctor':
                return 'bg-blue-100 text-blue-800';
            case 'nurse':
                return 'bg-green-100 text-green-800';
            case 'staff':
                return 'bg-yellow-100 text-yellow-800';
            case 'patient':
                return 'bg-gray-100 text-gray-800';
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

    const getRoleBasedStats = () => {
        switch (user.role) {
            case 'admin':
                return [
                    { title: 'Total Users', value: '150', icon: Users, color: 'text-blue-600' },
                    { title: 'Active Appointments', value: '45', icon: Calendar, color: 'text-green-600' },
                    { title: 'Today\'s Revenue', value: '$2,450', icon: CreditCard, color: 'text-yellow-600' },
                    { title: 'System Health', value: '98%', icon: Activity, color: 'text-purple-600' },
                ];
            case 'doctor':
                return [
                    { title: 'My Appointments', value: '12', icon: Calendar, color: 'text-blue-600' },
                    { title: 'Patients Today', value: '8', icon: Users, color: 'text-green-600' },
                    { title: 'Pending Reports', value: '3', icon: FileText, color: 'text-yellow-600' },
                    { title: 'Prescriptions', value: '15', icon: Pill, color: 'text-purple-600' },
                ];
            case 'nurse':
                return [
                    { title: 'Patient Care', value: '25', icon: Users, color: 'text-blue-600' },
                    { title: 'Vitals Check', value: '18', icon: Activity, color: 'text-green-600' },
                    { title: 'Medication Admin', value: '12', icon: Pill, color: 'text-yellow-600' },
                    { title: 'Reports Due', value: '5', icon: FileText, color: 'text-purple-600' },
                ];
            case 'patient':
                return [
                    { title: 'My Appointments', value: '2', icon: Calendar, color: 'text-blue-600' },
                    { title: 'Medical Records', value: '8', icon: FileText, color: 'text-green-600' },
                    { title: 'Prescriptions', value: '3', icon: Pill, color: 'text-yellow-600' },
                    { title: 'Bills Due', value: '$150', icon: CreditCard, color: 'text-purple-600' },
                ];
            case 'staff':
                return [
                    { title: 'Appointments', value: '35', icon: Calendar, color: 'text-blue-600' },
                    { title: 'Patient Check-ins', value: '22', icon: Users, color: 'text-green-600' },
                    { title: 'Billing Tasks', value: '8', icon: CreditCard, color: 'text-yellow-600' },
                    { title: 'Inventory Items', value: '150', icon: Activity, color: 'text-purple-600' },
                ];
            default:
                return [
                    { title: 'Welcome', value: 'Dashboard', icon: Activity, color: 'text-blue-600' },
                ];
        }
    };

    const stats = getRoleBasedStats();

    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Welcome back, {user.name}!
                        </p>
                    </div>
                </div>

                {/* User Profile Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <User className="h-5 w-5" />
                            <span>Profile Information</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src="" />
                                <AvatarFallback className="text-lg">
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <h3 className="text-xl font-semibold">{user.name}</h3>
                                    <Badge className={getRoleBadgeColor(user.role)}>
                                        {user.role}
                                    </Badge>
                                </div>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                    <div className="flex items-center space-x-2">
                                        <Mail className="h-4 w-4" />
                                        <span>{user.email}</span>
                                    </div>
                                    {user.phone && (
                                        <div className="flex items-center space-x-2">
                                            <Phone className="h-4 w-4" />
                                            <span>{user.phone}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center space-x-2">
                                        <Shield className="h-4 w-4" />
                                        <span>Role: {user.role}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Role-based Statistics */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    {user.role === 'admin' ? 'System overview' :
                                     user.role === 'doctor' ? 'Your practice' :
                                     user.role === 'nurse' ? 'Patient care' :
                                     user.role === 'patient' ? 'Your health' :
                                     user.role === 'staff' ? 'Clinic operations' : 'Overview'}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>
                            Common tasks for your role
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {user.role === 'admin' && (
                                <>
                                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                        <Users className="h-5 w-5 text-blue-600" />
                                        <span>Manage Users</span>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                        <Activity className="h-5 w-5 text-green-600" />
                                        <span>System Reports</span>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                        <CreditCard className="h-5 w-5 text-yellow-600" />
                                        <span>Financial Overview</span>
                                    </div>
                                </>
                            )}
                            {user.role === 'doctor' && (
                                <>
                                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                        <Calendar className="h-5 w-5 text-blue-600" />
                                        <span>View Appointments</span>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                        <Users className="h-5 w-5 text-green-600" />
                                        <span>Patient Records</span>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                        <Pill className="h-5 w-5 text-purple-600" />
                                        <span>Write Prescriptions</span>
                                    </div>
                                </>
                            )}
                            {user.role === 'patient' && (
                                <>
                                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                        <Calendar className="h-5 w-5 text-blue-600" />
                                        <span>Book Appointment</span>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                        <FileText className="h-5 w-5 text-green-600" />
                                        <span>View Records</span>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                        <CreditCard className="h-5 w-5 text-yellow-600" />
                                        <span>Pay Bills</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
