'use server';
import { signIn } from '@/auth';
import { sendRequest } from '@/utils/api';

export async function authenticate(username: string, password: string) {
  try {
    const r = await signIn('credentials', {
      username: username,
      password: password,
      redirect: false
    });

    return r;
  } catch (error) {
    if ((error as any).name === 'InvalidEmailPasswordError') {
      return { error: error.type as any, code: 1 };
    } else if ((error as any).name === 'InActiveAccountError') {
      return { error: error.type as any, code: 2 };
    } else {
      return {
        error: 'Internal Server Error',
        code: 3
      };
    }
  }
}

export async function ProductDetailsById(productId: string) {
  const temp = productId.replace('.html', '');

  const parts = temp.split('-');

  const id = parts.at(-1);

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}product-service/api/v1/products/${id}`,
    method: 'GET'
  });

  return res;
}

// category list
export async function CategoryList() {
  const res = await sendRequest<IBackendRes<ICategory[]>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}product-service/api/v1/category`,
    method: 'GET'
  });

  return res;
}

export async function getCategoryById(id: string) {
  const res = await sendRequest<IBackendRes<ICategory>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}product-service/api/v1/category/${id}`, // Sửa URL theo định dạng mới
    method: 'GET'
  });

  return res;
}

export const getPaginatedProducts = async (
  pageNumber: number,
  pageSize: number,
  sortBy: string,
  sortDir: string,
  minPrice?: number,
  maxPrice?: number
) => {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }product-service/api/v1/products/allProductPage?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&dir=${sortDir}&minPrice=${
      minPrice || ''
    }&maxPrice=${maxPrice || ''}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  const data = await response.json();
  return data;
};

export const getAllProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}product-service/api/v1/products`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  const data = await response.json();
  return data;
};
