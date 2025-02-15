import React from "react";

type ProductDetailsLayoutProps = {
    children: React.ReactNode;
};

const ProductDetailsLayout: React.FC<ProductDetailsLayoutProps> = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
}
export default ProductDetailsLayout;