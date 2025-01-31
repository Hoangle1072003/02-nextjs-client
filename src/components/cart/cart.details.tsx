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
} from "antd";
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { log } from "console";

const CheckboxGroup = Checkbox.Group;

interface IProps {
  session: any;
}

const CartDetails = (props: IProps) => {
  const { session } = props;
  const router = useRouter();
  const fetcher = (url: string) => {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    }).then((res) => res.json());
  };

  const {
    data: cartDetails,
    error: cartError,
    isLoading: cartLoading,
  } = useSWR(
    session?.user?.id
      ? `${process.env.NEXT_PUBLIC_API_URL}cart-service/api/v1/cart-item/${session?.user?.id}`
      : null,
    fetcher
  );

  const [checkedList, setCheckedList] = useState<string[]>([]);

  const onChange = (list: string[]) => {
    setCheckedList(list);
  };

  const indeterminate =
    checkedList.length > 0 &&
    checkedList.length < cartDetails?.data?.products.length;

  if (cartError) {
    return <div>Failed to load cart details</div>;
  }

  if (cartLoading) {
    return <Skeleton active />;
  }

  if (!cartDetails?.data) {
    return (
      <Empty
        description="Chưa có sản phẩm nào trong giỏ hàng"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }
  const handlePayment = () => {
    router.push("/checkout/payment");
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={17}>
          <Title level={5}>Giỏ hàng của bạn</Title>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Checkbox
                style={{
                  fontSize: "1rem",
                  color: "rgb(120, 120, 120)",
                }}
                indeterminate={indeterminate}
                checked={
                  checkedList.length === cartDetails?.data?.products.length
                }
                onChange={(e) => {
                  setCheckedList(
                    e.target.checked
                      ? cartDetails?.data?.products.map(
                          (item: any) => item.productId
                        )
                      : []
                  );
                }}
              >
                Tất cả
              </Checkbox>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                  width: "750px",
                  justifyContent: "space-between",
                }}
              >
                <h6 style={{ fontSize: "1rem", color: "rgb(120, 120, 120)" }}>
                  Đơn giá
                </h6>
                <h6 style={{ fontSize: "1rem", color: "rgb(120, 120, 120)" }}>
                  Số lượng
                </h6>
                <h6 style={{ fontSize: "1rem", color: "rgb(120, 120, 120)" }}>
                  Thành tiền
                </h6>
                <DeleteOutlined
                  style={{
                    fontSize: "1rem",
                    color: "rgb(120, 120, 120)",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          </Card>

          {/* Chi tiết giỏ hàng */}
          <Card style={{ margin: "10px 0" }}>
            <CheckboxGroup
              value={checkedList}
              onChange={onChange}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {cartDetails?.data?.products.map((item: any) => (
                <div
                  key={item.productId}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <Checkbox value={item.productId}>{item.productName}</Checkbox>
                  <div style={{ width: "100px", textAlign: "right" }}>
                    {item.varients[0].variantPrice.toLocaleString()} VND
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Button
                      icon={<MinusOutlined />}
                      size="small"
                      onClick={() => {} /* handle decrease quantity */}
                    />
                    <InputNumber
                      min={1}
                      value={item.varients[0].quantity}
                      onChange={(value) => {} /* handle quantity change */}
                      style={{ width: "60px" }}
                    />
                    <Button
                      icon={<PlusOutlined />}
                      size="small"
                      onClick={() => {} /* handle increase quantity */}
                    />
                  </div>
                  <div style={{ width: "100px", textAlign: "right" }}>
                    {(
                      item.varients[0].variantPrice * item.varients[0].quantity
                    ).toLocaleString()}{" "}
                    VND
                  </div>
                  <DeleteOutlined
                    style={{
                      fontSize: "1rem",
                      color: "rgb(120, 120, 120)",
                      cursor: "pointer",
                    }}
                  />
                </div>
              ))}
            </CheckboxGroup>
          </Card>
        </Col>
        <Col span={7}>
          <Card title="Tóm tắt đơn hàng" style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span>Tổng tiền:</span>
              <span>
                {cartDetails?.data?.products
                  .reduce(
                    (total: number, item: any) =>
                      total +
                      item.varients[0].variantPrice * item.varients[0].quantity,
                    0
                  )
                  .toLocaleString()}{" "}
                VND
              </span>
            </div>
            <Divider />
            <Button type="primary" block onClick={() => handlePayment()}>
              Mua hàng ngay {cartDetails?.data?.products.length} sản phẩm
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartDetails;
