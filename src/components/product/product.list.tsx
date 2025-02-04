<<<<<<< HEAD
'use client';
import AppCarousel from '@/components/layout/app.carousel';
import { Card, Col, Row, Skeleton, Tooltip } from 'antd';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { converSlugUrl } from '@/utils/api';
import useSWR from 'swr';
=======
"use client";
import AppCarousel from "@/components/layout/app.carousel";
import { Card, Col, Row, Skeleton, Tooltip } from "antd";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { converSlugUrl } from "@/utils/api";
import useSWR from "swr";
>>>>>>> 8b7e5f2568f329e8014604068fdb8bccae2a4f20

const ProductList = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
<<<<<<< HEAD
    'http://localhost:8083/api/v1/products',
=======
    `http://localhost:9191/product-service/api/v1/products`,
>>>>>>> 8b7e5f2568f329e8014604068fdb8bccae2a4f20
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
<<<<<<< HEAD
      revalidateOnReconnect: false
    }
  );
=======
      revalidateOnReconnect: false,
    }
  );
  console.log("data", data);
>>>>>>> 8b7e5f2568f329e8014604068fdb8bccae2a4f20

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <div>Error loading products.</div>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <div>No products available.</div>;
  }
<<<<<<< HEAD
  const limitedProducts = data.data.slice(0, 12);

  return (
    <>
      <AppCarousel />
      <div
        style={{ background: '#fff', padding: '20px', borderRadius: '10px' }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}
        >
          <h2
            style={{ fontWeight: 'bold', color: '#ff424e', fontSize: '20px' }}
          >
            🔥 TOP DEAL • SIÊU RẺ
          </h2>
          <a
            href='/all-products'
            style={{ color: '#1890ff', fontSize: '14px' }}
          >
            Xem tất cả
          </a>
        </div>

        {/* Product Grid */}
        <Row gutter={[16, 16]} justify='start'>
          {limitedProducts.map((product: IProduct, index: number) => (
            <Col xs={12} sm={8} md={6} lg={4} key={index}>
              <Link
                href={`/product/${converSlugUrl(product.name)}-${
                  product.id
                }.html`}
                passHref={true}
              >
                <Card
                  hoverable
                  style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  bodyStyle={{ padding: '16px' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = 'scale(1.03)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = 'scale(1)')
                  }
                >
                  {/* Product Image */}
                  <div style={{ position: 'relative', textAlign: 'center' }}>
                    <Image
                      src={product.varients[0].image}
                      alt={product.name}
                      width={140}
                      height={140}
                      style={{ objectFit: 'contain', borderRadius: '10px' }}
                    />
                  </div>

                  {/* Product Info */}
                  <Tooltip title={product.name}>
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#333',
                        marginTop: '12px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {product.name}
                    </div>
                  </Tooltip>

                  {/* Product Price */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '8px'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '14px',
                        marginRight: '8px',
                        fontWeight: 'bold',
                        color: 'red'
                      }}
                    >
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(product.varients[0].price)}
                    </span>
                  </div>

                  {/* Rating and Delivery */}
                  <div
                    style={{
                      marginTop: '8px',
                      fontSize: '12px',
                      color: '#555',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>⭐⭐⭐⭐⭐</div>
                    <div
                      style={{
                        backgroundColor: '#ff424e',
                        color: '#fff',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      NOW
                    </div>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
=======

  return (
    <>
      <AppCarousel />
      <Row gutter={[16, 16]} justify="start">
        {data.data.map((product: IProduct, index: number) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
            <Link
              href={`/product/${converSlugUrl(product.name)}-${
                product.id
              }.html`}
              passHref={true}
            >
              <Card
                hoverable
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={product.varients[0].image}
                    alt={product.name}
                    width={120}
                    height={120}
                  />
                </div>

                {/* Product Name */}
                <Tooltip title={product.name}>
                  <div
                    style={{
                      fontSize: "13px",
                      textAlign: "left",
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      lineHeight: "1.5",
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: "10px",
                      minHeight: "40px",
                    }}
                  >
                    {product.name}
                  </div>
                </Tooltip>

                {/* Product Price */}
                <div
                  style={{
                    textAlign: "left",
                    color: "#f5222d",
                    fontSize: "16px",
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
>>>>>>> 8b7e5f2568f329e8014604068fdb8bccae2a4f20
    </>
  );
};

export default ProductList;
