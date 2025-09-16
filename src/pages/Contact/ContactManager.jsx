import { useRef } from "react";
import { FaClock, FaMapMarkerAlt, FaPaperPlane, FaPhoneAlt} from 'react-icons/fa';


import ReCAPTCHA from "react-google-recaptcha";
import contactImg from "../../../src/assets/contact/banner.jpg"
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";

const ContactManager = () => {
    const recaptchaRef = useRef(null);
     const handleSubmit = (e) => {
    e.preventDefault();
    // const token = recaptchaRef.current.getValue();
    // console.log("reCAPTCHA token:", token);

    // Add your form submission logic here
  };
    return (
        <div>
           <Helmet>
              <title>Bistro Boss |Contact</title>
              </Helmet>

            <div className="relative w-full h-[450px] bg-cover bg-center flex items-center  justify-center"
                        style={{ backgroundImage: `url(${contactImg})` }}
                    >
                        <div className="bg-[#151515] bg-opacity-90 shadow-xl rounded-md p-8 w-1/2 text-center text-neutral-content mt-44">
                            <h2 className="text-3xl font-semibold mb-4">CONTACT US</h2>
                            <p>
                                Would you like to try a dish?
                                
                            </p>
                        </div>
                    </div>


   <section className="bg-white py-10 px-4">
  <div className="text-center mb-10">
    <p className="text-yellow-700 text-sm">---Visit Us---</p>
    <h2 className="text-3xl font-semibold">OUR LOCATION</h2>
  </div>

  <div className="max-w-5xl mx-auto flex flex-1 gap-6 text-center ">
    {/* Phone */}
    <div className="w-full bg-gray-100 rounded shadow-md">
      <div className="bg-yellow-700 p-4 rounded-t text-white flex justify-center">
        <FaPhoneAlt size={24} />
      </div>
      <h3 className="mt-4 text-lg font-bold">PHONE</h3>
      <p className="text-gray-600 mt-2">+38 (012) 34 56 789</p>
    </div>

    {/* Address */}
    <div className="w-full bg-gray-100 rounded shadow-md">
      <div className="bg-yellow-700 p-4 rounded-t text-white flex justify-center">
        <FaMapMarkerAlt size={24} />
      </div>
      <h3 className="mt-4 text-lg font-bold">ADDRESS</h3>
      <p className="text-gray-600 mt-2">123 Main Street, Kyiv, Ukraine</p>
    </div>

    {/* Working Hours */}
    <div className="w-full bg-gray-100 rounded shadow-md">
      <div className="bg-yellow-700 p-4 rounded-t text-white flex justify-center">
        <FaClock size={24} />
      </div>
      <h3 className="mt-4 text-lg font-bold">WORKING HOURS</h3>
      <p className="text-gray-600 mt-2">Mon – Fri: 08:00 – 22:00</p>
      <p className="text-gray-600">Sat – Sun: 10:00 – 23:00</p>
    </div>
  </div>
</section>


                    <section>
                        <SectionTitle 
                        subHeading="Visit Us"
                        heading="OUR LOCATION"
                        ></SectionTitle>

                        <div>
       <form
  onSubmit={handleSubmit}
  className="mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg"
>
  {/* Name + Email */}
  <div className="flex flex-col md:flex-row gap-4">
    <div className="w-full md:w-1/2">
      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
      <input
        type="text"
        placeholder="Your name"
        className="w-full p-3 border border-gray-300 rounded"
        required
      />
    </div>
    <div className="w-full md:w-1/2">
      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input
        type="email"
        placeholder="you@example.com"
        className="w-full p-3 border border-gray-300 rounded"
        required
      />
    </div>
  </div>

  {/* Phone */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
    <input
      type="tel"
      placeholder="e.g. +123456789"
      className="w-full p-3 border border-gray-300 rounded"
    />
  </div>

  {/* Message */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
    <textarea
      placeholder="Your message"
      rows="5"
      className="w-full p-3 border border-gray-300 rounded"
    ></textarea>
  </div>

  {/* reCAPTCHA Row */}
  <div className="flex items-center justify-between flex-wrap gap-4">
   

    
    <ReCAPTCHA
    
      ref={recaptchaRef}
      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      
      className="flex-shrink-0"
    />
    
    <div className="flex-shrink-0 text-xs text-gray-500">
      
      <a
        href="https://www.google.com/recaptcha/about/"
        target="_blank"
        rel="noopener noreferrer"
        
      >
        <img
          src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
          alt="reCAPTCHA"
          className="h-8"
        />
      </a>
    </div>
  </div>

  {/* Submit Button Centered */}
  <div className="flex justify-center">
    <button
      type="submit"
      className="group flex items-center gap-2 bg-yellow-700 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded"
    >
      Send Message
      <FaPaperPlane className="text-white transition-transform duration-200 group-hover:-translate-y-1" />
    </button>
  </div>
</form>

    </div>
    </section>
            
        </div>
    );
};

export default ContactManager;