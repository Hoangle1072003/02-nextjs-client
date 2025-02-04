"use client";

import Title from "antd/es/typography/Title";
import {
  Card,
  Col,
  Row,
  Button,
  Divider,
  Checkbox,
  InputNumber,
  Skeleton,
  Empty,
  message,
  Image,
  Popconfirm,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";

const CartDetails = ({ session }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const fetcher = (url) =>
    fetch(url, {
      headers: { Authorization: `Bearer ${session?.user?.access_token}` },
    }).then((res) => res.json());
  const [messageApi, contextHolder] = message.useMessage();
  const {
    data: cartDetails,
    error,
    isLoading,
    mutate,
  } = useSWR(
    session?.user?.id
      ? `${process.env.NEXT_PUBLIC_API_URL}cart-service/api/v1/cart-item/${session?.user?.id}`
      : null,
    fetcher
  );

  const [checkedList, setCheckedList] = useState([]);
  const [cartData, setCartData] = useState(cartDetails);

  useEffect(
    () => setCartData(cartDetails),

    [cartDetails]
  );

  const handleQuantityChange = async (
    productId: string,
    variantId: string,
    newQuantity: number
  ) => {
    const previousCart = { ...cartData };
    setCartData((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        products: prev.data.products.map((item) =>
          item.productId === productId
            ? {
                ...item,
                varients: [{ ...item.varients[0], quantity: newQuantity }],
              }
            : item
        ),
      },
    }));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}cart-service/api/v1/cart-item/update-quantity`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.access_token}`,
          },
          body: JSON.stringify({
            userId: session.user.id,
            productId,
            variantId,
            quantity: newQuantity,
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to update quantity");
      mutate();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Không thể cập nhật số lượng",
      });
      setCartData(previousCart);
    }
  };

  if (error) return <div>Failed to load cart details</div>;
  if (isLoading) return <Skeleton active />;
  if (!cartData?.data)
    return (
      <>
        <Card
          title="Giỏ hàng của bạn"
          style={{
            marginBottom: 10,
            boxShadow: "0 4px 6px rgba(57,73,76,.35)",
            borderRadius: "8px",
            border: "1px solid #f0f0f0",
          }}
          extra={
            <Button type="primary" onClick={() => router.push("/")}>
              Tiếp tục mua hàng
            </Button>
          }
        >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Không có sản phẩm nào trong giỏ hàng"
          />
        </Card>
      </>
    );

  console.log(cartDetails);

  return (
    <>
      {contextHolder}
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Title level={5}>Giỏ hàng của bạn</Title>
          <Card>
            <Checkbox
              indeterminate={
                checkedList.length > 0 &&
                checkedList.length < cartData.data.products.length
              }
              checked={checkedList.length === cartData.data.products.length}
              onChange={(e) =>
                setCheckedList(
                  e.target.checked
                    ? cartData.data.products.map((item) => item.productId)
                    : []
                )
              }
            >
              Tất cả
            </Checkbox>
          </Card>

          <Card style={{ marginTop: 10 }}>
            {cartData.data.products.map((item) => (
              <Row
                key={item.productId}
                align="middle"
                gutter={16}
                style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}
              >
                <Col span={1}>
                  <Checkbox value={item.productId} />
                </Col>
                {/* <Col span={2}>
                <Image
                  src={item?.varients[item]?.variant_img}
                  alt={item?.productName}
                  width={50}
                  height={50}
                />
              </Col> */}
                <Col span={5}>{item.productName}</Col>
                <Col span={4} style={{ textAlign: "right" }}>
                  {item.varients[0].variantPrice.toLocaleString()} VND
                </Col>
                <Col span={4}>
                  <InputNumber
                    min={1}
                    value={item.varients[0].quantity}
                    onChange={(value) =>
                      handleQuantityChange(
                        item.productId,
                        item.varients[0].variantId,
                        value || 1
                      )
                    }
                  />
                </Col>
                <Col span={4} style={{ textAlign: "right" }}>
                  {(
                    item.varients[0].variantPrice * item.varients[0].quantity
                  ).toLocaleString()}{" "}
                  VND
                </Col>
                <Col span={2} style={{ textAlign: "center" }}>
                  <Popconfirm
                    title="Xác nhận xóa sản phẩm này?"
                    description="Sản phẩm sẽ bị xóa khỏi giỏ hàng"
                    okText="Có"
                    cancelText="Không"
                    onConfirm={async () => {
                      try {
                        const response = await fetch(
                          `${process.env.NEXT_PUBLIC_API_URL}cart-service/api/v1/cart-item`,
                          {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${session?.user?.access_token}`,
                            },
                            body: JSON.stringify({
                              userId: session.user.id,
                              variantId: item.varients[0].variantId,
                            }),
                          }
                        );
                        if (!response.ok)
                          throw new Error("Failed to delete item");

                        messageApi.open({
                          type: "success",
                          content: "Đã xóa sản phẩm khỏi giỏ hàng",
                        });
                        mutate();
                      } catch {
                        messageApi.open({
                          type: "error",
                          content: "Không thể xóa sản phẩm",
                        });
                      }
                    }}
                  >
                    <DeleteOutlined
                      style={{ color: "red", cursor: "pointer" }}
                    />
                  </Popconfirm>
                </Col>
              </Row>
            ))}
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Tóm tắt đơn hàng">
            <Row justify="space-between">
              <Col>Tổng tiền:</Col>
              <Col>
                {cartData.data.products
                  .reduce(
                    (total, item) =>
                      total +
                      item.varients[0].variantPrice * item.varients[0].quantity,
                    0
                  )
                  .toLocaleString()}{" "}
                VND
              </Col>
            </Row>
            <Divider />
            <Row justify="space-between">
              <Col>Giảm giá:</Col>
              <Col>- 0 VND</Col>
            </Row>
            <Row
              justify="space-between"
              style={{ fontWeight: "bold", fontSize: "16px", marginTop: "8px" }}
            >
              <Col>Thành tiền:</Col>
              <Col>
                {cartData.data.products
                  .reduce(
                    (total, item) =>
                      total +
                      item.varients[0].variantPrice * item.varients[0].quantity,
                    0
                  )
                  .toLocaleString()}{" "}
                VND
              </Col>
            </Row>
            <Divider />
            <Button
              type="primary"
              block
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  router.push("/checkout/payment");
                  setLoading(false);
                }, 2000);
              }}
              loading={loading}
            >
              Thanh toán {cartDetails.data.products.length} sản phẩm
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartDetails;
