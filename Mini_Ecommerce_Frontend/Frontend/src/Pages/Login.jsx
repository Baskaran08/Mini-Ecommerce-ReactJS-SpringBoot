import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { validateEmail } from '../Utils/Helper';
import axiosInstance from '../Utils/axiosInstance';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password
      });

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Logged in successfully!");

        navigate(response.data.user.role === "ROLE_ADMIN" ? "/admin/dashboard" : "/home");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full h-screen bg-gradient-to-br from-slate-800 via-slate-600 to-black flex justify-center items-center px-4 sm:px-8'>
      <div className='grid grid-cols-1 lg:grid-cols-2 h-full gap-8 max-w-7xl w-full'>
        
        <div className='hidden lg:flex justify-center items-center'>
          <img className='h-2/3' src="/assets/login.svg" alt="Login Illustration" />
        </div>

        <div className='flex justify-center items-center'>
          <form
            onSubmit={handleLogin}
            className='bg-gray-800  p-16 rounded-lg shadow-lg w-full max-w-md space-y-6'
          >
            <h1 className='text-3xl font-bold text-center text-white'>Login</h1>

            <div className='flex flex-col gap-4'>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='p-3 rounded outline-none border w-full border-gray-300 bg-white '
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='p-3 rounded outline-none border w-full border-gray-300 bg-white '
              />
              {error && <p className='text-red-500 text-sm'>{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className='w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded transition-all duration-300'
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            <p className='text-white text-center'>
              Don’t have an account?{" "}
              <Link to="/signup" className='text-blue-400 hover:underline'>
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
