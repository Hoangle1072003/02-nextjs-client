import CustomerSider from "@/components/layout/customer.sider";
import React from "react";

type CustomerPageLayoutProps = {
  children: React.ReactNode;
};

const CustomerPageLayout: React.FC<CustomerPageLayoutProps> = ({
  children,
}) => {
  return (
    <div>
      <CustomerSider>
        <span
          style={{
            marginBottom: "1rem",
            color: "grey",
            fontSize: "1rem",
          }}
        >
          Thông tin tài khoản
        </span>
        {children}
      </CustomerSider>
    </div>
  );
};

export default CustomerPageLayout;
