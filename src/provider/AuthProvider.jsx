// import { createContext, useEffect, useState } from "react";
// import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
// import { app } from "../firebase/firebase.config";
// import { GoogleAuthProvider } from "firebase/auth";
// import { FacebookAuthProvider } from "firebase/auth";
// import { GithubAuthProvider } from "firebase/auth";
// import useAxiosPublic from "../hooks/useAxiosPublic";

// export const AuthContex = createContext(null);
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();
// const facebookProvider = new FacebookAuthProvider();
// const GitHubProvider = new GithubAuthProvider();


// const AuthProvider = ({children}) => {
//     const [user,setUser] = useState(null);
//     const [loading,setLoading] = useState(true);
//     const axiosPublic = useAxiosPublic();


//     const createUser =(email,password)=>{
//       setLoading(true);
//       return createUserWithEmailAndPassword(auth,email,password);
//     }
//     const logInWithGoogle =()=>{
//       setLoading(true);
//       return signInWithPopup(auth,googleProvider)
//     }
//     const logInWithFacebook =()=>{
//       setLoading(true)
//       return signInWithPopup(auth,facebookProvider)

//     }

//     const logInWithGitHub =()=>{
//       setLoading(true)
//       return signInWithPopup(auth,GitHubProvider)
//     }

//     const loginUser =(email,password)=>{
//       setLoading(true)
//       return signInWithEmailAndPassword(auth,email,password)

//     }


//     const UpdateUserProfile=(name,photo)=>{
//     return  updateProfile(auth.currentUser, {
//   displayName: name, photoURL: photo
// })
//     }


//     const logOutUser =()=>{
//       setLoading(true);
//       return signOut(auth);
//     }


//     useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, currentUser => {
//       setUser(currentUser);
//       setLoading(true);

//       if (currentUser) {
//         const userInfo = { email: currentUser.email };
//         axiosPublic.post('/jwt', userInfo)
//           .then(res => {
//             if (res.data.token) {
//               localStorage.setItem('access-token', res.data.token);
//             }
//             if (res.data.role) {
//               // save role in local state
//               setUser(prev => ({ ...prev, role: res.data.role }));
//               // optionally save in localStorage
//               localStorage.setItem('role', res.data.role);
//             }
//           })
//           .catch(err => {
//             console.error("JWT error:", err);
//           })
//           .finally(() => setLoading(false));
//       } else {
//         localStorage.removeItem('access-token');
//         localStorage.removeItem('role');
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, [axiosPublic]);


//     const authInfo = {
//         user,
//         loading,
//         createUser,
//         loginUser,
//         logOutUser,
//         logInWithGoogle,
//         logInWithFacebook,
//         logInWithGitHub,
//         UpdateUserProfile



//     }
//     return (
//         <AuthContex.Provider value={authInfo}>
//           {
//             children
//           }
//         </AuthContex.Provider>
//     );
// };

// export default AuthProvider;


// import { createContext, useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   getAuth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signInWithRedirect,
//   getRedirectResult,
//   signOut,
//   updateProfile,
//   GoogleAuthProvider,
//   FacebookAuthProvider,
//   GithubAuthProvider,
// } from "firebase/auth";
// import { app } from "../firebase/firebase.config";
// import useAxiosPublic from "../hooks/useAxiosPublic";

// export const AuthContex = createContext(null);

// const auth = getAuth(app);

// // Providers
// const googleProvider = new GoogleAuthProvider();
// const facebookProvider = new FacebookAuthProvider();
// const githubProvider = new GithubAuthProvider();

// // Facebook permissions
// facebookProvider.addScope("public_profile");
// facebookProvider.addScope("email");

// // Mobile detector
// const isMobile = () =>
//   /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const axiosPublic = useAxiosPublic();

//   /* ---------------- EMAIL/PASSWORD ---------------- */
//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const loginUser = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   /* ---------------- SOCIAL LOGIN ---------------- */
//   const socialLogin = async (provider) => {
//     setLoading(true);

//     if (isMobile()) {
//       await signInWithRedirect(auth, provider);
//       return null; // redirect flow
//     }

//     return signInWithPopup(auth, provider); // desktop popup
//   };

//   const logInWithGoogle = () => socialLogin(googleProvider);
//   const logInWithFacebook = () => socialLogin(facebookProvider);
//   const logInWithGitHub = () => socialLogin(githubProvider);

//   /* ---------------- PROFILE UPDATE ---------------- */
//   const UpdateUserProfile = (name, photo) => {
//     return updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: photo,
//     });
//   };

//   /* ---------------- LOGOUT ---------------- */
//   const logOutUser = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   /* ---------------- HANDLE REDIRECT RESULT (MOBILE) ---------------- */
//   useEffect(() => {
//     const handleRedirectResult = async () => {
//       try {
//         const result = await getRedirectResult(auth);

//         if (result?.user) {
//           await axiosPublic.post("/users", {
//             name: result.user.displayName,
//             email: result.user.email,
//           });
//         }
//       } catch (err) {
//         console.error("Redirect login error:", err);
//       }
//     };

//     handleRedirectResult();
//   }, [axiosPublic]);

//   /* ---------------- AUTH STATE OBSERVER ---------------- */
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);

//       if (currentUser) {
//         /* -------- FACEBOOK PHOTO FIX -------- */
//         const fbProvider = currentUser.providerData.find(
//           (p) => p.providerId === "facebook.com"
//         );

