"use client";

import { Card, Col, Empty, Row, Skeleton, Tooltip } from "antd";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const CustomerRecently = ({ session }: { session: any }) => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}product-service/api/v1/products/recently-viewed/${session?.user?.id}`,
    fetcher
  );

  if (isLoading) {
    return <Skeleton />;
  }
  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red", fontSize: "16px" }}>
        Lỗi tải sản phẩm gần đây.
      </div>
    );
  }

  if (!data || !data.data || data.data.length === 0) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Bạn chưa xem sản phẩm nào gần đây."
        style={{ marginTop: "20px" }}
      />
    );
  }

  return (
    <>
      <h2
        style={{
          marginBottom: "20px",
          fontSize: "22px",
          fontWeight: "bold",
          textAlign: "center",
          color: "#333",
        }}
      >
        Sản phẩm bạn đã xem gần đây
      </h2>

      <Row gutter={[16, 16]} justify="center">
        {data.data.map((product: any, index: number) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
            <Link href={`/home/product/${product.id}`} passHref>
              <Card
                hoverable
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "space-between",
                  transition: "transform 0.3s ease-in-out",
                }}
                bodyStyle={{ padding: "15px" }}
              >
                <div style={{ textAlign: "center", padding: "10px" }}>
                  <Image
                    src={product.varients[0].image}
                    alt={product.name}
                    width={140}
                    height={140}
                    style={{ borderRadius: "8px" }}
                  />
                </div>

                <Tooltip title={product.name} placement="top">
                  <div
                    style={{
                      fontSize: "14px",
                      textAlign: "center",
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      lineHeight: "1.5",
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: "10px",
                      minHeight: "42px",
                    }}
                  >
                    {product.name}
                  </div>
                </Tooltip>

                <div
                  style={{
                    textAlign: "center",
                    color: "#d32f2f",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.varients[0].price)}
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CustomerRecently;
