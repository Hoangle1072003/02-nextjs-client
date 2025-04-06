'use client';
import React, { useEffect } from 'react';
import { Layout, Card, Row, Col, Rate, Breadcrumb, Button } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/features/cart/cartSlice';
import { setProduct } from '@/lib/features/product/productSlice';
import { openDrawer } from '@/lib/features/draw/drawerSlice';

interface IProps {
  session: any;
  data: any;
  productId: string;
}

const ProductDetails = (props: IProps) => {
  const { session, data, productId } = props;
  const [selectedVariant, setSelectedVariant] = useState(data?.varients[0]);
  const [quantity, setQuantity] = useState('1');
  const pathname = usePathname();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const pathSegments = pathname.split('/').filter(Boolean);
  const productPath = pathSegments[pathSegments.length - 1];
  const productName = productPath.replace(/-\w+\.html$/, '');
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setProduct(data));
    }
  }, [data, dispatch]);

  const handleVariantSelect = (variant: any) => {
    setSelectedVariant(variant);
    setQuantity('1');
  };

  const handleToCart = () => {
    const numQuantity = parseInt(quantity, 10) || 0;
    if (numQuantity > selectedVariant.stock) {
      setErrorMessage(
        `Số lượng còn lại của sản phẩm này là ${selectedVariant.stock}`
      );
      return;
    }

    const productData = {
      quantity: numQuantity,
      productVariantId: selectedVariant.id,
      userId: session?.user?.id,
      productId: productId
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}cart-service/api/v1/cart`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          dispatch(addToCart(productData));
          console.log('Add to cart response: ', res);
        }
      });
  };

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    const currentQuantity = parseInt(quantity, 10) || 0;
    let newQuantity;

    if (action === 'increase') {
      newQuantity = currentQuantity + 1;
    } else if (action === 'decrease') {
      newQuantity = currentQuantity - 1;
    }
    if (newQuantity < 1) {
      setQuantity('1');
      return;
    }
    setErrorMessage(null);
    setQuantity(newQuantity.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*$/.test(value)) {
      setQuantity(value);
      setErrorMessage(null);
    }
  };

  const handleInputBlur = () => {
    const numQuantity = parseInt(quantity, 10);
    if (isNaN(numQuantity) || numQuantity < 1) {
      setQuantity('1');
    } else {
      setQuantity(numQuantity.toString());
    }
  };

  const calculateSubtotal = () => {
    const numQuantity = parseInt(quantity, 10) || 0;
    return (selectedVariant?.price * numQuantity).toFixed(2);
  };

  return (
    <>
      <Breadcrumb
        items={[
          { title: <Link href='/'>Trang chủ</Link> },
          { title: productName }
        ]}
      />

      <Layout style={{ padding: '20px' }}>
        <Row gutter={[16, 16]}>
          {/* Product Image Column */}
          <Col xs={24} md={10} lg={6}>
            <Card
              style={{
                border: '1px solid #f0f0f0',
                borderRadius: '10px',
                padding: '10px',
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                pointerEvents: 'none'
              }}
              cover={
                <Image
                  src={selectedVariant?.image || data?.varients[0].image}
                  alt={data?.name}
                  width={200}
                  height={300}
                />
              }
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
                marginTop: '20px'
              }}
            >
              {data?.varients.map((variant: any) => (
                <Image
                  onClick={() => setSelectedVariant(variant)}
                  key={variant.id}
                  src={variant.image}
                  alt={data.name}
                  width={100}
                  height={100}
                  style={{
                    border:
                      selectedVariant.id === variant.id
                        ? '2px solid #3498db'
                        : '1px solid #f0f0f0',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
            {/* Chat AI - Xem them san pham - draw*/}
            <div
              onClick={() => dispatch(openDrawer())}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '20px',
                borderRadius: '8px',
                backgroundColor: '#f5f5f5',
                cursor: 'pointer',
                transition: 'background 0.3s',
                width: 'fit-content',
                padding: '8px'
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#e0e0e0')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#f5f5f5')
              }
            >
              <Image
                src='https://salt.tikicdn.com/ts/ta/d3/d4/1c/1d4ee6bf8bc9c5795529ac50a6b439dd.png'
                alt='Chat AI'
                width={30}
                height={30}
                style={{ borderRadius: '50%' }}
              />
              <span
                style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}
              >
                Xem thêm
              </span>
            </div>
          </Col>

          {/* Price and Variant Selection Column */}
          <Col xs={24} md={10} lg={10}>
            <Card>
              <h1
                style={{
                  color: 'rgb(39, 39, 42)',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '150%',
                  wordBreak: 'break-word',
                  whiteSpace: 'break-spaces'
                }}
              >
                {data?.name}
              </h1>
              <Rate style={{ fontSize: '15px' }} disabled defaultValue={4} />
              <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                <p
                  style={{
                    color: 'rgb(255, 66, 78)',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}
                >
                  {selectedVariant?.price}đ
                </p>
              </div>
              {/* Variant Cards */}
              <Row gutter={[16, 16]}>
                {data?.varients.map((variant: any) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={variant.id}>
                    <div
                      onClick={() => handleVariantSelect(variant)}
                      style={{
                        cursor: 'pointer',
                        width: '100%',
                        padding: '10px',
                        border:
                          selectedVariant.id === variant.id
                            ? '2px solid #3498db'
                            : '1px solid #f0f0f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <h4 style={{ fontSize: '13px' }}>{variant?.name}</h4>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card>
            <Card style={{ marginTop: '20px', borderRadius: '10px' }}>
              <h1
                style={{
                  color: 'rgb(39, 39, 42)',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '150%',
                  wordBreak: 'break-word',
                  whiteSpace: 'break-spaces'
                }}
              >
                Thông tin chi tiết
              </h1>
              <div>
                {data?.specs.map((spec: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '10px',
                      borderBottom: '1px solid rgb(235, 235, 240)',
                      paddingBottom: '8px'
                    }}
                  >
                    <span style={{ color: 'rgb(128, 128, 137)' }}>
                      {spec.k}
                    </span>
                    <span>
                      {spec.v} {spec.u !== 'String' ? spec.u : ''}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
            {/* Product Description */}
            <Card style={{ marginTop: '20px', borderRadius: '10px' }}>
              <h1
                style={{
                  color: 'rgb(39, 39, 42)',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '150%',
                  wordBreak: 'break-word',
                  whiteSpace: 'break-spaces'
                }}
              >
                Mô tả sản phẩm
              </h1>
              <div>
                <p>{data?.description}</p>
              </div>
            </Card>
          </Col>

          {/* Quantity and Cart Column */}
          <Col xs={24} md={10} lg={8}>
            <Card>
              <h1
                style={{
                  color: 'rgb(39, 39, 42)',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '150%',
                  wordBreak: 'break-word',
                  whiteSpace: 'break-spaces'
                }}
              >
                Số lượng
              </h1>
              <div
                style={{
                  marginTop: '20px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {/* Decrease Quantity */}
                <MinusSquareOutlined
                  style={{
                    fontSize: '18px',
                    cursor:
                      parseInt(quantity, 10) <= 1 ? 'not-allowed' : 'pointer',
                    color: parseInt(quantity, 10) <= 1 ? '#d9d9d9' : 'inherit'
                  }}
                  onClick={() => handleQuantityChange('decrease')}
                />
                <input
                  type='text'
                  value={quantity}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  style={{
                    width: '40px',
                    height: '32px',
                    textAlign: 'center',
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
                {/* Increase Quantity */}
                <PlusSquareOutlined
                  style={{
                    fontSize: '18px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleQuantityChange('increase')}
                />
              </div>

              {errorMessage && (
                <p style={{ color: 'red', marginBottom: '10px' }}>
                  {errorMessage}
                </p>
              )}
              {/* Subtotal */}
              <div>
                <h1
                  style={{
                    color: 'rgb(39, 39, 42)',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '150%',
                    wordBreak: 'break-word',
                    whiteSpace: 'break-spaces'
                  }}
                >
                  Tạm tính
                </h1>
                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <p
                    style={{
                      fontSize: '24px',
                      fontWeight: '600',
                      lineHeight: '150%'
                    }}
                  >
                    {calculateSubtotal()}đ
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                {/* Buy Now button */}
                <Button
                  type='primary'
                  style={{
                    padding: '10px 20px',
                    fontWeight: 'bold',
                    borderRadius: '5px'
                  }}
                >
                  Mua ngay
                </Button>
                <Button
                  type='default'
                  style={{
                    padding: '10px 20px',
                    fontWeight: 'bold',
                    borderRadius: '5px'
                  }}
                  onClick={handleToCart}
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default ProductDetails;
