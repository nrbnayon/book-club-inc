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
// import { Button } from "@/components/ui/button";
import { DynamicDataCreateModal } from "@/components/common/DynamicDataCreateModal";
import type { FormField } from "@/types/dynamicCardTypes";
import StatsCard from "@/components/common/StatsCard";
import { orderMetrics } from "@/data/statsCardDataSets";
import { useRouter } from "next/navigation";

interface BookOrderManagementProps {
  itemsPerPage?: number;
  title?: string;
  buttonText?: string;
  pageUrl?: string;
  route?: string
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
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const router = useRouter();
  // Column Configuration for Book Orders Table
  const bookOrderColumns: ColumnConfig[] = [
    {
      key: "orderId",
      label: "Order ID",
      sortable: true,
      searchable: true,
      align: "left",
      width: "120px",
    },
    {
      key: "customer",
      label: "Customer",
      sortable: true,
      searchable: true,
      showAvatar: true,
      avatarKey: "customerAvatar",
      align: "left",
      width: "250px",
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
      width: "120px",
    },
    {
      key: "totalAmount",
      label: "Amount",
      type: "currency",
      sortable: true,
      align: "right",
      width: "100px",
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      sortable: true,
      filterable: true,
      width: "120px",
      align: "center",
      options: [
        { value: "pending", label: "Pending", color: "#f59e0b" },
        { value: "confirmed", label: "Confirmed", color: "#3b82f6" },
        { value: "shipped", label: "Shipped", color: "#8b5cf6" },
        { value: "delivered", label: "Delivered", color: "#16a34a" },
        { value: "cancelled", label: "Cancelled", color: "#ef4444" },
        { value: "refunded", label: "Refunded", color: "#6b7280" },
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
        { value: "pending", label: "Pending", color: "#f59e0b" },
        { value: "paid", label: "Paid", color: "#16a34a" },
        { value: "failed", label: "Failed", color: "#ef4444" },
        { value: "refunded", label: "Refunded", color: "#6b7280" },
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
      key: "notes",
      label: "Order Notes",
      type: "textarea",
      section: "notes",
      gridCol: "full",
      placeholder: "Add any additional notes about this order",
    },
  ];

  // Create Modal Form Fields
  const createFormFields: FormField[] = [
    {
      key: "orderId",
      label: "Order ID",
      type: "text",
      required: true,
      placeholder: "Enter order ID (e.g., ORD-ABC123)",
      validation: {
        minLength: 6,
        maxLength: 20,
      },
      section: "basic",
      gridCol: "half",
    },
    {
      key: "customer",
      label: "Customer Name",
      type: "text",
      required: true,
      placeholder: "Enter customer name",
      section: "basic",
      gridCol: "half",
    },
    {
      key: "customerEmail",
      label: "Customer Email",
      type: "email",
      required: true,
      placeholder: "customer@email.com",
      section: "basic",
      gridCol: "full",
    },
    {
      key: "customerAvatar",
      label: "Customer Photo",
      type: "image",
      required: false,
      placeholder: "Upload customer photo (optional)",
      section: "basic",
      gridCol: "full",
    },
    {
      key: "bookName",
      label: "Book Name",
      type: "text",
      required: true,
      placeholder: "Enter book title",
      section: "book",
      gridCol: "half",
    },
    {
      key: "author",
      label: "Author",
      type: "text",
      required: true,
      placeholder: "Enter author name",
      section: "book",
      gridCol: "half",
    },
    {
      key: "isbn",
      label: "ISBN",
      type: "text",
      required: true,
      placeholder: "978-3-16-148410-0",
      section: "book",
      gridCol: "half",
    },
    {
      key: "bookCover",
      label: "Book Cover",
      type: "image",
      required: false,
      placeholder: "Upload book cover (optional)",
      section: "book",
      gridCol: "half",
    },
    {
      key: "quantity",
      label: "Quantity",
      type: "number",
      required: true,
      placeholder: "1",
      validation: {
        min: 1,
        max: 100,
      },
      section: "pricing",
      gridCol: "half",
    },
    {
      key: "price",
      label: "Unit Price ($)",
      type: "number",
      required: true,
      placeholder: "0.00",
      validation: {
        min: 0,
      },
      section: "pricing",
      gridCol: "half",
    },
    {
      key: "shippingAddress",
      label: "Shipping Address",
      type: "textarea",
      required: true,
      placeholder: "Enter full shipping address",
      section: "shipping",
      gridCol: "full",
    },
    {
      key: "status",
      label: "Order Status",
      type: "select",
      required: true,
      options: [
        { value: "pending", label: "Pending" },
        { value: "confirmed", label: "Confirmed" },
        { value: "shipped", label: "Shipped" },
        { value: "delivered", label: "Delivered" },
        { value: "cancelled", label: "Cancelled" },
        { value: "refunded", label: "Refunded" },
      ],
      section: "status",
      gridCol: "half",
    },
    {
      key: "paymentStatus",
      label: "Payment Status",
      type: "select",
      required: true,
      options: [
        { value: "pending", label: "Pending" },
        { value: "paid", label: "Paid" },
        { value: "failed", label: "Failed" },
        { value: "refunded", label: "Refunded" },
      ],
      section: "status",
      gridCol: "half",
    },
    {
      key: "paymentMethod",
      label: "Payment Method",
      type: "select",
      required: true,
      options: [
        { value: "credit_card", label: "Credit Card" },
        { value: "paypal", label: "PayPal" },
        { value: "stripe", label: "Stripe" },
        { value: "bank_transfer", label: "Bank Transfer" },
        { value: "cash_on_delivery", label: "Cash on Delivery" },
      ],
      section: "status",
      gridCol: "full",
    },
    {
      key: "notes",
      label: "Order Notes",
      type: "textarea",
      required: false,
      placeholder: "Add any additional notes (optional)",
      section: "notes",
      gridCol: "full",
    },
  ];

  // Create Modal Sections
  const createModalSections = [
    {
      key: "basic",
      title: "Customer Information",
      description: "Enter customer details for the order",
    },
    {
      key: "book",
      title: "Book Details",
      description: "Enter book information",
    },
    {
      key: "pricing",
      title: "Pricing & Quantity",
      description: "Set quantity and pricing details",
    },
    {
      key: "shipping",
      title: "Shipping Information",
      description: "Enter shipping details",
    },
    {
      key: "status",
      title: "Order & Payment Status",
      description: "Set order and payment status",
    },
    {
      key: "notes",
      title: "Additional Notes",
      description: "Add any additional information",
    },
  ];

  // Filter Configuration for Book Orders Table
  const bookOrderFilters: FilterConfig[] = [
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

  // Action Configuration for Book Orders Table
  const bookOrderActions: ActionConfig[] = [
    {
      key: "details",
      label: "",
      icon: (
        <Lordicon
          src="https://cdn.lordicon.com/knitbwfa.json"
          trigger="hover"
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
      key: "edit",
      label: "",
      icon: (
        <Lordicon
          src="https://cdn.lordicon.com/cbtlerlm.json"
          trigger="hover"
          size={20}
          colors={{
            primary: "#9ca3af",
            secondary: "",
          }}
          stroke={4}
        />
      ),
      variant: "ghost",
      onClick: (item) => console.log("Edit order:", item.orderId),
    },
    // {
    //   key: "track",
    //   label: "",
    //   icon: (
    //     <Lordicon
    //       src="https://cdn.lordicon.com/qwgxdqnt.json"
    //       trigger="hover"
    //       size={20}
    //       colors={{
    //         primary: "#9ca3af",
    //         secondary: "",
    //       }}
    //       stroke={4}
    //     />
    //   ),
    //   variant: "ghost",
    //   onClick: (item) => {
    //     const typedItem = item as BookOrderDataItem;
    //     if (typedItem.trackingNumber) {
    //       console.log("Track order:", typedItem.trackingNumber);
    //     } else {
    //       console.log(
    //         "No tracking number available for order:",
    //         typedItem.orderId
    //       );
    //     }
    //   },
    // },
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

  // Handle creating new book order
  const handleCreateBookOrder = (data: Record<string, unknown>) => {
    const quantity = Number(data.quantity || 1);
    const price = Number(data.price || 0);
    const totalAmount = quantity * price;

    const newBookOrderData = {
      id: `order${Date.now()}`,
      orderId: String(data.orderId || ""),
      customer: String(data.customer || ""),
      customerAvatar:
        String(data.customerAvatar || "") ||
        `https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face`,
      customerEmail: String(data.customerEmail || ""),
      bookName: String(data.bookName || ""),
      bookCover:
        String(data.bookCover || "") ||
        `https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=60&h=80&fit=crop`,
      author: String(data.author || ""),
      isbn: String(data.isbn || ""),
      quantity: quantity,
      price: price,
      totalAmount: totalAmount,
      status: String(data.status || "pending") as
        | "pending"
        | "confirmed"
        | "shipped"
        | "delivered"
        | "cancelled"
        | "refunded",
      paymentStatus: String(data.paymentStatus || "pending") as
        | "pending"
        | "paid"
        | "failed"
        | "refunded",
      paymentMethod: String(data.paymentMethod || "credit_card") as
        | "credit_card"
        | "paypal"
        | "stripe"
        | "bank_transfer"
        | "cash_on_delivery",
      shippingAddress: String(data.shippingAddress || ""),
      orderDate: new Date().toISOString(),
      trackingNumber: data.trackingNumber
        ? String(data.trackingNumber)
        : undefined,
      notes: data.notes ? String(data.notes) : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedBookOrders = [newBookOrderData, ...bookOrders];
    setBookOrders(updatedBookOrders);

    console.log("New book order created:", newBookOrderData);
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
        {/* <Button
          className="flex items-center gap-2 border-primary/30 rounded-md"
          size="lg"
          onClick={() => setCreateModalOpen(true)}
        >
          <span className="mt-1.5">
            <Lordicon
              src="https://cdn.lordicon.com/ueoydrft.json"
              trigger="hover"
              size={20}
              colors={{
                primary: "",
                secondary: "",
              }}
              stroke={1}
            />
          </span>
          <span>Add Order</span>
        </Button> */}
      </div>

      <DynamicTable
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

      {/* Create Book Order Modal */}
      <DynamicDataCreateModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSave={handleCreateBookOrder}
        title="Create New Book Order"
        description="Add a new book order to the system"
        fields={createFormFields}
        sections={createModalSections}
        initialData={{
          status: "pending",
          paymentStatus: "pending",
          paymentMethod: "credit_card",
          quantity: 1,
        }}
        saveButtonText="Create Order"
        cancelButtonText="Cancel"
        maxImageSizeInMB={5}
        maxImageUpload={2}
        acceptedImageFormats={[
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ]}
      />
    </div>
  );
}
