import React from "react";

const Review = () => {
    return (
        <div>
            <div className="grid grid-cols-4 gap-5 mx-10">
                <div className="w-full h-[500px] border-[1px] border-solid border-[#ccc] bg-black">
                    <div className="relative w-[200px] h-[260px] group">
                        <div className="absolute w-full h-full rounded-lg shadow-lg transition-all duration-500 transform z-30 translate-y-[10px] group-hover:translate-y-[-25px]">
                            <img src="/assets/images/apps/2.png" alt="Image 1" className="w-full h-full rounded-lg" />
                        </div>

                        <div className="absolute w-full h-full rounded-lg shadow-lg transition-all duration-500 transform z-20 -translate-x-[20px] translate-y-[-10px] -rotate-[9deg] group-hover:-translate-x-[40px] opacity-90">
                            <img src="/assets/images/apps/3.png" alt="Image 2" className="w-full h-full rounded-lg" />
                        </div>

                        <div className="absolute w-full h-full rounded-lg shadow-lg transition-all duration-500 transform z-10 -translate-x-[-20px] translate-y-[-10px] rotate-[9deg] group-hover:translate-x-[40px]  opacity-80">
                            <img src="/assets/images/apps/banner1.png" alt="Image 3" className="w-full h-full rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review;