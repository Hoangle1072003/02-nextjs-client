"use client";
import {Card, Input, Button, Space} from "antd";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

const EditPhoneDetails = () => {
    const searchParams = useSearchParams(); // Get search params
    const [phone, setPhone] = useState<string>("");

    useEffect(() => {
        const phoneNumber = searchParams.get("phone");
        if (phoneNumber) {
            setPhone(phoneNumber);
        }
    }, [searchParams]);

    const handleUpdate = () => {
        console.log("Updated phone number:", phone);
    };


    return (
        <>
            <Card
                title="Chỉnh sửa số điện thoại"
                style={{width: 400, margin: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}
            >
                <Space direction="vertical" style={{width: '100%'}}>
                    <Input
                        placeholder="Nhập số điện thoại mới"
                        style={{
                            borderRadius: '8px',
                            padding: '10px',
                            fontSize: '16px',
                            borderColor: '#d9d9d9',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <Button
                        type="primary"
                        size="large"
                        style={{
                            borderRadius: '8px',
                            padding: '10px 20px',
                            backgroundColor: '#1890ff',
                            color: '#fff',
                            fontSize: '16px',
                            width: '100%',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                        onClick={handleUpdate}
                    >
                        Cập nhật
                    </Button>
                </Space>
            </Card>
        </>
    );
};

export default EditPhoneDetails;
