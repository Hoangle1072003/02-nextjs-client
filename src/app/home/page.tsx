import React from "react";
import { Layout } from "antd";
import ProductList from "@/components/product/product.list";
import AppSider from "@/components/layout/app.sider";
import { Content } from "antd/es/layout/layout";
import { CategoryList } from "@/utils/actions";
import AppLayout from "./layout";

const AppPage = async () => {
  const categories = await CategoryList();
  return (
    <>
      <AppLayout>
        <Layout style={{ display: "flex", flexDirection: "row" }}>
          <AppSider categories={categories.data || []} />
          <Content>
            <ProductList />
          </Content>
        </Layout>
      </AppLayout>
    </>
  );
};

export default AppPage;
