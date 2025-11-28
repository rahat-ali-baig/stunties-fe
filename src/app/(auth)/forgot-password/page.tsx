'use client';

import { Button, Input } from '@/components/ui';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ForgotPasswordPage = () => {
  const { toast } = useToast();
  const router = useRouter();

  const emailSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: emailSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast({
          variant: "success",
          title: "OTP Sent Successfully",
          description: `We've sent a 6-digit code to ${values.email}`,
        });
        
        // Redirect to verify OTP page
        setTimeout(() => {
          router.push('/verify');
        }, 1000);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to Send OTP",
          description: "Please check your email and try again.",
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
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
          <FaEnvelope className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-foreground text-4xl font-coolvetica text-center">
          LOST YOUR PASS?
        </h2>
        <p className="text-foreground text-xl mt-2 text-center">
          NO SWEAT - <span className='text-primary'>RESET IT</span>
        </p>
      </div>

      <p className="text-foreground mt-4 text-center text-lg">
        Enter email below to receive a reset
      </p>

      <form onSubmit={formik.handleSubmit} className="w-full flex flex-col mt-8">
        <div className="w-full">
          <Input
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="e.g. joeadams@gmail.com"
            required
            className="bg-background border-border text-foreground placeholder:text-gray-400 text-center py-3"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1 text-center">
              {formik.errors.email}
            </div>
          )}
        </div>

        <Button
          className="w-full mt-8"
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {formik.isSubmitting ? (
            <div className="animate-spin">⟳</div>
          ) : (
            <FaEnvelope className="w-4 h-4 mr-2" />
          )}
          {formik.isSubmitting ? 'Sending OTP...' : 'Send OTP'}
        </Button>
      </form>

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

export default ForgotPasswordPage;