import { useState, useRef } from "react";
import { FaPaperPlane, FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import contactImg from "../../../src/assets/contact/banner.jpg";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ContactManager = () => {
  const recaptchaRef = useRef(null);
  const axiosPublic = useAxiosPublic();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = recaptchaRef.current?.getValue();
    if (!token) return alert("Please complete the reCAPTCHA");

    setLoading(true);
    try {
      const res = await axiosPublic.post("/api/messages", {
        ...formData,
        token,
      });

      console.log("Response:", res.data);

      if (res.data.insertedId) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        recaptchaRef.current.reset();
      } else {
        alert("Failed to send message. Try again!");
      }
    } catch (err) {
      console.error(err);
      alert("Network or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Bistro Boss | Contact</title>
      </Helmet>

      {/* Banner */}
      <div
        className="relative w-full h-[40vh] md:h-[50vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${contactImg})` }}
      >
        <div className="bg-black/70 rounded-lg p-6 md:p-10 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">CONTACT US</h2>
          <p className="max-w-md mx-auto">We’d love to hear from you!</p>
        </div>
      </div>

      {/* Info Section */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="text-center mb-10">
          <p className="text-yellow-700 uppercase tracking-wide text-sm">--- Visit Us ---</p>
          <h2 className="text-3xl font-semibold">Our Location</h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {/* Phone */}
          <div className="bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-yellow-700 p-4 rounded-t-lg flex justify-center">
              <FaPhoneAlt size={28} className="text-white" />
            </div>
            <h3 className="mt-4 text-lg font-bold">Phone</h3>
            <p className="text-gray-600 mt-2">+38 (012) 34 56 789</p>
          </div>

          {/* Address */}
          <div className="bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-yellow-700 p-4 rounded-t-lg flex justify-center">
              <FaMapMarkerAlt size={28} className="text-white" />
            </div>
            <h3 className="mt-4 text-lg font-bold">Address</h3>
            <p className="text-gray-600 mt-2">123 Main Street, Kyiv, Ukraine</p>
          </div>

          {/* Working Hours */}
          <div className="bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-yellow-700 p-4 rounded-t-lg flex justify-center">
              <FaClock size={28} className="text-white" />
            </div>
            <h3 className="mt-4 text-lg font-bold">Working Hours</h3>
            <p className="text-gray-600 mt-2">Mon – Fri: 08:00 – 22:00</p>
            <p className="text-gray-600">Sat – Sun: 10:00 – 23:00</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <SectionTitle subHeading="Get in Touch" heading="Send a Message" />

        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl space-y-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
                placeholder="Your name"
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
              placeholder="+123456789"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
              placeholder="Your message..."
              required
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 justify-between">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center gap-2 bg-yellow-700 hover:bg-yellow-800 text-white font-semibold py-3 px-8 rounded transition-colors duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Sending..." : "Send Message"}
              <FaPaperPlane className="transition-transform duration-200 group-hover:-translate-y-1" />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ContactManager;
