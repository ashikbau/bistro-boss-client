
import { FaFacebookF, FaGoogle, FaGithub } from 'react-icons/fa';
import authenticationImg from "../../assets/others/authentication2.png";
import authenticationBackgroundImg from "../../assets/others/authentication.png";

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import { AuthContex } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SignUp = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { createUser, UpdateUserProfile, logInWithGoogle, logInWithFacebook, logInWithGitHub } = useContext(AuthContex);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const axiosPublic = useAxiosPublic();

  const imgBBKey = import.meta.env.VITE_IMGBB_KEY;
  const imgUploadURL = `https://api.imgbb.com/1/upload?key=${imgBBKey}`;

// --------------------------------------
  // SIGNUP FORM SUBMIT HANDLER (with image upload)
  // --------------------------------------
  const onSubmit = async (data) => {

    try {
      // 1️⃣ Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const uploadRes = await fetch(imgUploadURL, {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.data.display_url;

      // 2️⃣ Create Firebase user
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;

      // 3️⃣ Update Firebase profile (Name + Photo)
      await UpdateUserProfile(data.name, imageUrl);

      // 4️⃣ Save user to your database
      const userInfo = {
        name: data.name,
        email: data.email,
        photo: imageUrl,
      };

      await axiosPublic.post("/users", userInfo);

      // 5️⃣ Success message + redirect
      Swal.fire({
        title: "Account Created Successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });

      navigate(from, { replace: true });
      reset();

    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error"
      });
    }

  };

  // --------------------------------------
  //  SOCIAL LOGINS 
  // --------------------------------------
  const handleGoogleSignIn = () => {
    logInWithGoogle()
      .then(result => {
        axiosPublic.post("/users", {
          name: result.user.displayName,
          email: result.user.email,
        });
        navigate(from, { replace: true });
      });
  };

  const handleFacebookLogIn = () => {
    logInWithFacebook()
      .then(result => {
        axiosPublic.post("/users", {
          name: result.user.displayName,
          email: result.user.email,
        });
        navigate(from, { replace: true });
      });
  };

  const handleGitHubLogIn = () => {
    logInWithGitHub()
      .then(result => {
        axiosPublic.post("/users", {
          name: result.user.displayName,
          email: result.user.email,
        });
        navigate(from, { replace: true });
      });
  };


  // --------------------------------------
  // JSX UI
  // --------------------------------------
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

          {/* FORM */}
          <div className="card md:w-1/2">
            <h1 className="mx-auto text-black font-bold text-2xl">Sign Up</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="card-body">

              <fieldset className="fieldset">

                {/* Name */}
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input w-full bg-white"
                  placeholder="Name"
                />
                {errors.name && <p className="text-red-600">Name is required</p>}

                {/* Photo Upload */}
                <label className="label mt-2">Profile Photo</label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="file-input file-input-bordered w-full"
                  accept="image/*"
                />
                {errors.photo && <p className="text-red-600">Photo is required</p>}

                {/* Email */}
                <label className="label mt-2">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input w-full bg-white"
                  placeholder="Email"
                />
                {errors.email && <p className="text-red-600">Email is required</p>}

                {/* Password */}
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
                    Password must be at least 6 characters and include 1 uppercase and 1 special character
                  </p>
                )}

                <input className="btn bg-yellow-600 mt-4 text-white" type="submit" value="Signup" />

              </fieldset>

            </form>

            {/* Social logins */}
            <div className="flex flex-col mx-auto py-2">
              <p>
                <small className="text-yellow-600 font-semibold">
                  <Link to="/login">Already registered? Login</Link>
                </small>
              </p>

              <div className="mx-auto mt-2">
                <p><small>Or sign up with</small></p>
              </div>

              <div className="flex justify-center gap-x-4 mt-2">
                <div onClick={handleFacebookLogIn} className="p-3 bg-gray-200 rounded-full cursor-pointer">
                  <FaFacebookF />
                </div>
                <div onClick={handleGoogleSignIn} className="p-3 bg-gray-200 rounded-full cursor-pointer">
                  <FaGoogle />
                </div>
                <div onClick={handleGitHubLogIn} className="p-3 bg-gray-200 rounded-full cursor-pointer">
                  <FaGithub />
                </div>
              </div>
            </div>

          </div>

          {/* IMAGE SIDE */}
          <div className="text-center md:w-1/2">
            <img src={authenticationImg} alt="" />
          </div>

        </div>
      </div>
    </>
  );
};

export default SignUp;
