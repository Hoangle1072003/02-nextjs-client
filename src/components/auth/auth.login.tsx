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
import { set } from "nprogress";
import AuthSuspense from "./auth.suspend";

const AuthLogin = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openSuspend, setOpenSuspend] = useState(false);
  const dispatch = useDispatch();

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleCancelSuspend = () => {
    console.log("Clicked cancel button");
    setOpenSuspend(false);
  };

  const onFinish = async (values: any) => {
    const { username, password } = values;

    setLoadings([true]);

    try {
      const res = await authenticate(username, password);
      console.log("res", res);

      if (res?.error) {
        if (res?.code === 2) {
          dispatch(setUser({ email: username }));
          setOpen(true);
        }
        messageApi.error(res.error);
        if (res?.code === 5) {
          console.log("res.error", res);
          setOpenSuspend(true);
        }
        if (res?.code === 3) {
          alert("Tài khoản đã bị xóa");
        }
      } else if (res?.code === 1) {
        console.log("res.error", res);
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
              {/* forgot password */}
              <div
                style={{
                  textAlign: "right",
                }}
              >
                <Link href={"/guest/auth/forgot-password"}>Quên mật khẩu?</Link>
              </div>

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
              <Link href={"/guest/auth/register"}>Đăng ký tại đây</Link>
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
              {/* <GithubOutlined
                style={{
                  fontSize: "30px",
                  color: "#24292e",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
                onClick={handleLoginGithub}
              /> */}
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
      <Modal
        title="Bạn có muốn kích hoạt tài khoản không?"
        open={openSuspend}
        onCancel={handleCancelSuspend}
        footer
      >
        <AuthSuspense />
      </Modal>
    </>
  );
};

export default AuthLogin;
