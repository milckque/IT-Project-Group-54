import type { BuyingGroup } from "./buying-group-dashboard";

function BuyingGroupCard({ group }: { group: BuyingGroup }) {
    return (
        <div key={group.id} className="group-card h-48 p-4 bg-gray-200 shadow-xl rounded-lg flex flex-row">
            <div className="details flex-3 flex flex-col ">
                <h2 className="text-2xl font-bold mb-2">{group.Products.name}</h2>
                <span>Joined: </span>
            </div>
            <div className="functionality flex-1 flex flex-col justify-center">
                
                <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Join</button>
            </div>
        </div>
    );
}

export default BuyingGroupCard;