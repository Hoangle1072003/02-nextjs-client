import React from "react";

type CustomerViewedPageLayoutProps = {
  children: React.ReactNode;
};

const CustomerViewedPageLayout: React.FC<CustomerViewedPageLayoutProps> = ({
  children,
}) => {
  return <div>{children}</div>;
};

export default CustomerViewedPageLayout;
