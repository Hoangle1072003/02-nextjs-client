import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Pagination, Select, Input } from 'antd';
import ProductCard from './ProductCard';
import { getAllProducts } from '@/utils/actions';

const { Option } = Select;

const ProductGrid = ({ products }: { products: any[] }) => {
  const [showAll, setShowAll] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>('name-asc');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (showAll) {
      const fetchAllProducts = async () => {
        try {
          const data = await getAllProducts();
          if (Array.isArray(data.data)) {
            setPaginatedProducts(data.data);
            setTotalProducts(data.data.length);
          } else {
            setPaginatedProducts([]);
            setTotalProducts(0);
          }
        } catch (error) {
          console.error('Lỗi khi lấy tất cả sản phẩm:', error);
        }
      };
      fetchAllProducts();
    }
  }, [showAll]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Lọc các sản phẩm dựa trên truy vấn tìm kiếm
  const filteredProducts = useMemo(() => {
    return paginatedProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [paginatedProducts, searchQuery]);

  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];
    if (sortOption === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    return sorted;
  }, [filteredProducts, sortOption]);

  const paginatedData = useMemo(() => {
    return sortedProducts.slice((pageNumber - 1) * 12, pageNumber * 12);
  }, [sortedProducts, pageNumber]);

  const displayedProducts = showAll ? paginatedData : products;

  const handlePageChange = (page: number) => {
    setPageNumber(page);
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
          justifyContent: 'flex-end',
          marginBottom: '20px'
        }}
      >
        <a
          href='#'
          onClick={(e) => {
            e.preventDefault();
            setShowAll(true);
          }}
          style={{ color: '#1890ff', fontSize: '14px' }}
        >
          Xem tất cả
        </a>
      </div>

      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Input
          placeholder='Tìm kiếm sản phẩm...'
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ width: '200px' }}
        />
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

      <Row gutter={[16, 16]} justify='start'>
        {Array.isArray(displayedProducts) &&
          displayedProducts.map((product: any, index: number) => (
            <Col xs={12} sm={8} md={6} lg={4} key={index}>
              <ProductCard product={product} />
            </Col>
          ))}
      </Row>

      {showAll && totalProducts > 0 && (
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <Pagination
            current={pageNumber}
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
