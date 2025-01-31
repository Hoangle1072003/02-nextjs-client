export {};
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
  }

  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }

  interface ILogin {
    user: {
      id: string;
      username: string;
      email: string;
      status: string;
      role: {
        id: string;
        name: string;
        status: boolean;
      };
    };
    access_token: string;
  }

  // >>>>>>>>>> start of product >>>>>>>>>>>>>
  interface IProduct {
    id: string;
    name: string;
    varients: IProductVariant[];
  }

  interface IProductVariant {
    id: string;
    name: string;
    price: number;
    image: string;
  }

  // >>>>>>>>>> end of product >>>>>>>>>>>>>

  // >>>>>>>>>> start of category >>>>>>>>>>>>>
  interface ICategory {
    id: string;
    name: string;
  }
  // >>>>>>>>>> end of category >>>>>>>>>>>>>

  interface IUserById {
    id: string;
    name: string;
    email: string;
    age: number;
    address: string;
    phone: string;
    gender: string;
    status: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    role: {
      id: string;
      name: string;
    };
  }
}
