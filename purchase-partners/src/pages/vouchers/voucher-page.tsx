// src/pages/vouchers/VouchersPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import VoucherCard from '../../pages/vouchers/voucher-card';
import SearchNavBar from '../../components/search-nav-bar/search-nav-bar';

interface Voucher {
    id: string;
    productName: string;
    price: string;
    code: string;
    startDate: string;
    endDate: string;
    store: string;
    benefits: string;
    status: 'active' | 'upcoming' | 'used';
}

function VouchersPage() {
    const navigate = useNavigate();
    const [myCoupons, setMyCoupons] = useState<Voucher[]>([]);
    const [upcomingCoupons, setUpcomingCoupons] = useState<Voucher[]>([]);
    const [usedCoupons, setUsedCoupons] = useState<Voucher[]>([]);
    const [myCollapsed, setMyCollapsed] = useState(false);
    const [upcomingCollapsed, setUpcomingCollapsed] = useState(false);
    const [usedCollapsed, setUsedCollapsed] = useState(false);

    useEffect(() => {
        fetchVouchers();
    }, []);

    const fetchVouchers = async () => {
        // TODO: Replace with actual Supabase query
        const mockMyCoupons: Voucher[] = [
            {
            id: '1',
            productName: 'iPhone 15 Pro Max',
            price: '$1,299',
            code: '4PPL315PRO',
            startDate: '01/10/2025 09:00',
            endDate: '31/10/2025 23:59',
            store: 'Apple Store',
            benefits: '15% off + Free AirPods',
            status: 'active',
            },
            {
            id: '2',
            productName: 'Samsung Galaxy S24 Ultra',
            price: '$1,199',
            code: 'G4L4XYS4V3',
            startDate: '15/10/2025 00:00',
            endDate: '30/10/2025 23:59',
            store: 'Samsung Store',
            benefits: '20% off + Free Galaxy Buds',
            status: 'active',
            },
            {
            id: '3',
            productName: 'Sony WH-1000XM5 Headphones',
            price: '$399',
            code: 'SONY1000XM5',
            startDate: '10/10/2025 08:00',
            endDate: '25/10/2025 20:00',
            store: 'Sony Electronics',
            benefits: '25% off + Free carrying case',
            status: 'active',
            },
            {
            id: '4',
            productName: 'Dell XPS 15 Laptop',
            price: '$1,599',
            code: 'D3LLXPS25',
            startDate: '05/10/2025 10:00',
            endDate: '28/10/2025 18:00',
            store: 'Dell Direct',
            benefits: '10% off + Extended warranty',
            status: 'active',
            },
        ];
        
        const mockUpcomingCoupons: Voucher[] = [
            {
            id: '5',
            productName: 'GeForce RTX™ 5090 GAMING OC 32G',
            price: '$2,499',
            code: 'RTX5090GA4M3',
            startDate: '01/11/2025 00:00',
            endDate: '15/11/2025 23:59',
            store: 'NVIDIA Store',
            benefits: '5% off + Free game bundle',
            status: 'upcoming',
            },
            {
            id: '6',
            productName: 'PlayStation 5 Console Slim',
            price: '$499',
            code: 'PS5SL1M2025',
            startDate: '05/11/2025 09:00',
            endDate: '20/11/2025 21:00',
            store: 'PlayStation Direct',
            benefits: '12% off + Free controller',
            status: 'upcoming',
            },
            {
            id: '7',
            productName: 'iPad Pro 13-inch M4',
            price: '$1,299',
            code: 'IP4DPROM4',
            startDate: '10/11/2025 08:00',
            endDate: '30/11/2025 23:59',
            store: 'Apple Store',
            benefits: '10% off + Free Apple Pencil Pro',
            status: 'upcoming',
            },
            {
            id: '8',
            productName: 'DJI Mavic 3 Pro Drone',
            price: '$2,199',
            code: 'DJIM4V1C3',
            startDate: '12/11/2025 10:00',
            endDate: '25/11/2025 20:00',
            store: 'DJI Official Store',
            benefits: '15% off + Extra battery pack',
            status: 'upcoming',
            },
        ];
        
        const mockUsedCoupons: Voucher[] = [
            {
            id: '9',
            productName: 'AirPods Pro (2nd Gen)',
            price: '$249',
            code: '41RPODSPRO2',
            startDate: '15/09/2025 09:00',
            endDate: '30/09/2025 23:59',
            store: 'Apple Store',
            benefits: '20% off + Free engraving',
            status: 'used',
            },
            {
            id: '10',
            productName: 'Logitech MX Master 3S Mouse',
            price: '$99',
            code: 'LOG1MX3S',
            startDate: '10/09/2025 08:00',
            endDate: '25/09/2025 20:00',
            store: 'Logitech Official',
            benefits: '30% off + Free mousepad',
            status: 'used',
            },
            {
            id: '11',
            productName: 'GoPro HERO12 Black',
            price: '$399',
            code: 'GOPRO12BLK',
            startDate: '01/09/2025 00:00',
            endDate: '20/09/2025 23:59',
            store: 'GoPro Store',
            benefits: '25% off + Free SD card 128GB',
            status: 'used',
            },
            {
            id: '12',
            productName: 'Bose QuietComfort Earbuds II',
            price: '$299',
            code: 'BOS3QC23B',
            startDate: '05/09/2025 10:00',
            endDate: '18/09/2025 22:00',
            store: 'Bose Official',
            benefits: '18% off + Extended warranty',
            status: 'used',
            },
        ];

        setMyCoupons(mockMyCoupons);
        setUpcomingCoupons(mockUpcomingCoupons);
        setUsedCoupons(mockUsedCoupons);
    };

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        alert(`Code ${code} copied to clipboard!`);
    };

    const handleApply = (voucherId: string) => {
        console.log(`Applying voucher: ${voucherId}`);
        // TODO: Implement apply logic
    };

    const handleSearchResults = (results: Voucher[]) => {
        // TODO: Implement search filtering for vouchers
        console.log('Search results:', results);
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
                <span>Vouchers</span>
                </div>
        
                {/* Vouchers Title */}
                <h1 className="text-4xl font-bold text-center mb-12">Vouchers</h1>
        
                {/* My Coupons Section */}
                <div className="mb-8">
                <button
                    onClick={() => setMyCollapsed(!myCollapsed)}
                    className="flex items-center gap-2 mb-4 text-xl font-semibold hover:text-gray-700"
                >
                    <svg
                    className={`w-5 h-5 transform transition-transform ${myCollapsed ? '' : 'rotate-90'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    My coupons
                </button>
                {!myCollapsed && (
                    <div className="grid grid-cols-2 gap-8">
                    {myCoupons.map((voucher) => (
                        <VoucherCard
                        key={voucher.id}
                        {...voucher}
                        onCopy={() => handleCopy(voucher.code)}
                        onApply={() => handleApply(voucher.id)}
                        />
                    ))}
                    </div>
                )}
                </div>
        
                {/* Up-coming Coupons Section */}
                <div className="mb-8">
                <button
                    onClick={() => setUpcomingCollapsed(!upcomingCollapsed)}
                    className="flex items-center gap-2 mb-4 text-xl font-semibold hover:text-gray-700"
                >
                    <svg
                    className={`w-5 h-5 transform transition-transform ${upcomingCollapsed ? '' : 'rotate-90'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Up-coming coupons
                </button>
                {!upcomingCollapsed && (
                    <div className="grid grid-cols-2 gap-8">
                    {upcomingCoupons.map((voucher) => (
                        <VoucherCard
                        key={voucher.id}
                        {...voucher}
                        onCopy={() => handleCopy(voucher.code)}
                        onApply={() => handleApply(voucher.id)}
                        />
                    ))}
                    </div>
                )}
                </div>
        
                {/* Used Coupons Section */}
                <div className="mb-8">
                <button
                    onClick={() => setUsedCollapsed(!usedCollapsed)}
                    className="flex items-center gap-2 mb-4 text-xl font-semibold hover:text-gray-700"
                >
                    <svg
                    className={`w-5 h-5 transform transition-transform ${usedCollapsed ? '' : 'rotate-90'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Used coupons
                </button>
                {!usedCollapsed && (
                    <div className="grid grid-cols-2 gap-8">
                    {usedCoupons.map((voucher) => (
                        <VoucherCard
                        key={voucher.id}
                        {...voucher}
                        onCopy={() => handleCopy(voucher.code)}
                        onApply={() => handleApply(voucher.id)}
                        />
                    ))}
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}
        
export default VouchersPage;