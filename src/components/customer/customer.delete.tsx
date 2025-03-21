"use client";
import { useState } from "react";
import {
  Button,
  Col,
  Input,
  Radio,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import { signOut } from "next-auth/react";
import Link from "next/link";

const { Title, Paragraph } = Typography;

const reasons = {
  1: "Tôi không còn sử dụng dịch vụ này",
  2: "Tôi lo ngại về quyền riêng tư và bảo mật",
  3: "Tôi có một tài khoản khác",
  4: "Trải nghiệm không đáp ứng kỳ vọng của tôi",
  5: "Tôi gặp vấn đề với dịch vụ khách hàng",
  6: "Lý do khác",
};

const CustomerDelete = (props: any) => {
  const [selectedReason, setSelectedReason] = useState<number>(1);
  const [otherReason, setOtherReason] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { session } = props;

  const handleConfirm = async () => {
    const reason =
      selectedReason === 6 ? otherReason.trim() : reasons[selectedReason];
    if (!reason) {
      messageApi.open({
        content: "Vui lòng chọn lý do xóa tài khoản!",
        type: "error",
      });
      return;
    }
    if (!otp) {
      messageApi.open({
        content: "Vui lòng nhập mã OTP để xác nhận!",
        type: "error",
      });
      return;
    }
    setLoading(true);
    console.log("Lý do xóa tài khoản:", reason);
    console.log("OTP đã nhập:", otp);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}identity-service/api/v1/auth/cancel-account`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.access_token}`,
        },
        body: JSON.stringify({
          email: session?.user?.email,
          reason: reason,
          provider: session?.user?.provider,
        }),
      }
    );
    if (res.ok) {
      const data = res.json();
      messageApi.open({
        content: "Xóa tài khoản thành công!",
        type: "success",
      });
      console.log("Kết quả xóa tài khoản:", data);
      await signOut();
    } else if (res.status === 500) {
      messageApi.open({
        content: "Mã OTP không chính xác!",
        type: "error",
      });
    }
    setLoading(false);
  };

  const handleSendOtp = async () => {
    const reasonText =
      selectedReason === 6 ? otherReason.trim() : reasons[selectedReason];

    if (!reasonText) {
      messageApi.open({
        content: "Vui lòng chọn lý do xóa tài khoản!",
        type: "error",
      });
      return;
    }

    const requestData = {
      email: session?.user?.email,
      reason: reasonText,
      provider: session?.user?.provider,
    };

    setOtpSent(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}identity-service/api/v1/auth/send-otp-cancel-account`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.access_token}`,
        },
        body: JSON.stringify(requestData),
      }
    );
    console.log("Kết quả gửi mã OTP:1", res);

    if (res.ok) {
      const data = await res.json();
      console.log("Kết quả gửi mã OTP:", data);
      messageApi.open({
        content: "Mã OTP đã được gửi đến Email của bạn!",
        type: "success",
      });
    } else if (res.status === 500) {
      const data = await res.json();
      console.log("Kết quả gửi mã OTP:2", data);

      messageApi.open({
        content: `${data.message}`,
        type: "error",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={10}>
          <div style={{ padding: 16, background: "#fff3cd", borderRadius: 8 }}>
            <Title level={5}>⚠️ Cảnh báo quan trọng</Title>
            <Paragraph>
              - Sau khi xóa tài khoản, bạn sẽ <b>mất toàn bộ dữ liệu</b>, bao
              gồm lịch sử đơn hàng và thông tin cá nhân.
            </Paragraph>
            <Paragraph>
              - Thay vì xóa tài khoản, bạn có thể chọn <b>tạm khóa tài khoản</b>{" "}
              để có thể kích hoạt lại sau này.
            </Paragraph>
            <Link href={`/home/customer/${session?.user?.id}/suspend`}>
              <Button type="default" block style={{ marginTop: 12 }}>
                Tạm khóa tài khoản
              </Button>
            </Link>
          </div>
        </Col>

        <Col xs={24} md={14}>
          <Title level={5}>Tại sao bạn muốn xóa tài khoản?</Title>
          <Radio.Group
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              paddingTop: 12,
            }}
            onChange={(e) => setSelectedReason(e.target.value)}
            value={selectedReason}
          >
            {Object.entries(reasons).map(([key, value]) => (
              <Radio key={key} value={Number(key)}>
                {value}
                {Number(key) === 6 && selectedReason === 6 && (
                  <Input
                    placeholder="Nhập lý do"
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    style={{ marginTop: 8 }}
                  />
                )}
              </Radio>
            ))}
          </Radio.Group>

          <Title level={5} style={{ marginTop: 24 }}>
            Nhập mã OTP để xác nhận
          </Title>
          <Space.Compact style={{ width: "100%", marginBottom: 12 }}>
            <Input
              placeholder="Nhập mã OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={!otpSent}
            />
            <Button type="primary" onClick={handleSendOtp} disabled={otpSent}>
              {otpSent ? "Đã gửi" : "Gửi mã"}
            </Button>
          </Space.Compact>

          <Button
            type="primary"
            danger
            block
            style={{ marginTop: 20 }}
            onClick={handleConfirm}
            disabled={selectedReason === 6 && !otherReason.trim()}
            loading={loading}
          >
            Xác nhận xóa tài khoản
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default CustomerDelete;
