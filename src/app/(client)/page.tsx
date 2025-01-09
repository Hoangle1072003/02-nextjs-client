"use client";

import AppLayout from "@/app/(client)/layout";
import {Col, Row} from "antd";

const AppPage = () => {
    return (
        <>
            <AppLayout>
                <Row gutter={16}>
                    {/* Cột chiếm 30% */}
                    <Col span={7} style={{background: "#fafafa", padding: "16px"}}>
                        <h2>Left Content (30%)</h2>
                        <p>Đây là nội dung bên trái.</p>
                    </Col>

                    {/* Cột chiếm 70% */}
                    <Col span={17} style={{background: "#fff", padding: "16px"}}>
                        <h2>Right Content (70%)</h2>
                        <p>Đây là nội dung bên phải.</p>
                    </Col>
                </Row>
            </AppLayout>
        </>
    )
}
export default AppPage;