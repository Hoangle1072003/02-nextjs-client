import React from "react";
import {Layout} from "antd";
import ProductList from "@/components/product/product.list";
import {sendRequest} from "@/utils/api";
import AppSider from "@/components/layout/app.sider";
import {Content} from "antd/es/layout/layout";
import AppLayout from "@/app/(home)/layout";

const AppPage = async () => {
    const res = await sendRequest<IBackendRes<IProduct[]>>({
        url: "http://localhost:8083/api/v1/products",
        method: "GET",
    });
    const products = res.data || [];
    return (
        <>
            <AppLayout>
                <Layout style={{display: "flex", flexDirection: "row"}}>
                    <AppSider/>
                    <Content>
                        <ProductList data={products}/>
                    </Content
                    >
                </Layout>
            </AppLayout>
        </>
    );
};

export default AppPage;
