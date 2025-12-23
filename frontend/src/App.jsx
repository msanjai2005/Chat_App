import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import Loader from "./components/Loader";
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { checkAuth, isCheckingAuth, user} = useContext(AppContext);
  
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right, #4f4f4f2e_1px, transparent_1px), linear-gradient(to_bottom,#4f4f4f2e_1px, transparent_1px)] bg-size-[14px_24px]" />
      <div className="pointer-events-none absolute top-0 left-4 size-70 md:size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      {isCheckingAuth?(<Loader />):(<Routes>
        <Route
          path="/"
          element={user ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>)}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
