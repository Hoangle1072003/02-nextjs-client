"use client";

import {
  Layout,
  Input,
  Badge,
  Tooltip,
  Dropdown,
  Button,
  Popover,
  Empty,
} from "antd";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import AppContainer from "@/components/layout/app.container";
import { signOut } from "next-auth/react";
import { message } from "antd";
import { IUser } from "@/types/next-auth";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

type IProps = {
  session: IUser;
};

const AppHeader = (prop: IProps) => {
  const { Header } = Layout;
  const { session } = prop;
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSignOut = async () => {
    messageApi.open({
      type: "success",
      content: "Đăng xuất thành công!",
    });
    await signOut();
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(
        `/home/product/search?keyword=${encodeURIComponent(searchTerm)}`
      );
    }
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      setPopoverOpen(true);

      const timer = setTimeout(() => {
        setPopoverOpen(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [cartItems]);

  const items: (
    | { label: React.JSX.Element; key: string }
    | { label: React.JSX.Element; key: string }
    | {
        type: string;
      }
    | { label: React.JSX.Element; key: string }
  )[] = [
    {
      label: (
        <Link href={`/home/customer/${session?.user?.id}`}>
          Thông tin tài khoản
        </Link>
      ),
      key: "0",
    },
    {
      label: <Link href={"/home/sales/order/history"}>Đơn hàng của tôi</Link>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: session ? (
        <div onClick={handleSignOut} style={{ cursor: "pointer" }}>
          Đăng xuất
        </div>
      ) : (
        <Link href="/guest/auth/login">Đăng nhập</Link>
      ),
      key: "3",
    },
  ];

  const text = (
    <span>
      {cartItems.length > 0 ? (
        `Bạn có ${cartItems.length} sản phẩm trong giỏ hàng!`
      ) : (
        <Empty description="Giỏ hàng trống" />
      )}
    </span>
  );

  const content = (
    <div>
      <Button
        type="primary"
        // onClick={() => {
        //   router.push("/checkout/cart");
        // }}
      >
        <Link href="/home/checkout/cart">Xem giỏ hàng và thanh toán</Link>
      </Button>
    </div>
  );

  return (
    <>
      {contextHolder}
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
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
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
              prefix={<SearchOutlined style={{ color: "#999" }} />}
              style={{
                width: "50%",
                borderRadius: "20px",
                height: "40px",
                border: "1px solid #ddd",
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onPressEnter={handleSearch}
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
                <Link href="/" style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      gap: "4px",
                    }}
                  >
                    <HomeOutlined style={{ fontSize: "20px", color: "#555" }} />
                    <div style={{ fontSize: "12px", color: "#555" }}>
                      Trang chủ
                    </div>
                  </div>
                </Link>
              </Tooltip>

              {/* Account */}
              <Tooltip title="Tài khoản">
                <Dropdown menu={{ items }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      gap: "4px",
                    }}
                  >
                    <UserOutlined style={{ fontSize: "20px", color: "#555" }} />
                    <div style={{ fontSize: "12px", color: "#555" }}>
                      Tài khoản
                    </div>
                  </div>
                </Dropdown>
              </Tooltip>

              {/* Cart */}
              <Tooltip>
                <Badge count={cartItems.length} overflowCount={99}>
                  <div
                    onClick={() => {
                      router.push("/home/checkout/cart");
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      gap: "8px",
                      backgroundColor: "#f9f9f9",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                  >
                    <ShoppingCartOutlined
                      style={{ fontSize: "20px", color: "#555", width: "100%" }}
                    />
                    <Popover
                      placement="bottom"
                      title={text}
                      content={content}
                      open={isPopoverOpen}
                      trigger="click"
                    >
                      <Button
                        style={{
                          fontSize: "14px",
                          color: "#555",
                          border: "none",
                          background: "none",
                          padding: "0",
                          boxShadow: "none",
                        }}
                      >
                        <Link href="/checkout/cart">Giỏ hàng</Link>
                      </Button>
                    </Popover>
                  </div>
                </Badge>
              </Tooltip>
            </div>
          </div>
        </AppContainer>
      </Header>
    </>
  );
};

export default AppHeader;
