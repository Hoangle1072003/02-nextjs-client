"use client";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Form, FormProps, Input, Row, Typography } from "antd";
import Link from "next/link";
import { useState } from "react";

const { Title } = Typography;

type FieldType = {
  email: string;
};

const AuthForgot = () => {
  const [result, setResult] = useState<boolean | null>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}identity-service/api/v1/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email }),
        }
      );

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage || "An error occurred. Please try again.");
      }

      setResult(true);
      setEmail(values.email);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col xs={24} sm={20} md={12} lg={8}>
        <fieldset
          style={{
            padding: "30px",
            margin: "10px",
            border: "1px solid #f0f0f0",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <legend>Quên mật khẩu</legend>
          <div style={{ marginBottom: "20px" }}>
            <Link href="/auth/login">
              <Button
                icon={<LeftOutlined />}
                type="link"
                style={{ padding: 0 }}
              >
                Quay lại
              </Button>
            </Link>
          </div>
          <Title level={5}>
            Vui lòng nhập email của bạn để lấy lại mật khẩu
          </Title>
          <Form
            name="basic"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email của bạn!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Gửi mã xác nhận
              </Button>
            </Form.Item>
          </Form>
          {result === true && (
            <p style={{ color: "green" }}>
              Hãy kiểm tra email {email} của bạn để lấy lại mật khẩu!
            </p>
          )}
        </fieldset>
      </Col>
    </Row>
  );
};

export default AuthForgot;
