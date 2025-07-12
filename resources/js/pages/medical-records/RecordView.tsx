import { Head } from '@inertiajs/react';

export default function RecordView({ record }: { record: any }) {
    if (!record) return <div className="p-8 text-center">Medical record not found.</div>;
    return (
        <>
            <Head title="Medical Record" />
            <div className="max-w-2xl mx-auto p-8">
                <h1 className="text-2xl font-bold mb-4">Medical Record Details</h1>
                <div className="rounded-lg bg-white dark:bg-[#18181b] shadow p-6 space-y-4">
                    <div>
                        <span className="font-semibold">Patient:</span> {record.patient?.user?.name}
                    </div>
                    <div>
                        <span className="font-semibold">Doctor:</span> {record.doctor?.user?.name}
                    </div>
                    <div>
                        <span className="font-semibold">Diagnosis:</span> {record.diagnosis}
                    </div>
                    <div>
                        <span className="font-semibold">Treatment:</span> {record.treatment}
                    </div>
                    <div>
                        <span className="font-semibold">Notes:</span> {record.notes}
                    </div>
                    <div>
                        <span className="font-semibold">Date:</span> {record.record_date}
                    </div>
                </div>
            </div>
        </>
    );
}
