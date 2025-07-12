import { Head, useForm } from '@inertiajs/react';
import {
    Edit,
    Eye,
    Info,
    Mail,
    MoreHorizontal,
    Phone,
    Plus,
    Search,
    Shield,
    Trash2,
    User
} from 'lucide-react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

interface UsersManagementProps {
    users: User[];
    usersByRole: Record<string, User[]>;
    roleCounts: Record<string, number>;
    roles: string[];
}

export default function UsersManagement({ users, usersByRole, roleCounts, roles }: UsersManagementProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        role: '',
    });

    const filterUsersBySearch = (userList: User[]) => {
        return userList.filter(user => {
            return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   user.phone.includes(searchTerm);
        });
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setData({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
        });
        setIsEditDialogOpen(true);
    };

    const handleViewUser = (user: User) => {
        setSelectedUser(user);
        setIsViewDialogOpen(true);
    };

    const handleUpdateUser = () => {
        if (selectedUser) {
            put(route('admin.users.update', selectedUser.id), {
                onSuccess: () => {
                    setIsEditDialogOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDeleteUser = (userId: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            // Handle delete logic here
            console.log('Delete user:', userId);
        }
    };

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

    const renderUserList = (userList: User[]) => {
        const filteredUsers = filterUsersBySearch(userList);

        if (filteredUsers.length === 0) {
            return (
                <div className="text-center py-8">
                    <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No users found</h3>
                    <p className="text-muted-foreground">
                        {searchTerm ? 'No users match your search criteria.' : 'No users in this role.'}
                    </p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {filteredUsers.map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage src="" />
                                <AvatarFallback>
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="flex items-center space-x-2">
                                    <h3 className="font-semibold">{user.name}</h3>
                                    <Badge className={getRoleBadgeColor(user.role)}>
                                        {user.role}
                                    </Badge>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                    <div className="flex items-center space-x-1">
                                        <Mail className="h-3 w-3" />
                                        <span>{user.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Phone className="h-3 w-3" />
                                        <span>{user.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewUser(user)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="text-red-600"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete User
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <Head title="Users Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
                        <p className="text-muted-foreground">
                            Manage all users in the system by role
                        </p>
                    </div>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                    </Button>
                </div>

                {/* Admin Notice */}
                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                        <strong>Admin Note:</strong> New user registrations automatically receive the "patient" role.
                        You can change user roles here to assign them as doctors, nurses, or staff members.
                    </AlertDescription>
                </Alert>

                <Card>
                    <CardHeader>
                        <CardTitle>Users by Role</CardTitle>
                        <CardDescription>
                            View and manage all registered users organized by role. Role assignment is admin-only.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <Tabs defaultValue="admin" className="w-full">
                            <TabsList className="grid w-full grid-cols-5">
                                <TabsTrigger value="admin">
                                    Admins ({roleCounts.admin || 0})
                                </TabsTrigger>
                                <TabsTrigger value="doctor">
                                    Doctors ({roleCounts.doctor || 0})
                                </TabsTrigger>
                                <TabsTrigger value="nurse">
                                    Nurses ({roleCounts.nurse || 0})
                                </TabsTrigger>
                                <TabsTrigger value="patient">
                                    Patients ({roleCounts.patient || 0})
                                </TabsTrigger>
                                <TabsTrigger value="staff">
                                    Staff ({roleCounts.staff || 0})
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="admin" className="mt-6">
                                {renderUserList(usersByRole.admin || [])}
                            </TabsContent>

                            <TabsContent value="doctor" className="mt-6">
                                {renderUserList(usersByRole.doctor || [])}
                            </TabsContent>

                            <TabsContent value="nurse" className="mt-6">
                                {renderUserList(usersByRole.nurse || [])}
                            </TabsContent>

                            <TabsContent value="patient" className="mt-6">
                                {renderUserList(usersByRole.patient || [])}
                            </TabsContent>

                            <TabsContent value="staff" className="mt-6">
                                {renderUserList(usersByRole.staff || [])}
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            {/* Edit User Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                            Update user information and role assignment.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                disabled={processing}
                            />
                            <InputError message={errors.phone} />
                        </div>
                        <div>
                            <Label htmlFor="role">Role</Label>
                            <Select
                                value={data.role}
                                onValueChange={(value) => setData('role', value)}
                                disabled={processing}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((role) => (
                                        <SelectItem key={role} value={role}>
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.role} />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsEditDialogOpen(false)}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleUpdateUser} disabled={processing}>
                            Update User
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* View User Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>User Details</DialogTitle>
                        <DialogDescription>
                            View detailed information about the selected user.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedUser && (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src="" />
                                    <AvatarFallback>
                                        {getInitials(selectedUser.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                                    <Badge className={getRoleBadgeColor(selectedUser.role)}>
                                        {selectedUser.role}
                                    </Badge>
                                </div>
                            </div>
                            <Separator />
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{selectedUser.email}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{selectedUser.phone}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Shield className="h-4 w-4 text-muted-foreground" />
                                    <span>Role: {selectedUser.role}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span>Member since: {new Date(selectedUser.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end">
                        <Button
                            variant="outline"
                            onClick={() => setIsViewDialogOpen(false)}
                        >
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
