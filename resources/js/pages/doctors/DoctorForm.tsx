import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import React from 'react';

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

interface DoctorFormProps {
    doctor?: Doctor;
    userRole: string;
}

export default function DoctorForm({ doctor, userRole }: DoctorFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: doctor?.user.name || '',
        email: doctor?.user.email || '',
        phone: doctor?.user.phone || '',
        specialization: doctor?.specialization || '',
        license_number: doctor?.license_number || '',
        experience_years: doctor?.experience_years || 0,
        qualifications: doctor?.qualifications || '',
        bio: doctor?.bio || '',
    });

    const isEditing = !!doctor;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing) {
            put(route('doctors.update', doctor.id));
        } else {
            post(route('doctors.store'));
        }
    };

    return (
        <AppLayout>
            <Head title={isEditing ? 'Edit Doctor' : 'Add Doctor'} />

            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Button asChild variant="outline" size="sm">
                        <Link href={route('doctors.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Doctors
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEditing ? 'Edit Doctor' : 'Add Doctor'}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEditing ? 'Update doctor information' : 'Add a new doctor to the system'}
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Doctor Information</CardTitle>
                        <CardDescription>
                            Fill in the doctor's personal and professional information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Dr. John Smith"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="doctor@clinic.com"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="+1 (555) 123-4567"
                                        required
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-red-600">{errors.phone}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="specialization">Specialization</Label>
                                    <Input
                                        id="specialization"
                                        value={data.specialization}
                                        onChange={(e) => setData('specialization', e.target.value)}
                                        placeholder="Cardiology"
                                        required
                                    />
                                    {errors.specialization && (
                                        <p className="text-sm text-red-600">{errors.specialization}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="license_number">License Number</Label>
                                    <Input
                                        id="license_number"
                                        value={data.license_number}
                                        onChange={(e) => setData('license_number', e.target.value)}
                                        placeholder="MD123456"
                                        required
                                    />
                                    {errors.license_number && (
                                        <p className="text-sm text-red-600">{errors.license_number}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="experience_years">Years of Experience</Label>
                                    <Input
                                        id="experience_years"
                                        type="number"
                                        min="0"
                                        max="50"
                                        value={data.experience_years}
                                        onChange={(e) => setData('experience_years', parseInt(e.target.value))}
                                        placeholder="5"
                                        required
                                    />
                                    {errors.experience_years && (
                                        <p className="text-sm text-red-600">{errors.experience_years}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="qualifications">Qualifications</Label>
                                <Textarea
                                    id="qualifications"
                                    value={data.qualifications}
                                    onChange={(e) => setData('qualifications', e.target.value)}
                                    placeholder="MD from Harvard Medical School, Board Certified in Internal Medicine..."
                                    rows={3}
                                    required
                                />
                                {errors.qualifications && (
                                    <p className="text-sm text-red-600">{errors.qualifications}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Biography (Optional)</Label>
                                <Textarea
                                    id="bio"
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    placeholder="Dr. Smith has over 10 years of experience in..."
                                    rows={4}
                                />
                                {errors.bio && (
                                    <p className="text-sm text-red-600">{errors.bio}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button asChild variant="outline">
                                    <Link href={route('doctors.index')}>
                                        Cancel
                                    </Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : (isEditing ? 'Update Doctor' : 'Add Doctor')}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

