import { Head } from '@inertiajs/react';

export default function InventoryView({ inventory }: { inventory: any }) {
    if (!inventory) return <div className="p-8 text-center">Inventory item not found.</div>;
    return (
        <>
            <Head title="Inventory Item" />
            <div className="max-w-2xl mx-auto p-8">
                <h1 className="text-2xl font-bold mb-4">Inventory Item Details</h1>
                <div className="rounded-lg bg-white dark:bg-[#18181b] shadow p-6 space-y-4">
                    <div>
                        <span className="font-semibold">Name:</span> {inventory.name}
                    </div>
                    <div>
                        <span className="font-semibold">Quantity:</span> {inventory.quantity} {inventory.unit}
                    </div>
                    <div>
                        <span className="font-semibold">Status:</span> {inventory.status}
                    </div>
                    <div>
                        <span className="font-semibold">Description:</span> {inventory.description}
                    </div>
                </div>
            </div>
        </>
    );
}
