import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Users, Tag, Bell, ShoppingBag, Store, Check } from 'lucide-react';

const TutorialPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState<'buyer' | 'seller' | null>(null);

  const buyerSteps = [
    {
      title: "Welcome to GroupBuy!",
      description: "Join forces with other buyers to unlock amazing deals",
      icon: <Users size={64} className="text-yellow-500" />,
      image: "👥",
      content: (
        <div className="space-y-4">
          <p className="text-lg">GroupBuy flips traditional shopping on its head!</p>
          <p>Instead of waiting for sellers to offer deals, YOU create demand by joining buying groups for products you want.</p>
          <p className="font-semibold text-yellow-600">The more buyers join, the better the deals get!</p>
        </div>
      )
    },
    {
      title: "Step 1: Browse Buying Groups",
      description: "Find products you're interested in",
      icon: <ShoppingBag size={64} className="text-yellow-500" />,
      image: "🔍",
      content: (
        <div className="space-y-4">
          <p className="text-lg">Search for products you want to buy:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Browse through active buying groups</li>
            <li>See how many buyers have already joined</li>
            <li>Check current offers from sellers</li>
            <li>Filter by category, location, or expiry date</li>
          </ul>
          <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
            <p className="font-semibold">💡 Tip: Popular groups often get better offers!</p>
          </div>
        </div>
      )
    },
    {
      title: "Step 2: Join a Group",
      description: "Show sellers there's demand",
      icon: <Users size={64} className="text-yellow-500" />,
      image: "✋",
      content: (
        <div className="space-y-4">
          <p className="text-lg">Click "Join" to add yourself to the buying group</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>No payment required to join!</li>
            <li>You can leave at any time before claiming an offer</li>
            <li>Watch as more buyers join and offers improve</li>
            <li>Get notified when new offers are made</li>
          </ul>
          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
            <p className="font-semibold">✅ Your participation shows real demand to sellers</p>
          </div>
        </div>
      )
    },
    {
      title: "Step 3: Watch Offers Roll In",
      description: "Sellers compete for your group",
      icon: <Tag size={64} className="text-yellow-500" />,
      image: "🎟️",
      content: (
        <div className="space-y-4">
          <p className="text-lg">Sellers make conditional offers based on group size:</p>
          <div className="space-y-3">
            <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-400">
              <p className="font-semibold">Example Offer 1:</p>
              <p>"10% OFF if 100 buyers join"</p>
            </div>
            <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-400">
              <p className="font-semibold">Example Offer 2:</p>
              <p>"25% OFF if 500 buyers join"</p>
            </div>
            <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-400">
              <p className="font-semibold">Example Offer 3:</p>
              <p>"35% OFF if 1000 buyers join"</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Step 4: Claim Your Deal",
      description: "Get your voucher when ready",
      icon: <Check size={64} className="text-yellow-500" />,
      image: "🎉",
      content: (
        <div className="space-y-4">
          <p className="text-lg">When an offer reaches its threshold:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>You'll receive a notification</li>
            <li>Click "Claim" to get your digital voucher</li>
            <li>Use the voucher code at checkout</li>
            <li>Enjoy your group-powered discount!</li>
          </ul>
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <p className="font-semibold">📱 All vouchers are stored in your account</p>
            <p className="text-sm mt-2">Access them anytime from the Vouchers page</p>
          </div>
        </div>
      )
    }
  ];

  const sellerSteps = [
    {
      title: "Welcome Sellers!",
      description: "Reach committed buyers with targeted offers",
      icon: <Store size={64} className="text-yellow-500" />,
      image: "🏪",
      content: (
        <div className="space-y-4">
          <p className="text-lg">GroupBuy connects you with buyers who ACTUALLY want your products</p>
          <p>No wasted marketing dollars - every buyer in a group has already shown genuine interest!</p>
          <p className="font-semibold text-yellow-600">Make conditional offers and only pay when deals convert</p>
        </div>
      )
    },
    {
      title: "Step 1: Find Active Groups",
      description: "See what buyers want",
      icon: <Users size={64} className="text-yellow-500" />,
      image: "👀",
      content: (
        <div className="space-y-4">
          <p className="text-lg">Browse buying groups to see real demand:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>View products buyers are organizing around</li>
            <li>See how many buyers have joined each group</li>
            <li>Check existing offers from competitors</li>
            <li>Identify opportunities for your products</li>
          </ul>
          <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
            <p className="font-semibold">💡 Tip: Look for growing groups with few offers!</p>
          </div>
        </div>
      )
    },
    {
      title: "Step 2: Make an Offer",
      description: "Set conditional discounts",
      icon: <Tag size={64} className="text-yellow-500" />,
      image: "🎯",
      content: (
        <div className="space-y-4">
          <p className="text-lg">Create conditional offers based on group size:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Set your discount percentage or fixed amount</li>
            <li>Define minimum buyers needed (threshold)</li>
            <li>Add offer details and expiry date</li>
            <li>Submit for buyers to see</li>
          </ul>
          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
            <p className="font-semibold">✅ Example: "20% off if 200 buyers join"</p>
            <p className="text-sm mt-2">Your offer only activates when the threshold is met</p>
          </div>
        </div>
      )
    },
    {
      title: "Step 3: Set Notifications",
      description: "Stay informed about group growth",
      icon: <Bell size={64} className="text-yellow-500" />,
      image: "🔔",
      content: (
        <div className="space-y-4">
          <p className="text-lg">Get notified when groups reach key sizes:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Set custom buyer count thresholds</li>
            <li>Receive alerts when groups hit your targets</li>
            <li>Adjust your offers based on demand</li>
            <li>Stay competitive with real-time updates</li>
          </ul>
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <p className="font-semibold">📊 Track group growth and optimize your strategy</p>
          </div>
        </div>
      )
    },
    {
      title: "Step 4: Pay & Fulfill",
      description: "Complete the transaction",
      icon: <Check size={64} className="text-yellow-500" />,
      image: "💰",
      content: (
        <div className="space-y-4">
          <p className="text-lg">When your offer is claimed:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Pay the platform fee (only when offers convert!)</li>
            <li>Buyers receive their voucher codes</li>
            <li>Fulfill orders as buyers redeem vouchers</li>
            <li>Build reputation for future offers</li>
          </ul>
          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
            <p className="font-semibold">🎯 Lower marketing costs, higher conversion rates</p>
            <p className="text-sm mt-2">You're reaching buyers who already want your product!</p>
          </div>
        </div>
      )
    }
  ];

  const steps = userType === 'buyer' ? buyerSteps : userType === 'seller' ? sellerSteps : [];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetTutorial = () => {
    setUserType(null);
    setCurrentStep(0);
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">How GroupBuy Works</h1>
            <p className="text-xl text-gray-600">Choose your role to learn more</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Buyer Card */}
            <button
              onClick={() => setUserType('buyer')}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-4 border-transparent hover:border-yellow-400"
            >
              <div className="flex flex-col items-center space-y-4">
                <ShoppingBag size={80} className="text-yellow-500" />
                <h2 className="text-3xl font-bold text-gray-800">I want to BUY</h2>
                <p className="text-gray-600 text-center">
                  Learn how to join buying groups and get amazing deals through collective purchasing power
                </p>
                <div className="mt-4 px-6 py-3 bg-black text-white rounded-full font-semibold">
                  Start Tutorial →
                </div>
              </div>
            </button>

            {/* Seller Card */}
            <button
              onClick={() => setUserType('seller')}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-4 border-transparent hover:border-yellow-400"
            >
              <div className="flex flex-col items-center space-y-4">
                <Store size={80} className="text-yellow-500" />
                <h2 className="text-3xl font-bold text-gray-800">I want to SELL</h2>
                <p className="text-gray-600 text-center">
                  Discover how to reach committed buyers with targeted conditional offers
                </p>
                <div className="mt-4 px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold">
                  Start Tutorial →
                </div>
              </div>
            </button>
          </div>

          <div className="text-center mt-12">
          <a href="/" className="text-gray-600 hover:text-gray-800 underline">
              Skip tutorial and go to homepage
            </a>
          </div>
        </div>
      </div>
    );
  }

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={resetTutorial}
              className="p-2 hover:bg-white/50 rounded-full transition"
            >
              <X size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              {userType === 'buyer' ? '🛍️ Buyer Tutorial' : '🏪 Seller Tutorial'}
            </h1>
          </div>
          <div className="text-sm font-semibold text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
          <div
            className="bg-yellow-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="text-6xl mb-4">{step.image}</div>
            {step.icon}
            <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-2">{step.title}</h2>
            <p className="text-lg text-gray-600">{step.description}</p>
          </div>

          <div className="text-gray-700 text-left">
            {step.content}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition ${
              currentStep === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-800 hover:bg-gray-100 shadow-md'
            }`}
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          {currentStep === steps.length - 1 ? (
            <a
              href={userType === 'buyer' ? '/buyer-account' : '/seller-account'}
              className="flex items-center gap-2 px-8 py-3 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 shadow-md transition"
            >
              Get Started
              <Check size={20} />
            </a>
          ) : (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 shadow-md transition"
            >
              Next
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Quick Links */}
        <div className="text-center mt-8 space-x-4">
          <button
            onClick={resetTutorial}
            className="text-gray-600 hover:text-gray-800 underline text-sm"
          >
            Change role
          </button>
          <a
            href="/"
            className="text-gray-600 hover:text-gray-800 underline text-sm"
          >
            Skip to homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;