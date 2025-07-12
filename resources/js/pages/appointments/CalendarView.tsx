import { Head, Link } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    Clock,
    Edit,
    Eye,
    Plus,
    Stethoscope,
    User
} from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
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

interface CalendarViewProps {
    appointments: Appointment[];
    userRole: string;
}

export default function CalendarView({ appointments, userRole }: CalendarViewProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedAppointments, setSelectedAppointments] = useState<Appointment[]>([]);

    const isPatient = userRole === 'patient';
    const isDoctor = userRole === 'doctor';
    const isAdmin = userRole === 'admin';

    // Get current month's calendar days
    const getCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const days = [];
        const currentDay = new Date(startDate);

        while (currentDay <= lastDay || currentDay.getDay() !== 0) {
            days.push(new Date(currentDay));
            currentDay.setDate(currentDay.getDate() + 1);
        }

        return days;
    };

    // Get appointments for a specific date
    const getAppointmentsForDate = (date: Date) => {
        return appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.appointment_date);
            return appointmentDate.toDateString() === date.toDateString();
        });
    };

    // Check if date is today
    const isToday = (date: Date) => {
        return date.toDateString() === new Date().toDateString();
    };

    // Check if date is in current month
    const isCurrentMonth = (date: Date) => {
        return date.getMonth() === currentDate.getMonth();
    };

    // Navigate to previous month
    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    // Navigate to next month
    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    // Handle date click
    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        setSelectedAppointments(getAppointmentsForDate(date));
    };

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

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <AppLayout>
            <Head title="Appointment Calendar" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Appointment Calendar</h1>
                        <p className="text-muted-foreground">
                            View your appointments in calendar format
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('appointments.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Book Appointment
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</CardTitle>
                                <CardDescription>
                                    {isPatient ? 'Your appointment calendar' :
                                     isDoctor ? 'Your patient appointments' :
                                     'All clinic appointments'}
                                </CardDescription>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={goToNextMonth}>
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-7 gap-1">
                            {/* Day headers */}
                            {dayNames.map(day => (
                                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                                    {day}
                                </div>
                            ))}

                            {/* Calendar days */}
                            {getCalendarDays().map((date, index) => {
                                const dayAppointments = getAppointmentsForDate(date);
                                const isCurrentMonthDay = isCurrentMonth(date);
                                const isTodayDate = isToday(date);

                                return (
                                    <div
                                        key={index}
                                        className={`
                                            min-h-[100px] p-2 border border-border hover:bg-muted/50 cursor-pointer
                                            ${isCurrentMonthDay ? 'bg-background' : 'bg-muted/30'}
                                            ${isTodayDate ? 'ring-2 ring-primary' : ''}
                                        `}
                                        onClick={() => handleDateClick(date)}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={`
                                                text-sm font-medium
                                                ${isCurrentMonthDay ? 'text-foreground' : 'text-muted-foreground'}
                                                ${isTodayDate ? 'text-primary font-bold' : ''}
                                            `}>
                                                {date.getDate()}
                                            </span>
                                            {dayAppointments.length > 0 && (
                                                <Badge variant="secondary" className="text-xs">
                                                    {dayAppointments.length}
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Appointment indicators */}
                                        <div className="space-y-1">
                                            {dayAppointments.slice(0, 2).map(appointment => (
                                                <div
                                                    key={appointment.id}
                                                    className="text-xs p-1 rounded bg-primary/10 text-primary truncate"
                                                    title={`${formatTime(appointment.appointment_date)} - ${isPatient ? appointment.doctor.user.name : appointment.patient.user.name}`}
                                                >
                                                    {formatTime(appointment.appointment_date)} - {isPatient ? appointment.doctor.user.name : appointment.patient.user.name}
                                                </div>
                                            ))}
                                            {dayAppointments.length > 2 && (
                                                <div className="text-xs text-muted-foreground">
                                                    +{dayAppointments.length - 2} more
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Selected Date Appointments Dialog */}
                <Dialog open={selectedDate !== null} onOpenChange={() => setSelectedDate(null)}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>
                                Appointments for {selectedDate?.toLocaleDateString()}
                            </DialogTitle>
                            <DialogDescription>
                                {selectedAppointments.length} appointment(s) scheduled for this date
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {selectedAppointments.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    No appointments scheduled for this date
                                </div>
                            ) : (
                                selectedAppointments.map(appointment => (
                                    <Card key={appointment.id}>
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start space-x-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src="" />
                                                                                                            <AvatarFallback>
                                                        {getInitials(isPatient ? appointment.doctor.user.name : appointment.patient.user.name)}
                                                    </AvatarFallback>
                                                    </Avatar>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center space-x-2">
                                                                                                                    <h4 className="font-medium">
                                                            {isPatient ? appointment.doctor.user.name : appointment.patient.user.name}
                                                        </h4>
                                                            <Badge className={getStatusBadgeColor(appointment.status)}>
                                                                {appointment.status}
                                                            </Badge>
                                                        </div>
                                                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                            <div className="flex items-center space-x-1">
                                                                <Clock className="h-3 w-3" />
                                                                <span>{formatTime(appointment.appointment_date)}</span>
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
                                                        <p className="text-sm text-muted-foreground">
                                                            {appointment.reason}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-1">
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <Link href={route('appointments.show', appointment.id)}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <Link href={route('appointments.edit', appointment.id)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
