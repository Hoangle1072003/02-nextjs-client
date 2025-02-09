"use client";
import { Button, Col, Divider, Form, Input, message, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AuthRegister = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const router = useRouter();

  const onFinish = async (values: any) => {
    const { email, password, name } = values;

    setLoadings([true]);
    console.log("values", values);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}identity-service/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name }),
        }
      );
      setTimeout(async () => {
        setLoadings([false]);
        if (res.status === 201) {
          messageApi.success(
            "Đăng ký thành công - vui lòng kích hoạt tài khoản qua email"
          );
          router.push("/auth/login");
        } else {
          messageApi.error("Email đã tồn tại");
        }
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setLoadings([false]);
        messageApi.error("An error occurred. Please try again.");
      }, 2000);
      console.log(error);
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
            <legend>Đăng ký</legend>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
              initialValues={{
                email: "clientassist.office@gmail.com",
                password: "123456",
                name: "Client Assist",
              }}
            >
              <Form.Item
                label="Email"
                name="email"
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

              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loadings[0]}>
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
            <Link href={"/"}>
              <ArrowLeftOutlined /> Quay lại trang chủ
            </Link>
            <Divider />
            <div style={{ textAlign: "center" }}>
              Bạn đã có tài khoản?
              <Link href={"/auth/login"}>Đăng nhập tại đây</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
    </>
  );
};

export default AuthRegister;
