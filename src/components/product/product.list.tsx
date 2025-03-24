'use client';
import AppCarousel from '@/components/layout/app.carousel';
import { Card, Col, Empty, Pagination, Row, Skeleton, Tooltip } from 'antd';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { converSlugUrl } from '@/utils/api';
import useSWR from 'swr';

const ProductList = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    `http://localhost:9191/product-service/api/v1/products`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <div>Error loading products.</div>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description='No products found.'
      />
    );
  }

  // Tính toán sản phẩm hiển thị cho trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.data.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalProducts = data.data.length;

  // Xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <AppCarousel />
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: '#fff',
          padding: '10px 30px',
          borderRadius: '10px'
        }}
      >
        <Row gutter={[16, 16]} justify='start'>
          {currentProducts.map((product: IProduct, index: number) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Link
                href={`/home/product/${converSlugUrl(product.name)}-${
                  product.id
                }.html`}
                passHref
              >
                <Card
                  hoverable
                  style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  bodyStyle={{ padding: '16px' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = 'scale(1.03)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = 'scale(1)')
                  }
                >
                  <div style={{ position: 'relative', textAlign: 'center' }}>
                    <Image
                      src={product.varients[0].image}
                      alt={product.name}
                      width={140}
                      height={130}
                      style={{ objectFit: 'contain', borderRadius: '10px' }}
                    />
                  </div>
                  <Tooltip title={product.name}>
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#333',
                        marginTop: '12px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {product.name}
                    </div>
                  </Tooltip>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '8px'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '14px',
                        marginRight: '8px',
                        fontWeight: 'bold',
                        color: 'red'
                      }}
                    >
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(product.varients[0].price)}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: '8px',
                      fontSize: '12px',
                      color: '#555',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>⭐⭐⭐⭐⭐</div>
                    <div
                      style={{
                        backgroundColor: '#ff424e',
                        color: '#fff',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      NOW
                    </div>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px'
          }}
        >
          <Pagination
            current={currentPage}
            total={totalProducts}
            pageSize={productsPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
