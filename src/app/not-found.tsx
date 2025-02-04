import { Result } from "antd";
import AppLayout from "./(home)/layout";
import ClientWrapper from "@/lib/client.wrapper";

export default function NotFound() {
  return (
    <AppLayout>
      <ClientWrapper>
        <Result
          status="403"
          title="403"
          subTitle="Xin lỗi, trang bạn đang tìm hiện không khả dụng!"
        />
      </ClientWrapper>
    </AppLayout>
  );
}
