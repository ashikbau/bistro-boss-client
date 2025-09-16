

import { FaFacebookF, FaGoogle, FaGithub } from 'react-icons/fa';

import authenticationImg from "../../assets/others/authentication2.png"
import authenticationBackgroundImg from "../../assets/others/authentication.png"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import { AuthContex } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, reset, } = useForm();
  const { createUser, UpdateUserProfile, logInWithGoogle, logInWithFacebook,logInWithGitHub } = useContext(AuthContex);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic();

  const onSubmit = (data) => {

    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;

        UpdateUserProfile(data.name, data.photoURL)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email
            }
            axiosPublic.post("/users", userInfo)
              .then(res => {
                if (res.data.insertedId) {

                  reset();
                  Swal.fire({
                    title: "User Created Succesfully",
                    icon: "success",
                    draggable: true
                  });
                  navigate(from, { replace: true });

                }
              })
          })
          .catch(error => console.log(error))

      })
    reset();


  }

  //Google users sign in and send their Info to database 
  // Google signup/login
  const handleGoogleSignIn = () => {
    logInWithGoogle()
      .then(result => {
        // const user = result.user;
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email
        };

        axiosPublic.post("/users", userInfo)
          .then(res => {
            console.log(res.data)
            if (res.data.insertedId) {
              Swal.fire({
                title: "Signed in with Google!",
                icon: "success"
              });
            }
            navigate(from, { replace: true });
          });
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error"
        });
      });
  };


  // Facebook LogIn

  const handleFacebookLogIn = () => {
    logInWithFacebook()
      .then(result => {
        // const user = result.user;
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email
        };

        axiosPublic.post("/users", userInfo)
          .then(res => {
            console.log(res.data)
            if (res.data.insertedId) {
              Swal.fire({
                title: "Signed in with FaceBook!",
                icon: "success"
              });
            }
            navigate(from, { replace: true });
          });
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error"
        });
      });
  };

  // GitHub LogIn
  const handleGitHubLogIn = () => {
    logInWithGitHub()
      .then(result => {
        // const user = result.user;
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email
        };

        axiosPublic.post("/users", userInfo)
          .then(res => {
            console.log(res.data)
            if (res.data.insertedId) {
              Swal.fire({
                title: "Signed in with GitHub!",
                icon: "success"
              });
            }
            navigate(from, { replace: true });
          });
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error"
        });
      });
  };









  return (
    <>
      <Helmet>
        <title>Bistro Boss |Sign Up</title>

      </Helmet>
      <div>
        <div className="hero min-h-screen  bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${authenticationBackgroundImg})` }}

        >



          <div className="hero-content flex">

            <div className="card  md:w-1/2 ">
              <h1 className='mx-auto text-black font-bold text-2xl'>Sign Up</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <fieldset className="fieldset">
                  {/* name */}
                  <label className="label">Name</label>
                  <input type="text" {...register("name", { required: true })} name="name" className="input w-full bg-[#FFFFFF]" placeholder="Name" />
                  {errors.name && <p className='text-red-600'>Name is required</p>}
                  {/* Photo Url */}
                  <label className="label">Photo URL</label>
                  <input type="text" {...register("photoURL", { required: true })} className="input w-full bg-[#FFFFFF]" placeholder="Photo Url" />
                  {errors.photoURL && <p className='text-red-600'>Photo Url is required</p>}
                  <label className="label">Email</label>
                  <input type="email" {...register("email", { required: true })} name="email" className="input w-full bg-[#FFFFFF]" placeholder="Email" />
                  {errors.email && <p className='text-red-600'>This field is required</p>}
                  <label className="label">Password</label>
                  <input type="password" {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 12,
                    pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}/


                  })} name="password" className="input w-full " placeholder="Password" />
                  {errors.password?.type === "required" && <p className='text-red-600'>Password Required</p>}

                  {errors.password?.type === "minLength" && <p className='text-red-600'>Password Must be minimum 6 Digit</p>}

                  {errors.password?.type === "maxLength" && <p className='text-red-600'>Password Maximum 12 Digit</p>}

                  {errors.password?.type === "pattern" && <p className='text-red-600'>Password must be at least 6 characters with 1 uppercase, 1 lowercase, and 1 special character</p>}



                  <input className="btn bg-yellow-600 mt-4 text-white" type="submit" value="Signup" />

                </fieldset>
              </form>
              <div className='flex flex-col mx-auto py-2'>
                <p><small className='text-yellow-600 font-semibold'><Link to='/login'>Already registered? Go to log in</Link></small></p>
                <div className='mx-auto'>
                  <p><small>Or sign Up with</small></p>
                </div>
                <div className="flex justify-center gap-x-4 mt-2">
                  <div onClick={handleFacebookLogIn} className="p-3 bg-gray-200 rounded-full cursor-pointer hover:bg-blue-100 border border-black">
                    <FaFacebookF className="text-black" />
                  </div>

                  <div onClick={handleGoogleSignIn} className="p-3 bg-gray-200 rounded-full cursor-pointer hover:bg-red-100 border border-black">
                    <FaGoogle className="text-black" />
                  </div>
                  <div onClick={handleGitHubLogIn  } className="p-3 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 border border-black">
                    <FaGithub className="text-black" />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center md:w-1/2 lg:text-left">

              <img src={authenticationImg} alt="" srcset="" />
            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default SignUp;