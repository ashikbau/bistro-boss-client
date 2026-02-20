import { useContext, useEffect, useState } from "react";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import authenticationImg from "../../assets/others/authentication2.png";
import authenticationBackgroundImg from "../../assets/others/authentication.png";
import { Link } from "react-router-dom";
import { AuthContex } from "../../provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const Login = () => {
  const [disabled, setDisabled] = useState(true);

  const {
    loginUser,
    logInWithGoogle,
    logInWithFacebook,
    logInWithGitHub,
  } = useContext(AuthContex);

  // Detect mobile devices
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  /* ---------------- CAPTCHA ---------------- */
  const handleValidateCaptcha = (e) => {
    setDisabled(!validateCaptcha(e.target.value));
  };

  /* ---------------- EMAIL LOGIN ---------------- */
  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await loginUser(email, password);
      Swal.fire({
        icon: "success",
        title: "Login successful",
        timer: 1500,
        showConfirmButton: false,
      });
      // ✅ AuthProvider handles user state, redirect can be here if needed
    } catch (error) {
      Swal.fire("Login Failed", error.message, "error");
    }
  };

  /* ---------------- SOCIAL LOGIN ---------------- */
  const handleSocialLogin = async (loginFunc) => {
    try {
      await loginFunc();
      // AuthProvider handles user state
    } catch (error) {
      Swal.fire("Login Failed", error.message, "error");
    }
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Login</title>
      </Helmet>

      <div
        className="hero min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${authenticationBackgroundImg})` }}
      >
        <div className="hero-content flex flex-col lg:flex-row-reverse">
          {/* Login Card */}
          <div className="card md:w-1/2 shadow-2xl bg-white bg-opacity-90 p-6">
            <h1 className="text-center text-black font-bold text-2xl">Login</h1>

            <form onSubmit={handleLogin} className="card-body">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input w-full bg-white"
                required
              />

              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input w-full bg-white"
                required
              />

              <label className="label mt-2">
                <LoadCanvasTemplate />
              </label>
              <input
                type="text"
                name="captcha"
                onBlur={handleValidateCaptcha}
                className="input w-full"
                placeholder="Type captcha"
                required
              />

              <input
                disabled={disabled}
                type="submit"
                className="btn bg-yellow-600 mt-4 text-white"
                value="Login"
              />
            </form>

            {/* Social Login - hidden on mobile */}
            {!isMobile && (
              <div className="flex flex-col items-center py-2">
                <p>
                  <small className="text-yellow-600 font-semibold">
                    <Link to="/signup">New here? Create an account</Link>
                  </small>
                </p>

                <p className="mt-2">
                  <small>Or sign in with</small>
                </p>

                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => handleSocialLogin(logInWithFacebook)}
                    className="p-3 bg-gray-200 rounded-full"
                  >
                    <FaFacebookF />
                  </button>

                  <button
                    onClick={() => handleSocialLogin(logInWithGoogle)}
                    className="p-3 bg-gray-200 rounded-full"
                  >
                    <FaGoogle />
                  </button>

                  <button
                    onClick={() => handleSocialLogin(logInWithGitHub)}
                    className="p-3 bg-gray-200 rounded-full"
                  >
                    <FaGithub />
                  </button>
                </div>
              </div>
            )}

            {/* Mobile notice */}
            {isMobile && (
              <p className="text-center mt-2 text-gray-500 text-sm">
                Social login is not available on mobile. Please use Email & Password.
              </p>
            )}
          </div>

          {/* Image */}
          <div className="md:w-1/2">
            <img src={authenticationImg} alt="Login" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;


