import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faBook,
  faMoneyBillAlt,
  faArrowRight,
  faVideo,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


function HomeSpComponent() {
  const navigate= useNavigate()
  return (
    <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="container mx-auto my-8 p-8 bg-cover bg-center relative"
    style={{ backgroundImage: "url('your-background-image.jpg')" }}
  >
    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
    <h1 className="text-3xl font-bold text-white mb-4 z-10 relative">Explore the Art of Cooking with Our Courses</h1>
    <p className="text-gray-300 mb-6 z-10 relative">
      Immerse yourself in the culinary world and enhance your cooking skills. Whether you're a novice or a seasoned chef, our courses cater to all levels of expertise.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 z-10 relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="feature text-center p-6 bg-gray-100 rounded-lg"
      >
        <FontAwesomeIcon icon={faUtensils} className="text-4xl text-orange-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Hands-On Experience</h3>
        <p>Engage in practical, hands-on learning experiences. Master the art of cooking with guidance from experienced chefs.</p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="feature text-center p-6 bg-gray-100 rounded-lg"
      >
        <FontAwesomeIcon icon={faBook} className="text-4xl text-orange-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Comprehensive Recipes</h3>
        <p>Access a collection of comprehensive recipes curated by culinary experts. Explore diverse cuisines and flavors.</p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="feature text-center p-6 bg-gray-100 rounded-lg"
      >
        <FontAwesomeIcon icon={faMoneyBillAlt} className="text-4xl text-orange-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Budget-Friendly Cooking</h3>
        <p>Learn to create delicious meals on a budget. Discover cost-effective ingredients and cooking techniques.</p>
      </motion.div>
    </div>

    <blockquote className="border-l-4 border-orange-500 p-4 my-6 z-10 relative">
      <p className="italic text-white">"Cooking is like love. It should be entered into with abandon or not at all." - Harriet Van Horne</p>
    </blockquote>

    <p className="text-gray-300 mb-6 z-10 relative">
      Ready to elevate your culinary skills? Enroll now and embark on a flavorful journey of continuous learning and culinary mastery.
    </p>

    <div className="cta-button z-10 relative">
      <button onClick={()=>navigate("/allcourses")} className="bg-orange-500 text-white py-2 px-4 rounded-full">
        <FontAwesomeIcon icon={faArrowRight} className="mr-2" /> Enroll Now
      </button>
    </div>

    <div className="additional-info mt-6 z-10 relative">
      <p className="flex items-center text-white">
        <FontAwesomeIcon icon={faVideo} className="text-orange-500 mr-2" /> Access to video demonstrations and tutorials.
      </p>
      <p className="flex items-center text-white">
        <FontAwesomeIcon icon={faPlusCircle} className="text-orange-500 mr-2" /> Additional resources and bonus recipes included.
      </p>
    </div>
  </motion.div>
  )
}

export default HomeSpComponent
