'use client';
import { Button } from '@/components/ui';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaFingerprint, FaRedo } from 'react-icons/fa';
import OTPInput from 'react-otp-input';

const VerifyPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [otp, setOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Timer for OTP resend
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 4) {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "Please enter a valid 4-digit OTP code.",
      });
      return;
    }

    try {
      setIsLoading(true);
      // Simulate OTP verification API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        variant: "success",
        title: "OTP Verified",
        description: "Your code has been verified successfully!",
      });

      // Redirect to reset password page
      setTimeout(() => {
        router.push('/reset-password');
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "Invalid OTP code. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      // Simulate OTP resend API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setOtp('');
      setTimer(60);
      setCanResend(false);

      toast({
        variant: "success",
        title: "OTP Resent",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to Resend",
        description: "Failed to send OTP. Please try again.",
      });
    }
  };

  const handleBackToLogin = () => {
    router.push('/');
  };

  return (
    <div className="w-full max-w-[500px] flex flex-col items-center">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-primary-dark/20 rounded-full flex items-center justify-center mb-4">
          <FaFingerprint className="w-8 h-8 text-primary-dark" />
        </div>
        <h2 className="text-foreground text-4xl font-coolvetica text-center">
          ENTER YOUR CODE
        </h2>
        <p className="text-foreground text-xl mt-2 text-center">
          We sent a code to <span className="text-primary-dark">drew@salesproduct.com</span>
        </p>
      </div>

      <form onSubmit={handleVerifyOtp} className="w-full flex flex-col items-center">
        {/* OTP Input Section */}
        <div className="w-full mb-8">
          <div className="flex justify-center mb-6">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span className="w-3"></span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="w-12! h-14 border-2 border-border bg-background text-foreground text-xl font-bold rounded-lg text-center focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/20 transition-all duration-200"
                />
              )}
              inputType="number"
              shouldAutoFocus={true}
            />
          </div>
          
          <p className="text-center text-sm text-gray-400">
            Enter the 4-digit verification code
          </p>
        </div>

        {/* Verify Button */}
        <Button
          className="w-full py-3 text-base font-medium mb-6"
          type="submit"
          disabled={isLoading || otp.length !== 4}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin">⟳</div>
              Verifying...
            </div>
          ) : (
            'Verify OTP'
          )}
        </Button>
      </form>

      {/* Resend OTP Section */}
      <div className="w-full text-center mb-6">
        <p className="text-foreground text-sm">
          Didn't receive the code?{' '}
          {canResend ? (
            <button
              onClick={handleResendOtp}
              className="text-primary-dark hover:underline flex items-center gap-1 mx-auto justify-center"
            >
              <FaRedo className="w-3 h-3" />
              Resend OTP
            </button>
          ) : (
            <span className="text-gray-400">
              Resend in <span className="text-primary-dark">{timer}s</span>
            </span>
          )}
        </p>
      </div>

      {/* Back to Login */}
      <button
        onClick={handleBackToLogin}
        className="text-primary-dark text-sm hover:underline flex items-center gap-2"
      >
        <FaArrowLeft className="w-3 h-3" />
        Back to Sign In
      </button>
    </div>
  );
};

export default VerifyPage;