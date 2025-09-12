import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username.trim() === "") {
      alert("The 'Username' field cannot be empty");
      return;
    }
    setLoading(true);
    const userCredentials = {
      username: username,
      password: password,
    };

    try {
      const loginRequest = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userCredentials),
      });

      if (!loginRequest.ok) {
        throw new Error("Error while logging in");
      }
      await loginRequest.json();
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 min-h-screen flex items-center justify-center">
        <div className="bg-[url(abstract4.jpg)] p-15 rounded-[40px]">
            <div
        className="relative w-[900px] h-[550px] rounded-3xl shadow-xl overflow-hidden b"
        
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] backdrop-brightness-[1.1]"></div>
        {/* Card Content */}
        <div className="relative z-10 p-10 flex flex-col items-center">
          <div className="flex justify-end w-full">
            <button
              onClick={() => navigate("/signup")}
              className="text-sm text-purple-600 hover:underline"
            >
              No account yet?
            </button>
          </div>
          <h2 className="text-6xl font-bold text-center text-purple-700 mb-2" style={{ fontFamily: "Italiana, serif" }}>
            Log in to your account
          </h2>
          <form
            className="flex flex-col gap-4 w-full max-w-md"
            onSubmit={e => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div>
              <label htmlFor="username" className="block text-xl font-medium text-gray-800">
                Username
              </label>
              <input
                required
                value={username}
                onChange={e => setUserName(e.target.value)}
                type="text"
                name="username"
                id="username"
                className="text-gray-600 mt-1 w-full h-[60px] rounded-lg border border-gray-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="Your username"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xl font-medium text-gray-800">
                Password
              </label>
              <input
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="text-gray-600 mt-1 w-full h-[60px] rounded-lg border border-gray-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="Your password"
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-black to-purple-300 text-white font-semibold py-2 rounded-xl shadow hover:from-purple-500 hover:to-green-400 transition-all"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>
      </div>
        </div>
      
    </div>
  );
};

export default LoginPage;