import React from "react";
import { Layout } from "antd";
import ProductList from "@/components/product/product.list";
import { sendRequest } from "@/utils/api";
import AppSider from "@/components/layout/app.sider";
import { Content } from "antd/es/layout/layout";
import AppLayout from "@/app/(home)/layout";
import { CategoryList } from "@/utils/actions";
import { auth } from "@/auth";

const AppPage = async () => {
  const res = await sendRequest<IBackendRes<IProduct[]>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}product-service/api/v1/products`,
    method: "GET",
  });
  const products = res.data || [];

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
