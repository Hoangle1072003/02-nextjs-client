"use client";
import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import SalesList from "./sales.list";
import { useSession } from "next-auth/react";

const SalesTabs: React.FC = () => {
  const session = useSession();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tất cả đơn",
      children: <SalesList session={session} />,
    },
    {
      key: "2",
      label: "Chờ thanh toán",
      children: <div>Danh sách đơn hàng đang chờ thanh toán</div>,
    },
    {
      key: "3",
      label: "Đang xử lý",
      children: <div>Đang phát triển...</div>,
    },
    {
      key: "4",
      label: "Đang vận chuyển",
      children: <div>Đang phát triển...</div>,
    },
    {
      key: "5",
      label: "Đã giao",
      children: <div>Đang phát triển...</div>,
    },
    {
      key: "6",
      label: "Đã huỷ",
      children: <div>Đang phát triển...</div>,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};

export default SalesTabs;
