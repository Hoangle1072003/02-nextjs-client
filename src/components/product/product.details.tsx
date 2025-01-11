"use client";
import {Layout, Card, Row, Col, Rate, Breadcrumb, Button} from "antd";
import Image from "next/image";
import {useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {MinusSquareOutlined, PlusSquareOutlined} from "@ant-design/icons";

const ProductDetails = ({data}: { data: any }) => {
    const [selectedVariant, setSelectedVariant] = useState(data.varients[0]);
    const [quantity, setQuantity] = useState(1);
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);
    const productPath = pathSegments[pathSegments.length - 1];
    const productName = productPath.replace(/-\w+\.html$/, "");


    const handleVariantSelect = (variant: any) => {
        setSelectedVariant(variant);
        setQuantity(1);
    };

    const handleToCart = () => {
        const productData = {
            quantity: quantity,
            variant: selectedVariant
        };

        console.log("Product Data: ", productData);
    };

    const handleQuantityChange = (variantId: string, newQuantity: number) => {
        setQuantity(newQuantity);
    };

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link href="/">Trang chủ</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{productName}</Breadcrumb.Item>
            </Breadcrumb>
            <Layout style={{padding: "20px"}}>
                <Row gutter={[16, 16]}>
                    {/* Product Image Column */}
                    <Col xs={24} md={10} lg={6}>
                        <Card
                            style={{
                                border: "1px solid #f0f0f0",
                                borderRadius: "10px",
                                padding: "10px",
                                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                                pointerEvents: "none",
                            }}
                            cover={
                                <Image
                                    src={selectedVariant.image}
                                    alt={data.name}
                                    width={200}
                                    height={300}
                                />
                            }
                        />
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                            marginTop: "20px",
                        }}

                        >
                            {data.varients.map((variant: any) => {
                                return (
                                    <Image
                                        onClick={() => setSelectedVariant(variant)}
                                        key={variant.id}
                                        src={variant.image}
                                        alt={data.name}
                                        width={100}
                                        height={100}
                                        style={{
                                            border: selectedVariant.id === variant.id ? "2px solid #3498db" : "1px solid #f0f0f0",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </Col>

                    {/* Price and Variant Selection Column */}
                    <Col xs={24} md={10} lg={10}>
                        <Card>
                            <h1
                                style={{
                                    color: "rgb(39, 39, 42)",
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    lineHeight: "150%",
                                    wordBreak: "break-word",
                                    whiteSpace: "break-spaces",
                                }}
                            >
                                {data.name}
                            </h1>
                            <Rate style={{fontSize: "15px"}} disabled defaultValue={4}/>
                            <div style={{marginTop: "20px", marginBottom: "20px"}}>
                                <p
                                    style={{
                                        color: "rgb(255, 66, 78)",
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {selectedVariant.price}đ
                                </p>
                            </div>

                            {/* Variant Cards */}
                            <Row gutter={[16, 16]}>
                                {data.varients.map((variant: any) => (
                                    <Col xs={24} sm={12} md={8} lg={6} key={variant.id}>
                                        <div
                                            onClick={() => handleVariantSelect(variant)}
                                            style={{
                                                cursor: "pointer",
                                                width: "100%",
                                                padding: "10px",
                                                border:
                                                    selectedVariant.id === variant.id
                                                        ? "2px solid #3498db"
                                                        : "1px solid #f0f0f0",
                                                borderRadius: "8px",
                                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                            }}
                                        >
                                            <div>
                                                <h4 style={{fontSize: "13px"}}>{variant.name}</h4>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Card>
                        <Card
                            style={{
                                marginTop: "20px",
                                borderRadius: "10px",
                            }}
                        >
                            <h1
                                style={{
                                    color: "rgb(39, 39, 42)",
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    lineHeight: "150%",
                                    wordBreak: "break-word",
                                    whiteSpace: "break-spaces",
                                }}
                            >
                                Thông tin chi tiết
                            </h1>
                            <div>
                                {data.specs.map((spec: any, index: number) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginTop: "10px",
                                            borderBottom: "1px solid rgb(235, 235, 240)",
                                            paddingBottom: "8px",
                                        }}
                                    >
                                        <div>
                      <span style={{color: "rgb(128, 128, 137)"}}>
                        {spec.k}
                      </span>
                                        </div>
                                        <div>
                      <span>
                        {spec.v} {spec.u !== "String" ? spec.u : ""}
                      </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        {/* Product Description */}
                        <Card
                            style={{
                                marginTop: "20px",
                                borderRadius: "10px",
                            }}
                        >
                            <h1
                                style={{
                                    color: "rgb(39, 39, 42)",
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    lineHeight: "150%",
                                    wordBreak: "break-word",
                                    whiteSpace: "break-spaces",
                                }}
                            >
                                Mô tả sản phẩm
                            </h1>
                            <div>
                                <p>{data.description}</p>
                            </div>
                        </Card>
                    </Col>

                    {/* Quantity and Cart Column */}
                    <Col xs={24} md={10} lg={8}>
                        <Card>
                            <h1
                                style={{
                                    color: "rgb(39, 39, 42)",
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    lineHeight: "150%",
                                    wordBreak: "break-word",
                                    whiteSpace: "break-spaces",
                                }}
                            >
                                Số lượng
                            </h1>
                            <div
                                style={{
                                    marginTop: "20px",
                                    marginBottom: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                }}
                            >
                                {/* Decrease Quantity */}
                                <MinusSquareOutlined
                                    style={{
                                        fontSize: "18px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => console.log("Giảm số lượng")}
                                />

                                <input
                                    type="number"
                                    value={quantity}
                                    style={{
                                        width: "40px",
                                        height: "32px",
                                        textAlign: "center",
                                        border: "1px solid #d9d9d9",
                                        borderRadius: "4px",
                                        fontSize: "14px",
                                    }}
                                    readOnly
                                />

                                {/* Increase Quantity */}
                                <PlusSquareOutlined
                                    style={{
                                        fontSize: "18px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        handleQuantityChange(selectedVariant.id, quantity + 1)
                                    }
                                />
                            </div>

                            {/* Subtotal */}
                            <div>
                                <h1
                                    style={{
                                        color: "rgb(39, 39, 42)",
                                        fontSize: "16px",
                                        fontWeight: 500,
                                        lineHeight: "150%",
                                        wordBreak: "break-word",
                                        whiteSpace: "break-spaces",
                                    }}
                                >
                                    Tạm tính
                                </h1>
                                <div
                                    style={{
                                        marginTop: "20px",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: "24px",
                                            fontWeight: "600",
                                            lineHeight: "150%",
                                        }}
                                    >
                                        {selectedVariant.price * quantity}đ
                                    </p>
                                </div>
                            </div>

                            <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                                {/* Buy Now button */}
                                <Button
                                    onClick={handleToCart}
                                    type="primary"
                                    style={{
                                        padding: "10px 20px",
                                        fontWeight: "bold",
                                        borderRadius: "5px",
                                    }}
                                >
                                    Mua ngay
                                </Button>

                                {/* Add to Cart button */}
                                <Button
                                    type="default"
                                    style={{
                                        padding: "10px 20px",
                                        fontWeight: "bold",
                                        borderRadius: "5px",
                                    }}
                                >
                                    Thêm vào giỏ hàng
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Layout>
        </>
    );
};

export default ProductDetails;
