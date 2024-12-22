import { features } from "../constants";
import { forwardRef } from "react";
const FeatureSection = forwardRef((props, ref) => {
    return (
    <div ref={ref} className="relative mt-20 py-10 min-h-[800r rpx]">
        <div className="text-center">
            <span className="bg-neutral-900 text-purple-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
                Why us
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
            Expert Service, Convenience, and Value
            </h2>
        </div>
        <div className="flex flex-wrap mt-10 lg:mt-20">
            {
                features.map((feature, index) => (
                    <div key={index} className="w-full sm:1/2 lg:w-1/3">
                        <div className="flex">
                            <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-purple-700 
                            justify-center items-center rounded-full">
                                {feature.icon}
                            </div>
                            <div>
                                <h5 className="mt-1 mb-6 text-xl">{feature.text}</h5>
                                <p className="text-md p-2 mb-20 text-neutral-500">{feature.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    </div>
    );
});

export default FeatureSection;