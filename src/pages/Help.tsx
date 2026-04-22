import DashboardNavbar from "../components/dashboard/DashboardNavbar";

export default function Help() {
    return (
        <>
            <DashboardNavbar />
            <div className="py-12">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-3">Help & Getting Started</h1>
                        <p className="text-lg text-base-content/70">Learn about the features that make ShelfLife work</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-4">

                        <section className="card bg-base-200 shadow-sm">
                            <div className="card-body">
                                <h2 className="text-2xl font-semibold mb-3 text-primary">What is a Storage?</h2>
                                <p className="mb-4">
                                    A <span className="font-semibold">Storage</span> is a dedicated space or container where you can organize and manage your inventory.
                                    Think of it as a digital representation of a physical location - like a pantry, warehouse, refrigerator, or closet.
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-2 mb-4">
                                    <li>You can create multiple storages for different locations or purposes</li>
                                    <li>Each storage has its own set of products and items</li>
                                    <li>You can invite other users to collaborate on a storage</li>
                                    <li>Only the storage owner can manage members and delete the storage</li>
                                </ul>
                                <div className="card-actions">
                                    <div className="alert alert-info">
                                        <div className="flex gap-3">
                                            <span className="font-semibold">Example:</span>
                                            <p>Create a "Kitchen Pantry" storage to track snacks, and a "Fridge" storage for meats and vegetables.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="card bg-base-200 shadow-sm">
                            <div className="card-body">
                                <h2 className="text-2xl font-semibold mb-3 text-primary">What is a Product?</h2>
                                <p className="mb-4">
                                    A <span className="font-semibold">Product</span> is an item type that you register in the system.
                                    It's a template that can be added to multiple storages.
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-2 mb-4">
                                    <li>Each product has a name and optional icon/image</li>
                                    <li>Products are global and can be used across different storages</li>
                                    <li>You can add the same product to multiple storages with different quantities</li>
                                    <li>Admin users can manage all products in the system</li>
                                </ul>
                                <div className="card-actions">
                                    <div className="alert alert-info">
                                        <div className="flex gap-3">
                                            <span className="font-semibold">Example:</span>
                                            <p>Create a "Kitchen Pantry" storage to track snacks, and a "Fridge" storage for meats and vegetables.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="card bg-base-200 shadow-md">
                            <div className="card-body">
                                <h2 className="text-2xl font-semibold mb-3 text-primary">Items in a Storage</h2>
                                <p className="mb-4">
                                    <span className="font-semibold">Items</span> are products that have been added to a specific storage with a quantity.
                                    They represent the actual inventory in that storage.
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-2 mb-4">
                                    <li>Each item shows the product name, quantity, and expiration date</li>
                                    <li>You can edit item quantities as inventory changes</li>
                                    <li>You can also edit their expiration dates</li>
                                    <li>You can remove them from the storage</li>
                                </ul>
                                <div className="card-actions">
                                    <div className="alert alert-info">
                                        <div className="flex gap-3">
                                            <span className="font-semibold">Example:</span>
                                            <p>You have an "Apple" product in the database. When you add 2 apples to your "Kitchen Pantry" storage, that's an Item with a quantity of 2.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="card bg-base-200 shadow-md">
                            <div className="card-body">
                                <h2 className="text-2xl font-semibold mb-3 text-primary">Minimum Stock Required (Alert Threshold)</h2>
                                <p className="mb-4">
                                    The <span className="font-semibold">Minimum Stock</span> is a threshold value that triggers notifications
                                    when your inventory reaches a critically low level.
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-2 mb-4">
                                    <li>You set a "Minimum Stock" threshold for each product in a storage</li>
                                    <li>When the item quantity drops below this threshold, you'll get a notification</li>
                                    <li>You can set different thresholds for the same product in different storages</li>
                                    <li>Set it to 1 to get an alert when you're completely out of stock</li>
                                </ul>
                                <div className="card-actions">
                                    <div className="alert alert-info">
                                        <div className="flex gap-3">
                                            <span className="font-semibold">Example:</span>
                                            <p>For your "Apple" product in the "Kitchen Pantry", set the Minimum Stock Required threshold to 1. When you eat the last apple, you'll get notified to buy more.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="card bg-base-200 shadow-md">
                            <div className="card-body">
                                <h2 className="text-2xl font-semibold mb-3 text-primary">Notifications</h2>
                                <p>
                                    ShelfLife keeps you informed with three types of notifications:
                                </p>

                                <div className="space-y-3">
                                    <div className="alert alert-warning">
                                        <h3 className="font-semibold">Running Low Alerts</h3>
                                        <p>Items that have drop below the threshold you set for them</p>
                                    </div>

                                    <div className="alert alert-error">
                                        <h3 className="font-semibold">Expired Items</h3>
                                        <p>Products that have passed their expiration date and should be removed or replaced</p>
                                    </div>

                                    <div className="alert alert-success">
                                        <h3 className="font-semibold">Invitations</h3>
                                        <p>Requests from other users to join their storages as a collaborator</p>
                                    </div>
                                </div>

                                <div className="card-actions">
                                    <div className="alert alert-info">
                                        <div className="flex gap-3">
                                            <span className="font-semibold">Tip:</span>
                                            <p>Check your notifications regularly by clicking the bell icon in the navigation bar. You can accept storage invitations and take action on low stock alerts from there.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="card bg-base-200 shadow-md">
                            <div className="card-body">
                                <h2 className="text-2xl font-semibold mb-3 text-primary">Shopping List</h2>
                                <p className="mb-4">
                                    The <span className="font-semibold">Shopping List</span> is a handy tool to plan your purchases
                                    and track items you need to buy. Each item on the Shopping List is connected to a specific storage,
                                    so you can organize your shopping by where the items will be stored.
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-2 mb-4">
                                    <li>Add items you need to purchase</li>
                                    <li>Edit the quantity you need to buy</li>
                                    <li>Remove items</li>
                                    <li>Once you bought them you can directly add them to their storages</li>
                                </ul>

                                <div className="card-actions">
                                    <div className="alert alert-info">
                                        <div className="flex gap-3">
                                            <span className="font-semibold">Tip:</span>
                                            <p>You can add items from your Running Low notifications directly to your shopping list so you never run out of anything!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
