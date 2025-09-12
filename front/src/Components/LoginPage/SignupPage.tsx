import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const newUser = { firstName, lastName, username, email, password };
      const response = await fetch(`http://localhost:3000/api/auth/signup`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || "Signup failed"}`);
      }

      const data = await response.json();
      alert("New user created");
      navigate("/");
    } catch (err) {
      alert("Signup failed. Please check your information.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 min-h-screen flex items-center justify-center">
        <div className="bg-[url(abstract4.jpg)] rounded-[40px] p-15">
            <div className="bg-white/80 shadow-xl rounded-3xl p-10 w-[900px] h-[550px]">
        <div className="flex justify-end">
          <button 
            onClick={() => navigate("/")}
            className="text-sm text-purple-600 hover:underline"
          >
            Already have an account?
          </button>
        </div>
        <div className="flex justify-center items-center gap-4">
        <img src="logoblack.png" alt="" className="h-18"/>
        <h2 className="text-6xl font-bold text-center text-purple-700 mb-2" style={{ fontFamily: "Italiana, serif" }}>Pennywise</h2>
        </div>
        <p className="text-center text-gray-500 mb-6">Watch closer, Spend wiser</p>
        <form
          className="flex flex-col gap-4"
          onSubmit={e => {
            e.preventDefault();
            handleSignup();
          }}
        >
            <div className="flex w-full justify-between items-center">
                <div className="w-[48%]">
            <label htmlFor="firstname" className="block font-medium text-gray-700 text-xl">
              First name
            </label>
            <input
              value={firstName}
              onChange={e => setFirstname(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
              type="text"
              id="firstname"
              placeholder="Your first name ..."
              required
            />
          </div>
          <div className="w-[48%]">
            <label htmlFor="lastname" className="block font-medium text-gray-700 text-xl">
              Last name
            </label>
            <input
              value={lastName}
              onChange={e => setLastname(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
              type="text"
              id="lastname"
              placeholder="Your last name ..."
              required
            />
          </div>
            </div>
          
          <div className="flex justify-between w-full">
                <div className="w-[48%]">
            <label htmlFor="username" className="block font-medium text-gray-700 text-xl">
              Username
            </label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
              type="text"
              id="username"
              placeholder="Your username"
              required
            />
          </div>
          <div className="w-[48%]">
            <label htmlFor="email" className="block font-medium text-gray-700 text-xl">
              Email
            </label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
              type="email"
              id="email"
              placeholder="Your email"
              required
            />
          </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-xl font-medium text-gray-700">
              Password
            </label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
              type="password"
              id="password"
              placeholder="Your password"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-black to-purple-500 text-white font-semibold py-2 rounded-xl shadow hover:from-purple-500 hover:to-green-400 transition-all"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create user"}
          </button>
        </form>
      </div>
        </div>
      
    </div>
  );
};

export default SignupPage;