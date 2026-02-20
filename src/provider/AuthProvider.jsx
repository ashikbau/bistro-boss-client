import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
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

// ---- DEVICE HELPERS ----
const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isMobileChrome = () => /Android/i.test(navigator.userAgent) && /Chrome/i.test(navigator.userAgent);
const isInAppBrowser = () => {
  const ua = navigator.userAgent || "";
  return ua.includes("FBAN") || ua.includes("FBAV") || ua.includes("Instagram") || ua.includes("WhatsApp") || ua.includes("Line");
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false); // 🔹 new
  const axiosPublic = useAxiosPublic();

  /* ---------------- EMAIL/PASSWORD ---------------- */
  const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

  /* ---------------- SOCIAL LOGIN ---------------- */
  const socialLogin = async (provider) => {
    setLoading(true);

    //  Block in-app browsers
    if (isInAppBrowser()) {
      alert("Social login does not work inside Messenger/WhatsApp/Instagram.\nPlease open in browser.");
      setLoading(false);
      return;
    }

    try {
      if (isMobile() && !isMobileChrome()) {
        setRedirecting(true);
        await signInWithRedirect(auth, provider);
        return;
      }
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.warn("Popup failed, falling back to redirect.", err);
      try {
        setRedirecting(true);
        await signInWithRedirect(auth, provider);
      } catch (err2) {
        console.error("Redirect fallback failed:", err2);
      }
    } finally {
      setLoading(false);
    }
  };

  const logInWithGoogle = () => socialLogin(googleProvider);
  const logInWithFacebook = () => socialLogin(facebookProvider);
  const logInWithGitHub = () => socialLogin(githubProvider);

  /* ---------------- PROFILE UPDATE ---------------- */
  const UpdateUserProfile = (name, photo) =>
    updateProfile(auth.currentUser, { displayName: name, photoURL: photo });

  /* ---------------- LOGOUT ---------------- */
  const logOutUser = () => {
    setLoading(true);

    return signOut(auth).then(() => {
      localStorage.removeItem("access-token");
      localStorage.removeItem("role");
      setUser(null);
      setLoading(false);
    });
  };

  /* ---------------- HANDLE REDIRECT RESULT ---------------- */
  useEffect(() => {
    const handleRedirectResult = async () => {
      if (!redirecting) return;
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          // Save user to backend
          await axiosPublic.post("/users", { name: result.user.displayName, email: result.user.email });
          // Save JWT
          const tokenRes = await axiosPublic.post("/jwt", { email: result.user.email });
          if (tokenRes.data?.token) localStorage.setItem("access-token", tokenRes.data.token);
          setUser(result.user);
        }
      } catch (err) {
        console.error("Redirect login error:", err);
      } finally {
        setRedirecting(false);
      }
    };
    handleRedirectResult();
  }, [axiosPublic, redirecting]);

  /* ---------------- AUTH STATE OBSERVER ---------------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (!currentUser) {
        setUser(null);
        localStorage.removeItem("access-token");
        localStorage.removeItem("role");
        setLoading(false);
        return;
      }

      setUser(currentUser);

      try {
        // JWT & role
        const tokenRes = await axiosPublic.post("/jwt", { email: currentUser.email });
        if (tokenRes.data?.token) localStorage.setItem("access-token", tokenRes.data.token);
        const role = tokenRes.data?.role || "user";
        localStorage.setItem("role", role);

        // 🔹 Only redirect if NOT on target page
        const path = window.location.pathname;
        if (!path.startsWith("/dashboard")) {
          if (role === "admin") window.location.replace("/dashboard/adminHome");
          else if (role === "staff") window.location.replace("/dashboard/staffHome");
          else window.location.replace("/dashboard/userHome");
        }
      } catch (err) {
        console.error("Auth state error:", err);
      } finally {
        setLoading(false);
      }
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

  return <AuthContex.Provider value={authInfo}>{children}</AuthContex.Provider>;
};

export default AuthProvider;


