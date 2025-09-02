import type { GenericDataItem } from "../types/dynamicTableTypes";

export interface BookOrderDataItem extends GenericDataItem {
  id: string;
  orderId: string;
  customer: string;
  customerAvatar?: string;
  customerEmail: string;
  bookName: string;
  bookCover?: string;
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
  updatedAt?: string;
}

// Sample book orders data
export const booksOrdersData: BookOrderDataItem[] = [
  {
    id: "order1",
    orderId: "ORD-AX93K7",
    customer: "Andi Lane",
    customerAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    customerEmail: "andi.lane@email.com",
    bookName: "The Pink Pajamas: A Story About Love",
    bookCover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=60&h=80&fit=crop",
    author: "Emily Johnson",
    isbn: "978-3-16-148410-0",
    quantity: 2,
    price: 15.5,
    totalAmount: 31.0,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "credit_card",
    shippingAddress: "123 Main St, New York, NY 10001",
    orderDate: "2025-01-06T10:30:00Z",
    deliveryDate: "2025-01-10T14:20:00Z",
    trackingNumber: "TRK123456789",
    notes: "Customer requested gift wrapping",
    createdAt: "2025-01-06T10:30:00Z",
    updatedAt: "2025-01-10T14:20:00Z",
  },
  {
    id: "order2",
    orderId: "ORD-BX84L9",
    customer: "Kate Morrison",
    customerAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    customerEmail: "kate.morrison@email.com",
    bookName: "Digital Marketing Masterclass",
    bookCover:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=80&fit=crop",
    author: "Michael Chen",
    isbn: "978-1-23-456789-1",
    quantity: 1,
    price: 29.99,
    totalAmount: 29.99,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "paypal",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
    orderDate: "2025-01-08T14:15:00Z",
    trackingNumber: "TRK987654321",
    createdAt: "2025-01-08T14:15:00Z",
    updatedAt: "2025-01-09T09:30:00Z",
  },
  {
    id: "order3",
    orderId: "ORD-CY75M3",
    customer: "John Smith",
    customerAvatar:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face",
    customerEmail: "john.smith@email.com",
    bookName: "Advanced React Development",
    bookCover:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=60&h=80&fit=crop",
    author: "Sarah Williams",
    isbn: "978-0-12-345678-2",
    quantity: 3,
    price: 45.0,
    totalAmount: 135.0,
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "stripe",
    shippingAddress: "789 Pine St, Chicago, IL 60601",
    orderDate: "2025-01-10T11:45:00Z",
    createdAt: "2025-01-10T11:45:00Z",
    updatedAt: "2025-01-10T16:20:00Z",
  },
  {
    id: "order4",
    orderId: "ORD-DZ66N8",
    customer: "Emma Davis",
    customerAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
    customerEmail: "emma.davis@email.com",
    bookName: "The Art of Mindfulness",
    bookCover:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=80&fit=crop",
    author: "David Lee",
    isbn: "978-2-34-567890-3",
    quantity: 1,
    price: 18.75,
    totalAmount: 18.75,
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "bank_transfer",
    shippingAddress: "321 Elm St, Boston, MA 02101",
    orderDate: "2025-01-12T09:20:00Z",
    notes: "Customer called to confirm address",
    createdAt: "2025-01-12T09:20:00Z",
  },
  {
    id: "order5",
    orderId: "ORD-EW55P4",
    customer: "Alex Johnson",
    customerAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
    customerEmail: "alex.johnson@email.com",
    bookName: "Machine Learning Fundamentals",
    bookCover:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=60&h=80&fit=crop",
    author: "Dr. Jennifer Park",
    isbn: "978-3-45-678901-4",
    quantity: 2,
    price: 52.99,
    totalAmount: 105.98,
    status: "cancelled",
    paymentStatus: "refunded",
    paymentMethod: "credit_card",
    shippingAddress: "654 Maple Dr, Seattle, WA 98101",
    orderDate: "2025-01-05T16:30:00Z",
    notes: "Customer requested cancellation due to duplicate order",
    createdAt: "2025-01-05T16:30:00Z",
    updatedAt: "2025-01-06T10:15:00Z",
  },
  {
    id: "order6",
    orderId: "ORD-FV44Q2",
    customer: "Lisa Rodriguez",
    customerAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
    customerEmail: "lisa.rodriguez@email.com",
    bookName: "Photography Basics",
    bookCover:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=60&h=80&fit=crop",
    author: "Roberto Martinez",
    isbn: "978-4-56-789012-5",
    quantity: 1,
    price: 34.5,
    totalAmount: 34.5,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "cash_on_delivery",
    shippingAddress: "987 Cedar Ln, Miami, FL 33101",
    orderDate: "2025-01-03T13:10:00Z",
    deliveryDate: "2025-01-08T11:45:00Z",
    trackingNumber: "TRK456789123",
    createdAt: "2025-01-03T13:10:00Z",
    updatedAt: "2025-01-08T11:45:00Z",
  },
  {
    id: "order7",
    orderId: "ORD-GU33R7",
    customer: "Ryan Thompson",
    customerAvatar:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=40&h=40&fit=crop&crop=face",
    customerEmail: "ryan.thompson@email.com",
    bookName: "Cooking with Passion",
    bookCover:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=60&h=80&fit=crop",
    author: "Chef Maria Gonzalez",
    isbn: "978-5-67-890123-6",
    quantity: 4,
    price: 22.99,
    totalAmount: 91.96,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "paypal",
    shippingAddress: "147 Birch Ave, Denver, CO 80201",
    orderDate: "2025-01-11T08:25:00Z",
    trackingNumber: "TRK789123456",
    notes: "Corporate order for office library",
    createdAt: "2025-01-11T08:25:00Z",
    updatedAt: "2025-01-12T14:10:00Z",
  },
  {
    id: "order8",
    orderId: "ORD-HS22T1",
    customer: "Grace Wilson",
    customerAvatar:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=40&h=40&fit=crop&crop=face",
    customerEmail: "grace.wilson@email.com",
    bookName: "Financial Freedom Guide",
    bookCover:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=60&h=80&fit=crop",
    author: "Richard Brown",
    isbn: "978-6-78-901234-7",
    quantity: 1,
    price: 27.5,
    totalAmount: 27.5,
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "stripe",
    shippingAddress: "258 Spruce St, Portland, OR 97201",
    orderDate: "2025-01-13T15:40:00Z",
    createdAt: "2025-01-13T15:40:00Z",
  },
];
