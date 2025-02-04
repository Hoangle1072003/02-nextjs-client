<<<<<<< HEAD
import React from 'react';
import { Layout } from 'antd';
import ProductList from '@/components/product/product.list';
import { sendRequest } from '@/utils/api';
import AppSider from '@/components/layout/app.sider';
import { Content } from 'antd/es/layout/layout';
import AppLayout from '@/app/(home)/layout';
import { CategoryList } from '@/utils/actions';
import CategoryPage from '@/components/product/CategoryProductList';
=======
import React from "react";
import { Layout } from "antd";
import ProductList from "@/components/product/product.list";
import { sendRequest } from "@/utils/api";
import AppSider from "@/components/layout/app.sider";
import { Content } from "antd/es/layout/layout";
import AppLayout from "@/app/(home)/layout";
import { CategoryList } from "@/utils/actions";
>>>>>>> 8b7e5f2568f329e8014604068fdb8bccae2a4f20

const AppPage = async () => {
  const res = await sendRequest<IBackendRes<IProduct[]>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}product-service/api/v1/products`,
<<<<<<< HEAD
    method: 'GET'
  });
  const products = res.data || [];
=======
    method: "GET",
  });
  const products = res.data || [];

>>>>>>> 8b7e5f2568f329e8014604068fdb8bccae2a4f20
  const categories = await CategoryList();
  return (
    <>
      <AppLayout>
<<<<<<< HEAD
        <Layout style={{ display: 'flex', flexDirection: 'row' }}>
=======
        <Layout style={{ display: "flex", flexDirection: "row" }}>
>>>>>>> 8b7e5f2568f329e8014604068fdb8bccae2a4f20
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
