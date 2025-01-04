import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import FeatureSection from "./components/FeatureSection";
import Workflow from "./components/Workflow";
import Testimonials from "./components/Testimonials";
import InterestForm from "./components/InterestForm";
import { useRef } from "react";

const App = () => {
  const whyUsRef = useRef(null);
  const workFlowRef = useRef(null);
  const reviewsRef = useRef(null);
  const interestFormRef = useRef(null);

  const scrollToRef = (ref) => {
    if (ref.current) {
      const top = ref.current.getBoundingClientRect().top + window.pageYOffset;
      const offset = 100; // Adjust this value based on the height of your header
      window.scrollTo({
        top: top - offset,  // Adjusting the scroll position with the offset
        behavior: 'smooth',
      });
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
  const handleInterestRef = () => {
    scrollToRef(interestFormRef);
  }
  return (
    <>
      <Navbar handleWhyUs={handleWhyUsClick} handleWorkFlowRef={handleWorkFlowRef} handleReviewsRef={handleReviewsRef} handleInterestRef={handleInterestRef}/>
       <div className="max-w-7xl mx-auto pt-20 px-6">
        <Intro />
        <FeatureSection ref={whyUsRef}/>
        <Workflow ref={workFlowRef}/>
        <Testimonials ref={reviewsRef}/>
        <InterestForm ref={interestFormRef}/>
      </div> 
    </>
  );
};

export default App;
