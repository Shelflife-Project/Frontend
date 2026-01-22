export default function Storages() {
    return (
        <>
            <div className="p-8 pb-32 text-center">
                <h1 className="text-3xl font-bold mb-4">Storages</h1>
                <p className="text-gray-600">Manage your storage locations here.</p>
            </div>
            
            <button className="fixed bottom-24 sm:bottom-28 md:bottom-32 left-1/2 transform -translate-x-1/2 z-40 btn btn-sm sm:btn-md md:btn-lg btn-info">
                New Storage
            </button>
        </>
    )
}
