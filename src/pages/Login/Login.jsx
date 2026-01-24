import { useContext, useEffect, useState } from "react";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import authenticationImg from "../../assets/others/authentication2.png";
import authenticationBackgroundImg from "../../assets/others/authentication.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContex } from "../../provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { loginUser, logInWithGoogle, logInWithFacebook, logInWithGitHub, user,loading } =
    useContext(AuthContex);

  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);



  // Redirect based on role
  useEffect(() => {
    if (user?.email && loading) {
      (async () => {
        try {
          const res = await axiosPublic.get(`/users/${user.email}`);
          const role = res.data?.role;

          if (role === "admin") navigate("/dashboard/adminHome", { replace: true });
          else if (role === "staff") navigate("/dashboard/staffHome", { replace: true });
          else navigate("/dashboard/userHome", { replace: true });
        } catch {
          navigate("/dashboard/userHome", { replace: true });
        }
      })();
    }
  }, [user, navigate, axiosPublic]);

  // CAPTCHA validation
  const handleValidateCaptcha = (e) => {
    const userCaptchaValue = e.target.value;
    setDisabled(!validateCaptcha(userCaptchaValue));
  };

  // Email / Password Login
  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await loginUser(email, password);
      Swal.fire({ title: "Login successful!", icon: "success" });
      // user redirect handled by useEffect
    } catch (error) {
      Swal.fire("Login Failed", error.message, "error");
    }
  };

  // Social Login Handler
  const handleSocialLogin = async (loginFunc) => {
    try {
      const result = await loginFunc();
      // desktop popup returns result
      if (result?.user) {
        await axiosPublic.post("/users", {
          name: result.user.displayName,
          email: result.user.email,
        });
      }
      // mobile redirect will update user via AuthProvider
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
        className="hero min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${authenticationBackgroundImg})` }}
      >
        <div className="hero-content flex flex-col lg:flex-row-reverse">
          {/* Login Card */}
          <div className="card md:w-1/2 shadow-2xl bg-white bg-opacity-80 p-6">
            <h1 className="text-center text-black font-bold text-2xl">Login</h1>

            <form onSubmit={handleLogin} className="card-body">
              <label className="label">Email</label>
              <input type="email" name="email" className="input w-full bg-white" required />

              <label className="label">Password</label>
              <input type="password" name="password" className="input w-full bg-white" required />

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
                type="text"
                onBlur={handleValidateCaptcha}
                name="captcha"
                className="input w-full"
                placeholder="Type the captcha above"
                required
              />

              <input
                disabled={disabled}
                type="submit"
                className="btn bg-yellow-600 mt-4 text-white"
                value="Login"
              />
            </form>

            {/* Social Login */}
            <div className="flex flex-col items-center py-2">
              <p>
                <small className="text-yellow-600 font-semibold">
                  <Link to="/signup">New here? Create a New Account</Link>
                </small>
              </p>

              <div className="mt-2">
                <p>
                  <small>Or sign in with</small>
                </p>
              </div>

              <div className="flex justify-center gap-x-4 mt-2">
                <div
                  onClick={() => handleSocialLogin(logInWithFacebook)}
                  className="p-3 bg-gray-200 rounded-full cursor-pointer hover:bg-blue-100 border border-black"
                >
                  <FaFacebookF />
                </div>

                <div
                  onClick={() => handleSocialLogin(logInWithGoogle)}
                  className="p-3 bg-gray-200 rounded-full cursor-pointer hover:bg-red-100 border border-black"
                >
                  <FaGoogle />
                </div>

                <div
                  onClick={() => handleSocialLogin(logInWithGitHub)}
                  className="p-3 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 border border-black"
                >
                  <FaGithub />
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="text-center md:w-1/2 lg:text-left">
            <img src={authenticationImg} alt="Authentication visual" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

