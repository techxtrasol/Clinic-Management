import { Head } from '@inertiajs/react';

export default function PrescriptionView({ prescription }: { prescription: any }) {
    if (!prescription) return <div className="p-8 text-center">Prescription not found.</div>;
    return (
        <>
            <Head title="Prescription" />
            <div className="max-w-2xl mx-auto p-8">
                <h1 className="text-2xl font-bold mb-4">Prescription Details</h1>
                <div className="rounded-lg bg-white dark:bg-[#18181b] shadow p-6 space-y-4">
                    <div>
                        <span className="font-semibold">Patient:</span> {prescription.patient?.user?.name}
                    </div>
                    <div>
                        <span className="font-semibold">Doctor:</span> {prescription.doctor?.user?.name}
                    </div>
                    <div>
                        <span className="font-semibold">Medication:</span> {prescription.medication}
                    </div>
                    <div>
                        <span className="font-semibold">Dosage:</span> {prescription.dosage}
                    </div>
                    <div>
                        <span className="font-semibold">Instructions:</span> {prescription.instructions}
                    </div>
                    <div>
                        <span className="font-semibold">Date:</span> {prescription.prescribed_at}
                    </div>
                </div>
            </div>
        </>
    );
}
