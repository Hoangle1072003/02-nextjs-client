import { Layout } from "antd";
import React from "react";
import AppHeader from "@/components/layout/app.header";
import AppFooter from "@/components/layout/app.footer";
import AppContent from "@/components/layout/app.content";
import { auth } from "@/auth";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = async ({ children }) => {
  const session = await auth();
  return (
    <Layout>
      <AppHeader session={session} />
      <Layout
        style={{
          width: "1440px",
          margin: "24px auto",
          maxWidth: "1440px",
          minHeight: "50vh",
        }}
      >
        <AppContent>{children}</AppContent>
      </Layout>
      <AppFooter />
    </Layout>
  );
};

export default AppLayout;
