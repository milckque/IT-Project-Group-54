function Landing() {
  return (
    <div className="landing-page flex size-full border-black">
      <div className="relative w-1/2 h-screen overflow-hidden">
        <img
          src="./bg.png"
          alt="background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="bg-white/95 max-w-md w-full p-6 md:p-8 rounded-2xl shadow-xl">
            <h2 className="font-inter text-2xl md:text-3xl font-bold mb-4 text-yellow-500">
              Purchase Partners
            </h2>
            <p className="font-inter text-sm md:text-base leading-relaxed text-gray-700">
              A next-generation group-buying platform that flips the market.
              Buyers unite around the products they actually want, attracting
              targeted, conditional offers from sellers and manufacturers. With
              transparent offers, secure deposits, and digital vouchers, we help
              buyers unlock better deals while sellers reach committed customers
              at lower marketing cost.
            </p>
          </div>
        </div>
      </div>

      <div className="interactive-side flex flex-col flex-4 justify-center items-center bg-white">
        <h1 className="font-inter text-7xl m-6 text-yellow-500 font-extrabold text-center">
          Looking to...
        </h1>

        <a
          href="/buyer-account"
          className="m-2 w-100 h-15 px-6 py-3 bg-black rounded-full shadow-lg hover:shadow-xl cursor-pointer text-2xl 
                    text-white text-center font-inter font-bold flex items-center justify-center gap-2"
        >
          <img src="./Bag_fill.svg" alt="Bag" />
          BUY
        </a>

        <a
          href="/seller-account"
          className="m-2 w-100 h-15 px-6 py-3 bg-white border-2 border-[#FFC107] rounded-full shadow-lg hover:shadow-xl cursor-pointer text-black text-2xl text-center font-inter font-bold flex items-center justify-center gap-2"
        >
          <img src="./Shop.svg" alt="Shop" />
          SELL
        </a>

        {/* Tutorial Link */}
        <a
          href="/tutorial"
          className="m-4 text-yellow-500 hover:text-yellow-600 text-center font-poppins font-semibold underline text-lg"
        >
          ❓ How does GroupBuy work?
        </a>

        <a
          href="/dashboard"
          className="m-2 text-yellow-500 text-center font-poppins"
        >
          Continue as Guest
        </a>
      </div>
    </div>
  );
}

export default Landing;