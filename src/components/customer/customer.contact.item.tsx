"use client";
import { Card, Button, Col, Image, Typography } from "antd";
import { FC } from "react";

const ContactInfoItem: FC<{ icon: string; label: string; value: string }> = ({
  icon,
  label,
  value,
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0",
    }}
  >
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image src={icon} width={30} height={30} alt={label} />
      <div style={{ marginLeft: "1rem" }}>
        <Typography.Text style={{ fontWeight: 600 }}>{label}</Typography.Text>
        <Typography.Text style={{ display: "block", color: "#555" }}>
          {value}
        </Typography.Text>
      </div>
    </div>
    <Button type="primary" style={{ transition: "0.3s", fontWeight: 500 }}>
      Cập nhật
    </Button>
  </div>
);

const ContactCard = () => {
  return (
    <Col span={11}>
      <Card title="Thông tin liên hệ">
        <ContactInfoItem
          icon="https://frontend.tikicdn.com/_desktop-next/static/img/account/phone.png"
          label="Số điện thoại"
          value="0123456789"
        />

        <ContactInfoItem
          icon="https://frontend.tikicdn.com/_desktop-next/static/img/account/email.png"
          label="Địa chỉ Email"
          value="hoang@gmail.com"
        />

        <Typography.Title level={5} style={{ marginTop: "1.5rem" }}>
          Bảo mật tài khoản
        </Typography.Title>

        <ContactInfoItem
          icon="https://frontend.tikicdn.com/_desktop-next/static/img/account/lock.png"
          label="Thiết lập mật khẩu"
          value=""
        />

        <ContactInfoItem
          icon="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
          label="Yêu cầu xóa tài khoản"
          value=""
        />
      </Card>
    </Col>
  );
};

export default ContactCard;
