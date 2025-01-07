import { CheckCircle2 } from "lucide-react";
import happy from "../assets/happy.jpg";
import { checklistItems } from "../constants";
import { forwardRef } from "react";


const Workflow = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
      Your Stress-Free Auto Glass {" "}
        <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
        Repair Experience.
        </span>
      </h2>
      <div className="flex flex-wrap justify-center">
        <div className="p-2 mt-4 w-full lg:w-1/3 ">
          <img src={happy} className="w-1/3 sm:w-1/3 lg:w-full mx-auto" />
        </div>
        <div className="pt-12 w-full lg:w-1/2">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex mb-12">
              <div className="text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
                <CheckCircle2 />
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                <p className="text-md text-neutral-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Workflow;