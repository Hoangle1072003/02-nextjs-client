import { ProductDetailsById } from "@/utils/actions";
import ProductDetails from "@/components/product/product.details";

import { auth } from "@/auth";

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const { id } = await params;
  let userId: string | null = null;
  if (session?.user?.id) {
    userId = session.user.id;
  }

  const res = await ProductDetailsById(userId, id);

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
