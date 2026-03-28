import { Link } from "react-router";
import Navbar from "../components/Navbar";

export default function About() {
    return (
        <div>
            <Navbar />
            <main className="bg-base-200 min-h-screen flex flex-col">
                <section className="py-16 px-4 max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About ShelfLife</h1>
                    <p className="text-lg text-base-content/80 mb-6">
                        ShelfLife is your smart, privacy-first inventory manager for home, family, and groups. We help you keep track of what you have, what you need, and what’s about to expire—so you can waste less, save more, and shop smarter.
                    </p>
                    <div className="grid gap-6 md:grid-cols-3 text-left mt-8">
                        <div>
                            <h3 className="font-semibold">Our Mission</h3>
                            <p className="text-sm text-base-content/70">Empower everyone to reduce waste, save money, and make household management effortless.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Key Features</h3>
                            <ul className="list-disc list-inside text-sm text-base-content/70">
                                <li>Multiple storages (fridge, pantry, etc.)</li>
                                <li>Expiry & low-stock notifications</li>
                                <li>Collaborative shopping lists</li>
                                <li>Product & item management</li>
                                <li>Admin and user roles</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold">Privacy First</h3>
                            <p className="text-sm text-base-content/70">Your data is yours. We never share it unless you invite others to your storages.</p>
                        </div>
                    </div>
                </section>

                <section className="py-12 px-4 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-6">How to Get Started</h2>
                    <ol className="steps steps-vertical md:steps-horizontal w-full mb-8">
                        <li className="step step-primary">Sign Up & Log In</li>
                        <li className="step step-primary">Create or Join a Storage</li>
                        <li className="step step-primary">Add Products & Items</li>
                        <li className="step step-primary">Set Expiry Dates & Quantities</li>
                        <li className="step step-primary">Get Notified & Shop Smart</li>
                    </ol>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="card bg-base-100 shadow p-6">
                            <h4 className="font-semibold mb-2">Tips for New Users</h4>
                            <ul className="list-disc list-inside text-sm text-base-content/70">
                                <li>Start with one storage (like your fridge) and add a few items.</li>
                                <li>Try creating a shopping list and adding items to it.</li>
                                <li>Invite a family member or roommate to collaborate.</li>
                                <li>Check your notifications for expiring or low-stock items.</li>
                            </ul>
                        </div>
                        <div className="card bg-base-100 shadow p-6">
                            <h4 className="font-semibold mb-2">Need Help?</h4>
                            <p className="text-sm text-base-content/70 mb-2">If you have questions, suggestions, or find a bug, please reach out via the contact link on the homepage. We’re always improving ShelfLife based on your feedback!</p>
                            <Link to="/" className="btn btn-secondary mt-2">Back to Homepage</Link>
                        </div>
                    </div>
                </section>

                <section className="py-12 px-4 max-w-3xl mx-auto text-center">
                    <h2 className="text-xl font-bold mb-2">Thank You for Choosing ShelfLife!</h2>
                    <p className="text-base-content/70 mb-4">We’re committed to making your household management easier, greener, and more collaborative.</p>
                    <Link to="/signup" className="btn btn-primary btn-lg">Create Your Free Account</Link>
                </section>
            </main>
        </div>
    );
}

