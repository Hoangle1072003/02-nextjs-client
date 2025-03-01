'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Pagination, Select, Input } from 'antd';
import ProductCard from './ProductCard';
import { getPaginatedProducts } from '@/utils/actions';
import { useSearchParams } from 'next/navigation';

const { Option } = Select;

const ProductGrid = ({ products }: { products: any[] }) => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const [showAll, setShowAll] = useState(!!keyword);
  const [pageNumber, setPageNumber] = useState(0);
  const [paginatedProducts, setPaginatedProducts] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>('name-asc');
  const [searchQuery, setSearchQuery] = useState<string>(keyword);

  useEffect(() => {
    setSearchQuery(keyword);
    const fetchProducts = async () => {
      try {
        let sortBy = '';
        let dir = '';
        switch (sortOption) {
          case 'name-asc':
            sortBy = 'name';
            dir = 'asc';
            break;
          case 'name-desc':
            sortBy = 'name';
            dir = 'desc';
            break;
          case 'price-asc':
            sortBy = 'price';
            dir = 'asc';
            break;
          case 'price-desc':
            sortBy = 'price';
            dir = 'desc';
            break;
        }

        const response = await getPaginatedProducts(
          pageNumber,
          12,
          sortBy,
          dir,
          0,
          10000,
          keyword || undefined
        );

        console.log('Fetched data:', response);

        if (response?.data?.products) {
          let sortedProducts = response.data.products;
          if (keyword && sortBy === 'price') {
            sortedProducts = sortedProducts.sort((a, b) =>
              dir === 'asc'
                ? a.varients[0].price - b.varients[0].price
                : b.varients[0].price - a.varients[0].price
            );
          }
          setPaginatedProducts(sortedProducts);
          setTotalProducts(response.data.totalElements);
        } else {
          setPaginatedProducts([]);
          setTotalProducts(0);
        }
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
      }
    };

    if (showAll || keyword) {
      fetchProducts();
    }
  }, [showAll, pageNumber, sortOption, keyword]);

  const filteredProducts = useMemo(() => {
    const result = paginatedProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return result;
  }, [paginatedProducts, searchQuery]);

  const displayedProducts = showAll || keyword ? filteredProducts : products;

  const handlePageChange = (page: number) => {
    setPageNumber(page - 1);
  };

  return (
    <div
      style={{
        background: '#fff',
        width: '100%',
        padding: '20px',
        borderRadius: '10px'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Select
            value={sortOption}
            onChange={(value) => setSortOption(value)}
            style={{ width: '200px' }}
          >
            <Option value='name-asc'>Sắp xếp theo tên (A-Z)</Option>
            <Option value='name-desc'>Sắp xếp theo tên (Z-A)</Option>
            <Option value='price-asc'>Sắp xếp theo giá (Tăng dần)</Option>
            <Option value='price-desc'>Sắp xếp theo giá (Giảm dần)</Option>
          </Select>
        </div>
        <a
          href='#'
          onClick={(e) => {
            e.preventDefault();
            setShowAll(true);
            console.log('Show All:', true);
          }}
          style={{ color: '#1890ff', fontSize: '14px' }}
        >
          Xem tất cả
        </a>
      </div>
      <Row gutter={[16, 16]} justify='start'>
        {Array.isArray(displayedProducts) &&
          displayedProducts.map((product: any, index: number) => (
            <Col xs={12} sm={8} md={6} lg={4} key={index}>
              <ProductCard product={product} />
            </Col>
          ))}
      </Row>
      {(showAll || keyword) && totalProducts > 0 && (
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Pagination
            current={pageNumber + 1}
            total={totalProducts}
            pageSize={12}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
