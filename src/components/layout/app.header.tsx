"use client";

import {Layout, Input, Badge, Tooltip} from "antd";
import React from "react";
import Image from "next/image";
import {HomeOutlined, UserOutlined, ShoppingCartOutlined, SearchOutlined} from "@ant-design/icons";
import Link from "next/link";
import AppContainer from "@/components/layout/app.container";

const AppHeader = () => {
    const {Header} = Layout;

    return (
        <Header
            style={{
                backgroundColor: "rgb(255, 255, 255)",
                padding: "12px 24px",
                borderBottom: "1px solid #ddd",
                height: "100px",
            }}
        >
            <AppContainer>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {/* Logo and Label */}
                    <div style={{display: "flex", gap: "8px", alignItems: "center"}}>
                        <Link href={"/"}>
                            <Image
                                src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png"
                                alt="Tiki Logo"
                                width={100}
                                height={60}
                            />
                        </Link>
                        <label
                            style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "rgb(0, 132, 137)",
                            }}
                        >
                            Tốt & Nhanh
                        </label>
                    </div>

                    {/* Search Bar */}
                    <Input
                        placeholder="Tìm kiếm sản phẩm, thương hiệu, v.v..."
                        prefix={<SearchOutlined style={{color: "#999"}}/>}
                        style={{
                            width: "50%",
                            borderRadius: "20px",
                            height: "40px",
                            border: "1px solid #ddd",
                        }}
                    />

                    {/* Menu Options */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "20px",
                        }}
                    >
                        {/* Home */}
                        <Tooltip title="Trang chủ">
                            <Link href="/" style={{textDecoration: "none"}}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        gap: "4px",
                                    }}
                                >
                                    <HomeOutlined style={{fontSize: "20px", color: "#555"}}/>
                                    <div style={{fontSize: "12px", color: "#555"}}>Trang chủ</div>
                                </div>
                            </Link>
                        </Tooltip>

                        {/* Account */}
                        <Tooltip title="Tài khoản">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    gap: "4px",
                                }}
                            >
                                <UserOutlined style={{fontSize: "20px", color: "#555"}}/>
                                <div style={{fontSize: "12px", color: "#555"}}>Tài khoản</div>
                            </div>
                        </Tooltip>

                        {/* Cart */}
                        <Tooltip title="Giỏ hàng">
                            <Badge count={3} overflowCount={99}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        gap: "4px",
                                    }}
                                >
                                    <ShoppingCartOutlined style={{fontSize: "20px", color: "#555"}}/>
                                    <div style={{fontSize: "12px", color: "#555", marginTop: "4px"}}>
                                        Giỏ hàng
                                    </div>
                                </div>
                            </Badge>
                        </Tooltip>
                    </div>
                </div>
            </AppContainer>
        </Header>
    );
};

export default AppHeader;
