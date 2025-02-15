import AuthForgot from "@/components/auth/auth.forgot";
import { Suspense } from "react";

const AuthForgotPasswordPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthForgot />
      </Suspense>
    </>
  );
};
export default AuthForgotPasswordPage;
