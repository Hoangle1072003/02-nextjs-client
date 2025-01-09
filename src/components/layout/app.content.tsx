"use client";
import {Layout, Menu} from "antd";
import AppContainer from "@/components/layout/app.container";

type AppContentProps = {
    children: React.ReactNode;
};

const AppContent: React.FC<AppContentProps> = ({children}) => {
    const {Content} = Layout;
    return (
        <>
            <Content style={{
                overflow: "initial",
            }}>
                <AppContainer>
                    {children}
                </AppContainer>
            </Content>
        </>
    )
}
export default AppContent;