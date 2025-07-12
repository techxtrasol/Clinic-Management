import { Head } from '@inertiajs/react';

export default function DepartmentView({ department }: { department: any }) {
    if (!department) return <div className="p-8 text-center">Department not found.</div>;
    return (
        <>
            <Head title="Department" />
            <div className="max-w-2xl mx-auto p-8">
                <h1 className="text-2xl font-bold mb-4">Department Details</h1>
                <div className="rounded-lg bg-white dark:bg-[#18181b] shadow p-6 space-y-4">
                    <div>
                        <span className="font-semibold">Name:</span> {department.name}
                    </div>
                    <div>
                        <span className="font-semibold">Description:</span> {department.description}
                    </div>
                </div>
            </div>
        </>
    );
}
