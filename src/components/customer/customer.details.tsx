"use client";
import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Popconfirm,
  Radio,
  Row,
  Skeleton,
  Typography,
  message,
} from "antd";
import React, { useState } from "react";
import { revalidateTag } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CustomerDetails = ({ user, access_token }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState(user?.gender || "");
  const router = useRouter();

  if (!user) return <Skeleton active />;

  const onFinish = async (values) => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}identity-service/api/v1/user/update-user-client`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ ...values, id: user?.id }),
      }
    );
    if (!res.ok) {
      messageApi.error("Cập nhật thông tin thất bại");
      setLoading(false);
      return;
    }
    messageApi.success("Cập nhật thông tin thành công");
    setLoading(false);
    revalidateTag("customer-details");
  };

  const handleChangeDelete = () => {
    router.push(`/home/customer/${user?.id}/delete/account`);
  };

  return (
    <>
      {contextHolder}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={14}>
          <Card title="Thông tin cá nhân" style={{ borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Avatar size={80} icon={<UserOutlined />} />
              <Form
                initialValues={{
                  name: user?.name || "",
                  address: user?.address ?? "",
                  gender: user?.gender ?? "",
                }}
                layout="vertical"
                onFinish={onFinish}
                style={{ flex: 1 }}
              >
                <Form.Item label="Họ & Tên" name="name">
                  <Input placeholder="Nhập họ & tên" />
                </Form.Item>
                <Form.Item label="Giới tính" name="gender">
                  <Radio.Group
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <Radio value="FEMALE">Nữ</Radio>
                    <Radio value="MALE">Nam</Radio>
                    <Radio value="OTHER">Khác</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Địa chỉ" name="address">
                  <Input placeholder="Nhập địa chỉ" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                  >
                    Cập nhật
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={10}>
          <Card title="Thông tin liên hệ" style={{ borderRadius: 12 }}>
            {/* Phone */}
            <InfoItem
              iconSrc="https://frontend.tikicdn.com/_desktop-next/static/img/account/phone.png"
              label="Số điện thoại"
              value={user?.phone ?? "Chưa cập nhật"}
              action={
                <Link
                  href={{
                    pathname: `/home/customer/${user?.id}/edit/phone`,
                    query: { phone: user?.phone },
                  }}
                >
                  <Button type="primary">Cập nhật</Button>
                </Link>
              }
            />
            {/* Email */}
            <InfoItem
              iconSrc="https://frontend.tikicdn.com/_desktop-next/static/img/account/email.png"
              label="Địa chỉ email"
              value={user?.email}
            />
            {/* Security */}
            <Typography.Title level={5}>Bảo mật tài khoản</Typography.Title>
            <InfoItem
              iconSrc="https://frontend.tikicdn.com/_desktop-next/static/img/account/lock.png"
              label="Thiết lập mật khẩu"
              action={<Button type="primary">Cập nhật</Button>}
            />
            {/* Delete Account */}
            <InfoItem
              iconSrc="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
              label="Xóa tài khoản"
              action={
                <Popconfirm
                  title="Cảnh báo"
                  description="Bạn có chắc chắn muốn xóa tài khoản này không?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={handleChangeDelete}
                >
                  <Button danger>Xoá</Button>
                </Popconfirm>
              }
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

const InfoItem = ({ iconSrc, label, value, action }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Image src={iconSrc} width={30} height={30} alt={label} />
      <div>
        <Typography.Text>{label}</Typography.Text>
        {value && (
          <Typography.Text style={{ display: "block", color: "gray" }}>
            {value}
          </Typography.Text>
        )}
      </div>
    </div>
    {action}
  </div>
);

export default CustomerDetails;
