import { Head, Link } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar,
    Clock,
    Edit,
    Eye,
    Filter,
    MoreHorizontal,
    Plus,
    Search,
    Stethoscope,
    Trash2,
    User
} from 'lucide-react';
import { useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';

interface Appointment {
    id: number;
    appointment_date: string;
    status: string;
    reason: string;
    notes?: string;
    patient: {
        id: number;
        user: {
            name: string;
            email: string;
        };
    };
    doctor: {
        id: number;
        user: {
            name: string;
        };
        specialization: string;
    };
}

interface AppointmentsListProps {
    appointments: Appointment[];
    userRole: string;
}

export default function AppointmentsList({ appointments, userRole }: AppointmentsListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');

    const filteredAppointments = appointments.filter(appointment => {
        const matchesSearch =
            (appointment.patient?.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (appointment.doctor?.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (appointment.reason || '').toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;

        const matchesDate = (() => {
            if (dateFilter === 'all') return true;
            const appointmentDate = new Date(appointment.appointment_date);
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            switch (dateFilter) {
                case 'today':
                    return appointmentDate.toDateString() === today.toDateString();
                case 'tomorrow':
                    return appointmentDate.toDateString() === tomorrow.toDateString();
                case 'upcoming':
                    return appointmentDate > today;
                case 'past':
                    return appointmentDate < today;
                default:
                    return true;
            }
        })();

        return matchesSearch && matchesStatus && matchesDate;
    });

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'no_show':
                return 'bg-yellow-100 text-yellow-800';
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

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            full: date.toLocaleString(),
        };
    };

    const isPatient = userRole === 'patient';
    const isDoctor = userRole === 'doctor';
    const isAdmin = userRole === 'admin';

    return (
        <AppLayout>
            <Head title="Appointments" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
                        <p className="text-muted-foreground">
                            {isPatient ? 'Your scheduled appointments' :
                             isDoctor ? 'Your patient appointments' :
                             'All clinic appointments'}
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('appointments.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Book Appointment
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                        <CardDescription>
                            Filter appointments by various criteria
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="grid gap-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search appointments..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <Filter className="mr-2 h-4 w-4" />
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="scheduled">Scheduled</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                    <SelectItem value="no_show">No Show</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={dateFilter} onValueChange={setDateFilter}>
                                <SelectTrigger>
                                    <Calendar className="mr-2 h-4 w-4" />
                                    <SelectValue placeholder="Filter by date" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Dates</SelectItem>
                                    <SelectItem value="today">Today</SelectItem>
                                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                                    <SelectItem value="upcoming">Upcoming</SelectItem>
                                    <SelectItem value="past">Past</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Appointments List */}
                <div className="space-y-4">
                    {filteredAppointments.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-8">
                                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No appointments found</h3>
                                <p className="text-muted-foreground text-center mb-4">
                                    {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
                                        ? 'Try adjusting your filters to see more results.'
                                        : 'You don\'t have any appointments scheduled yet.'}
                                </p>
                                <Button asChild>
                                    <Link href={route('appointments.create')}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Book Your First Appointment
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        filteredAppointments.map((appointment) => {
                            const dateTime = formatDateTime(appointment.appointment_date);
                            const isUpcoming = new Date(appointment.appointment_date) > new Date();

                            return (
                                <Card key={appointment.id} className={isUpcoming ? 'border-blue-200 bg-blue-50/50' : ''}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-4">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src="" />
                                                    <AvatarFallback>
                                                        {getInitials(isPatient ? appointment.doctor?.user?.name || 'Unknown' : appointment.patient?.user?.name || 'Unknown')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="space-y-2">
                                                    <div className="flex items-center space-x-2">
                                                        <h3 className="font-semibold">
                                                            {isPatient ? appointment.doctor?.user?.name || 'Unknown Doctor' : appointment.patient?.user?.name || 'Unknown Patient'}
                                                        </h3>
                                                        <Badge className={getStatusBadgeColor(appointment.status)}>
                                                            {appointment.status}
                                                        </Badge>
                                                        {isUpcoming && (
                                                            <Badge variant="outline" className="border-blue-200 text-blue-700">
                                                                Upcoming
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                        <div className="flex items-center space-x-1">
                                                            <Calendar className="h-3 w-3" />
                                                            <span>{dateTime.date}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <Clock className="h-3 w-3" />
                                                            <span>{dateTime.time}</span>
                                                        </div>
                                                        {!isPatient && (
                                                            <div className="flex items-center space-x-1">
                                                                <User className="h-3 w-3" />
                                                                <span>{appointment.patient.user.name}</span>
                                                            </div>
                                                        )}
                                                        {!isDoctor && (
                                                            <div className="flex items-center space-x-1">
                                                                <Stethoscope className="h-3 w-3" />
                                                                <span>{appointment.doctor.user.name}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground max-w-md">
                                                        {appointment.reason}
                                                    </p>
                                                </div>
                                            </div>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('appointments.show', appointment.id)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('appointments.edit', appointment.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit Appointment
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-red-600"
                                                        onClick={() => {
                                                            if (confirm('Are you sure you want to cancel this appointment?')) {
                                                                // Handle cancellation
                                                                console.log('Cancel appointment:', appointment.id);
                                                            }
                                                        }}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Cancel Appointment
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })
                    )}
                </div>

                {/* Information Alert */}
                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        <strong>Reminder:</strong> Please arrive 10 minutes before your scheduled appointment time.
                        You can cancel or reschedule appointments up to 24 hours in advance.
                    </AlertDescription>
                </Alert>
            </div>
        </AppLayout>
    );
}
