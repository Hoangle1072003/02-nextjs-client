"use client";
import { Empty, Result, Skeleton, Table } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";
import { Tag } from "antd";
import Link from "next/link";

interface Iprops {
  session: any;
}

const SalesProcess = ({ session }: Iprops) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const current = searchParams.get("current")
    ? Number(searchParams.get("current"))
    : 1;
  const pageSize = searchParams.get("pageSize")
    ? Number(searchParams.get("pageSize"))
    : 5;

  const fetchOrders = async (url: string) => {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${session?.data?.user?.access_token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
  };

  const { data, error, isLoading } = useSWR(
    session?.data?.user?.id
      ? `${process.env.NEXT_PUBLIC_API_URL}order-service/api/v1/orders/get-all-orders-processing?userId=${session?.data?.user?.id}&current=${current}&pageSize=${pageSize}&sort=desc`
      : null,
    fetchOrders
  );

  if (error) {
    return (
      <Result
        status="error"
        title="Error"
        subTitle="Unable to load orders. Please try again later."
      />
    );
  }

  const orders = data?.data?.result || [];

  console.log("orders", orders);

  const meta = data?.data?.meta || {};

  const columns = [
    {
      title: "STT",
      render: (_: any, record: any, index: number) => {
        return <span>{(current - 1) * pageSize + index + 1}</span>;
      },
      width: 50,
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },

    // {
    //   title: "Sản phẩm",
    //   key: "product",
    //   render: (_: any, record: any) => {
    //     const firstItem = record?.cartItems?.[0];
    //     if (!firstItem) return "No products";
    //     return (
    //       <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    //         <Image
    //           src={firstItem.productVariant.varients[0].image}
    //           alt="Product"
    //           width={50}
    //           height={50}
    //           style={{ borderRadius: "5px", objectFit: "cover" }}
    //         />
    //         <span>{firstItem.productVariant.name}</span>
    //       </div>
    //     );
    //   },
    // },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount: number) => totalAmount?.toLocaleString("en-US"),
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "paymentStatus",
      render: (_: any, record: any) => {
        const status = record?.paymentStatus || "Chưa xác định";
        let color = "default";
        let translatedStatus = status;

        if (status === "SUCCESS") {
          color = "green";
          translatedStatus = "Thành công";
        } else if (status === "PENDING") {
          color = "orange";
          translatedStatus = "Đang chờ";
        } else if (status === "FAILED") {
          color = "red";
          translatedStatus = "Thất bại";
        } else if (status === "REFUNDED") {
          color = "blue";
          translatedStatus = "Đang hoàn tiền";
        } else if (status === "EXPIRED") {
          color = "gray";
          translatedStatus = "Hết hạn";
        } else if (status === "CANCELLED") {
          color = "red";
          translatedStatus = "Đã hủy";
        }

        return <Tag color={color}>{translatedStatus}</Tag>;
      },
    },
    // {
    //   title: "Biến thể sản phẩm",
    //   key: "variant",
    //   render: (_: any, record: any) => {
    //     const firstItem = record?.cartItems?.[0];
    //     return firstItem ? firstItem.productVariant.varients[0].name : "N/A";
    //   },
    // },
    {
      title: "Trạng thái đơn hàng",
      key: "orderStatus",
      render: (_: any, record: any) => {
        const status = record?.orderStatus || "Chưa xác định";
        let color = "default";
        let translatedStatus = status;

        switch (status) {
          case "ACTIVE":
            color = "blue";
            translatedStatus = "Đang hoạt động";
            break;
          case "COMPLETED":
            color = "green";
            translatedStatus = "Hoàn thành";
            break;
          case "CANCELLED":
            color = "red";
            translatedStatus = "Đã hủy";
            break;
          case "PENDING":
            color = "orange";
            translatedStatus = "Đang chờ xử lý";
            break;
          case "SHIPPING":
            color = "yellow";
            translatedStatus = "Đang vận chuyển";
            break;
          default:
            translatedStatus = "Chưa xác định";
        }

        return <Tag color={color}>{translatedStatus}</Tag>;
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => {
        return (
          <Link
            href={{
              pathname: `/sales/order/history/${record.id}`,
            }}
          >
            Xem chi tiết
          </Link>
        );
      },
    },
  ];

  const onChange = (pagination: any) => {
    if (pagination && pagination.current) {
      const params = new URLSearchParams(searchParams);
      params.set("current", pagination.current.toString());
      params.set("pageSize", pagination.pageSize.toString());
      replace(`${pathName}?${params.toString()}`);
    }
  };

  return (
    <Table
      dataSource={orders}
      columns={columns}
      loading={isLoading}
      pagination={{
        current: current,
        pageSize: pageSize,
        total: meta?.total,
        showSizeChanger: true,
      }}
      onChange={onChange}
      bordered
      rowKey="id"
      locale={{
        emptyText: isLoading ? (
          <Skeleton active />
        ) : (
          <>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Không có dữ liệu"
            />
          </>
        ),
      }}
    />
  );
};

export default SalesProcess;
