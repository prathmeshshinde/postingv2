import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../App";

interface IAuthContextProps {
  children: React.ReactNode;
}

const AuthProvider = React.createContext({});

export function useUserAuth() {
  return useContext(AuthProvider);
}

const AuthContext: React.FC<IAuthContextProps> = (props) => {
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [currUser, setCurrUser] = useState<any>();
  const [userDoc, setUserDoc] = useState("");

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signout() {
    return signOut(auth);
  }

  async function getUsername(userId: any) {
    const q = query(collection(db, "users"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const dataUsername = doc.data();
      setUserDoc(doc.id);
      setCurrUser(dataUsername);
      setUsername(dataUsername.username);
    });
  }

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLoading(false);
        setUser(currentUser);
      }
    });

    return () => AuthCheck();
  }, [auth]);

  useEffect(() => {
    if (!!user?.uid.length) {
      getUsername(user.uid);
    }
  }, [user]);

  if (loading) return <p>Loading....</p>;

  return (
    <AuthProvider.Provider
      value={{
        user,
        signup,
        login,
        signout,
        getUsername,
        username,
        currUser,
        userDoc,
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
};

export default AuthContext;
