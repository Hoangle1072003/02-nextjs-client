'use client';
import React from 'react';
import { Card, Tooltip } from 'antd';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product }: { product: any }) => {
  const generateProductLink = (product: any) => {
    const slug = product.name.toLowerCase().replace(/\s+/g, '-');
    return `/product/${slug}-${product.id}.html`;
  };

  return (
    <div>
      <Link href={generateProductLink(product)} passHref>
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
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {/* Product Image */}
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <Image
              src={product.varients[0].image}
              alt={product.name}
              width={140}
              height={140}
              style={{ objectFit: 'contain', borderRadius: '10px' }}
            />
          </div>

          {/* Product Info */}
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

          {/* Product Price */}
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

          {/* Rating and Delivery */}
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
    </div>
  );
};

export default ProductCard;
