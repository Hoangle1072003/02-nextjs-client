"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, message, Col, Divider, Form, Input, Row } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const data = {
        ...values,
        id,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}identity-service/api/v1/auth/reset-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (res.status === 200) {
        console.log("Password reset successfully");
        messageApi.open({
          type: "success",
          content: "Mật khẩu đã được đặt lại thành công!",
        });
        setTimeout(() => {
          router.push("/auth/login");
        }, 1500);
      }
      console.log("Password reset values:", data);
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col xs={24} sm={20} md={16} lg={8}>
          <fieldset
            style={{
              padding: "20px",
              margin: "10px",
              border: "1px solid #f0f0f0",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
            }}
          >
            <legend>Đặt lại mật khẩu</legend>
            <Form
              name="reset-password"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
              initialValues={{
                password: "",
                "confirm-password": "",
              }}
            >
              <Form.Item
                label="Mật khẩu mới"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                  {
                    min: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự!",
                  },
                ]}
              >
                <Input.Password placeholder="Nhập mật khẩu mới" />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Xác nhận mật khẩu mới" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  Đặt lại mật khẩu
                </Button>
              </Form.Item>
            </Form>

            <Link href={"/"}>
              <ArrowLeftOutlined /> Quay lại trang chủ
            </Link>

            <Divider />

            <div style={{ textAlign: "center" }}>
              Chưa có tài khoản?{" "}
              <Link href={"/auth/register"}>Đăng ký tại đây</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
    </>
  );
};

export default ResetPassword;
