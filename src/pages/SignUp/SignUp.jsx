import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import authenticationImg from "../../assets/others/authentication2.png";
import authenticationBackgroundImg from "../../assets/others/authentication.png";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect } from "react";
import { AuthContex } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { createUser, UpdateUserProfile, logInWithGoogle, logInWithFacebook, logInWithGitHub, user } =
    useContext(AuthContex);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic();

  const imgBBKey = import.meta.env.VITE_IMGBB_KEY;
  const imgUploadURL = `https://api.imgbb.com/1/upload?key=${imgBBKey}`;

  // Redirect after social login
  useEffect(() => {
    if (user?.email) {
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

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const uploadRes = await fetch(imgUploadURL, { method: "POST", body: formData });
      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.data.display_url;

      await createUser(data.email, data.password);
      await UpdateUserProfile(data.name, imageUrl);

      await axiosPublic.post("/users", {
        name: data.name,
        email: data.email,
        photo: imageUrl,
      });

      Swal.fire({ title: "Account Created Successfully!", icon: "success", timer: 1500, showConfirmButton: false });
      navigate(from, { replace: true });
      reset();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleSocialLogin = async (loginFunc) => {
    try {
      const result = await loginFunc();
      if (result?.user) {
        await axiosPublic.post("/users", {
          name: result.user.displayName,
          email: result.user.email,
        });
      }
      // mobile redirect handled by AuthProvider
    } catch (error) {
      Swal.fire("Login Failed", error.message, "error");
    }
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign Up</title>
      </Helmet>

      <div
        className="hero min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${authenticationBackgroundImg})` }}
      >
        <div className="hero-content flex">
          <div className="card md:w-1/2">
            <h1 className="mx-auto text-black font-bold text-2xl">Sign Up</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <label className="label">Name</label>
              <input type="text" {...register("name", { required: true })} className="input w-full bg-white" placeholder="Name" />
              {errors.name && <p className="text-red-600">Name is required</p>}

              <label className="label mt-2">Profile Photo</label>
              <input type="file" {...register("photo", { required: true })} className="file-input file-input-bordered w-full" accept="image/*" />
              {errors.photo && <p className="text-red-600">Photo is required</p>}

              <label className="label mt-2">Email</label>
              <input type="email" {...register("email", { required: true })} className="input w-full bg-white" placeholder="Email" />
              {errors.email && <p className="text-red-600">Email is required</p>}

              <label className="label mt-2">Password</label>
              <input type="password" {...register("password", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*])/ })} className="input w-full bg-white" placeholder="Password" />
              {errors.password && (
                <p className="text-red-600">Password must be at least 6 characters, include 1 uppercase and 1 special character</p>
              )}

              <input className="btn bg-yellow-600 mt-4 text-white" type="submit" value="Signup" />
            </form>

            <div className="flex flex-col mx-auto py-2">
              <p>
                <small className="text-yellow-600 font-semibold">
                  <Link to="/login">Already registered? Login</Link>
                </small>
              </p>

              <div className="mx-auto mt-2">
                <p>
                  <small>Or sign up with</small>
                </p>
              </div>

              <div className="flex justify-center gap-x-4 mt-2">
                <div onClick={() => handleSocialLogin(logInWithFacebook)} className="p-3 bg-gray-200 rounded-full cursor-pointer">
                  <FaFacebookF />
                </div>

                <div onClick={() => handleSocialLogin(logInWithGoogle)} className="p-3 bg-gray-200 rounded-full cursor-pointer">
                  <FaGoogle />
                </div>

                <div onClick={() => handleSocialLogin(logInWithGitHub)} className="p-3 bg-gray-200 rounded-full cursor-pointer">
                  <FaGithub />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center md:w-1/2">
            <img src={authenticationImg} alt="Authentication" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

