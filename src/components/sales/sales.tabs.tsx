"use client";
import React, { useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import SalesList from "./sales.list";
import { useSession } from "next-auth/react";
import SalesWaitList from "./sales.wait";
import { AnimatePresence, motion } from "framer-motion";
import SalesCanceled from "./sales.canceled";

const SalesTabs: React.FC = () => {
  const session = useSession();
  const [activeTab, setActiveTab] = useState("1");

  const tabContents = [
    {
      key: "1",
      label: "Tất cả đơn",
      component: <SalesList session={session} />,
    },
    {
      key: "2",
      label: "Chờ thanh toán",
      component: <SalesWaitList session={session} />,
    },
    {
      key: "3",
      label: "Đang xử lý",
      component: <div>Đang phát triển...</div>,
    },
    {
      key: "4",
      label: "Đang vận chuyển",
      component: <div>Đang phát triển...</div>,
    },
    {
      key: "5",
      label: "Đã giao",
      component: <div>Đang phát triển...</div>,
    },
    {
      key: "6",
      label: "Đã huỷ",
      component: <SalesCanceled session={session} />,
    },
  ];

  const tabsItems: TabsProps["items"] = tabContents.map((tab) => ({
    key: tab.key,
    label: tab.label,
    children: null,
  }));

  return (
    <div>
      <Tabs
        items={tabsItems}
        defaultActiveKey="1"
        onChange={(key) => setActiveTab(key)}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {tabContents.find((tab) => tab.key === activeTab)?.component}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SalesTabs;
