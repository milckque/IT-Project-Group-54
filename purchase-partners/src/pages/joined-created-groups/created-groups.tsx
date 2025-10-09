import Navbar from '../../components/navbar/navbar';
import SearchNavBar from '../../components/search-nav-bar/search-nav-bar';
import BuyingGroupCard from '../buying-group-dashboard/buying-group-card';

// Sample data for created groups
const createdGroups = [
    {
        id: 2,
        created_at: '2025-01-10',
        active: true,
        location: 'Sydney',
        Products: {
        id: 2,
        name: 'Sony WH-1000XM6',
        description: 'Premium noise-canceling headphones'
        }
    }
];

function CreatedGroups() {
    const handleLeave = (id: number) => {
        console.log('Leave group:', id);
        // Add leave logic here
    };

    const handleDelete = (id: number) => {
        console.log('Delete group:', id);
        // Add delete logic here
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <SearchNavBar buttonText="Create Group" buttonLink="/create-group" />

            <div className="px-6 pb-4">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-gray-600 mb-6">
                    <a href="/dashboard" className="hover:text-gray-900">Home</a>
                    <span>/</span>
                    <span>Groups</span>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center gap-4 mb-8">
                    <a
                        href="/joined-groups"
                        className="px-8 py-3 font-bold text-lg bg-white text-black border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Joined
                    </a>
                    <span className="text-3xl text-gray-400">|</span>
                    <button
                        className="px-8 py-3 font-bold text-lg bg-black text-yellow-400 rounded-lg"
                    >
                        Created
                    </button>
                </div>

                {/* Groups Header */}
                <h2 className="text-xl font-bold mb-6">Groups</h2>

                {/* Groups List */}
                <div className="grid grid-cols-2 gap-8">
                    {createdGroups.map((group) => (
                        <BuyingGroupCard
                        key={group.id}
                        group={group}
                        mode="created"
                        onLeave={handleLeave}
                        onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CreatedGroups;