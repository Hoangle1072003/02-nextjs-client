import {ProductDetailsById} from "@/utils/actions";
import ProductDetails from "@/components/product/product.details";

import type {Metadata} from 'next'

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata(
    {params}: Props,
): Promise<Metadata> {
    const {id} = await params;
    const temp = id.replace(".html", "");
    const parts = temp.split("-");
    const productId = parts.at(-1);

    const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}product-service/api/v1/products/${productId}`).then((res) => res.json())

    return {
        title: product.data.name,
        description: product.data.description,

    }
}

const ProductDetailsPage = async ({params}: { params: { id: string } }) => {
    const {id} = await params
    const res = await ProductDetailsById(id);


    return (
        <>
            <ProductDetails data={res.data}/>
        </>
    )

}

export default ProductDetailsPage;
