import React from 'react';
import { Layout } from 'antd';
import ProductList from '@/components/product/product.list';
import AppSider from '@/components/layout/app.sider';
import { Content } from 'antd/es/layout/layout';
import { CategoryList } from '@/utils/actions';
import AppLayout from './layout';
import { auth } from '@/auth';

const AppPage = async () => {
  const categories = await CategoryList();
  const session = await auth();
  return (
    <>
      <AppLayout>
        <Layout style={{ display: 'flex', flexDirection: 'row' }}>
          <AppSider categories={categories.data || []} />
          <Content>
            <ProductList sessions={session} />
          </Content>
        </Layout>
      </AppLayout>
    </>
  );
};

export default AppPage;
