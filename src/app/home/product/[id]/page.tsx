import { ProductDetailsById } from "@/utils/actions";
import ProductDetails from "@/components/product/product.details";

import { auth } from "@/auth";

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const res = await ProductDetailsById(id);
  const session = await auth();

  return (
    <>
      <ProductDetails
        data={res?.data}
        session={session}
        productId={res?.data?.id}
      />
    </>
  );
};

export default ProductDetailsPage;
