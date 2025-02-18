"use client";
import {UserOutlined} from "@ant-design/icons";
import {
    Avatar,
    Button,
    Card,
    Col,
    Flex,
    Form,
    FormProps,
    Image,
    Input,
    Radio,
    RadioChangeEvent,
    Row, Skeleton,
    Typography,
    message
} from "antd";
import React, {useState} from "react";
import {revalidateTag} from "next/cache";
import Link from "next/link";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

type CustomerDetailsProps = {
    user: IUserById | null;
    access_token: string;
}

const CustomerDetails = (props: CustomerDetailsProps) => {
    const {user, access_token} = props;
    const [messageApi, contextHolder] = message.useMessage();
    if (!user) {
        return (
            <>
                <Skeleton active/>
            </>
        );
    }
    console.log("user:", user);
    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        const data = {
            ...values,
            id: user?.id,
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}identity-service/api/v1/user/update-user-client`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            console.log("Error:", res);
            messageApi.open({
                type: "error",
                content: "Cập nhật thông tin thất bại",
            })
            return;
        }
        const result = await res.json();
        console.log("result:", result);
        messageApi.open({
            type: "success",
            content: "Cập nhật thông tin thành công",
        });
        revalidateTag("customer-details");
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
    };

    const [value, setValue] = useState(0);

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };


    return (
        <>
            {contextHolder}
            <Row
                gutter={16}
                style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                }}
            >
                <Col span={13}>
                    <Card title="Thông tin cá nhân">
                        <Flex
                            justify="space-between"
                            wrap
                            style={{
                                maxWidth: "465px",
                            }}
                        >
                            <Avatar size={64} icon={<UserOutlined/>}/>
                            <Form
                                initialValues={{
                                    name: user?.name || "",
                                    address: user?.address ?? "Chưa có địa chỉ",
                                    gender: user?.gender ?? ""
                                }}
                                name="basic"
                                labelCol={{span: 8}}
                                wrapperCol={{span: 16}}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                style={{
                                    minWidth: "400px",
                                }}
                            >
                                <Form.Item<FieldType> label="Họ & Tên" name="name">
                                    <Input
                                        style={{
                                            width: "100%",
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item label="Giới tính" name="gender">
                                    <Radio.Group
                                        onChange={onChange}
                                        value={value}
                                        options={[
                                            {value: "FEMALE", label: "FEMALE"},
                                            {value: "MALE", label: "MALE"},
                                            {value: "OTHER", label: "OTHER"},
                                        ]}
                                    />
                                </Form.Item>

                                <Form.Item label="Địa chỉ" name="address">
                                    <Input
                                        placeholder="Address"
                                        style={{
                                            width: "100%",
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item label="Trạng thái">
                                    <Input value={user?.status} disabled/>
                                </Form.Item>

                                <Form.Item label={null}>
                                    <Button type="primary" htmlType="submit"
                                    >
                                        Cập nhật
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Flex>
                    </Card>
                </Col>
                <Col span={11}>
                    <Card
                        title="Thông tin liên hệ"
                        style={{
                            color: "grey",
                            fontSize: "1rem",
                        }}
                    >
                        {/* Phone */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <div>
                                    <Image
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/account/phone.png"
                                        width={30}
                                        height={30}
                                        alt="phone"
                                    />
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        marginLeft: "1rem",
                                    }}
                                >
                                    <span style={{fontSize: "14px"}}>Số điện thoại</span>
                                    <span style={{fontSize: "14px"}}>
                        {user?.phone ?? "Chưa cập nhật"}
                    </span>
                                </div>
                            </div>
                            <div>
                                <Link
                                    href={{
                                        pathname: `/home/customer/${
                                            user?.id
                                        }/edit/phone`,

                                        query: {phone: user?.phone},
                                    }}
                                >
                                    <Button type="primary">Cập nhật</Button>
                                </Link>
                            </div>
                        </div>

                        {/* Email */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                margin: "1rem 0",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <div>
                                    <Image
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/account/email.png"
                                        width={30}
                                        height={30}
                                        alt="email"
                                    />
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        marginLeft: "1rem",
                                    }}
                                >
                                    <span style={{fontSize: "14px"}}>Địa chỉ email</span>
                                    <span style={{fontSize: "14px"}}>{user?.email}</span>
                                </div>
                            </div>
                            <div>
                                <Button type="primary" style={{marginTop: "1rem"}}>
                                    Cập nhật
                                </Button>
                            </div>
                        </div>

                        <Typography
                            style={{
                                margin: "1rem 0",
                                fontWeight: "bold",
                                fontSize: "1rem",
                            }}
                        >
                            Bảo mật tài khoản
                        </Typography>

                        {/* Thiết lập mật khẩu */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                margin: "1rem 0",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <div>
                                    <Image
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/account/lock.png"
                                        width={30}
                                        height={30}
                                        alt="lock"
                                    />
                                </div>
                                <span style={{fontSize: "14px"}}>Thiết lập mật khẩu</span>
                            </div>
                            <div>
                                <Button type="primary">Cập nhật</Button>
                            </div>
                        </div>

                        {/* Yêu cầu xóa tài khoản */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                margin: "1.5rem 0",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <div>
                                    <Image
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
                                        width={20}
                                        height={20}
                                        alt="delete"
                                    />
                                </div>
                                <span style={{fontSize: "14px"}}>Yêu cầu xóa tài khoản</span>
                            </div>
                            <div>
                                <Button type="primary">Yêu cầu</Button>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default CustomerDetails;
