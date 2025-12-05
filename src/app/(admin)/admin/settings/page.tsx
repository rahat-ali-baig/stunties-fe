'use client';

import { useState } from 'react';
import { Input } from '@/components/ui';
import { useToast } from '@/components/ui/use-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  FaShieldAlt,
  FaEye,
  FaEyeSlash,
  FaCheck
} from 'react-icons/fa';
import PrimaryButton from '@/components/addons/PrimaryButton';

const ProfilePage = () => {
  const { toast } = useToast();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordSchema = Yup.object({
    currentPassword: Yup.string()
      .min(6, 'Current password must be at least 6 characters')
      .required('Current password is required'),
    newPassword: Yup.string()
      .min(8, 'New password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain uppercase, lowercase, number and special character'
      )
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: passwordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast({
          variant: "success",
          title: "Password Updated",
          description: "Your password has been changed successfully.",
        });

        resetForm();
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Password Change Failed",
          description: "Failed to change password. Please check your current password.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="h-[calc(100vh-120px)] w-full overflow-y-auto p-4">
      <div className="max-w-3xl">
        <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <FaShieldAlt className="w-4 h-4" />
          Change Password
        </h2>

        <form onSubmit={passwordFormik.handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Current Password
            </label>
            <div className="relative">
              <Input
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={passwordFormik.values.currentPassword}
                onChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
                placeholder="Enter current password"
                className={`bg-background border-foreground/20 pr-10 ${passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/60"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
              </button>
            </div>
            {passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword && (
              <div className="text-red-500 text-sm flex items-center gap-1">
                {passwordFormik.errors.currentPassword}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* New Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                New Password
              </label>
              <div className="relative">
                <Input
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordFormik.values.newPassword}
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  placeholder="Enter new password"
                  className={`bg-background border-foreground/20 pr-10 ${passwordFormik.touched.newPassword && passwordFormik.errors.newPassword ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/60"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
              {passwordFormik.touched.newPassword && passwordFormik.errors.newPassword && (
                <div className="text-red-500 text-sm flex items-center gap-1">
                  {passwordFormik.errors.newPassword}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordFormik.values.confirmPassword}
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  placeholder="Confirm new password"
                  className={`bg-background border-foreground/20 pr-10 ${passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/60"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
              {passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword && (
                <div className="text-red-500 text-sm flex items-center gap-1">
                  {passwordFormik.errors.confirmPassword}
                </div>
              )}
            </div>
          </div>

          {/* Password Requirements */}
          <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-4">
            <h3 className="text-sm font-medium text-foreground mb-2">Password Requirements</h3>
            <ul className="text-xs text-foreground/60 space-y-1">
              <li className={`flex items-center gap-2 ${passwordFormik.values.newPassword.length >= 8 ? 'text-emerald-600' : ''}`}>
                <FaCheck className="w-3 h-3" />
                At least 8 characters
              </li>
              <li className={`flex items-center gap-2 ${/[A-Z]/.test(passwordFormik.values.newPassword) ? 'text-emerald-600' : ''}`}>
                <FaCheck className="w-3 h-3" />
                One uppercase letter
              </li>
              <li className={`flex items-center gap-2 ${/[a-z]/.test(passwordFormik.values.newPassword) ? 'text-emerald-600' : ''}`}>
                <FaCheck className="w-3 h-3" />
                One lowercase letter
              </li>
              <li className={`flex items-center gap-2 ${/\d/.test(passwordFormik.values.newPassword) ? 'text-emerald-600' : ''}`}>
                <FaCheck className="w-3 h-3" />
                One number
              </li>
              <li className={`flex items-center gap-2 ${/[!@#$%^&*]/.test(passwordFormik.values.newPassword) ? 'text-emerald-600' : ''}`}>
                <FaCheck className="w-3 h-3" />
                One special character
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <PrimaryButton
              type="submit"
              variant="primary"
              icon={FaShieldAlt}
              disabled={passwordFormik.isSubmitting || !passwordFormik.isValid}
              className="w-full md:w-auto"
            >
              {passwordFormik.isSubmitting ? 'Updating...' : 'Update Password'}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;