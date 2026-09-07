const { useState, useEffect, useRef } = React;

export const OTPGenerator = () => {
  const [countdown, setCountdown] = useState(0);
  const [otp, setOTP] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  const generateOTP = () => {
    setOTP(Math.floor(Math.random()*90001 + 99999).toString());
    setHasGenerated(true);
    setCountdown(5);
  }
  useEffect(()=>{
      if (countdown == 0) {
        setOTP("");
        return
      }
      const timeoutId = setTimeout(()=>{
        setCountdown((prev)=>prev-1);
      }, 1000)
      return ()=>clearTimeout(timeoutId);
    }, [countdown]);
  return (
  <div className="container">
    <h1 id="otp-title">OTP Generator</h1>
    <h2 id="otp-display">{otp==""? "Click 'Generate OTP' to get a code": otp}</h2>
    <p id="otp-timer" aria-live="polite">{hasGenerated == false ? "":countdown > 0 ? `Expires in: ${countdown} seconds`:"OTP expired. Click the button to generate a new OTP."}</p>
    <button id="generate-otp-button" onClick={generateOTP} disabled={otp !== ""}>Generate OTP</button>
  </div>
  )
};