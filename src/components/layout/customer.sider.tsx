"use client";
import React from "react";
import {
  UserOutlined,
  LockOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const { Content, Sider } = Layout;

interface CustomerSiderProps {
  children: React.ReactNode;
}

const CustomerSider: React.FC<CustomerSiderProps> = ({ children }) => {
  const session = useSession();
  // console.log("CustomerSider", session);

  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Thông tin tài khoản",
      path: `/home/customer/${session?.data?.user?.id}`,
    },
    {
      key: "2",
      icon: <LockOutlined />,
      label: "Quản lý đơn hàng của tôi",
      path: "/home/sales/order/history",
    },
    {
      key: "3",
      icon: <EnvironmentOutlined />,
      label: "Sổ địa chỉ",
      path: "/home/customer/address",
    },
    {
      key: "4",
      icon: <CreditCardOutlined />,
      label: "Hình thức thanh toán",
      path: "/customer/payment",
    },
    {
      key: "5",
      icon: <FileTextOutlined />,
      label: "Sản phẩm đã xem",
      path: "/home/customer/viewed",
    },
    {
      key: "6",
      icon: <FileTextOutlined />,
      label: "Xuất hóa đơn",
      path: "/home/customer/invoice",
    },
  ];

  const pathname = usePathname();

  const currentItem = menuItems.find((item) => pathname.startsWith(item.path));

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0", fontSize: 14 }}>
        <Breadcrumb.Item>
          <Link href="/">Trang chủ</Link>
        </Breadcrumb.Item>
        {/* <Breadcrumb.Item>
          <Link href="/customer">Tài khoản</Link>
        </Breadcrumb.Item> */}
        {currentItem && <Breadcrumb.Item>{currentItem.label}</Breadcrumb.Item>}
      </Breadcrumb>

      <Layout>
        <Sider
          width={250}
          style={{
            background: "#f5f4f4",
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[
              menuItems.find((item) => pathname.startsWith(item.path))?.key ||
                "1",
            ]}
            style={{
              height: "100%",
              borderRight: 0,
              fontSize: 14,
              background: "#f5f4f4",
            }}
            items={menuItems.map((item) => ({
              key: item.key,
              icon: item.icon,
              label: (
                <Link href={item.path} style={{ color: "inherit" }}>
                  {item.label}
                </Link>
              ),
            }))}
          />
        </Sider>

        <Layout style={{ flex: 1 }}>
          <Content
            style={{
              padding: "0 12px",
              borderLeft: "1px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default CustomerSider;
