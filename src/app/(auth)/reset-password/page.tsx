'use client';
import { Button, Input } from '@/components/ui';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaLock, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ResetPasswordPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const passwordSchema = Yup.object({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: passwordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast({
          variant: "success",
          title: "Password Reset Successful",
          description: "Your password has been reset successfully!",
        });

        setTimeout(() => {
          router.push('/');
        }, 1000);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Reset Failed",
          description: "Failed to reset password. Please try again.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleBackToLogin = () => {
    router.push('/');
  };

  return (
    <div className="w-full max-w-[500px] flex flex-col items-center">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
          <FaLock className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-foreground text-4xl font-coolvetica text-center">
          SET NEW PASSWORD
        </h2>
        <p className="text-foreground text-xl mt-2 text-center">
          Create a strong new password
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="w-full flex flex-col">
        {/* Password Inputs */}
        <div className="w-full mb-6">
          <div className="flex items-center gap-2 mb-3">
            <FaLock className="w-4 h-4 text-primary" />
            <label className="text-foreground text-base font-medium">
              New Password
            </label>
          </div>
          <Input
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter new password"
            required
            className="bg-background border-border text-foreground placeholder:text-gray-400 py-3 pl-4"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          )}
        </div>

        <div className="w-full mb-2">
          <div className="flex items-center gap-2 mb-3">
            <FaCheckCircle className="w-4 h-4 text-primary" />
            <label className="text-foreground text-base font-medium">
              Confirm New Password
            </label>
          </div>
          <Input
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Confirm new password"
            required
            className="bg-background border-border text-foreground placeholder:text-gray-400 py-3 pl-4"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.confirmPassword}
            </div>
          )}
        </div>

        {/* Reset Password Button */}
        <Button
          className="w-full mt-8 py-3 text-base font-medium"
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {formik.isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin">⟳</div>
              Resetting Password...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FaCheckCircle className="w-4 h-4" />
              Reset Password
            </div>
          )}
        </Button>
      </form>

      {/* Back to Login */}
      <button
        onClick={handleBackToLogin}
        className="text-primary mt-6 text-sm hover:underline flex items-center gap-2"
      >
        <FaArrowLeft className="w-3 h-3" />
        Back to Sign In
      </button>
    </div>
  );
};

export default ResetPasswordPage;