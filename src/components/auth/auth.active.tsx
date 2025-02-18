"use client";
import React, { useState, useEffect } from "react";
import { Button, Input, Steps } from "antd";
import { SmileOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const AuthStep = () => {
  const selectorEmail = useSelector((state: RootState) => state.authUser.user);
  const [currentStep, setCurrentStep] = useState(0);
  const [message, setMessage] = useState(
    "Tài khoản của bạn chưa được kích hoạt"
  );
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    if (countdown > 0) return;

    setLoading(true);
    setCurrentStep(1);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}identity-service/api/v1/auth/resend-activation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: selectorEmail?.email,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setTimeout(() => {
          setMessage("Vui lòng kiểm tra email của bạn");
          setCurrentStep(2);
          setLoading(false);
          setCountdown(60);
        }, 2000);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Lỗi gửi email kích hoạt:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Steps
        current={currentStep}
        items={[
          {
            title: "Login",
            status: currentStep >= 0 ? "finish" : "wait",
            icon: <UserOutlined />,
          },
          {
            title: "Done",
            status: currentStep >= 1 ? "finish" : "wait",
            icon: <SmileOutlined />,
          },
        ]}
      />
      <div style={{ marginTop: "20px" }}>
        <span>{message}</span>
      </div>
      <div>
        <Input
          disabled
          placeholder="Email của bạn"
          value={selectorEmail?.email}
          style={{ marginTop: "20px" }}
        />
      </div>
      <div>
        <Button
          type="primary"
          style={{ marginTop: "20px" }}
          onClick={handleResendEmail}
          disabled={countdown > 0 || loading}
          loading={loading}
        >
          {countdown > 0
            ? `Gửi lại sau ${countdown}s`
            : "Gửi lại email kích hoạt"}
        </Button>
      </div>
    </>
  );
};

export default AuthStep;
