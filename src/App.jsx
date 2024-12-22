import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import FeatureSection from "./components/FeatureSection";
import Workflow from "./components/Workflow";
import Testimonials from "./components/Testimonials";

const App = () => {
  return (
    <>
      <Navbar />
      { <div className="max-w-7xl mx-auto pt-20 px-6">
        <Intro />
        <FeatureSection />
        <Workflow />
        <Testimonials />
      </div> }
    </>
  );
};

export default App;
