import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import loginImage from "../../assets/images/login.jpg";
import logo from "../../assets/images/laxxa.png";

const OTP_LENGTH = 6;
const RESEND_TIME = 30;

const OtpPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { type, value } = state || {};

  const isEmail = type === "email";

  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(RESEND_TIME);

  /* ---------------- Timer ---------------- */
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /* ---------------- Autofocus logic ---------------- */
  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  /* ---------------- Resend OTP ---------------- */
  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setTimer(RESEND_TIME);
    inputsRef.current[0].focus();
    // 🔥 call resend OTP API here
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[6fr_7fr]">
      {/* LEFT IMAGE */}
      <div className="hidden lg:block h-screen">
        <img
          src={loginImage}
          alt="Fashion"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT OTP SECTION */}
      <div className="flex items-center justify-center bg-gradient-to-b from-[#fff9ec] to-[#FFECB2] px-8">
        <div className="w-full max-w-160 h-[85vh] bg-white rounded-2xl px-20 py-16 shadow-sm flex flex-col">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 text-left mb-6 hover:underline"
          >
            ← Back
          </button>

          {/* Logo */}
          <img src={logo} alt="LAXXA" className="mx-auto mb-8 w-[130px]" />

          <h2 className="text-lg font-medium text-center mb-4">
            We’ve sent you a 6-digit OTP
          </h2>

          <p className="text-sm text-gray-600 text-center mb-10">
            Enter the verification code sent to your{" "}
            <span className="font-medium">
              {isEmail ? "email address" : "phone number"}
            </span>
            <br />
            <span className="text-black font-medium">{value}</span>
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-between gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 border-b-2 border-gray-400 text-center text-lg focus:outline-none focus:border-black"
              />
            ))}
          </div>

          {/* Timer / Resend */}
          <p className="text-xs text-gray-400 text-center mb-8">
            {timer > 0 ? (
              <>This code is valid for {timer} seconds</>
            ) : (
              <button
                onClick={handleResend}
                className="text-black underline font-medium"
              >
                Resend OTP
              </button>
            )}
          </p>

          {/* Verify */}
          <button className="w-full bg-[#FFE7A3] text-black py-3 rounded-[9px] font-medium hover:bg-[#ffdfa0] transition">
            Verify
          </button>

          {/* Footer */}
          <p className="text-xs text-gray-400 underline cursor-pointer text-center mt-auto pt-10">
            Terms & Privacy Links
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;

// import { useLocation } from "react-router-dom";
// import loginImage from "../../assets/images/login.jpg";
// import logo from "../../assets/images/laxxa.png";

// const OtpPage = () => {
//   const { state } = useLocation();
//   const { type, value } = state || {}; // type = email | phone

//   const isEmail = type === "email";

//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[6fr_7fr]">
//       {/* LEFT IMAGE — 90% */}
//       <div className="hidden lg:block h-screen">
//         <img
//           src={loginImage}
//           alt="Fashion"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* RIGHT OTP SECTION */}
//       <div className="flex items-center justify-center bg-gradient-to-b from-[#fff9ec] to-[#FFECB2] px-8">
//         <div className="w-full max-w-160 h-[85vh] bg-white rounded-2xl px-20 py-16 shadow-sm flex flex-col">
//           {/* Logo */}
//           <img src={logo} alt="LAXXA" className="mx-auto mb-10 w-[130px]" />

//           {/* Heading */}
//           <h2 className="text-lg font-medium text-center mb-4">
//             We’ve sent you a 6-digit OTP
//           </h2>

//           {/* Dynamic subtitle */}
//           <p className="text-sm text-gray-600 text-center mb-10">
//             Enter the verification code sent to your{" "}
//             <span className="font-medium">
//               {isEmail ? "email address" : "phone number"}
//             </span>
//             <br />
//             <span className="text-black font-medium">{value}</span>
//           </p>

//           {/* OTP INPUTS */}
//           <div className="flex justify-between gap-3 mb-8">
//             {Array.from({ length: 6 }).map((_, i) => (
//               <input
//                 key={i}
//                 type="text"
//                 maxLength={1}
//                 className="w-12 h-12 border-b-2 border-gray-400 text-center text-lg focus:outline-none focus:border-black"
//               />
//             ))}
//           </div>

//           {/* Timer */}
//           <p className="text-xs text-gray-400 text-center mb-10">
//             This code is valid for 30 seconds
//           </p>

//           {/* Verify Button */}
//           <button className="w-full bg-[#FFE7A3] text-black py-3 rounded-[9px] font-medium hover:bg-[#ffdfa0] transition">
//             Verify
//           </button>

//           {/* Footer */}
//           <p className="text-xs text-gray-400 underline cursor-pointer text-center mt-auto pt-10">
//             Terms & Privacy Links
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OtpPage;