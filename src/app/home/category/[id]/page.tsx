import React from 'react';
import axios from 'axios';
import { CategoryList, getCategoryById } from '@/utils/actions';
import AppSider from '@/components/layout/app.sider';
import { Breadcrumb, Layout } from 'antd';
import CategoryProductList from '@/components/category/CategoryProductList';
import Link from 'next/link';
import { Content } from 'antd/es/layout/layout';
import AppLayout from '../../layout';
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
        <Layout style={{ display: 'flex', flexDirection: 'row' }}>
          <AppSider categories={categories.data || []} />
          <Content>
            <CategoryProductList
              products={products}
              productName={categoryName}
            />
          </Content>
        </Layout>
      </div>
    );
  } catch (error) {
    console.error('Error fetching category data:', error);
    return <div>Error loading category data.</div>;
  }
};

export default CategoryPage;
