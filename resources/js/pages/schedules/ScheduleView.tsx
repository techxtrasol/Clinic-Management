import { Head } from '@inertiajs/react';

export default function ScheduleView({ schedule }: { schedule: any }) {
  if (!schedule) return <div className="p-8 text-center">Schedule not found.</div>;
  return (
    <>
      <Head title="Schedule" />
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Schedule Details</h1>
        <div className="rounded-lg bg-white dark:bg-[#18181b] shadow p-6 space-y-4">
          <div>
            <span className="font-semibold">Doctor:</span> {schedule.doctor?.user?.name}
          </div>
          <div>
            <span className="font-semibold">Day of Week:</span> {schedule.day_of_week}
          </div>
          <div>
            <span className="font-semibold">Start Time:</span> {schedule.start_time}
          </div>
          <div>
            <span className="font-semibold">End Time:</span> {schedule.end_time}
          </div>
          <div>
            <span className="font-semibold">Status:</span> {schedule.status}
          </div>
        </div>
      </div>
    </>
  );
}
