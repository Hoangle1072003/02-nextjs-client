"use client";
import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Flex,
  Form,
  FormProps,
  Image,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Skeleton,
  Typography,
} from "antd";
import { useState } from "react";
import useSWR from "swr";
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
type IProps = {
  session: any;
};
const CustomerDetails = (prop: IProps) => {
  const { session } = prop;

  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const {
    data: user,
    error,
    isLoading,
  } = useSWR(
    session?.data?.user?.id
      ? `${process.env.NEXT_PUBLIC_API_URL}identity-service/api/v1/user/${session?.data?.user?.id}`
      : null,
    fetcher
  );

  if (isLoading) {
    return (
      <>
        <Skeleton active={isLoading} />
      </>
    );
  }

  if (error) {
    return <div>Failed to load user details</div>;
  }

  console.log("data", user);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const [value, setValue] = useState(0);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Row
        gutter={16}
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Col span={13}>
          <Card title="Thông tin cá nhân">
            <Flex
              justify="space-between"
              wrap
              style={{
                maxWidth: "465px",
              }}
            >
              <Avatar size={64} icon={<UserOutlined />} />
              <Form
                initialValues={{
                  name: session?.data?.user?.name ?? "",
                  email: session?.data?.user?.email ?? "",
                }}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{
                  minWidth: "400px",
                }}
              >
                <Form.Item<FieldType> label="Họ & Tên" name="name">
                  <Input
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>

                <Form.Item label="Giới tính">
                  <Radio.Group
                    onChange={onChange}
                    value={value}
                    options={[
                      { value: 1, label: "FEMALE" },
                      { value: 2, label: "MALE" },
                      { value: 3, label: "OTHER" },
                    ]}
                  />
                </Form.Item>

                <Form.Item label="Địa chỉ">
                  <Input
                    placeholder="Address"
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>

                <Form.Item label={null}>
                  <Button type="primary" htmlType="submit">
                    Cập nhật
                  </Button>
                </Form.Item>
              </Form>
            </Flex>
          </Card>
        </Col>
        <Col span={11}>
          <Card
            title="Thông tin liên hệ"
            style={{
              color: "grey",
              fontSize: "1rem",
            }}
          >
            {/* phone */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div>
                  <Image
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/account/phone.png"
                    width={30}
                    height={30}
                    alt="phone"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    Số điện thoại
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    0123456789
                  </span>
                </div>
              </div>
              <div>
                <Button type="primary" style={{ marginTop: "1rem" }}>
                  Cập nhật
                </Button>
              </div>
            </div>

            {/* email */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "1rem 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div>
                  <Image
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/account/email.png"
                    width={30}
                    height={30}
                    alt="phone"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    Địa chỉ email
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    {session?.data?.user?.email}
                  </span>
                </div>
              </div>
              <div>
                <Button type="primary" style={{ marginTop: "1rem" }}>
                  Cập nhật
                </Button>
              </div>
            </div>

            <Typography
              style={{
                margin: "1rem 0",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Bảo mật tài khoản
            </Typography>
            {/* Thiet lap mat khau */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "1rem 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div>
                  <Image
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/account/lock.png"
                    width={30}
                    height={30}
                    alt="phone"
                  />
                </div>
                <span
                  style={{
                    fontSize: "14px",
                  }}
                >
                  Thiết lập mật khẩu
                </span>
              </div>
              <div>
                <Button type="primary">Cập nhật</Button>
              </div>
            </div>
            {/* Yêu cầu xóa tài khoản */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "1.5rem 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div>
                  <Image
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
                    width={20}
                    height={20}
                    alt="phone"
                  />
                </div>
                <span
                  style={{
                    fontSize: "14px",
                  }}
                >
                  Yêu cầu xóa tài khoản
                </span>
              </div>
              <div>
                <Button type="primary">Yêu cầu</Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default CustomerDetails;
