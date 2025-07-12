import { Head } from '@inertiajs/react';

export default function BillView({ billing }: { billing: any }) {
  if (!billing) return <div className="p-8 text-center">Bill not found.</div>;
  return (
    <>
      <Head title="Bill" />
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Bill Details</h1>
        <div className="rounded-lg bg-white dark:bg-[#18181b] shadow p-6 space-y-4">
          <div>
            <span className="font-semibold">Patient:</span> {billing.patient?.user?.name}
          </div>
          <div>
            <span className="font-semibold">Amount:</span> ${billing.amount}
          </div>
          <div>
            <span className="font-semibold">Status:</span> {billing.status}
          </div>
          <div>
            <span className="font-semibold">Date:</span> {billing.billed_at}
          </div>
          <div>
            <span className="font-semibold">Notes:</span> {billing.notes}
          </div>
        </div>
      </div>
    </>
  );
}
