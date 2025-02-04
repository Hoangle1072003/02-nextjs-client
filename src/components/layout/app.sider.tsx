'use client';

import { Layout, Menu } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import Link from 'next/link';

const AppSider = ({ categories }: { categories: ICategory[] }) => {
  const { Sider } = Layout;

  const menuItems = categories.map((category) => ({
    key: category.id,
    icon: <AppstoreAddOutlined />,
    label: <Link href={`/category/${category.id}`}>{category.name}</Link>
  }));

  return (
    <Sider
      width={200}
      style={{
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        backgroundColor: '#f0f2f5',
        maxHeight: '100vh',
        borderRadius: '10px',
        marginRight: '16px'
      }}
    >
      <div
        style={{
          padding: '16px',
          fontSize: '13px',
          fontWeight: 'bold',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #ddd'
        }}
      >
        Danh Mục
      </div>

      <Menu
        mode='inline'
        defaultSelectedKeys={[categories?.[0]?.id || '']}
        items={menuItems}
      />
    </Sider>
  );
};

export default AppSider;
