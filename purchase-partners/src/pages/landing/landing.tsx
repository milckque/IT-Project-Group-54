

function Landing() {
    return (
        <div className="landing-page flex size-full border-1 border-black">
            <div className="bg-graphic bg-amber-100 border-black p-4 flex-5">
                <p>Placeholder</p>
            </div>
            <div className="interactive-side flex flex-col flex-4 justify-center bg-white">
                <h1 className="text-4xl m-4 text-yellow-500 font-bold">Welcome to Purchase Partners</h1>
                <div className="m-2 border-2">
                    button
                </div>
                <div className="m-2 border-2">
                    button
                </div>
                <a href="/dashboard" className="m-2 text-yellow-500 text-center">Continue as Guest</a>
            </div>
        </div>
    );
}

export default Landing;