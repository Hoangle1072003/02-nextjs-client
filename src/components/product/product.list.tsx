"use client";
import AppCarousel from "@/components/layout/app.carousel";
import {Card, Col, Row, Skeleton, Tooltip} from "antd";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {converSlugUrl} from "@/utils/api";
import useSWR from "swr";

const ProductList = () => {
    const fetcher = (url: string) => fetch(url).then((r) => r.json());
    const {data, error, isLoading} = useSWR("http://localhost:8083/api/v1/products", fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    if (isLoading) {
        return <Skeleton/>;
    }

    if (error) {
        return <div>Error loading products.</div>;
    }

    if (!data || !data.data || data.data.length === 0) {
        return <div>No products available.</div>;
    }

    return (
        <>
            <AppCarousel/>
            <Row gutter={[16, 16]} justify="start">
                {data.data.map((product: IProduct, index: number) => (
                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                        lg={6}
                        xl={4}
                        key={index}
                    >
                        <Link
                            href={`/product/${converSlugUrl(product.name)}-${product.id}.html`}
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
        </>
    );
};

export default ProductList;
