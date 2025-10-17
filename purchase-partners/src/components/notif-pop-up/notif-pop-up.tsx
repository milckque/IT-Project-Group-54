import React, { useState } from 'react';
import { X, Bell } from 'lucide-react';

interface NotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (count: string) => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}) => {
  const [buyerCount, setBuyerCount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (buyerCount) {
      onSubmit?.(buyerCount);
      setBuyerCount('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-yellow-300 rounded-2xl p-8 max-w-2xl w-full relative shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 grid grid-cols-2 gap-0.5">
            <div className="bg-purple-400 rounded-sm"></div>
            <div className="bg-purple-400 rounded-sm"></div>
            <div className="bg-purple-400 rounded-sm"></div>
            <div className="bg-purple-400 rounded-sm"></div>
          </div>
          <h2 className="text-purple-300 text-lg font-medium">Notification</h2>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-700 hover:text-gray-900 transition-colors"
          type="button"
        >
          <X size={32} strokeWidth={3} />
        </button>

        {/* Main content */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell size={40} className="text-black" fill="black" />
            <h1 className="text-4xl font-bold text-black">
              Notify me when there are:
            </h1>
          </div>

          {/* Input field */}
          <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-md">
            <input
              type="number"
              value={buyerCount}
              onChange={(e) => setBuyerCount(e.target.value)}
              placeholder="....."
              className="flex-1 text-2xl outline-none bg-transparent"
              min="1"
            />
            <span className="text-2xl text-gray-700 font-medium">buyers</span>
          </div>

          {/* Submit button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white text-3xl font-semibold px-16 py-4 rounded-2xl shadow-lg transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationPopup;