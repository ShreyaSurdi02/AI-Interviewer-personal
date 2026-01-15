import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* NAVBAR */}
      <nav className="w-full flex justify-between items-center px-10 py-5 shadow-md bg-white fixed top-0 left-0 z-50">
        <h1 className="text-3xl font-extrabold text-[#1e3a8a] flex items-center">
          🤖 <span className="ml-2">AI Interviewer</span>
        </h1>

        <div className="flex gap-6 text-lg font-semibold">
          {/* Removed Products, Solutions, Pricing, Resources */}
          <button
            onClick={() => navigate("/about")}
            className="hover:text-blue-600 transition"
          >
            About Us
          </button>

          <button
            onClick={() => navigate("/landing")}
            className="px-4 py-2 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col justify-center items-center text-center mt-32 px-10">
        <h2 className="text-6xl font-bold text-gray-900 mb-6">
          Hire the next <span className="text-green-500">generation developer</span>
        </h2>

        <p className="text-xl text-gray-600 max-w-3xl mb-10">
          We help companies find talent and help candidates prepare confidently
          for AI-powered mock interviews across domains.
        </p>

        {/* ONLY ONE BUTTON (Create Account) */}
        <button
          onClick={() => navigate("/landing")}
          className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition"
        >
          Create Account
        </button>
      </section>

      {/* LOGOS SECTION */}
      <div className="flex justify-center items-center gap-14 mt-16 opacity-80 pb-20">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Airbnb_Logo_Bélo.svg" alt="airbnb" className="h-8" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Stripe_Logo%2C_revised_2016.svg" alt="stripe" className="h-8" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Linkedin.svg" alt="linkedin" className="h-8" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/IBM_logo.svg" alt="IBM" className="h-8" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Snap_Inc_logo_developer.svg" alt="snap" className="h-8" />
      </div>
    </div>
  );
}
