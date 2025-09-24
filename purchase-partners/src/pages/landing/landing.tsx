function Landing() {
  return (
    <div className="landing-page flex size-full border-black">
      <div className="bg-graphic bg-amber-100">
        <img src="./bg.png" alt="background" />
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

        <div className="m-2 w-100 h-15 px-6 py-3 bg-white border-2 border-[#FFC107] rounded-full shadow-lg hover:shadow-xl cursor-pointer text-black text-2xl text-center font-inter font-bold flex items-center justify-center gap-2">
          <img src="./Shop.svg" alt="Shop" />
          SELL
        </div>

        <a
          href="/dashboard"
          className="m-4 text-yellow-500 text-center font-poppins"
        >
          Continue as Guest
        </a>
      </div>
    </div>
  );
}

export default Landing;
