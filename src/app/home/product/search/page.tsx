import { Layout } from "antd";
import AppSider from "@/components/layout/app.sider";
import CategoryProductList from "@/components/category/CategoryProductList";
import { CategoryList } from "@/utils/actions";
import axios from "axios";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { keyword?: string } | undefined;
}) => {
  const keyword = searchParams?.keyword || "";
  let products = [];
  let error = null;

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}product-service/api/v1/products/search`;
    const response = await axios.get(apiUrl, {
      params: { keyword },
    });
    products = response.data?.data?.products || [];
  } catch (err) {
    error = "Error loading search results";
  }

  const categories = await CategoryList();

  return (
    <Layout
      style={{
        width: "1240px",
        margin: "24px auto",
        maxWidth: "1240px",
        minHeight: "100vh",
      }}
    >
      <AppSider categories={categories.data || []} />
      {error ? (
        <div>{error}</div>
      ) : (
        <CategoryProductList
          products={products}
          productName={`Kết quả tìm kiếm: "${keyword}"`}
        />
      )}
    </Layout>
  );
};

export default SearchPage;
