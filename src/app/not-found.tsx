"use client";
import {Button, Result} from "antd";
import {useRouter} from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    return (
        <>
            <Result
                status="403"
                title="403"
                subTitle="Sorry, The page you are looking for is currently unavailable!"
                extra={
                    <Button type="primary" onClick={() => router.push("/")}>
                        Back Home
                    </Button>
                }
            />
        </>
    );
}
