const ProductDetailsPage = ({params}: { params: { id: string } }) => {
    return (
        <>
            <h1>Product Details Page
                {params.id}
            </h1>
        </>
    )

}
export default ProductDetailsPage;