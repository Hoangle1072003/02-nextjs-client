"use client";

import { signIn } from "next-auth/react";
import { Button } from "antd";

const AuthLogin = () => {
  const handleGoogleLogin = async () => {
    await signIn("google");
  };

  return (
    <>
      <Button type="primary" onClick={handleGoogleLogin}>
        Đăng nhập bằng Google
      </Button>
    </>
  );
};

export default AuthLogin;
