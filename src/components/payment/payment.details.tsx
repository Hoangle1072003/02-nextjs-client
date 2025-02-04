"use client";
import {
  Button,
  Card,
  Col,
  Radio,
  RadioChangeEvent,
  Row,
  Skeleton,
  message,
} from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

interface IProps {
  session: {
    user: {
      id: string;
      access_token: string;
    };
  };
  user: IUserById;
}
const PaymentDetails = (props: IProps) => {
  const { user } = props;
  const router = useRouter();
  const [value, setValue] = useState<"COD" | "VNPay">("COD");
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const onChange = (e: RadioChangeEvent) => {
    const selectedValue = e.target.value === 1 ? "COD" : "VNPay";
    setValue(selectedValue);
  };

  const fetcher = (url: string) => {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${props?.session?.user?.access_token}`,
      },
    }).then((res) => res.json());
  };

  const {
    data: cartUserId,
    error: cartUserIdError,
    isLoading: cartUserIdLoading,
  } = useSWR(
    props?.session?.user?.id
      ? `${process.env.NEXT_PUBLIC_API_URL}cart-service/api/v1/cart/user/${props?.session?.user?.id}`
      : null,
    fetcher
  );

  if (cartUserIdError) {
    return <div>Failed to load cart details</div>;
  }
  if (cartUserIdLoading) {
    return <Skeleton active />;
  }

  const handleOrder = async () => {
    setLoading(true);

    if (!cartUserId || !cartUserId?.data?.id) {
      messageApi.open({
        type: "error",
        content: "Chưa có giỏ hàng, vui lòng thử lại.",
      });
      setLoading(false);
      return;
    }

    const newOrder = {
      userId: props?.session?.user?.id,
      cartId: cartUserId?.data?.id,
      shipping: user?.address || "Chưa cập nhật địa chỉ",
      paymentMethod: value,
    };

    if (value === "VNPay") {
      try {
        setOrder(newOrder);

        const orderRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}order-service/api/v1/orders`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${props?.session?.user?.access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newOrder),
          }
        );

        const orderData = await orderRes.json();
        console.log("Order data", orderData?.data?.id);

        if (orderData?.data) {
          const paymentRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}payment-service/api/v1/payment/find-payment-by-user-id`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${props?.session?.user?.access_token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: props?.session?.user?.id,
                orderId: orderData?.data?.id,
              }),
            }
          );

          const paymentData = await paymentRes.json();
          console.log("Full Payment API response", paymentData);

          if (paymentData?.data?.paymentUrl) {
            router.push(paymentData?.data?.paymentUrl);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    } else {
      setLoading(true);
      console.log("COD selected");

      setTimeout(() => {
        setLoading(false);
        messageApi.open({
          type: "error",
          content: "Chức năng COD đang phát triển, vui lòng chọn VNPAY",
        });
      }, 2000);
    }
  };

  return (
    <>
      {contextHolder}
      <Row gutter={[16, 16]}>
        <Col span={17}>
          <Card
            title="Chọn phương thức thanh toán"
            bordered={false}
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: 20,
            }}
          >
            <Radio.Group
              onChange={onChange}
              value={value === "COD" ? 1 : 2}
              style={{
                width: "fit-content",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {/* PHƯƠNG THỨC COD */}
              <Radio
                value={1}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  background: "#fff",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
              >
                <span style={{ flex: 1, fontSize: 16, fontWeight: 500 }}>
                  Thanh toán khi nhận hàng (COD)
                </span>
                <Image
                  src="https://salt.tikicdn.com/ts/upload/92/b2/78/1b3b9cda5208b323eb9ec56b84c7eb87.png"
                  alt="COD"
                  width={50}
                  height={50}
                />
              </Radio>

              {/* PHƯƠNG THỨC VNPAY */}
              <Radio
                value={2}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  background: "#fff",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
              >
                <span style={{ flex: 1, fontSize: 16, fontWeight: 500 }}>
                  Thanh toán qua VNPAY
                </span>
                <Image
                  src="https://salt.tikicdn.com/ts/upload/77/6a/df/a35cb9c62b9215dbc6d334a77cda4327.png"
                  alt="VNPAY"
                  width={50}
                  height={50}
                />
              </Radio>
            </Radio.Group>
          </Card>
        </Col>

        <Col span={7}>
          {/* Card information */}
          <Card
            bordered={false}
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: 20,
              background: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <h4 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
                Giao tới
              </h4>
              <a style={{ fontSize: 14, color: "#1890ff", cursor: "pointer" }}>
                Thay đổi
              </a>
            </div>

            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
                <span
                  style={{
                    fontSize: 14,
                    color: "#555",
                    marginRight: 4,
                  }}
                >
                  Tên:
                </span>
                {user?.name || "Chưa cập nhật tên"}
              </h3>
              <p style={{ fontSize: 14, color: "#555", margin: "4px 0" }}>
                <span
                  style={{
                    fontSize: 14,
                    color: "#555",
                    marginRight: 4,
                  }}
                >
                  Số điện thoại:
                </span>
                {user?.phone || "Chưa cập nhật số điện thoại"}
              </p>
              <p style={{ fontSize: 14, color: "#555", margin: "4px 0" }}>
                <span
                  style={{
                    fontSize: 14,
                    color: "#555",
                    marginRight: 4,
                  }}
                >
                  Địa chỉ:
                </span>
                {user?.address || "Chưa cập nhật địa chỉ"}
              </p>
            </div>
          </Card>
          {/* Card order */}
          <Card
            bordered={false}
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: 16,
              background: "#fff",
              marginTop: 16,
            }}
          >
            {/* Tiêu đề & Thay đổi */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <h4 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
                Đơn hàng
              </h4>
              <a style={{ fontSize: 14, color: "#1890ff", cursor: "pointer" }}>
                Thay đổi
              </a>
            </div>

            {/* Sản phẩm & Xem thông tin */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <p style={{ fontSize: 14, color: "#555", margin: 0 }}>
                1 sản phẩm
              </p>
              <a style={{ fontSize: 14, color: "#1890ff", cursor: "pointer" }}>
                Xem thông tin
              </a>
            </div>

            <hr style={{ border: "0.5px solid #ddd", margin: "8px 0" }} />

            {/* Chi tiết giá */}
            <div style={{ fontSize: 14, color: "#555" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span>Tổng tiền hàng</span>
                <span style={{ fontWeight: 500 }}>
                  {cartUserId?.data?.total?.toLocaleString()} VND
                </span>
              </div>

              <hr style={{ border: "0.5px solid #ddd", margin: "8px 0" }} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#000",
                }}
              >
                <span>Tổng tiền thanh toán</span>
                <span style={{ color: "#fa541c" }}>
                  {cartUserId?.data?.total.toLocaleString()} VND
                </span>
              </div>

              <p style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và
                các chi phí phát sinh khác)
              </p>
            </div>

            <Button
              loading={loading}
              onClick={() => handleOrder()}
              type="primary"
              style={{
                width: "100%",
                marginTop: 16,
                background: "#fa541c",
                border: "1px solid #fa541c",
                color: "#fff",
              }}
            >
              Đặt hàng
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default PaymentDetails;
