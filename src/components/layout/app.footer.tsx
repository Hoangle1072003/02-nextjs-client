"use client";
import {Layout} from "antd";

const AppFooter = () => {
    const {Footer} = Layout;
    return (
        <Footer
            style={{
                fontSize: "12px",
                color: "#888",
                position: "fixed",
                bottom: 0,
                backgroundColor: "#fff",
                borderTop: "1px solid #e8e8e8",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "calc(100% - 80px)",
            }}
        >
            &copy; {new Date().getFullYear()} Admin. All Rights Reserved. Unauthorized
            copying or redistribution is prohibited.
        </Footer>
    );
};

export default AppFooter;
