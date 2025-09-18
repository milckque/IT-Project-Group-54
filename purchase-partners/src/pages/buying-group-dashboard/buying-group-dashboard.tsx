
function BuyingGroupDashboard() {

    let bgButt = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    ]

    return (
        <div className="dashboard-page flex flex-col size-full">
            <div className="bg-black text-white">
                nav bar
            </div>
            <div className="header h-6 bg-yellow-50">
                create group and search bar
            </div>
            <div className="grid grid-cols-2 gap-8 p-8">
                {bgButt.map((item) => (
                    <div key={item} className="group-card p-4 border-2 border-black rounded-lg">
                        <h2 className="text-2xl font-bold mb-2">Buying Group {item}</h2>
                        <p className="mb-4">This is a brief description of Buying Group {item}. It provides an overview of the group's purpose and activities.</p>
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BuyingGroupDashboard;