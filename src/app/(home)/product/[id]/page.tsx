import {ProductDetailsById} from "@/utils/actions";
import ProductDetails from "@/components/product/product.details";


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
