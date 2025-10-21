import React from 'react';

interface VoucherCardProps {
    productName: string;
    price: string;
    code: string;
    startDate: string;
    endDate: string;
    store: string;
    benefits: string;
    status: 'active' | 'upcoming' | 'used';
    onCopy?: () => void;
    onApply?: () => void;
}

const VoucherCard: React.FC<VoucherCardProps> = ({
    productName,
    price,
    code,
    startDate,
    endDate,
    store,
    benefits,
    status,
    onCopy,
    onApply,
}) => {
    const getCardStyles = () => {
        switch (status) {
        case 'active':
            return 'bg-[#FFC107] text-black border-2 border-transparent';
        case 'upcoming':
            return 'bg-white text-black border-2 border-gray-300';
        case 'used':
            return 'bg-gray-300 text-gray-600 border-2 border-transparent';
        default:
            return 'bg-white';
        }
    };

    const getCodeColor = () => {
        switch (status) {
        case 'active':
            return 'text-orange-600';
        case 'upcoming':
            return 'text-red-600';
        case 'used':
            return 'text-gray-500';
        default:
            return 'text-gray-600';
        }
    };

    return (
        <div className={`${getCardStyles()} rounded-lg p-6 shadow-md`}>
        {/* Product Name and Price */}
        <div className="mb-4">
            <h3 className="text-2xl font-bold mb-1">{productName}</h3>
            <p className="text-2xl font-bold">{price}</p>
        </div>

        {/* Code and Actions */}
        <div className="flex items-center justify-between mb-4">
            <p className={`font-semibold ${getCodeColor()}`}>
            Code: {code}
            </p>
            <div className="flex gap-4">
            <button
                onClick={onCopy}
                className="flex items-center gap-1 text-sm font-medium hover:opacity-70"
                disabled={status === 'used'}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Copy
            </button>
            <button
                onClick={onApply}
                className="flex items-center gap-1 text-sm font-medium hover:opacity-70"
                disabled={status === 'used'}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Apply
            </button>
            </div>
        </div>

        {/* Details */}
        <div className="space-y-1 text-sm">
            <p>• {startDate} - {endDate}</p>
            <p>• {store}</p>
            <p>• {benefits}</p>
        </div>
        </div>
    );
};

export default VoucherCard;