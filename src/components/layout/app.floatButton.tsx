"use client";
import { useEffect, useState } from "react";
import {
  CommentOutlined,
  CustomerServiceOutlined,
  CloseOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  FloatButton,
  Drawer,
  Input,
  List,
  Button,
  Space,
  Typography,
  Spin,
  Select,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { closeDrawer, openDrawer } from "@/lib/features/draw/drawerSlice";
import { div } from "framer-motion/client";

const { Text } = Typography;
const { Option } = Select;

interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
  type: string;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}chat-service/api/qna/ask`;

const CustomFloatButton: React.FC = ({ session }) => {
  const open = useSelector((state: RootState) => state.drawer.open);
  const productId = useSelector(
    (state: RootState) => state?.productDetails.product?.id
  );
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState("PRODUCT");

  useEffect(() => {
    console.log("Redux open changed:", open);
  }, [open]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      content: message,
      isUser: true,
      timestamp: new Date(),
      type: messageType,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.access_token}`,
        },
        body: JSON.stringify({
          type: messageType,
          question: message,
          productId: messageType === "PRODUCT" ? productId : null,
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          content:
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Xin lỗi, không có phản hồi từ server.",
          isUser: false,
          timestamp: new Date(),
          type: "AI",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          content: "Có lỗi xảy ra, vui lòng thử lại sau!",
          isUser: false,
          timestamp: new Date(),
          type: "AI",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 24 }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton />
        <FloatButton
          icon={<CommentOutlined />}
          onClick={() => dispatch(openDrawer())}
        />
      </FloatButton.Group>

      <Drawer
        title="Chat hỗ trợ"
        placement="right"
        closable={false}
        onClose={() => dispatch(closeDrawer())}
        open={open}
        width={400}
        extra={
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => dispatch(closeDrawer())}
          />
        }
      >
        <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
          <List
            dataSource={messages}
            renderItem={(msg) => (
              <List.Item
                style={{
                  justifyContent: msg.isUser ? "flex-end" : "flex-start",
                  padding: "8px 0",
                }}
              >
                <Space
                  direction="vertical"
                  align={msg.isUser ? "end" : "start"}
                  style={{ maxWidth: "80%" }}
                >
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: 20,
                      background: msg.isUser ? "#1890ff" : "#f0f0f0",
                      color: msg.isUser ? "white" : "black",
                    }}
                  >
                    {`[${msg.type}] ${msg.content}`}
                  </div>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {msg.timestamp.toLocaleTimeString()}
                  </Text>
                </Space>
              </List.Item>
            )}
          />
          {loading && (
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <Spin size="small" />
            </div>
          )}
        </div>
        {productId && messageType === "PRODUCT" && (
          <div
            style={{
              padding: 16,
              borderTop: "1px solid #f0f0f0",
              background: "#f5f5f",
            }}
          >
            <Text type="secondary" style={{ fontSize: 12 }}>
              Đang xem sản phẩm: {productId}
            </Text>
          </div>
        )}
        <div style={{ padding: 16 }}>
          <Select
            value={messageType}
            onChange={setMessageType}
            style={{
              width: "100%",
              marginBottom: 8,
            }}
          >
            <Option value="PRODUCT">PRODUCT</Option>
            <Option value="AI">AI</Option>
            <Option value="USER">USER</Option>
          </Select>
          <Input.TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            style={{ marginBottom: 8 }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
            disabled={!message.trim() || loading}
          >
            Gửi
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default CustomFloatButton;
