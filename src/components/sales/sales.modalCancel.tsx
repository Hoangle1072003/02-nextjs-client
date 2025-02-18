import { Input, Modal, Radio, Space } from "antd";
import { useState, useEffect } from "react";

interface SalesModalCancelProps {
  open: boolean;
  onOk: (reason: string) => void;
  onCancel: () => void;
  confirmLoading: boolean;
}

const SalesModalCancel = ({
  open,
  onOk,
  onCancel,
  confirmLoading,
}: SalesModalCancelProps) => {
  const [value, setValue] = useState<number>(1);
  const [otherReason, setOtherReason] = useState<string>("");

  useEffect(() => {
    if (!open) {
      setValue(1);
      setOtherReason("");
    }
  }, [open]);

  const handleOk = () => {
    const reason = value === 6 ? otherReason.trim() : getReasonText(value);
    if (!reason) return;
    onOk(reason);
  };

  const getReasonText = (value: number) => {
    const reasons: Record<number, string> = {
      1: "Tôi đổi ý, không muốn mua nữa",
      2: "Tôi tìm thấy giá tốt hơn ở nơi khác",
      3: "Thời gian giao hàng quá lâu",
      4: "Tôi gặp vấn đề với phương thức thanh toán",
      5: "Tôi nhập sai địa chỉ giao hàng",
    };
    return reasons[value] || "Lý do khác";
  };

  return (
    <Modal
      title="Tại sao bạn muốn huỷ đơn hàng?"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      okButtonProps={{ disabled: value === 6 && !otherReason.trim() }}
    >
      <Radio.Group
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          padding: "12px 0",
        }}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      >
        {[1, 2, 3, 4, 5].map((key) => (
          <Radio key={key} value={key}>
            {getReasonText(key)}
          </Radio>
        ))}
        <Radio value={6}>
          <Space direction="vertical">
            <span>Lý do khác...</span>
            {value === 6 && (
              <Input
                placeholder="Nhập lý do"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
              />
            )}
          </Space>
        </Radio>
      </Radio.Group>
    </Modal>
  );
};

export default SalesModalCancel;
