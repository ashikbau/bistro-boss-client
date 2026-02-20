import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContex } from "../../provider/AuthProvider";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const { signInUser } = useContext(AuthContex);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signInUser(email, password);

      Swal.fire({
        title: "Login Successful",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        {/* Email / Password Login */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-700 text-white py-2 rounded hover:bg-yellow-800 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Social Login - Hidden On Mobile */}
        <div className="hidden md:block mt-6">
          <SocialLogin />
        </div>

        <p className="text-center mt-4">
          New here?{" "}
          <Link to="/signup" className="text-yellow-700 font-semibold">
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;