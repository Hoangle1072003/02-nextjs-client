"use client";
import { Button, Col, Divider, Form, Input, message, Modal, Row } from "antd";
import { ArrowLeftOutlined, GoogleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authenticate } from "@/utils/actions";
import { useState } from "react";
import AuthStep from "./auth.active";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/features/auth/authSlice";
import { signIn } from "next-auth/react";

const AuthLogin = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const onFinish = async (values: any) => {
    const { username, password } = values;

    setLoadings([true]);

    try {
      const res = await authenticate(username, password);
      // if (res?.error && res?.code === 2) {
      //   dispatch(setUser({ email: username }));
      //   console.log("res.error", res);
      //   messageApi.error(res.error);
      //   setOpen(true);
      // } else {
      //   messageApi.success("Login successfully!");

      //   setTimeout(() => {
      //     router.push("/");
      //   }, 2000);
      // }
      if (res?.error) {
        if (res?.code === 2) {
          dispatch(setUser({ email: username }));
          setOpen(true);
        }
        messageApi.error(res.error);
      } else {
        messageApi.success("Login successfully!");

        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      messageApi.error("An error occurred. Please try again.");
      console.log(error);
    } finally {
      setTimeout(() => setLoadings([false]), 1000);
    }
  };

  const handleLoginGoogle = async () => {
    await signIn("google", {
      callbackUrl: "/",
      redirect: false,
    });
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
                  Đăng nhập
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
            <Divider />
            {/* Login Google */}
            <div
              style={{
                textAlign: "center",
                margin: "10px 0",
              }}
            >
              <GoogleOutlined
                style={{
                  fontSize: "30px",
                  color: "#DB4437",
                  cursor: "pointer",
                }}
                onClick={handleLoginGoogle}
              />
            </div>
          </fieldset>
        </Col>
      </Row>
      <Modal
        title="Kích hoạt tài khoản"
        open={open}
        onCancel={handleCancel}
        footer
      >
        <AuthStep />
      </Modal>
    </>
  );
};

export default AuthLogin;
