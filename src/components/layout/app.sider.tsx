"use client";
import {Layout, Menu} from "antd";
import {
    BookOutlined,
    HomeOutlined,
    MobileOutlined,
    AppstoreAddOutlined,
    ContainerOutlined,
    SkinOutlined,
    CarOutlined,
    ShoppingOutlined,
    SearchOutlined,
} from "@ant-design/icons";

const AppSider = () => {
    const {Sider} = Layout;

    const menuItems = [
        {
            key: "1",
            icon: <BookOutlined/>,
            label: "Nhà Sách Tiki",
        },
        {
            key: "sub1",
            icon: <HomeOutlined/>,
            label: "Nhà Cửa - Đời Sống",
            children: [
                {key: "2", label: "Nhà Cửa"},
                {key: "3", label: "Đời Sống"},
            ],
        },
        {
            key: "sub2",
            icon: <MobileOutlined/>,
            label: "Điện Thoại - Máy Tính Bảng",
            children: [
                {key: "4", label: "Điện Thoại"},
                {key: "5", label: "Máy Tính Bảng"},
            ],
        },
        {
            key: "sub3",
            icon: <AppstoreAddOutlined/>,
            label: "Đồ Chơi - Mẹ & Bé",
            children: [
                {key: "6", label: "Đồ Chơi"},
                {key: "7", label: "Mẹ & Bé"},
            ],
        },
        {
            key: "sub4",
            icon: <AppstoreAddOutlined/>,
            label: "Thiết Bị Số - Phụ Kiện Số",
            children: [
                {key: "8", label: "Thiết Bị Số"},
                {key: "9", label: "Phụ Kiện Số"},
            ],
        },
        {
            key: "10",
            icon: <ContainerOutlined/>,
            label: "Điện Gia Dụng",
        },
        {
            key: "11",
            icon: <SkinOutlined/>,
            label: "Làm Đẹp - Sức Khỏe",
        },
        {
            key: "12",
            icon: <CarOutlined/>,
            label: "Ô Tô - Xe Máy - Xe Đạp",
        },
        {
            key: "13",
            icon: <ShoppingOutlined/>,
            label: "Thời Trang Nữ",
        },
        {
            key: "14",
            icon: <SearchOutlined/>,
            label: "Bách Hóa Online",
        },
        {
            key: "15",
            icon: <AppstoreAddOutlined/>,
            label: "Thể Thao - Dã Ngoại",
        },
    ];

    return (
        <Sider
            width={200}
            style={{
                overflowY: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                backgroundColor: "#f0f2f5",
                maxHeight: "100vh",
                borderRadius: "10px",
                marginRight: "16px",
            }}
        >
            {/* Heading for the categories */}
            <div
                style={{
                    padding: "16px",
                    fontSize: "13px",
                    fontWeight: "bold",
                    backgroundColor: "#ffffff",
                    borderBottom: "1px solid #ddd",
                }}
            >
                Danh Mục
            </div>

            <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                items={menuItems}
            />
        </Sider>
    );
};

export default AppSider;
