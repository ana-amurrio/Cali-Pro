import video1 from "../assets/video1.mp4"
import video2 from "../assets/video2.mp4"
const HeroSection = () => {
  return (

      <div className="flex flex-col items-center mt-6 lg:mt-20">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
          Experts in Windshield 
          <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text"> {" "} Repair & Replacement</span>
        </h1>
      
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
      At Cali Pro Auto Glass, we specialize in fast, reliable windshield repair and replacement 
      services. Whether it's a small chip or a major crack, our expert technicians use the latest 
      techniques and high-quality materials to restore your vehicle’s glass to its original clarity. 
      We’re committed to keeping you safe on the road with hassle-free service and convenient mobile 
      repairs, wherever you are. Drive with confidence—Cali Pro has you covered!
      </p>
      <div className="flex mt-10 justify-center ">
        <video autoPlay loop muted className="rounded-lg w-1/2 border border-purple-700 shadow-purple-400 mx-2 my-4">
        <source src={video1} type="video/mp4"/>
        </video>
        <video autoPlay loop muted className="rounded-lg w-1/2 border border-purple-700 shadow-purple-400 mx-2 my-4">
        <source src={video2} type="video/mp4"/>
        </video>
      </div>

    </div>
  )
}

export default HeroSection
