"use client";
import { Card, Input, Button, Form, message, Typography } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const { Title } = Typography;

const EditPhoneDetails = ({ session }: { session: any }) => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const phoneNumber = searchParams.get("phone");
    if (phoneNumber) {
      form.setFieldsValue({ phone: phoneNumber });
    }
  }, [searchParams]);

  const handleUpdate = async (values: { phone: string }) => {
    setLoading(true);
    console.log("Updated phone number:", values.phone);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}identity-service/api/v1/user/update-user-phone`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.access_token}`,
        },
        body: JSON.stringify({
          phone: values.phone,
          id: session?.user?.id,
        }),
      }
    );

    if (res.ok) {
      messageApi.open({
        type: "success",
        content: "Cập nhật số điện thoại thành công",
      });
      router.push(`/home/customer/${session?.user?.id}`);
    } else {
      messageApi.open({
        type: "error",
        content: "Cập nhật số điện thoại thất bại",
      });
    }
    setLoading(false);
  };

  return (
    <>
      {contextHolder}
      <Card
        title={
          <Title level={4} style={{ margin: 0, textAlign: "center" }}>
            Chỉnh sửa số điện thoại
          </Title>
        }
        style={{
          maxWidth: 420,
          margin: "50px auto",
          borderRadius: "12px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          background: "#fff",
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            label="Số điện thoại mới"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input
              placeholder="Nhập số điện thoại mới"
              size="large"
              style={{ borderRadius: "10px", padding: "12px" }}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            style={{
              borderRadius: "10px",
              padding: "12px",
              fontSize: "16px",
              fontWeight: "bold",
              width: "100%",
            }}
          >
            Cập nhật
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default EditPhoneDetails;
