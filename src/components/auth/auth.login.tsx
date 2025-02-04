"use client";
import { Button, Col, Divider, Form, Input, message, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authenticate } from "@/utils/actions";
import { useState } from "react";

const AuthLogin = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loadings, setLoadings] = useState<boolean[]>([]); // Track loading state for buttons
  const router = useRouter();

  const onFinish = async (values: any) => {
    const { username, password } = values;

    setLoadings([true]);

    try {
      const res = await authenticate(username, password);

      if (res?.error) {
        messageApi.error(res.error);
      } else {
        messageApi.success("Login successfully!");

        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      messageApi.error("An error occurred. Please try again.");
    } finally {
      setTimeout(() => setLoadings([false]), 1000);
    }
  };

  return (
    <>
      {contextHolder}
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col xs={24} md={16} lg={8}>
          <fieldset
            style={{
              padding: "15px",
              margin: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <legend>Đăng Nhập</legend>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
              initialValues={{
                username: "clientassist.office@gmail.com",
                password: "123456",
              }}
            >
              <Form.Item
                label="Email"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loadings[0]}>
                  Login
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

export default AuthLogin;
