import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContex = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const GitHubProvider = new GithubAuthProvider();


const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();


    const createUser =(email,password)=>{
      setLoading(true);
      return createUserWithEmailAndPassword(auth,email,password);
    }
    const logInWithGoogle =()=>{
      setLoading(true);
      return signInWithPopup(auth,googleProvider)
    }
    const logInWithFacebook =()=>{
      setLoading(true)
      return signInWithPopup(auth,facebookProvider)

    }

    const logInWithGitHub =()=>{
      setLoading(true)
      return signInWithPopup(auth,GitHubProvider)
    }

    const loginUser =(email,password)=>{
      setLoading(true)
      return signInWithEmailAndPassword(auth,email,password)

    }


    const UpdateUserProfile=(name,photo)=>{
    return  updateProfile(auth.currentUser, {
  displayName: name, photoURL: photo
})
    }


    const logOutUser =()=>{
      setLoading(true);
      return signOut(auth);
    }

    
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(true);

      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic.post('/jwt', userInfo)
          .then(res => {
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token);
            }
            if (res.data.role) {
              // save role in local state
              setUser(prev => ({ ...prev, role: res.data.role }));
              // optionally save in localStorage
              localStorage.setItem('role', res.data.role);
            }
          })
          .catch(err => {
            console.error("JWT error:", err);
          })
          .finally(() => setLoading(false));
      } else {
        localStorage.removeItem('access-token');
        localStorage.removeItem('role');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [axiosPublic]);
    

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        logOutUser,
        logInWithGoogle,
        logInWithFacebook,
        logInWithGitHub,
        UpdateUserProfile



    }
    return (
        <AuthContex.Provider value={authInfo}>
          {
            children
          }
        </AuthContex.Provider>
    );
};

export default AuthProvider;