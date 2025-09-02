"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { booksOrdersData } from "@/data/booksOrdersData";
import type { BookOrderDataItem } from "@/data/booksOrdersData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarIcon,
  CreditCardIcon,
  MapPinIcon,
  PackageIcon,
  UserIcon,
  BookOpenIcon,
  HashIcon,
  DollarSignIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  LoaderIcon,
} from "lucide-react";
import Image from "next/image";
import DashboardHeader from "../../components/dashboard-header";
import Link from "next/link";
import { toast } from "sonner";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "confirmed":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "shipped":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "delivered":
      return "bg-green-100 text-green-800 border-green-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    case "refunded":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "paid":
      return "bg-green-100 text-green-800 border-green-200";
    case "failed":
      return "bg-red-100 text-red-800 border-red-200";
    case "approved":
      return "bg-green-100 text-green-800 border-green-200";
    case "declined":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const formatPaymentMethod = (method: string) => {
  switch (method) {
    case "credit_card":
      return "Credit Card";
    case "paypal":
      return "PayPal";
    case "stripe":
      return "Stripe";
    case "bank_transfer":
      return "Bank Transfer";
    case "cash_on_delivery":
      return "Cash on Delivery";
    default:
      return method;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<BookOrderDataItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // Modal states
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "decline" | null>(
    null
  );

  // Form states
  const [approvalNotes, setApprovalNotes] = useState("");
  const [declineReason, setDeclineReason] = useState("");

  useEffect(() => {
    const orderId = params.id as string;

    // Find the order by ID or orderId
    const foundOrder = booksOrdersData.find(
      (order) => order.id === orderId || order.orderId === orderId
    );

    setOrder(foundOrder || null);
    setLoading(false);
  }, [params.id]);

  const handleApproveOrder = () => {
    setActionType("approve");
    setShowApprovalModal(true);
  };

  const handleDeclineOrder = () => {
    setActionType("decline");
    setShowDeclineModal(true);
  };

  const handleConfirmAction = () => {
    setShowApprovalModal(false);
    setShowDeclineModal(false);
    setShowConfirmDialog(true);
  };

  const executeAction = async () => {
    setProcessing(true);
    setShowConfirmDialog(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (actionType === "approve") {
        // Update order status to approved
        setOrder((prev) =>
          prev ? { ...prev, status: "approved", paymentStatus: "paid" } : null
        );
        toast.success("Order approved successfully!", {
          description: `Order #${order?.orderId} has been approved and customer has been notified.`,
        });
      } else if (actionType === "decline") {
        // Update order status to declined
        setOrder((prev) =>
          prev ? { ...prev, status: "declined", paymentStatus: "failed" } : null
        );
        toast.error("Order declined", {
          description: `Order #${order?.orderId} has been declined and customer has been notified.`,
        });
      }

      // Reset states
      setApprovalNotes("");
      setDeclineReason("");
      setActionType(null);
    } catch (error) {
      console.error("Error data", error);
      toast.error("Something went wrong", {
        description: "Please try again later or contact support.",
      });
    } finally {
      setProcessing(false);
    }
  };

  const canModifyOrder = () => {
    return (
      order && ["pending", "confirmed"].includes(order.status.toLowerCase())
    );
  };

  if (loading) {
    return (
      <div>
        <DashboardHeader title="Order Details" />
        <div className="p-2 md:p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div>
        <DashboardHeader title="Order Not Found" />
        <div className="p-2 md:p-6">
          <div className="text-center py-12">
            <PackageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Order Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The order you&apos;re looking for doesn&apos;t exist or may have
              been removed.
            </p>
            <Button
              onClick={() => router.push("/orders")}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Orders List
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-6 border-b">
        <h1 className="text-3xl font-bold text-[#0F304E] dark:text-white">
          Order Details
        </h1>
      </div>
      <div className="p-2 md:p-6 w-full mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 ml-5">
                <Link href="/orders">Orders</Link>
                <span>/</span>
                <span>Order Details</span>
                <span>/</span>
                <span className="font-medium">{order.orderId}</span>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push("/orders")}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Orders List
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Customer & Order Info */}
          <div className="xl:col-span-1 space-y-6">
            {/* Customer Information */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4 mb-4">
                  <Avatar className="h-28 w-28">
                    <AvatarImage
                      src={order.customerAvatar}
                      alt={order.customer}
                    />
                    <AvatarFallback>
                      {order.customer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{order.customer}</h3>
                    <p className="text-sm text-gray-600">
                      {order.customerEmail}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-center gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium">
                      {formatDate(order.orderDate)}
                    </span>
                  </div>

                  {order.deliveryDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <PackageIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Delivered:</span>
                      <span className="font-medium">
                        {formatDate(order.deliveryDate)}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <PackageIcon className="h-5 w-5" />
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Order Status
                  </span>
                  <Badge
                    className={`${getStatusColor(order.status)} capitalize`}
                  >
                    {order.status}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Payment Status
                  </span>
                  <Badge
                    className={`${getStatusColor(
                      order.paymentStatus
                    )} capitalize`}
                  >
                    {order.paymentStatus}
                  </Badge>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Payment Method
                  </span>
                  <span className="text-sm font-medium flex items-center gap-2">
                    <CreditCardIcon className="h-4 w-4" />
                    {formatPaymentMethod(order.paymentMethod)}
                  </span>
                </div>

                {order.trackingNumber && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">
                      Tracking Number
                    </span>
                    <span className="text-sm font-mono font-medium bg-gray-100 px-2 py-1 rounded">
                      {order.trackingNumber}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {order.shippingAddress}
                </p>
              </CardContent>
            </Card>

            {/* Order Notes */}
            {order.notes && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {order.notes}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Book Details & Order Summary */}
          <div className="xl:col-span-2 space-y-6">
            {/* Book Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpenIcon className="h-5 w-5" />
                  Book Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Book Information */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 ">
                        {order.bookName}
                      </h2>
                      <p className="text-lg text-gray-600 mb-4">
                        by {order.author}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                          <HashIcon className="h-4 w-4" />
                          ISBN
                        </span>
                        <span className="text-sm font-medium font-mono">
                          {order.isbn}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                          <PackageIcon className="h-4 w-4" />
                          Quantity
                        </span>
                        <span className="text-sm font-medium">
                          {order.quantity}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                          <DollarSignIcon className="h-4 w-4" />
                          Unit Price
                        </span>
                        <span className="text-sm font-medium">
                          ${order.price.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-3 bg-gray-50 px-4 rounded-lg">
                        <span className="text-base font-semibold text-gray-900">
                          Total Amount
                        </span>
                        <span className="text-xl font-bold text-gray-900">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Book Cover */}
                  <div>
                    <div className="flex justify-center md:justify-center">
                      <div className="w-52 h-64 relative">
                        <Image
                          src={order.bookCover || ""}
                          alt={order.bookName}
                          fill
                          priority
                          className="object-cover rounded-lg shadow-lg"
                        />
                      </div>
                    </div>
                    {/* Book Description */}
                    <div className="mt-6">
                      <h3 className="text-base font-semibold text-gray-900 mb-3">
                        Description
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {order.notes ||
                          `${order.bookName} is a compelling read that offers valuable insights and engaging content. This book provides readers with thoughtful perspectives and practical knowledge that can be applied in various contexts. A must-read for anyone interested in the subject matter.`}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HashIcon className="h-5 w-5" />
                  Order Summary
                </CardTitle>
                <CardDescription>
                  Order #{order.orderId} • Placed on{" "}
                  {formatDate(order.orderDate)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Order Information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">
                      Order Information
                    </h4>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Order ID</span>
                        <span className="text-sm font-medium font-mono">
                          {order.orderId}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Order Date
                        </span>
                        <span className="text-sm font-medium">
                          {formatDate(order.orderDate)}
                        </span>
                      </div>

                      {order.deliveryDate && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Delivery Date
                          </span>
                          <span className="text-sm font-medium">
                            {formatDate(order.deliveryDate)}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <Badge
                          className={`${getStatusColor(
                            order.status
                          )} capitalize text-xs`}
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">
                      Payment Information
                    </h4>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Payment Method
                        </span>
                        <span className="text-sm font-medium">
                          {formatPaymentMethod(order.paymentMethod)}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Payment Status
                        </span>
                        <Badge
                          className={`${getStatusColor(
                            order.paymentStatus
                          )} capitalize text-xs`}
                        >
                          {order.paymentStatus}
                        </Badge>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Subtotal</span>
                        <span className="text-sm font-medium">
                          ${(order.quantity * order.price).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Shipping</span>
                        <span className="text-sm font-medium">Free</span>
                      </div>

                      <Separator />

                      <div className="flex justify-between">
                        <span className="text-base font-semibold">Total</span>
                        <span className="text-lg font-bold">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {canModifyOrder() && (
              <div className="w-full flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={handleDeclineOrder}
                  className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                  disabled={processing}
                >
                  <XCircleIcon className="h-4 w-4" />
                  Decline Order
                </Button>
                <Button
                  onClick={handleApproveOrder}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  disabled={processing}
                >
                  <CheckCircleIcon className="h-4 w-4" />
                  Approve Order
                </Button>
              </div>
            )}

            {!canModifyOrder() && (
              <div className="w-full">
                <Card className="border-amber-200 bg-amber-50">
                  <CardContent className="py-6">
                    <div className="flex items-center gap-2 text-amber-800">
                      <AlertTriangleIcon className="h-5 w-5" />
                      <span className="text-sm font-medium">
                        This order cannot be modified as it has already been{" "}
                        {order.status.toLowerCase()}.
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Approval Modal */}
        <Dialog open={showApprovalModal} onOpenChange={setShowApprovalModal}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-700">
                <CheckCircleIcon className="h-5 w-5" />
                Approve Order #{order.orderId}
              </DialogTitle>
              <DialogDescription>
                You are about to approve this order. The customer will be
                notified and the order will proceed to fulfillment.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="approval-notes">
                  Approval Notes (Optional)
                </Label>
                <Textarea
                  id="approval-notes"
                  placeholder="Add any notes about this approval..."
                  value={approvalNotes}
                  onChange={(e) => setApprovalNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2">
                  Order Summary
                </h4>
                <div className="text-sm text-green-700 space-y-1">
                  <div className="flex justify-between">
                    <span>Customer:</span>
                    <span className="font-medium">{order.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Book:</span>
                    <span className="font-medium">{order.bookName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-medium">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowApprovalModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmAction}
                className="bg-green-600 hover:bg-green-700"
              >
                Continue to Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Decline Modal */}
        <Dialog open={showDeclineModal} onOpenChange={setShowDeclineModal}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-700">
                <XCircleIcon className="h-5 w-5" />
                Decline Order #{order.orderId}
              </DialogTitle>
              <DialogDescription>
                You are about to decline this order. The customer will be
                notified and this action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="decline-reason">Reason for Decline *</Label>
                <Textarea
                  id="decline-reason"
                  placeholder="Please provide a reason for declining this order..."
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-800 mb-2">Order Summary</h4>
                <div className="text-sm text-red-700 space-y-1">
                  <div className="flex justify-between">
                    <span>Customer:</span>
                    <span className="font-medium">{order.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Book:</span>
                    <span className="font-medium">{order.bookName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-medium">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDeclineModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmAction}
                variant="destructive"
                disabled={!declineReason.trim()}
              >
                Continue to Decline
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirmation Alert Dialog */}
        <AlertDialog
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangleIcon className="h-5 w-5 text-amber-600" />
                Confirm Action
              </AlertDialogTitle>
              <AlertDialogDescription>
                {actionType === "approve"
                  ? `Are you sure you want to approve order #${order.orderId}? This will confirm the order and notify the customer that their order has been approved.`
                  : `Are you sure you want to decline order #${order.orderId}? This action cannot be undone and the customer will be notified.`}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-4">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order:</span>
                  <span className="font-medium">#{order.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-medium">{order.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Action:</span>
                  <span
                    className={`font-medium ${
                      actionType === "approve"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {actionType === "approve" ? "Approve" : "Decline"}
                  </span>
                </div>
                {actionType === "approve" && approvalNotes && (
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-gray-600 text-xs">Notes:</span>
                    <p className="text-xs text-gray-700 mt-1">
                      {approvalNotes}
                    </p>
                  </div>
                )}
                {actionType === "decline" && declineReason && (
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-gray-600 text-xs">Reason:</span>
                    <p className="text-xs text-gray-700 mt-1">
                      {declineReason}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={processing}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={executeAction}
                disabled={processing}
                className={
                  actionType === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }
              >
                {processing ? (
                  <>
                    <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {actionType === "approve"
                      ? "Approve Order"
                      : "Decline Order"}
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
