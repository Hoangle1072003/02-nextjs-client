import { Result } from "antd";
import ClientWrapper from "@/lib/client.wrapper";
import AppLayout from "./home/layout";

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
