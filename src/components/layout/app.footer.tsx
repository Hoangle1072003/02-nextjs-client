"use client";
import {Layout, Row, Col, Typography, Space} from "antd";
import {
    FacebookOutlined,
    YoutubeOutlined,
    AppleOutlined,
    AndroidOutlined,
} from "@ant-design/icons";

const AppFooter = () => {
    const {Footer} = Layout;
    const {Text, Link} = Typography;

    return (
        <Footer
            style={{
                fontSize: "12px",
                color: "#888",
                backgroundColor: "#fff",
                borderTop: "1px solid #e8e8e8",
                padding: "20px 0",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: "20px",
            }}
        >
            <Row
                gutter={[16, 24]}
            >
                <Col xs={24} sm={12} md={6} lg={6}>
                    <Space direction="vertical" style={{width: "100%"}}>
                        <Text strong>Hỗ trợ khách hàng</Text>
                        <Text>Hotline: 1900-6035</Text>
                        <Text>(1000 đ/phút, 8-21h kể cả T7, CN)</Text>
                        <Link href="#">Các câu hỏi thường gặp</Link>
                        <Link href="#">Gửi yêu cầu hỗ trợ</Link>
                        <Link href="#">Hướng dẫn đặt hàng</Link>
                        <Link href="#">Phương thức vận chuyển</Link>
                        <Link href="#">Chính sách kiểm hàng</Link>
                        <Link href="#">Chính sách đổi trả</Link>
                        <Link href="#">Hướng dẫn trả góp</Link>
                        <Link href="#">Chính sách nhập khẩu</Link>
                        <Link href="mailto:hotro@tiki.vn">Hỗ trợ khách hàng: hotro@tiki.vn</Link>
                        <Link href="mailto:security@tiki.vn">Báo lỗi bảo mật: security@tiki.vn</Link>
                    </Space>
                </Col>

                <Col xs={24} sm={12} md={6} lg={6}>
                    <Space direction="vertical" style={{width: "100%"}}>
                        <Text strong>Về Tiki</Text>
                        <Link href="#">Giới thiệu Tiki</Link>
                        <Link href="#">Tiki Blog</Link>
                        <Link href="#">Tuyển dụng</Link>
                        <Link href="#">Chính sách bảo mật thanh toán</Link>
                        <Link href="#">Chính sách bảo mật thông tin cá nhân</Link>
                        <Link href="#">Chính sách giải quyết khiếu nại</Link>
                        <Link href="#">Điều khoản sử dụng</Link>
                        <Link href="#">Giới thiệu Tiki Xu</Link>
                        <Link href="#">Tiếp thị liên kết cùng Tiki</Link>
                        <Link href="#">Bán hàng doanh nghiệp</Link>
                        <Link href="#">Điều kiện vận chuyển</Link>
                    </Space>
                </Col>

                <Col xs={24} sm={12} md={6} lg={6}>
                    <Space direction="vertical" style={{width: "100%"}}>
                        <Text strong>Hợp tác và liên kết</Text>
                        <Link href="#">Quy chế hoạt động Sàn GDTMĐT</Link>
                        <Link href="#">Bán hàng cùng Tiki</Link>
                        <Text strong>Chứng nhận bởi</Text>
                        <Text>Chứng nhận 1</Text>
                        <Text>Chứng nhận 2</Text>
                    </Space>
                </Col>

                <Col xs={24} sm={12} md={6} lg={6}>
                    <Space direction="vertical" style={{width: "100%"}}>
                        <Text strong>Phương thức thanh toán</Text>
                        <Text>Thanh toán qua thẻ tín dụng</Text>
                        <Text>Thanh toán qua ví điện tử</Text>
                        <Text>Thanh toán qua chuyển khoản</Text>
                        <Text>Thanh toán khi nhận hàng (COD)</Text>
                        <Text strong>Kết nối với chúng tôi</Text>
                        <Space>
                            <FacebookOutlined/>
                            <YoutubeOutlined/>
                        </Space>
                        <Text strong>Tải ứng dụng trên điện thoại</Text>
                        <Space>
                            <AppleOutlined/>
                            <AndroidOutlined/>
                        </Space>
                    </Space>
                </Col>
            </Row>
        </Footer>
    );
};

export default AppFooter;
