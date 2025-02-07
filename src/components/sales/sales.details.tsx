"use client";
import { LeftOutlined } from "@ant-design/icons";
import {
  Descriptions,
  Divider,
  Result,
  Skeleton,
  Table,
  Tag,
  Empty,
  Flex,
  Button,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import React, { useState } from "react";
import SalesModalCancel from "./sales.modalCancel";

interface Iprops {
  id: string;
  session: any;
}

const SalesDetails = ({ id, session }: Iprops) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const fetchOrdersById = async (url: string) => {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${session?.user?.access_token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
  };

  const {
    data: dataOrderDetails,
    error,
    isLoading,
  } = useSWR(
    session?.user?.access_token
      ? `${process.env.NEXT_PUBLIC_API_URL}order-service/api/v1/orders/get-all-orders-by-order-id/${id}`
      : null,
    fetchOrdersById,
    { revalidateOnFocus: false }
  );

  if (error) {
    return (
      <Result
        status="error"
        title="Error"
        subTitle="Unable to load orders. Please try again later."
      />
    );
  }

  if (isLoading) {
    return <Skeleton active />;
  }

  const order = dataOrderDetails?.data || {};
  const cartItems = order?.cartItems || [];
  const paymentStatus = order?.paymentStatus || "Chưa xác định";
  const orderStatus = order?.cart?.status || "Chưa xác định";
  const totalAmount = order?.totalAmount || 0;

  const getStatusTag = (status: string) => {
    let color = "default";
    let translatedStatus = status;

    switch (status) {
      case "ACTIVE":
        color = "blue";
        translatedStatus = "Đang hoạt động";
        break;
      case "COMPLETED":
        color = "green";
        translatedStatus = "Hoàn thành";
        break;
      case "EXPIRED":
        color = "gray";
        translatedStatus = "Hết hạn";
        break;
      case "CANCELLED":
        color = "red";
        translatedStatus = "Đã hủy";
        break;
      case "PENDING":
        color = "orange";
        translatedStatus = "Đang chờ xử lý";
        break;
      default:
        translatedStatus = "Chưa xác định";
    }

    return <Tag color={color}>{translatedStatus}</Tag>;
  };

  const getPaymentTag = (status: string) => {
    let color = "default";
    let translatedStatus = status;

    if (status === "SUCCESS") {
      color = "green";
      translatedStatus = "Thành công";
    } else if (status === "PENDING") {
      color = "orange";
      translatedStatus = "Đang chờ";
    } else if (status === "FAILED") {
      color = "red";
      translatedStatus = "Thất bại";
    } else if (status === "REFUNDED") {
      color = "blue";
      translatedStatus = "Đã hoàn tiền";
    } else if (status === "EXPIRED") {
      color = "gray";
      translatedStatus = "Hết hạn";
    } else if (status === "CANCELLED") {
      color = "red";
      translatedStatus = "Đã hủy";
    }

    return <Tag color={color}>{translatedStatus}</Tag>;
  };

  const columns = [
    {
      title: "Sản phẩm",
      render: (_: any, record: any) => {
        console.log(record);

        const variant = record.productVariant?.varients?.[0];
        const productName = record.productVariant?.name;
        const imageUrl = variant?.image;
        const productVariant = variant?.name;

        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={productName}
                width={50}
                height={50}
                style={{ borderRadius: "5px", objectFit: "cover" }}
              />
            )}
            <span style={{ marginLeft: "10px" }}>{productName}</span>
          </div>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number) => {
        return (
          <Tag color="blue" key={quantity}>
            {quantity}
          </Tag>
        );
      },
    },
    {
      title: "Giá",
      render: (_: any, record: any) => {
        const productPrice = record.productVariant?.varients?.[0]?.price;
        return productPrice
          ? `${productPrice.toLocaleString("vi-VN")} VND`
          : "N/A";
      },
    },
    {
      title: "Biến thể",
      render: (_: any, record: any) => {
        return record.productVariant?.varients?.[0]?.name || "N/A";
      },
    },
  ];

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (reason: string) => {
    setConfirmLoading(true);

    const payload = {
      orderId: id,
      userId: session?.user?.id,
      reason: reason,
    };

    console.log("Dữ liệu gửi API:", payload);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <>
      <div>
        <Flex justify="space-between" align="center">
          <Link href="/sales/order/history">
            <LeftOutlined />
            Quay lại
          </Link>
          <Button
            type="primary"
            disabled={paymentStatus !== "PENDING"}
            style={{
              backgroundColor:
                paymentStatus === "SUCCESS" && orderStatus === "SHIPPING"
                  ? "#4CAF50"
                  : paymentStatus === "SUCCESS" && orderStatus === "PROCESSING"
                  ? "#2196F3"
                  : paymentStatus === "PENDING" && orderStatus === "ACTIVE"
                  ? "#FF5722"
                  : paymentStatus === "FAILED" || paymentStatus === "CANCELLED"
                  ? "#9E9E9E"
                  : "#D32F2F",

              borderColor: "transparent",
              color: "#FFF",
              fontWeight: "bold",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor:
                paymentStatus === "PENDING" && orderStatus === "ACTIVE"
                  ? "pointer"
                  : "default",
              opacity: paymentStatus !== "PENDING" ? 0.6 : 1,
            }}
            onClick={
              paymentStatus === "PENDING" && orderStatus === "ACTIVE"
                ? showModal
                : undefined
            }
          >
            {paymentStatus === "PENDING" && orderStatus === "ACTIVE"
              ? "Hủy đơn hàng"
              : paymentStatus === "FAILED" || paymentStatus === "CANCELLED"
              ? "Đơn hàng đã hủy"
              : paymentStatus === "SUCCESS" && orderStatus === "SHIPPING"
              ? "Đơn hàng đang giao"
              : paymentStatus === "SUCCESS" && orderStatus === "PROCESSING"
              ? "Đơn hàng đang chờ xử lý"
              : "Bạn cần liên hệ để huỷ đơn hàng"}
          </Button>
        </Flex>

        <Divider style={{ marginBottom: "20px", marginTop: "20px" }} />

        <Descriptions bordered column={1}>
          <Descriptions.Item label="Mã đơn hàng">{order?.id}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái thanh toán">
            {getPaymentTag(paymentStatus)}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái đơn hàng">
            {getStatusTag(orderStatus)}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng tiền">
            {totalAmount.toLocaleString("vi-VN")} VND
          </Descriptions.Item>
          <Descriptions.Item label="Phương thức thanh toán">
            {order?.paymentMethod || "Chưa xác định"}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ giao hàng">
            {order?.shipping || "Chưa cập nhật"}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <h3>Chi tiết sản phẩm</h3>
        {cartItems.length > 0 ? (
          <Table
            dataSource={cartItems}
            columns={columns}
            rowKey="id"
            pagination={false}
            bordered
            loading={isLoading}
            locale={{
              emptyText: isLoading ? (
                <Skeleton active />
              ) : (
                <>
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Không có dữ liệu"
                  />
                </>
              ),
            }}
          />
        ) : (
          <p>Không có sản phẩm trong đơn hàng này.</p>
        )}
      </div>
      {/* modal */}
      <SalesModalCancel
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      />
    </>
  );
};

export default SalesDetails;
