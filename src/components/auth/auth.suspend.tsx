"use client";
import React, { useState } from "react";
import { Flex, Input, Button, message, Form } from "antd";
import type { GetProps } from "antd";
import { useSession } from "next-auth/react";

type OTPProps = GetProps<typeof Input.OTP>;

const AuthSuspense = () => {
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [otp, setOtp] = useState("");
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onChange: OTPProps["onChange"] = (text) => {
    setOtp(text);
  };

  const onInput: OTPProps["onInput"] = (value) => {
    console.log("onInput:", value);
  };

  const handleSendEmail = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}identity-service/api/v1/auth/send-active-account-suspend`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to send email");
      }
      const data = await res.json();
      console.log("data", data);
      if (data) {
        messageApi.success(data?.message);
      }
    } catch (error) {
      messageApi.error("Vui lòng nhập email hợp lệ");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      messageApi.warning("Vui lòng nhập mã OTP");
      return;
    }

    setVerifying(true);
    try {
      const values = await form.validateFields();
      console.log("email: ", values.email);
      console.log("otp", otp);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}identity-service/api/v1/auth/active-account-suspend`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            otp: otp,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to verify OTP");
      }
      const data = await res.json();
      console.log("data", data);
      if (data) {
        messageApi.success(data?.message);
      }
    } catch (error) {
      messageApi.error("Xác nhận OTP thất bại");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Form form={form} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
        <Flex gap="middle" align="flex-start" vertical>
          <Input.OTP variant="filled" onChange={onChange} onInput={onInput} />
          <Flex gap="small">
            <Button type="primary" loading={loading} onClick={handleSendEmail}>
              Gửi mã OTP qua Email
            </Button>
            <Button
              type="primary"
              loading={verifying}
              onClick={handleVerifyOTP}
            >
              Xác nhận OTP
            </Button>
          </Flex>
        </Flex>
      </Form>
    </>
  );
};

export default AuthSuspense;
