import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { AuthContex } from "../../provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

import authenticationImg from "../../assets/others/authentication2.png";
import authenticationBackgroundImg from "../../assets/others/authentication.png";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    createUser,
    UpdateUserProfile,
    logInWithGoogle,
    logInWithFacebook,
    logInWithGitHub,
  } = useContext(AuthContex);

  const axiosPublic = useAxiosPublic();
  const imgBBKey = import.meta.env.VITE_IMGBB_KEY;
  const imgUploadURL = `https://api.imgbb.com/1/upload?key=${imgBBKey}`;

  // Detect mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  /* ---------------- EMAIL SIGNUP ---------------- */
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const uploadRes = await fetch(imgUploadURL, {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.data.display_url;

      await createUser(data.email, data.password);
      await UpdateUserProfile(data.name, imageUrl);

      await axiosPublic.post("/users", {
        name: data.name,
        email: data.email,
        photo: imageUrl,
      });

      Swal.fire({
        icon: "success",
        title: "Account created!",
        timer: 1500,
        showConfirmButton: false,
      });

      reset();
    } catch (error) {
      Swal.fire("Signup Failed", error.message, "error");
    }
  };

  /* ---------------- SOCIAL SIGNUP ---------------- */
  const handleSocialLogin = async (loginFunc) => {
    try {
      await loginFunc();
      // AuthProvider handles everything
    } catch (error) {
      Swal.fire("Signup Failed", error.message, "error");
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
        <div className="hero-content flex flex-col lg:flex-row">
          {/* Signup Card */}
          <div className="card md:w-1/2 bg-white bg-opacity-90 shadow-2xl p-6">
            <h1 className="text-center text-black font-bold text-2xl">Sign Up</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input w-full bg-white"
                placeholder="Name"
              />
              {errors.name && <p className="text-red-600">Name is required</p>}

              <label className="label mt-2">Profile Photo</label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input file-input-bordered w-full"
                accept="image/*"
              />
              {errors.photo && <p className="text-red-600">Photo is required</p>}

              <label className="label mt-2">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input w-full bg-white"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-600">Email is required</p>}

              <label className="label mt-2">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                })}
                className="input w-full bg-white"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-600">
                  Min 6 chars, 1 uppercase & 1 special character
                </p>
              )}

              <input
                className="btn bg-yellow-600 mt-4 text-white"
                type="submit"
                value="Signup"
              />
            </form>

            {/* Social Signup - hidden on mobile */}
            {!isMobile && (
              <div className="flex flex-col items-center py-2">
                <p>
                  <small className="text-yellow-600 font-semibold">
                    <Link to="/login">Already registered? Login</Link>
                  </small>
                </p>

                <p className="mt-2">
                  <small>Or sign up with</small>
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

            {isMobile && (
              <p className="text-center mt-2 text-gray-500 text-sm">
                Social signup is not available on mobile. Please use Email & Password.
              </p>
            )}
          </div>

          {/* Image */}
          <div className="md:w-1/2">
            <img src={authenticationImg} alt="Signup" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;



