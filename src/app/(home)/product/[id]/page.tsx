import { ProductDetailsById } from "@/utils/actions";
import ProductDetails from "@/components/product/product.details";

import type { Metadata } from "next";
import { sendRequest } from "@/utils/api";
import { auth } from "@/auth";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const temp = id.replace(".html", "");
  const parts = temp.split("-");
  const productId = parts.at(-1);
  const product = await sendRequest<IBackendRes<IProduct>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}product-service/api/v1/products/${productId}`,
    method: "GET",
  });

  return {
    title: product.data?.name,
  };
}

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
