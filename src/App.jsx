import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import FeatureSection from "./components/FeatureSection";
import Workflow from "./components/Workflow";
import Testimonials from "./components/Testimonials";
import { useRef } from "react";

const App = () => {
  const whyUsRef = useRef(null);
  const workFlowRef = useRef(null);
  const reviewsRef = useRef(null);

  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhyUsClick = () => {
    scrollToRef(whyUsRef);
  };
  const handleWorkFlowRef = () => {
    scrollToRef(workFlowRef);
  }
  const handleReviewsRef = () => {
    scrollToRef(reviewsRef);
  }
  return (
    <>
      <Navbar handleWhyUs={handleWhyUsClick} handleWorkFlowRef={handleWorkFlowRef} handleReviewsRef={handleReviewsRef}/>
       <div className="max-w-7xl mx-auto pt-20 px-6">
        <Intro />
        <FeatureSection ref={whyUsRef}/>
        <Workflow ref={workFlowRef}/>
        <Testimonials ref={reviewsRef}/>
      </div> 
    </>
  );
};

export default App;
