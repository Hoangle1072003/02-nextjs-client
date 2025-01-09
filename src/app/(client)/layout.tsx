import {Layout} from "antd";
import React from "react";
import AppHeader from "@/components/layout/app.header";
import AppFooter from "@/components/layout/app.footer";
import AppContent from "@/components/layout/app.content";

type AppLayoutProps = {
    children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({children}) => {
    return (
        <Layout style={{
            minHeight: "100vh",
            width: "100%",
        }}>

            <AppHeader/>
            <AppContent>
                {children}
            </AppContent>
            <AppFooter/>
        </Layout>
    );
};

export default AppLayout;
