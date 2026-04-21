import { Link } from "react-router";
import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <div>
            <Navbar />
            <main className="min-h-screen flex flex-col">
                <section className="hero py-16">
                    <div className="hero-content flex-col text-center max-w-2xl mx-auto">
                        <img src="/shelflife.svg" className="w-48" />
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Welcome to ShelfLife</h1>
                        <p className="text-lg md:text-xl text-base-content/80 mb-6">
                            The all-in-one app to track, manage, and optimize your food and household inventory. Reduce waste, save money, and simplify your life.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <Link to="/signup" className="btn btn-primary btn-lg">Get Started</Link>
                            <Link to="/about" className="btn btn-outline btn-secondary btn-lg">How It Works</Link>
                        </div>
                    </div>
                </section>

                <section className="px-4 max-w-6xl mx-auto mb-4">
                    <h2 className="text-3xl font-bold text-center mb-8">What Can You Do with ShelfLife?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="card bg-base-200 shadow-md">
                            <div className="card-body">
                                <h3 className="card-title">Organize Your Storages</h3>
                                <p className="text-base-content/70 mb-2">Create and manage multiple storages (fridge, pantry, freezer, etc.) for your household or groups.</p>
                                <ul className="list-disc list-inside text-sm text-base-content/60">
                                    <li>Invite members to shared storages</li>
                                    <li>Set custom storage names</li>
                                    <li>Manage permissions</li>
                                </ul>
                            </div>
                        </div>
                        <div className="card bg-base-200 shadow-md">
                            <div className="card-body">
                                <h3 className="card-title">Track Items & Expiry</h3>
                                <p className="text-base-content/70 mb-2">Log items, set expiry dates, and get automatic reminders before things go bad.</p>
                                <ul className="list-disc list-inside text-sm text-base-content/60">
                                    <li>Quick add with barcode scanning</li>
                                    <li>Expiry and running low notifications</li>
                                    <li>Visual inventory overview</li>
                                </ul>
                            </div>
                        </div>
                        <div className="card bg-base-200 shadow-md">
                            <div className="card-body">
                                <h3 className="card-title">Smart Shopping Lists</h3>
                                <p className="text-base-content/70 mb-2">Build shopping lists from your inventory and add items directly to storages when you buy them.</p>
                                <ul className="list-disc list-inside text-sm text-base-content/60">
                                    <li>Collaborative shopping lists</li>
                                    <li>One-click add to storage</li>
                                    <li>Track what you need, avoid overbuying</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}