import LoginNavbar from "../components/LoginNavbar";

export default function Home() {
    return (
        <div>
            <LoginNavbar />
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Welcome to ShelfLife!</h1>
                        <p className="py-6">
                            Your personal inventory management system.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>

    )
}