
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
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  GithubAuthProvider,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from "../../firebase/firebase.config";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { createUser, UpdateUserProfile, logInWithGoogle, logInWithFacebook, logInWithGitHub } = useContext(AuthContex);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic();
  const imgBBKey = import.meta.env.VITE_IMGBB_KEY;
  const imgUploadURL = `https://api.imgbb.com/1/upload?key=${imgBBKey}`;

  // ----------------------
  // Email/Password Signup
  // ----------------------
  const onSubmit = async (data) => {
    try {
      // 1️⃣ Upload profile image
      const formData = new FormData();
      formData.append("image", data.photo[0]);
      const uploadRes = await fetch(imgUploadURL, { method: "POST", body: formData });
      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.data.display_url;

      // 2️⃣ Create user in Firebase
      const result = await createUser(data.email, data.password);

      // 3️⃣ Update profile
      await UpdateUserProfile(data.name, imageUrl);

      // 4️⃣ Save user in backend
      const userInfo = { name: data.name, email: data.email, photo: imageUrl };
      await axiosPublic.post("/users", userInfo);

      Swal.fire({ title: "Account Created Successfully!", icon: "success", timer: 1500, showConfirmButton: false });
      navigate(from, { replace: true });
      reset();

    } catch (error) {
      console.error(error);
      Swal.fire({ title: "Error", text: error.message, icon: "error" });
    }
  };

  // ----------------------
  // Google Login
  // ----------------------
  const handleGoogleSignIn = async () => {
    try {
      const result = await logInWithGoogle();
      await axiosPublic.post("/users", { name: result.user.displayName, email: result.user.email });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({ title: "Google Login Failed", text: error.message, icon: "error" });
    }
  };

  // ----------------------
  // Facebook Login
  // ----------------------
  const handleFacebookLogIn = async () => {
    try {
      const result = await logInWithFacebook();
      await axiosPublic.post("/users", { name: result.user.displayName, email: result.user.email });
      navigate(from, { replace: true });
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const pendingCred = error.credential;
        const email = error.customData.email;
        const methods = await fetchSignInMethodsForEmail(auth, email);

        let linkedUser;
        if (methods.includes("google.com")) {
          Swal.fire("Info", "Please sign in with Google to link Facebook.", "info");
          linkedUser = await signInWithPopup(auth, new GoogleAuthProvider());
        }
        if (methods.includes("github.com")) {
          Swal.fire("Info", "Please sign in with GitHub to link Facebook.", "info");
          linkedUser = await signInWithPopup(auth, new GithubAuthProvider());
        }
        if (linkedUser) {
          await linkWithCredential(linkedUser.user, pendingCred);
          Swal.fire("Success", "Facebook account linked successfully!", "success");
          navigate(from, { replace: true });
        }
      } else {
        Swal.fire("Login Failed", error.message, "error");
      }
    }
  };

  // ----------------------
  // GitHub Login
  // ----------------------
  const handleGitHubLogIn = async () => {
    try {
      const result = await logInWithGitHub();
      await axiosPublic.post("/users", { name: result.user.displayName, email: result.user.email });
      navigate(from, { replace: true });
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const pendingCred = error.credential;
        const email = error.customData.email;
        const methods = await fetchSignInMethodsForEmail(auth, email);

        let linkedUser;
        if (methods.includes("google.com")) {
          Swal.fire("Info", "Please sign in with Google to link GitHub.", "info");
          linkedUser = await signInWithPopup(auth, new GoogleAuthProvider());
        }
        if (methods.includes("facebook.com")) {
          Swal.fire("Info", "Please sign in with Facebook to link GitHub.", "info");
          linkedUser = await signInWithPopup(auth, new FacebookAuthProvider());
        }
        if (linkedUser) {
          await linkWithCredential(linkedUser.user, pendingCred);
          Swal.fire("Success", "GitHub account linked successfully!", "success");
          navigate(from, { replace: true });
        }
      } else {
        Swal.fire("Login Failed", error.message, "error");
      }
    }
  };

  // ----------------------
  // JSX
  // ----------------------
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
              <input type="password" {...register("password", {
                required: true,
                minLength: 6,
                pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*])/,
              })} className="input w-full bg-white" placeholder="Password" />
              {errors.password && <p className="text-red-600">Password must be at least 6 characters, include 1 uppercase and 1 special character</p>}

              <input className="btn bg-yellow-600 mt-4 text-white" type="submit" value="Signup" />
            </form>

            {/* Social logins */}
            <div className="flex flex-col mx-auto py-2">
              <p><small className="text-yellow-600 font-semibold"><Link to="/login">Already registered? Login</Link></small></p>
              <div className="mx-auto mt-2"><p><small>Or sign up with</small></p></div>
              <div className="flex justify-center gap-x-4 mt-2">
                <div onClick={handleFacebookLogIn} className="p-3 bg-gray-200 rounded-full cursor-pointer"><FaFacebookF /></div>
                <div onClick={handleGoogleSignIn} className="p-3 bg-gray-200 rounded-full cursor-pointer"><FaGoogle /></div>
                <div onClick={handleGitHubLogIn} className="p-3 bg-gray-200 rounded-full cursor-pointer"><FaGithub /></div>
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div className="text-center md:w-1/2">
            <img src={authenticationImg} alt="Authentication" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

