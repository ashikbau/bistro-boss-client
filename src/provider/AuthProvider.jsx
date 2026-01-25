// import { createContext, useEffect, useState } from "react";
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

// Detect mobile devices
const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Detect specifically Chrome on mobile
const isMobileChrome = () =>
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) &&
  /Chrome/i.test(navigator.userAgent);

// Detect in-app browsers (Messenger, WhatsApp, Instagram, etc.)
const isInAppBrowser = () => {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return (
    ua.includes("FBAN") ||      // Facebook app
    ua.includes("FBAV") ||      // Messenger
    ua.includes("Instagram") ||
    ua.includes("WhatsApp") ||
    ua.includes("Line")
  );
};

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

    // 🚫 In-app browsers: show alert
    if (isInAppBrowser()) {
      alert(
        "Social login does not work inside Messenger or WhatsApp.\n\n" +
        "Please tap ⋮ or Share and choose 'Open in Browser' to continue."
      );
      setLoading(false);
      return;
    }

    // 📱 Mobile browser (redirect) → only if not in-app browser
    if (isMobile() && !isMobileChrome()) {
      await signInWithRedirect(auth, provider);
      return null;
    }

    // 💻 Desktop or Mobile Chrome → popup
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
      setLoading(true);
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          const currentUser = result.user;

          // Optionally update Facebook photo
          const fbProvider = currentUser.providerData.find(
            (p) => p.providerId === "facebook.com"
          );
          if (fbProvider && !currentUser.photoURL) {
            const fbPhotoURL = `https://graph.facebook.com/${fbProvider.uid}/picture?type=large`;
            await updateProfile(currentUser, { photoURL: fbPhotoURL });
            currentUser.photoURL = fbPhotoURL;
          }

          // Save to backend
          await axiosPublic.post("/users", {
            name: currentUser.displayName,
            email: currentUser.email,
          });

          // Save JWT
          const tokenRes = await axiosPublic.post("/jwt", {
            email: currentUser.email,
          });
          if (tokenRes.data?.token)
            localStorage.setItem("access-token", tokenRes.data.token);
          if (tokenRes.data?.role) currentUser.role = tokenRes.data.role;

          setUser(currentUser);
        }
      } catch (err) {
        console.error("Redirect login error:", err);
      } finally {
        setLoading(false); // IMPORTANT
      }
    };

    handleRedirectResult();
  }, [axiosPublic]);

  /* ---------------- AUTH STATE OBSERVER ---------------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Facebook photo fix
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
          if (tokenRes.data?.token)
            localStorage.setItem("access-token", tokenRes.data.token);
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
    <AuthContex.Provider value={authInfo}>{children}</AuthContex.Provider>
  );
};

export default AuthProvider;
