import { Button, Result } from "antd";
import React from "react";
import Link from "next/link";
import AppLayout from "./(home)/layout";
import ClientWrapper from "@/lib/client.wrapper";

export default function Custom404() {
  return (
    <AppLayout>
      <ClientWrapper>
        <Result
          status="404"
          title="404"
          subTitle="Xin lỗi, trang bạn đang tìm không tồn tại."
          extra={
            <Link href="/">
              <Button type="primary">Quay về trang chủ</Button>
            </Link>
          }
        />
      </ClientWrapper>
    </AppLayout>
  );
}
