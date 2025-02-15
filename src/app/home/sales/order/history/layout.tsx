import CustomerSider from "@/components/layout/customer.sider";
import React from "react";

type CustomerPageLayoutProps = {
  children: React.ReactNode;
};

const CustomerPageLayout: React.FC<CustomerPageLayoutProps> = ({
  children,
}) => {
  return <CustomerSider>{children}</CustomerSider>;
};

export default CustomerPageLayout;
