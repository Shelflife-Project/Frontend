import { Link } from "react-router";
import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <div>
            <Navbar />
            <main className="bg-base-200 min-h-screen flex flex-col">
                <section className="hero py-16">
                    <div className="hero-content flex-col text-center max-w-2xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-success mb-4">Welcome to ShelfLife</h1>
                        <p className="text-lg md:text-xl text-base-content/80 mb-6">
                            The all-in-one app to track, manage, and optimize your food and household inventory. Reduce waste, save money, and simplify your life.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <Link to="/signup" className="btn btn-primary btn-lg">Get Started</Link>
                            <Link to="/about" className="btn btn-outline btn-secondary btn-lg">How It Works</Link>
                        </div>
                    </div>
                </section>

                <section className="py-12 px-4 max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8">What Can You Do with ShelfLife?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="card bg-base-100 shadow-md p-6">
                            <h3 className="font-semibold text-xl mb-2">Organize Your Storages</h3>
                            <p className="text-base-content/70 mb-2">Create and manage multiple storages (fridge, pantry, freezer, etc.) for your household or groups.</p>
                            <ul className="list-disc list-inside text-sm text-base-content/60">
                                <li>Invite members to shared storages</li>
                                <li>Set custom storage names</li>
                                <li>Manage permissions</li>
                            </ul>
                        </div>
                        <div className="card bg-base-100 shadow-md p-6">
                            <h3 className="font-semibold text-xl mb-2">Track Items & Expiry</h3>
                            <p className="text-base-content/70 mb-2">Log items, set expiry dates, and get automatic reminders before things go bad.</p>
                            <ul className="list-disc list-inside text-sm text-base-content/60">
                                <li>Quick add with product templates</li>
                                <li>Expiry and running low notifications</li>
                                <li>Visual inventory overview</li>
                            </ul>
                        </div>
                        <div className="card bg-base-100 shadow-md p-6">
                            <h3 className="font-semibold text-xl mb-2">Smart Shopping Lists</h3>
                            <p className="text-base-content/70 mb-2">Build shopping lists from your inventory and add items directly to storages when you buy them.</p>
                            <ul className="list-disc list-inside text-sm text-base-content/60">
                                <li>Collaborative shopping lists</li>
                                <li>One-click add to storage</li>
                                <li>Track what you need, avoid overbuying</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="py-12 px-4 max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8">All Features at a Glance</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="card bg-base-100 shadow p-4">
                            <h4 className="font-semibold mb-1">Product Management</h4>
                            <p className="text-sm text-base-content/70">Create, edit, and organize products for easy item logging.</p>
                        </div>
                        <div className="card bg-base-100 shadow p-4">
                            <h4 className="font-semibold mb-1">Notifications</h4>
                            <p className="text-sm text-base-content/70">Get notified when items are expiring, running low, or when you receive storage invitations.</p>
                        </div>
                        <div className="card bg-base-100 shadow p-4">
                            <h4 className="font-semibold mb-1">User Profiles</h4>
                            <p className="text-sm text-base-content/70">Manage your account, update your info, and personalize your experience.</p>
                        </div>
                        <div className="card bg-base-100 shadow p-4">
                            <h4 className="font-semibold mb-1">Admin Tools</h4>
                            <p className="text-sm text-base-content/70">Admins can manage users, storages, and oversee group activity.</p>
                        </div>
                        <div className="card bg-base-100 shadow p-4">
                            <h4 className="font-semibold mb-1">Privacy First</h4>
                            <p className="text-sm text-base-content/70">Your data is private and secure—only shared with others if you choose.</p>
                        </div>
                        <div className="card bg-base-100 shadow p-4">
                            <h4 className="font-semibold mb-1">Mobile Friendly</h4>
                            <p className="text-sm text-base-content/70">ShelfLife works great on any device, so you can manage your inventory anywhere.</p>
                        </div>
                    </div>
                </section>

                <section className="py-12 px-4 max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
                    <p className="mb-6 text-base-content/70">Sign up for free and take control of your household inventory today.</p>
                    <Link to="/signup" className="btn btn-primary btn-lg">Create Your Account</Link>
                </section>
            </main>
        </div>
    );
}