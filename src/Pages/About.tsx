
import Navbar from "../components/Navbar";

export default function About() {
    return (
        <div>
            <Navbar />

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold">About ShelfLife</h1>
                        <p className="py-6 text-lg text-base-content/80">
                            ShelfLife helps you keep track of your food and household items so nothing goes to waste. Log
                            items, set expiry dates, and get reminders to use or donate things before they expire.
                        </p>

                        <div className="grid gap-6 md:grid-cols-3 text-left mt-8">
                            <div>
                                <h3 className="font-semibold">Purpose</h3>
                                <p className="text-sm text-base-content/70">Reduce waste, save money, and simplify shopping.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Features</h3>
                                <p className="text-sm text-base-content/70">Quick item logging, expiry alerts, and simple inventory views.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Privacy</h3>
                                <p className="text-sm text-base-content/70">Your data stays local to your account unless you choose to share it.</p>
                            </div>
                        </div>

                        <p className="py-6 text-sm text-base-content/70">
                            We're building ShelfLife to be simple, helpful, and respectful of your privacy. If you have
                            suggestions or find a bug, please reach out via the contact link on the homepage.
                        </p>

                        <a href="/" className="btn btn-secondary">Back to Homepage</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

