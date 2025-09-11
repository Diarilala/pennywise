export default function Index({ onSignUpClick , onLoginClick}) {
    return (
        <div className="bg-[url(abstract4.jpg)] p-15 rounded-[40px]">
            <div className="bg-neutral-300/20 backdrop-blur-[2px] backdrop-brightness-[1.1] h-[530px] w-[882px] flex items-center justify-center flex-col rounded-[20px] drop-shadow-md">
            <div className="flex items-center justify-center gap-4">
                <div>
                    <img className="h-[122px] w-[102px]" src="logo.png" alt="Oops! Something went wrong" />
                </div>
                <div className="w-[3px] h-[120px] bg-black"></div>
                <div className="h-[201px] flex flex-col justify-center gap-2 px-5">
                    <h1 className="text-[#9370db]">
                        <p className="text-7xl">Pennywise</p>
                    </h1>
                    <p className="text-2xl text-black">Watch closer, spend wiser</p>
                </div>
            </div>
            <div className="flex mt-6 gap-10">
                <div>
                    <div 
                    onClick={onLoginClick}
                    className="font-sans text-white w-[140px] h-[40px] flex justify-center items-center bg-black rounded-[10px] hover:bg-gray-800 ease-in-out duration-150 cursor-pointer">Login</div>
                </div>
                <div>
                    <div
                    onClick={onSignUpClick}
                     className="font-sans text-white w-[140px] h-[40px] flex justify-center items-center bg-black rounded-[10px] hover:bg-gray-800 ease-in-out duration-150 cursor-pointer">
                        Sign up
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}