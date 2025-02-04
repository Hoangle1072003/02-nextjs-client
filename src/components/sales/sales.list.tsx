import React from "react";
import { Card, Empty } from "antd";

const SalesList: React.FC = () => {
  const data: any[] = [];

  return (
    <div>
      {data.length === 0 ? (
        <Card
          style={{
            textAlign: "center",
            border: "1px solid #f0f0f0",
            borderRadius: "5px",
          }}
        >
          <Empty
            description="Không có dữ liệu"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Card>
      ) : (
        <div>
          {data.map((item, index) => (
            <Card key={index} style={{ marginBottom: "10px" }}>
              <p>Đơn hàng {item.orderId}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SalesList;
