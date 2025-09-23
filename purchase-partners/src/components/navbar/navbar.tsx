

function Navbar() {

    return (
        <nav className="relative bg-gray-900">
            <div className="mx-auto relative flex h-16 px-3 items-center justify-between">
                <div className="flex flex-1 items-center justify-start h-full">
                    <div className="flex shrink-0 items-center m-1">
                        <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Group Buy Logo" className="h-8 w-auto" />
                    </div>
                </div>
                <div className="inset-y-0 flex items-center">
                    <button type="button" className="relative rounded-full m-1 p-1 text-amber-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">View notifications</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                            <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <button type="button" className="relative rounded-full m-1 p-1 text-amber-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">View notifications</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" xmlSpace="preserve" stroke="currentColor" fill="currentColor" strokeWidth="0.4" className="size-5">
                            <path d="M16 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zM23.942 32H8.058A4.062 4.062 0 0 1 4 27.942c0-6.616 5.383-12 12-12s12 5.384 12 12A4.062 4.062 0 0 1 23.942 32zM16 17.942c-5.514 0-10 4.486-10 10A2.06 2.06 0 0 0 8.058 30h15.884A2.06 2.06 0 0 0 26 27.942c0-5.514-4.486-10-10-10z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;