"use client";
import AppCarousel from "@/components/layout/app.carousel";
import {Card, Col, Row, Tooltip} from "antd";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {converSlugUrl} from "@/utils/api";

const ProductList = ({data}: { data: IProduct[] }) => {
    return (
        <>
            <AppCarousel/>
            <Row gutter={[16, 16]} justify="start">
                {data.map((_, index) => (
                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                        lg={6}
                        xl={4}
                        key={index}
                    >
                        <Link href={`/product/${converSlugUrl(_.name)}-${_.id}.html`}
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
                                }}>
                                <div
                                    style={{
                                        textAlign: "center",
                                        padding: "10px",
                                        position: "relative",
                                        overflow: "hidden",
                                    }}
                                >
                                    <Image
                                        src={_.varients[0].image}
                                        alt={_.name}
                                        width={120}
                                        height={120}

                                    />
                                </div>

                                {/* Khu vực tên sản phẩm */}
                                <Tooltip title={_.name}>
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
                                        {_.name}
                                    </div>
                                </Tooltip>

                                {/* Khu vực giá */}
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
                                    }).format(_.varients[0].price)}
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
