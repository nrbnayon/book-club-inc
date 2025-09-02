"use client";

import { booksOrdersData } from "@/data/booksOrdersData";
import { useState } from "react";
import type {
  GenericDataItem,
  ColumnConfig,
  FormFieldConfig,
  FilterConfig,
  ActionConfig,
  TableConfig,
  EditModalConfig,
} from "@/types/dynamicTableTypes";
import { DynamicTable } from "@/components/common/DynamicTable";
import Lordicon from "@/components/lordicon/lordicon-wrapper";
import StatsCard from "@/components/common/StatsCard";
import { orderMetrics } from "@/data/statsCardDataSets";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

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

export default function BooksOrdersManage({
  itemsPerPage = 10,
  title = "All Book Orders",
  buttonText = "Show all",
  pageUrl = "/orders",
}: BookOrderManagementProps) {
  const [bookOrders, setBookOrders] = useState(booksOrdersData);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // Column Configuration for Book Orders Table
  const bookOrderColumns: ColumnConfig[] = [
    {
      key: "orderId",
      label: "Order ID",
      sortable: true,
      searchable: true,
      align: "left",
      width: "50px",
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
      key: "orderDate",
      label: "Date",
      type: "date",
      sortable: true,
      align: "center",
      width: "50px",
    },
    {
      key: "totalAmount",
      label: "Amount",
      type: "currency",
      sortable: true,
      align: "right",
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
          iconType: "emoji",
          iconUrl: "",
        },
        {
          value: "paypal",
          label: "",
          icon: "/icons/paypal.png",
          iconType: "image",
          iconUrl: "/icons/paypal.png",
        },
        {
          value: "stripe",
          label: "",
          icon: "/icons/stripe.png",
          iconType: "image",
          iconUrl: "/icons/stripe.png",
        },
        {
          value: "bank_transfer",
          label: "Bank Transfer",
          color: "#16a34a",
          textColor: "#ffffff",
          icon: "🏦",
          iconType: "emoji",
          iconUrl: "",
        },
        {
          value: "cash_on_delivery",
          label: "Cash On Delivery",
          color: "#ef4444",
          textColor: "#ffffff",
          icon: "💵",
          iconType: "emoji",
          iconUrl: "",
        },
      ],
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      sortable: true,
      filterable: true,
      width: "80px",
      align: "center",
      options: [
        {
          value: "pending",
          label: "Pending",
          color: "#FFF9E0",
          textColor: "#C8AA00",
        },
        {
          value: "confirmed",
          label: "Confirmed",
          color: "#DBEAFE",
          textColor: "#1E3A8A",
        },
        {
          value: "shipped",
          label: "Shipped",
          color: "#EDE9FE",
          textColor: "#5B21B6",
        },
        {
          value: "delivered",
          label: "Delivered",
          color: "#ECFDF3",
          textColor: "#027A48",
        },
        {
          value: "cancelled",
          label: "Cancelled",
          color: "#FEF3F2",
          textColor: "#B42318",
        },
        {
          value: "refunded",
          label: "Refunded",
          color: "#F3F4F6",
          textColor: "#374151",
        },
      ],
    },
    {
      key: "paymentStatus",
      label: "Payment",
      type: "select",
      sortable: true,
      filterable: true,
      width: "120px",
      align: "center",
      options: [
        {
          value: "pending",
          label: "Pending",
          color: "#FFF9E0",
          textColor: "#C8AA00",
        },
        {
          value: "paid",
          label: "Paid",
          color: "#ECFDF3",
          textColor: "#027A48",
        },
        {
          value: "failed",
          label: "Failed",
          color: "#FEF3F2",
          textColor: "#B42318",
        },
        {
          value: "refunded",
          label: "Refunded",
          color: "#F3F4F6",
          textColor: "#374151",
        },
        {
          value: "completed",
          label: "Completed",
          color: "#ECFDF3",
          textColor: "#027A48",
        },
        {
          value: "cancelled",
          label: "Cancelled",
          color: "#FEF3F2",
          textColor: "#B42318",
        },
      ],
    },
  ];

  // Form Field Configuration for Book Order Edit Modal
  const bookOrderFormFields: FormFieldConfig[] = [
    {
      key: "orderId",
      label: "Order ID",
      type: "text",
      required: true,
      section: "details",
      gridCol: "half",
    },
    {
      key: "customer",
      label: "Customer Name",
      type: "text",
      required: true,
      section: "details",
      gridCol: "half",
    },
    {
      key: "customerEmail",
      label: "Customer Email",
      type: "email",
      required: true,
      section: "details",
      gridCol: "full",
    },
    {
      key: "bookName",
      label: "Book Name",
      type: "text",
      required: true,
      section: "details",
      gridCol: "half",
    },
    {
      key: "author",
      label: "Author",
      type: "text",
      required: true,
      section: "details",
      gridCol: "half",
    },
    {
      key: "isbn",
      label: "ISBN",
      type: "text",
      required: true,
      section: "details",
      gridCol: "half",
    },
    {
      key: "quantity",
      label: "Quantity",
      type: "number",
      required: true,
      section: "details",
      gridCol: "half",
    },
    {
      key: "price",
      label: "Unit Price",
      type: "number",
      required: true,
      section: "pricing",
      gridCol: "half",
    },
    {
      key: "totalAmount",
      label: "Total Amount",
      type: "number",
      required: true,
      section: "pricing",
      gridCol: "half",
    },
    {
      key: "shippingAddress",
      label: "Shipping Address",
      type: "textarea",
      required: true,
      section: "shipping",
      gridCol: "full",
    },
    {
      key: "trackingNumber",
      label: "Tracking Number",
      type: "text",
      section: "shipping",
      gridCol: "half",
    },
    {
      key: "paymentMethod",
      label: "Payment Method",
      type: "select",
      required: true,
      section: "status",
      gridCol: "full",
      options: [
        { value: "credit_card", label: "Credit Card" },
        { value: "paypal", label: "PayPal" },
        { value: "stripe", label: "Stripe" },
        { value: "bank_transfer", label: "Bank Transfer" },
        { value: "cash_on_delivery", label: "Cash on Delivery" },
      ],
    },
    {
      key: "status",
      label: "Order Status",
      type: "select",
      required: true,
      section: "status",
      gridCol: "half",
      options: [
        { value: "pending", label: "Pending" },
        { value: "confirmed", label: "Confirmed" },
        { value: "shipped", label: "Shipped" },
        { value: "delivered", label: "Delivered" },
        { value: "cancelled", label: "Cancelled" },
        { value: "refunded", label: "Refunded" },
      ],
    },
    {
      key: "paymentStatus",
      label: "Payment Status",
      type: "select",
      required: true,
      section: "status",
      gridCol: "half",
      options: [
        {
          value: "pending",
          label: "Pending",
          color: "#FFF9E0",
          textColor: "#C8AA00",
        },
        {
          value: "paid",
          label: "Paid",
          color: "#ECFDF3",
          textColor: "#027A48",
        },
        {
          value: "failed",
          label: "Failed",
          color: "#FEF3F2",
          textColor: "#B42318",
        },
        {
          value: "refunded",
          label: "Refunded",
          color: "#F3F4F6",
          textColor: "#374151",
        },
        {
          value: "completed",
          label: "Completed",
          color: "#ECFDF3",
          textColor: "#027A48",
        },
        {
          value: "cancelled",
          label: "Cancelled",
          color: "#FEF3F2",
          textColor: "#B42318",
        },
      ],
    },
    {
      key: "notes",
      label: "Order Notes",
      type: "textarea",
      section: "notes",
      gridCol: "full",
      placeholder: "Add any additional notes about this order",
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
        {
          value: "credit_card",
          label: "Credit Card",
          color: "#f59e0b",
          textColor: "#1f2937",
          icon: "💳",
          iconType: "emoji",
          iconUrl: "",
        },
        {
          value: "paypal",
          label: "Paypal",
          icon: "/icons/paypal.png",
          iconType: "image",
          iconUrl: "/icons/paypal.png",
        },
        {
          value: "stripe",
          label: "Stripe",
          icon: "/icons/stripe.png",
          iconType: "image",
          iconUrl: "/icons/stripe.png",
        },
        {
          value: "bank_transfer",
          label: "Bank Transfer",
          color: "#16a34a",
          textColor: "#ffffff",
          icon: "🏦",
          iconType: "emoji",
          iconUrl: "",
        },
        {
          value: "cash_on_delivery",
          label: "Cash On Delivery",
          color: "#ef4444",
          textColor: "#ffffff",
          icon: "💵",
          iconType: "emoji",
          iconUrl: "",
        },
      ],
    },
    {
      key: "status",
      label: "Order Status",
      type: "select",
      options: [
        { value: "pending", label: "Pending" },
        { value: "confirmed", label: "Confirmed" },
        { value: "shipped", label: "Shipped" },
        { value: "delivered", label: "Delivered" },
        { value: "cancelled", label: "Cancelled" },
        { value: "refunded", label: "Refunded" },
      ],
    },
    {
      key: "paymentStatus",
      label: "Payment Status",
      type: "select",
      options: [
        {
          value: "pending",
          label: "Pending",
          color: "#FFF9E0",
          textColor: "#C8AA00",
        },
        {
          value: "paid",
          label: "Paid",
          color: "#ECFDF3",
          textColor: "#027A48",
        },
        {
          value: "failed",
          label: "Failed",
          color: "#FEF3F2",
          textColor: "#B42318",
        },
        {
          value: "refunded",
          label: "Refunded",
          color: "#F3F4F6",
          textColor: "#374151",
        },
        {
          value: "completed",
          label: "Completed",
          color: "#ECFDF3",
          textColor: "#027A48",
        },
        {
          value: "cancelled",
          label: "Cancelled",
          color: "#FEF3F2",
          textColor: "#B42318",
        },
      ],
    },
  ];

  // Action Configuration for Book Orders Table
  const bookOrderActions: ActionConfig[] = [
    {
      key: "details",
      label: "",
      icon: (
        <Lordicon
          src='https://cdn.lordicon.com/knitbwfa.json'
          trigger='hover'
          size={20}
          colors={{
            primary: "#9ca3af",
            secondary: "",
          }}
          stroke={4}
        />
      ),
      variant: "ghost",
      type: "navigate",
      route: "/orders",
      onClick: (item) => {
        router.push(`/${pageUrl}/${item.id}`);
      },
    },
    {
      key: "permission",
      label: "",
      icon: <Check className='w-4 h-4 text-green-600' />,
      variant: "ghost",
      onClick: (item) => console.log("Edit order:", item.orderId),
    },
    {
      key: "delete",
      label: "",
      icon: (
        <Lordicon
          src='https://cdn.lordicon.com/jmkrnisz.json'
          trigger='hover'
          size={20}
          colors={{
            primary: "#FF0000",
            secondary: "#ffffff",
          }}
          stroke={4}
        />
      ),
      variant: "ghost",
      onClick: (item) => console.log("Delete order:", item.orderId),
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

  // Edit Modal Configuration for Book Order Form
  const bookOrderEditModalConfig: EditModalConfig = {
    title: "Edit Book Order",
    description: "Update book order information and status",
    width: "xl",
    sections: [
      {
        key: "details",
        title: "Order Details",
        description: "Basic order and customer information",
      },
      {
        key: "pricing",
        title: "Pricing Information",
        description: "Order pricing and quantity details",
      },
      {
        key: "shipping",
        title: "Shipping Details",
        description: "Shipping address and tracking information",
      },
      {
        key: "status",
        title: "Status & Payment",
        description: "Order status and payment information",
      },
      {
        key: "notes",
        title: "Notes",
        description: "Additional order notes and comments",
      },
    ],
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
    <div className='w-full mx-auto'>
      <div className='h-3'></div>
      <StatsCard metrics={orderMetrics} />
      <div className='h-5'></div>
      <DynamicTable
        title={title}
        data={bookOrders}
        columns={bookOrderColumns}
        formFields={bookOrderFormFields}
        filters={bookOrderFilters}
        actions={bookOrderActions}
        tableConfig={bookOrderTableConfig}
        editModalConfig={bookOrderEditModalConfig}
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
