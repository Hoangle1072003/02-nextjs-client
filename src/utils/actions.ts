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

export const getPaginatedProducts = async (
  page: number,
  size: number,
  sortBy: string,
  dir: string,
  minPrice: number,
  maxPrice: number,
  keyword?: string
) => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}product-service/api/v1/products`;
    const url = keyword ? `${baseUrl}/search` : `${baseUrl}/allProductPage`;
    const params: any = {
      pageNumber: page,
      pageSize: size,
      sortBy: sortBy || '',
      dir: dir || 'asc',
      minPrice: minPrice || '',
      maxPrice: maxPrice || ''
    };

    if (keyword) {
      params.keyword = keyword;
      params.price = maxPrice !== 10000 ? maxPrice : null;
      delete params.minPrice;
      delete params.maxPrice;
    }

    const response = await sendRequest<any>({
      url,
      method: 'GET',
      queryParams: params
    });

    console.log('API URL:', url);
    console.log('Params:', params);
    console.log('API Response:', response);

    return {
      data: {
        products: response.data?.products || [],
        totalElements:
          response.data?.totalElements || response.data?.products?.length || 0
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { data: { products: [], totalElements: 0 } };
  }
};
