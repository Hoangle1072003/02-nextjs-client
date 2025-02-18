import ResetPassword from "@/components/auth/auth.reset";
import { Suspense } from "react";

const ResetPasswordPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPassword />
      </Suspense>
    </>
  );
};
export default ResetPasswordPage;
