import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

import loginImage from "../../assets/images/login.jpg";
import logo from "../../assets/images/laxxa.png";

/* 👉 MOBILE ASSETS */
import mobileBg from "../../assets/images/mobile-bg.jpg";

const LoginPage = () => {
  const GoogleIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.2 0 5.9 1.1 8.1 3.1l6-6C34.3 2.7 29.6 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.3 5.7C11.7 13.2 17.4 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-2.8-.4-4H24v7.6h12.7c-.5 3-2.3 5.6-5 7.3l7.7 6c4.5-4.1 6.7-10.1 6.7-16.9z"/>
      <path fill="#FBBC05" d="M9.9 28.9c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6l-7.3-5.7C.9 17.3 0 20.6 0 24.3s.9 7 2.6 10l7.3-5.4z"/>
      <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.7l-7.7-6c-2.1 1.4-4.8 2.2-8.3 2.2-6.6 0-12.2-3.7-14.1-9.1l-7.3 5.6C6.5 42.6 14.6 48 24 48z"/>
    </svg>
  );

  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState("email");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [showMobileInput, setShowMobileInput] = useState(false);

  const isEmail = authMode === "email";

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);

  useEffect(() => {
    if (!value) return setError("");

    if (isEmail && !validateEmail(value))
      setError("Please enter a valid email address");
    else if (!isEmail && !validatePhone(value))
      setError("Please enter a valid 10-digit phone number");
    else setError("");
  }, [value, isEmail]);

  const handleContinue = () => {
    if (error || !value) return;

    navigate("/verify-otp", {
      state: {
        type: authMode,
        value: isEmail ? value : `+91 ${value}`,
      },
    });
  };

  const handleModeSwitch = () => {
    setAuthMode((prev) => (prev === "email" ? "phone" : "email"));
    setValue("");
    setError("");
  };

  const isDisabled = !value || !!error;

  return (
    <>
      {/* ================= MOBILE VIEW ================= */}
      <div className="lg:hidden relative h-screen w-full overflow-hidden">
        <img
          src={mobileBg}
          alt="Mobile Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex flex-col px-5 py-6">
          {/* SAME DESKTOP LOGO */}
          <img src={logo} alt="LAXXA" className="mx-auto h-8 mt-4" />

          {!showMobileInput && (
            <div className="mt-auto space-y-4 pb-6">
              <button
                onClick={() => {
                  setAuthMode("phone");
                  setShowMobileInput(true);
                }}
                className="w-full flex items-center justify-center gap-3 bg-[#FFE7A3] py-3 rounded-full font-medium"
              >
                <Phone size={18} />
                Continue With Phone Number
              </button>

              <button className="w-full flex items-center justify-center gap-3 bg-black text-white py-3 rounded-full">
                <GoogleIcon />
                Continue with Google
              </button>

              <button
                onClick={() => {
                  setAuthMode("email");
                  setShowMobileInput(true);
                }}
                className="w-full flex items-center justify-center gap-3 border border-white text-white py-3 rounded-full"
              >
                <Mail size={18} />
                Continue with Email
              </button>

              <p className="text-center text-xs text-white/80 underline mt-3">
                Terms & Privacy Links
              </p>
            </div>
          )}

          {/* SECOND SCREEN */}
          {showMobileInput && (
            <div className="absolute inset-0 bg-[#f5f5f5] px-5 pt-6 flex flex-col">
              {/* HEADER */}
              <div className="relative flex items-center justify-center mb-6">
                <button
                  onClick={() => setShowMobileInput(false)}
                  className="absolute left-0 text-xl"
                >
                  ←
                </button>

                <img
                  src={logo}
                  alt="LAXXA"
                  className="h-9 mx-auto object-contain"
                />
              </div>

              {/* CENTERED FORM */}
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-gray-700 text-lg mb-4">
                  {isEmail ? "Enter email address" : "Enter phone number"}
                </p>

                <div className="mb-6">
                  <div className="flex items-center bg-white border border-gray-300 rounded-xl px-3 py-3">
                    {!isEmail && (
                      <span className="text-gray-600 mr-3 border-r pr-3">
                        +91
                      </span>
                    )}

                    <input
                      type={isEmail ? "email" : "tel"}
                      placeholder={
                        isEmail
                          ? "Enter your email address"
                          : "Enter your phone number"
                      }
                      value={value}
                      onChange={(e) =>
                        setValue(
                          !isEmail
                            ? e.target.value.replace(/\D/g, "")
                            : e.target.value
                        )
                      }
                      className="flex-1 bg-transparent outline-none text-gray-700"
                    />
                  </div>
                </div>

                <button
                  onClick={handleContinue}
                  disabled={isDisabled}
                  className={`w-full py-4 rounded-xl text-lg font-medium ${
                    isDisabled
                      ? "bg-gray-300 text-gray-500"
                      : "bg-[#FFE7A3] text-black"
                  }`}
                >
                  Continue
                </button>
              </div>

              <p className="text-center text-sm underline text-gray-600 pb-6">
                Terms & Privacy Links
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden lg:grid min-h-screen grid-cols-[6fr_7fr]">
        <div className="hidden lg:block h-screen">
          <img src={loginImage} alt="Fashion" className="w-full h-full object-cover" />
        </div>

        <div className="flex items-center justify-center bg-linear-to-b from-[#fffcf7] to-[#FFECB2] px-8">
          <div className="w-full max-w-160 h-[85vh] bg-white rounded-2xl px-26.25 py-16 shadow-sm flex flex-col">
            <img src={logo} alt="LAXXA" className="mx-auto mb-12 w-32.5" />

            <p className="text-gray-700 mb-8 text-left">
              {isEmail ? "Enter email address" : "Enter phone number"}
            </p>

            <div className="min-h-19 mb-2">
              <div className={`flex items-center border rounded-[9px] overflow-hidden ${error ? "border-red-400" : "border-gray-500"}`}>
                {!isEmail && (
                  <span className="px-4 text-gray-600 border-r bg-gray-50 whitespace-nowrap">
                    +91
                  </span>
                )}

                <input
                  type={isEmail ? "email" : "tel"}
                  placeholder={isEmail ? "Enter your email address" : "Enter your phone number"}
                  value={value}
                  onChange={(e) =>
                    setValue(!isEmail ? e.target.value.replace(/\D/g, "") : e.target.value)
                  }
                  className="flex-1 min-w-0 px-6 py-3 focus:outline-none"
                />
              </div>

              {error && <p className="text-xs text-red-500 text-left mt-2">{error}</p>}
            </div>

            <button
              onClick={handleContinue}
              disabled={isDisabled}
              className={`w-full py-3 rounded-[9px] font-[420] transition mt-auto mb-8 ${
                isDisabled
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#FFE7A3] text-black hover:bg-[#ffdfa0]"
              }`}
            >
              Continue
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            <button className="w-full bg-black text-white py-3 rounded-[9px] flex items-center justify-center gap-3 mb-8">
              <GoogleIcon />
              Continue with Google
            </button>

            <button
              onClick={handleModeSwitch}
              className="w-full border border-gray-500 py-3 rounded-[9px] flex items-center justify-center gap-3 hover:bg-gray-50"
            >
              {isEmail ? <Phone size={18} /> : <Mail size={18} />}
              {isEmail ? "Continue with Phone Number" : "Continue with Email"}
            </button>

            <p className="text-xs text-gray-400 underline cursor-pointer text-center mt-auto pt-10">
              Terms & Privacy Links
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
