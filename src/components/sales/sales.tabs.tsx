"use client";
import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import SalesList from "./sales.list";

const SalesTabs: React.FC = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tất cả đơn",
      children: <SalesList />,
    },
    {
      key: "2",
      label: "Chờ thanh toán",
      children: <div>Danh sách đơn hàng đang chờ thanh toán</div>,
    },
    {
      key: "3",
      label: "Đang xử lý",
      children: <div>Danh sách đơn hàng đang được xử lý</div>,
    },
    {
      key: "4",
      label: "Đang vận chuyển",
      children: <div>Danh sách đơn hàng đang vận chuyển</div>,
    },
    {
      key: "5",
      label: "Đã giao",
      children: <div>Danh sách đơn hàng đã giao</div>,
    },
    {
      key: "6",
      label: "Đã huỷ",
      children: <div>Danh sách đơn hàng đã bị huỷ</div>,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default SalesTabs;
