import { Link } from "react-router";
import Navbar from "../components/Navbar";

export default function About() {
    return (
        <div>
            <Navbar />

            <main className="min-h-screen flex flex-col">

                <section className="py-24 px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">About ShelfLife</h1>
                        <p className="text-lg text-base-content/70 mb-8">
                            ShelfLife helps you track your food, reduce waste, and stay organized —
                            all while keeping your data private.
                        </p>
                        <Link to="/signup" className="btn btn-primary btn-lg">
                            Get Started For Free
                        </Link>
                    </div>
                </section>

                <section className="py-20 px-4 max-w-6xl mx-auto">
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="card bg-base-200 shadow-md">
                            <div className="card-body">
                                <h3 className="card-title">Our Mission</h3>
                                <p className="text-sm text-base-content/70">
                                    Empower everyone to reduce waste, save money, and make household management effortless.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-200 shadow-md">
                            <div className="card-body">
                                <h3 className="card-title">Key Features</h3>
                                <ul className="list-disc list-inside text-sm text-base-content/70">
                                    <li>Multiple storages (fridge, pantry, etc.)</li>
                                    <li>Expiry & running low notifications</li>
                                    <li>Collaborative shopping lists</li>
                                    <li>Product & item management</li>
                                </ul>
                            </div>
                        </div>

                        <div className="card bg-base-200 shadow-md">
                            <div className="card-body">
                                <h3 className="card-title">Privacy First</h3>
                                <p className="text-sm text-base-content/70">Your data is yours. We never share it unless you invite others to your storages.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 px-4 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-6">How to Get Started</h2>
                    <ul className="steps steps-vertical md:steps-horizontal w-full mb-8">
                        <li className="step step-primary">Sign Up & Log In</li>
                        <li className="step step-primary">Create or Join a Storage</li>
                        <li className="step step-primary">Add Products & Items</li>
                        <li className="step step-primary">Set Expiry Dates & Quantities</li>
                        <li className="step step-primary">Get Notified & Shop Smart</li>
                    </ul>
                    <div className="card bg-base-200 shadow-md">
                        <div className="card-body">
                            <h4 className="card-title">Tips for New Users</h4>
                            <ul className="list-disc list-inside text-sm text-base-content/70">
                                <li>Start with one storage (like your fridge) and add a few items.</li>
                                <li>Try creating a shopping list and adding items to it.</li>
                                <li>Invite a family member or roommate to collaborate.</li>
                                <li>Check your notifications for expiring or low-stock items.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="py-12 px-4 max-w-3xl mx-auto text-center">
                    <h2 className="text-xl font-bold mb-2">Thank You for Choosing ShelfLife!</h2>
                    <p className="text-base-content/70 mb-4">We're committed to making your household management easier, greener, and more collaborative.</p>
                    <Link to="/signup" className="btn btn-primary btn-lg">Create Your Free Account</Link>
                </section>
            </main>
        </div>
    );
}