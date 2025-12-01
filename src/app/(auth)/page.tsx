'use client';

import { Button, Input } from '@/components/ui';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaArrowRight, FaUserShield } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const loginSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast({
          variant: "success",
          title: "Login Successful",
          description: "Welcome back to your dashboard!",
        });
        
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full max-w-[500px] flex flex-col items-center">
      {/* Header with Icon */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-primary-dark/20 rounded-full flex items-center justify-center mb-4">
          <FaUserShield className="w-8 h-8 text-primary-dark" />
        </div>
        <h2 className="text-foreground text-4xl font-coolvetica text-center">
          WELCOME BACK
        </h2>
        <p className="text-foreground text-xl mt-2 text-center">
          SIGN IN TO CONTINUE
        </p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col mt-4"
        autoFocus={true}
      >
        {/* Email Input */}
        <div className="w-full mb-6">
          <div className="flex items-center gap-2 mb-3">
            <FaEnvelope className="w-4 h-4 text-primary-dark" />
            <label className="text-foreground text-base font-medium">
              Email Address
            </label>
          </div>
          <Input
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your email"
            required
            className="bg-background border-border text-foreground placeholder:text-gray-400 py-3 pl-4"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
              {formik.errors.email}
            </div>
          )}
        </div>

        {/* Password Input */}
        <div className="w-full mb-2">
          <div className="flex items-center gap-2 mb-3">
            <FaLock className="w-4 h-4 text-primary-dark" />
            <label className="text-foreground text-base font-medium">
              Password
            </label>
          </div>
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="bg-background border-border text-foreground placeholder:text-gray-400 py-3 pl-4"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
              {formik.errors.password}
            </div>
          )}
        </div>

        {/* Forgot Password Link */}
        <Link 
          href="/forgot-password" 
          className="text-primary-dark self-end text-sm hover:underline flex items-center gap-1 mb-6"
        >
          Forgot Password?
          <FaArrowRight className="w-3 h-3" />
        </Link>

        {/* Sign In Button */}
        <Button 
          className="w-full mt-4 py-3 text-base font-medium" 
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {formik.isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin">⟳</div>
              Signing In...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FaUserShield className="w-4 h-4" />
              Sign In
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;