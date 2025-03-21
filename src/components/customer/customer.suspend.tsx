"use client";
import { useState } from "react";
import { Button, Modal, Typography, message, Input } from "antd";
import { signOut } from "next-auth/react";

const { Title, Paragraph } = Typography;

const SuspendCustomer = (prop: any) => {
  const { session } = prop;
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuspended, setIsSuspended] = useState(false);
  const [unlockTime, setUnlockTime] = useState<Date | null>(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSuspend = async () => {
    if (!password) {
      setPasswordError("Vui lòng nhập mật khẩu.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:9191/identity-service/api/v1/auth/suspend-account",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.access_token}`,
          },
          body: JSON.stringify({
            email: session?.user?.email,
            provider: session?.user?.provider,
            password: password,
          }),
        }
      );

      const result = await response.json();
      console.log("result", result);
      if (result.statusCode === 500) {
        throw new Error("Mật khẩu không chính xác.");
      }

      if (!response.ok) {
        throw new Error(result.message || "Có lỗi xảy ra.");
      }

      setIsSuspended(true);
      const unlockDate = new Date();
      unlockDate.setDate(unlockDate.getDate() + 3);
      setUnlockTime(unlockDate);
      message.success("Tài khoản của bạn đã bị tạm khóa.");
      setModalVisible(false);
      setPassword("");
      await signOut();
    } catch (error) {
      setPasswordError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isSuspended ? (
        <div style={{ padding: 16, background: "#fff3cd", borderRadius: 8 }}>
          <Title level={5}>⚠️ Cảnh báo quan trọng</Title>
          <Paragraph>
            Nếu bạn tạm khóa tài khoản, bạn sẽ không thể đăng nhập trong thời
            gian khóa. Bạn có thể mở khóa lại sau.
          </Paragraph>
          <Button
            type="default"
            block
            danger
            onClick={() => setModalVisible(true)}
          >
            Tạm khóa tài khoản
          </Button>
        </div>
      ) : (
        <div style={{ padding: 16, background: "#ffcccc", borderRadius: 8 }}>
          <Title level={5}>🚫 Tài khoản của bạn đang bị tạm khóa</Title>
          {unlockTime ? (
            <Paragraph>
              Tài khoản của bạn sẽ tự động mở khóa vào:{" "}
              <b>{unlockTime.toLocaleString()}</b>
            </Paragraph>
          ) : (
            <Paragraph>Vui lòng liên hệ Admin để mở khóa.</Paragraph>
          )}
        </div>
      )}

      <Modal
        title="Xác nhận tạm khóa tài khoản"
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setPassword("");
          setPasswordError("");
        }}
        onOk={handleSuspend}
        confirmLoading={loading}
      >
        <Paragraph>Bạn có chắc chắn muốn tạm khóa tài khoản không?</Paragraph>
        <Input.Password
          placeholder="Nhập mật khẩu để xác nhận"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError("");
          }}
          style={{ marginTop: 10 }}
        />
        {passwordError && (
          <Paragraph style={{ color: "red", marginTop: 5 }}>
            {passwordError}
          </Paragraph>
        )}
      </Modal>
    </>
  );
};

export default SuspendCustomer;
