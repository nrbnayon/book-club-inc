"use client";

import { booksOrdersData } from "@/data/booksOrdersData";
import { useState } from "react";
import type {
  GenericDataItem,
  ColumnConfig,
  FilterConfig,
  TableConfig,
} from "@/types/dynamicTableTypes";
import { DynamicTable } from "@/components/common/DynamicTable";
import StatsCard from "@/components/common/StatsCard";
import { orderMetrics } from "@/data/statsCardDataSets";

interface BookOrderManagementProps {
  itemsPerPage?: number;
  title?: string;
  buttonText?: string;
  pageUrl?: string;
  route?: string;
}

interface BookOrderDataItem extends GenericDataItem {
  orderId: string;
  customer: string;
  customerAvatar: string;
  customerEmail: string;
  bookName: string;
  bookCover: string;
  author: string;
  isbn: string;
  quantity: number;
  price: number;
  totalAmount: number;
  status:
    | "pending"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod:
    | "credit_card"
    | "paypal"
    | "stripe"
    | "bank_transfer"
    | "cash_on_delivery";
  shippingAddress: string;
  orderDate: string;
  deliveryDate?: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
}

export default function PaymentTrack({
  itemsPerPage = 10,
  title = "All Payment History",
  buttonText = "",
  pageUrl = "",
}: BookOrderManagementProps) {
  const [bookOrders, setBookOrders] = useState(booksOrdersData);
  const [isLoading, setIsLoading] = useState(false);

  // Column Configuration for Book Orders Table
  const bookOrderColumns: ColumnConfig[] = [
    {
      key: "bookName",
      label: "Book",
      sortable: true,
      searchable: true,
      showAvatar: true,
      avatarKey: "bookCover",
      align: "left",
      width: "300px",
    },
    {
      key: "customer",
      label: "Customer",
      sortable: true,
      searchable: true,
      showAvatar: true,
      avatarKey: "customerAvatar",
      align: "left",
      width: "100px",
    },
    {
      key: "orderDate",
      label: "Date",
      type: "date",
      sortable: true,
      align: "left",
      width: "50px",
    },
    {
      key: "totalAmount",
      label: "Price",
      type: "currency",
      sortable: false,
      align: "left",
      width: "50px",
    },
    {
      key: "paymentMethod",
      label: "Payment",
      type: "select",
      sortable: true,
      filterable: true,
      width: "60px",
      align: "center",
      options: [
        {
          value: "credit_card",
          label: "Credit Card",
          color: "#f59e0b",
          textColor: "#1f2937",
          icon: "💳",
        },
        {
          value: "paypal",
          label: "Paypal",
          color: "#3b82f6",
          textColor: "#ffffff",
          icon: "🅿️",
        },
        {
          value: "stripe",
          label: "Stripe",
          color: "#8b5cf6",
          textColor: "#ffffff",
          icon: "💜",
        },
        {
          value: "bank_transfer",
          label: "Bank Transfer",
          color: "#16a34a",
          textColor: "#ffffff",
          icon: "🏦",
        },
        {
          value: "cash_on_delivery",
          label: "Cash On",
          color: "#ef4444",
          textColor: "#ffffff",
          icon: "💵",
        },
      ],
    },
    {
      key: "paymentStatus",
      label: "Payment Status",
      type: "select",
      sortable: true,
      filterable: true,
      width: "80px",
      align: "center",
      options: [
        {
          value: "pending",
          label: "Pending",
          color: "#ECFDF3",
          textColor: "#027A48",
          icon: "⏳",
        },
        {
          value: "completed",
          label: "Completed",
          color: "#10b981",
          textColor: "#ffffff",
          icon: "✅",
        },
        {
          value: "paid",
          label: "Paid",
          color: "#16a34a",
          textColor: "#ffffff",
          icon: "✅",
        },
        {
          value: "failed",
          label: "Failed",
          color: "#ef4444",
          textColor: "#ffffff",
          icon: "❌",
        },
        {
          value: "refunded",
          label: "Refunded",
          color: "#6b7280",
          textColor: "#ffffff",
          icon: "↩️",
        },
      ],
    },
  ];

  // Filter Configuration for Book Orders Table
  const bookOrderFilters: FilterConfig[] = [
    {
      key: "paymentMethod",
      label: "Payment",
      type: "select",
      sortable: true,
      filterable: true,
      width: "60px",
      align: "center",
      options: [
        { value: "credit_card", label: "Credit Card", color: "#f59e0b" },
        { value: "paypal", label: "Paypal", color: "#3b82f6" },
        { value: "stripe", label: "Stripe", color: "#8b5cf6" },
        { value: "bank_transfer", label: "Bank Transfer", color: "#16a34a" },
        {
          value: "cash_on_delivery",
          label: "Cash On Delivery",
          color: "#ef4444",
        },
      ],
    },
    {
      key: "paymentStatus",
      label: "Payment Status",
      type: "select",
      options: [
        { value: "pending", label: "Pending" },
        { value: "paid", label: "Paid" },
        { value: "failed", label: "Failed" },
        { value: "refunded", label: "Refunded" },
      ],
    },
    {
      key: "paymentMethod",
      label: "Payment Method",
      type: "select",
      options: [
        { value: "credit_card", label: "Credit Card" },
        { value: "paypal", label: "PayPal" },
        { value: "stripe", label: "Stripe" },
        { value: "bank_transfer", label: "Bank Transfer" },
        { value: "cash_on_delivery", label: "Cash on Delivery" },
      ],
    },
  ];

  // Table Configuration for Book Orders Management
  const bookOrderTableConfig: TableConfig = {
    title: "",
    description: "",
    searchPlaceholder: "Search orders by ID, customer, or book name",
    itemsPerPage: itemsPerPage,
    enableSearch: true,
    enableFilters: true,
    enablePagination: true,
    enableSelection: true,
    enableSorting: true,
    striped: true,
    emptyMessage: "No book orders found",
    loadingMessage: "Loading book orders...",
  };

  const handleDataChange = (newData: GenericDataItem[]) => {
    // Type assertion since we know the data structure matches BookOrderDataItem
    setBookOrders(newData as BookOrderDataItem[]);
    console.log("Book orders data changed:", newData);
  };

  const handleBookOrderEdit = (order: GenericDataItem) => {
    console.log("Book order edited:", order);
    // Here you would typically make an API call to update the order
  };

  const handleBookOrderDelete = (orderId: string) => {
    console.log("Book order deleted:", orderId);
    // Here you would typically make an API call to delete the order
  };

  const handleBookOrdersSelect = (selectedIds: string[]) => {
    console.log("Selected book orders:", selectedIds);
    // Handle bulk operations like bulk status updates, bulk shipping, etc.
  };

  const handleExport = (exportData: GenericDataItem[]) => {
    console.log("Exporting book orders:", exportData);
    // Convert data to CSV format
    const headers = bookOrderColumns.map((col) => col.label).join(",");
    const csvData = (exportData as BookOrderDataItem[])
      .map((order) =>
        bookOrderColumns
          .map((col) => {
            const value = order[col.key];
            if (col.type === "currency") {
              return `${Number(value).toFixed(2)}`;
            }
            if (col.type === "date") {
              return new Date(String(value)).toLocaleDateString();
            }
            if (Array.isArray(value)) return `"${value.join("; ")}"`;
            if (typeof value === "string" && value.includes(","))
              return `"${value}"`;
            return value || "";
          })
          .join(",")
      )
      .join("\n");

    const csv = `${headers}\n${csvData}`;

    // Create and download file
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `book-orders-export-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBookOrders([...booksOrdersData]);
      setIsLoading(false);
      console.log("Book orders data refreshed");
    }, 1000);
  };

  return (
    <div className="w-full mx-auto">
      <StatsCard metrics={orderMetrics} />
      <div className="w-full flex justify-between items-center my-5">
        <h2 className="text-foreground text-xl font-semibold">{title}</h2>
      </div>

      <DynamicTable
        data={bookOrders}
        columns={bookOrderColumns}
        filters={bookOrderFilters}
        tableConfig={bookOrderTableConfig}
        onDataChange={handleDataChange}
        onItemEdit={handleBookOrderEdit}
        onItemDelete={handleBookOrderDelete}
        onItemsSelect={handleBookOrdersSelect}
        onExport={handleExport}
        onRefresh={handleRefresh}
        buttonText={buttonText}
        pageUrl={pageUrl}
        isLoading={isLoading}
      />
    </div>
  );
}
