"use client";
import { LeftOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Descriptions,
  Divider,
  Result,
  Row,
  Skeleton,
  Space,
  Table,
  Tag,
  Steps,
  Popover,
  StepsProps,
  Empty,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import React from "react";

interface Iprops {
  id: string;
  session: any;
}

const { Step } = Steps;

const SalesDetails = ({ id, session }: Iprops) => {
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

  // const customDot: StepsProps["progressDot"] = (dot, { status, index }) => (
  //   <Popover
  //     content={
  //       <span>
  //         step {index} status: {status}
  //       </span>
  //     }
  //   >
  //     {dot}
  //   </Popover>
  // );

  return (
    <div>
      <Link href="/sales/order/history">
        <LeftOutlined />
        Quay lại
      </Link>

      <Divider style={{ marginBottom: "20px", marginTop: "20px" }} />

      {/* <Steps
        current={1}
        progressDot={customDot}
        style={{ marginBottom: "30px" }}
      >
        <Step title="Đơn hàng đã đặt" status="finish" />
        <Step title="Chi tiết sản phẩm" description="Danh sách sản phẩm" />
        <Step
          title="Trạng thái thanh toán"
          description="Thông tin thanh toán"
        />
      </Steps> */}

      <Descriptions bordered column={1}>
        <Descriptions.Item label="Mã đơn hàng">{order?.id}</Descriptions.Item>
        <Descriptions.Item label="Trạng thái thanh toán">
          {getStatusTag(paymentStatus)}
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
  );
};

export default SalesDetails;