//         if (fbProvider && !currentUser.photoURL) {
//           const fbPhotoURL = `https://graph.facebook.com/${fbProvider.uid}/picture?type=large`;

//           try {
//             await updateProfile(currentUser, { photoURL: fbPhotoURL });
//             currentUser.photoURL = fbPhotoURL;
//           } catch (err) {
//             console.error("Facebook photo update failed:", err);
//           }
//         }

//         /* -------- JWT TOKEN -------- */
//         try {
//           const res = await axiosPublic.post("/jwt", {
//             email: currentUser.email,
//           });

//           if (res.data?.token) {
//             localStorage.setItem("access-token", res.data.token);
//           }

//           if (res.data?.role) {
//             setUser((prev) => ({ ...prev, role: res.data.role }));
//             localStorage.setItem("role", res.data.role);
//           }
//         } catch (err) {
//           console.error("JWT error:", err);
//         }
//       } else {
//         localStorage.removeItem("access-token");
//         localStorage.removeItem("role");
//       }

//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [axiosPublic]);

//   /* ---------------- CONTEXT VALUE ---------------- */
//   const authInfo = {
//     user,
//     loading,
//     createUser,
//     loginUser,
//     logOutUser,
//     logInWithGoogle,
//     logInWithFacebook,
//     logInWithGitHub,
//     UpdateUserProfile,
//   };

//   return (
//     <AuthContex.Provider value={authInfo}>
//       {children}
//     </AuthContex.Provider>
//   );
// };

// export default AuthProvider;

import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContex = createContext(null);

const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

// Facebook permissions
facebookProvider.addScope("public_profile");
facebookProvider.addScope("email");

// Mobile detector
const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  /* ---------------- EMAIL/PASSWORD ---------------- */
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  /* ---------------- SOCIAL LOGIN ---------------- */
  const socialLogin = async (provider) => {
    setLoading(true);

    if (isMobile()) {
      // Mobile: redirect flow
      await signInWithRedirect(auth, provider);
      return null; // mobile result handled in getRedirectResult
    }

    // Desktop: popup flow
    return signInWithPopup(auth, provider);
  };

  const logInWithGoogle = () => socialLogin(googleProvider);
  const logInWithFacebook = () => socialLogin(facebookProvider);
  const logInWithGitHub = () => socialLogin(githubProvider);

  /* ---------------- PROFILE UPDATE ---------------- */
  const UpdateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  /* ---------------- LOGOUT ---------------- */
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  /* ---------------- HANDLE REDIRECT RESULT (MOBILE) ---------------- */
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);

        if (result?.user) {
          const currentUser = result.user;

          // Facebook profile photo fix
          const fbProvider = currentUser.providerData.find(
            (p) => p.providerId === "facebook.com"
          );
          if (fbProvider && !currentUser.photoURL) {
            const fbPhotoURL = `https://graph.facebook.com/${fbProvider.uid}/picture?type=large`;
            await updateProfile(currentUser, { photoURL: fbPhotoURL });
            currentUser.photoURL = fbPhotoURL;
          }

          // Save user to backend
          await axiosPublic.post("/users", {
            name: currentUser.displayName,
            email: currentUser.email,
          });

          // Save JWT token
          const tokenRes = await axiosPublic.post("/jwt", {
            email: currentUser.email,
          });
          if (tokenRes.data?.token) localStorage.setItem("access-token", tokenRes.data.token);

          // Save role if provided
          if (tokenRes.data?.role) {
            setUser({ ...currentUser, role: tokenRes.data.role });
            localStorage.setItem("role", tokenRes.data.role);
          } else {
            setUser(currentUser);
          }
        }
      } catch (err) {
        console.error("Redirect login error:", err);
      } finally {
        setLoading(false);
      }
    };

    handleRedirectResult();
  }, [axiosPublic]);

  /* ---------------- AUTH STATE OBSERVER ---------------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Facebook photo fix for desktop users
        const fbProvider = currentUser.providerData.find(
          (p) => p.providerId === "facebook.com"
        );
        if (fbProvider && !currentUser.photoURL) {
          const fbPhotoURL = `https://graph.facebook.com/${fbProvider.uid}/picture?type=large`;
          try {
            await updateProfile(currentUser, { photoURL: fbPhotoURL });
            currentUser.photoURL = fbPhotoURL;
            setUser({ ...currentUser });
          } catch (err) {
            console.error("Facebook photo update failed:", err);
          }
        }

        // JWT & role handling
        try {
          const tokenRes = await axiosPublic.post("/jwt", {
            email: currentUser.email,
          });
          if (tokenRes.data?.token) localStorage.setItem("access-token", tokenRes.data.token);
          if (tokenRes.data?.role) {
            setUser((prev) => ({ ...prev, role: tokenRes.data.role }));
            localStorage.setItem("role", tokenRes.data.role);
          }
        } catch (err) {
          console.error("JWT error:", err);
        }
      } else {
        setUser(null);
        localStorage.removeItem("access-token");
        localStorage.removeItem("role");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  /* ---------------- CONTEXT VALUE ---------------- */
  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logOutUser,
    logInWithGoogle,
    logInWithFacebook,
    logInWithGitHub,
    UpdateUserProfile,
  };

  return (
    <AuthContex.Provider value={authInfo}>
      {children}
    </AuthContex.Provider>
  );
};

export default AuthProvider;

