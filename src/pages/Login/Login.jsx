import { useContext, useEffect, useState } from 'react';
import { FaFacebookF, FaGoogle, FaGithub } from 'react-icons/fa';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import authenticationImg from "../../assets/others/authentication2.png"
import authenticationBackgroundImg from "../../assets/others/authentication.png"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContex } from '../../provider/AuthProvider';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';





const Login = () => {

  const [disabled, setDisabled] = useState(true);
  const { loginUser, logInWithGoogle, logInWithFacebook, logInWithGitHub } = useContext(AuthContex);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic();


  useEffect(() => {
    loadCaptchaEnginge(6);
  }, [])
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password)
    loginUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        // alert("Log in successfully")
        Swal.fire({
          title: "User LogIn successfully",
          showClass: {
            popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
          },
          hideClass: {
            popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
          }
        });
        navigate(from, { replace: true });

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

  }
  // Google Lognin

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
  const handleValidateCaptcha = (e) => {
    e.preventDefault();
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false)

    } else {
      setDisabled(true)
    }


  }
  return (
    <>
      <Helmet>
        <title>Bistro Boss |LogIn</title>

      </Helmet>
      <div className="hero min-h-screen  bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${authenticationBackgroundImg})` }}

      >



        <div className="hero-content flex flex-col lg:flex-row-reverse">

          <div className="card  md:w-1/2 ">
            <h1 className='mx-auto text-black font-bold text-2xl'>LogIn</h1>
            <form onSubmit={handleLogin} className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" name="email" className="input w-full bg-[#FFFFFF]" placeholder="Email" />
                <label className="label">Password</label>
                <input type="password" name="password" className="input w-full " placeholder="Password" />
                <div><a className="link link-hover">Forgot password?</a></div>


                {/*  */}
                <label className="label"><LoadCanvasTemplate /></label>
                <input onBlur={handleValidateCaptcha} type="text" name="captcha" className="input w-full" placeholder="type the  captcha above" />
                {/* <button  className="btn btn-outline btn-xs">Validate</button> */}


                <input disabled={disabled} className="btn bg-yellow-600 mt-4 text-white" type="submit" value="Login" />

              </fieldset>
            </form>
            <div className='flex flex-col mx-auto py-2'>
              <p><small className='text-yellow-600 font-semibold'><Link to='/signup'>New here? Create a New Account</Link></small></p>
              <div className='mx-auto'>
                <p><small>Or sign in with</small></p>
              </div>
              <div className="flex justify-center gap-x-4 mt-2">
                <div onClick={handleFacebookLogIn} className="p-3 bg-gray-200 rounded-full cursor-pointer hover:bg-blue-100 border border-black">
                  <FaFacebookF className="text-black" />
                </div>
                <div onClick={handleGoogleSignIn} className="p-3 bg-gray-200 rounded-full cursor-pointer hover:bg-red-100 border border-black">
                  <FaGoogle className="text-black" />
                </div>
                <div onClick={handleGitHubLogIn} className="p-3 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 border border-black">
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
    </>

  );
};

export default Login;