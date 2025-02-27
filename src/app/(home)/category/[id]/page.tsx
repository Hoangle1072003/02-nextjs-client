import React from 'react';
import axios from 'axios';
import { CategoryList, getCategoryById } from '@/utils/actions';
import AppSider from '@/components/layout/app.sider';
import { Breadcrumb, Layout } from 'antd';
import CategoryProductList from '@/components/category/CategoryProductList';
import Link from 'next/link';

const CategoryPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}product-service/api/v1/products/category`;
    const response = await axios.get(apiUrl, {
      params: {
        categoryID: id
      }
    });
    const products = response.data?.data || [];
    const category = await getCategoryById(id);
    const categoryName = category.data.name;
    const categories = await CategoryList();

    return (
      <div>
        <Breadcrumb
          items={[
            { title: <Link href='/'>Trang chủ</Link> },
            { title: categoryName }
          ]}
        />
        <Layout
          style={{
            width: '1440px',
            margin: '24px auto',
            maxWidth: '1440px',
            minHeight: '100vh'
          }}
        >
          <AppSider categories={categories.data || []} />
          <CategoryProductList products={products} productName={categoryName} />
        </Layout>
      </div>
    );
  } catch (error) {
    console.error('Error fetching category data:', error);
    return <div>Error loading category data.</div>;
  }
};

export default CategoryPage;
