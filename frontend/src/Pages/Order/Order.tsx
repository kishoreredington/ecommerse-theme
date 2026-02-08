import { Download, MoreVertical } from "lucide-react";
import { useGetAllOrdersQuery } from "../ProductDetails/productApiSlice";
import { Typography } from "@mui/material";
import ProductItem from "./ProductItem";
import HorizontalLinearAlternativeLabelStepper from "../../Components/Stepper";
import { OrderStatus } from "../../type";
export default function OrderDetails() {
  const { data, isLoading, isError } = useGetAllOrdersQuery(undefined);

  // ✅ Loading
  if (isLoading) {
    return <div className="p-6">Loading orders...</div>;
  }

  // ✅ Error
  if (isError) {
    return <div className="p-6 text-red-500">Failed to load orders</div>;
  }

  // ✅ Transform backend response → UI format
  const formattedOrders =
    data?.data?.map((order) => ({
      orderNumber: order.id,
      products: order.orderItems.length,
      customer: "You",
      date: new Date(order.createdAt).toLocaleString(),
      status: order.status,
      deliveryDate: new Date(order.createdAt).toLocaleDateString(),
      deliveryAddress: `${order.address.line1}, ${order.address.city}, ${order.address.state}, ${order.address.pincode}, ${order.address.country}`,
      total: `USD ${order.totalAmount}`,
      paymentStatus: order.payment.status,
      transactionId: order.payment.transactionId,

      items: order.orderItems.map((item) => ({
        id: item.id,
        name: item.variant.product.name,
        quantity: item.quantity,
        price: item.price,
        size: item.variant.size,
        brand: item.variant.product.brand,
        productImage: item.variant.product.productImage,
        productUrl: item.variant.product.productUrl,
        description: item.variant.product.description,
      })),
    })) || [];

  return (
    <div className="w-full bg-gray-50 mt-3">
      {formattedOrders.map((orderData) => (
        <div
          key={orderData.orderNumber}
          className="w-full mx-auto bg-white rounded-2xl shadow-sm p-8 mb-6"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <Typography variant="h4">
                Order #: {orderData.orderNumber}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                {orderData.products} Products | By {orderData.customer} |{" "}
                {orderData.date}
              </Typography>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download size={18} />
                <Typography variant="body2" className="font-medium">
                  Download invoice
                </Typography>
              </button>

              <button className="p-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Order Info */}
          <div className="grid grid-cols-2 gap-x-32 gap-y-4 mb-8 pb-8 border-b border-gray-200">
            <div className="flex">
              <Typography variant="body2" className="text-gray-600 w-40">
                Status:
              </Typography>
              <Typography
                variant="body2"
                className={`font-medium ${
                  orderData.status === "PAID"
                    ? "text-green-600"
                    : orderData.status === "On the way"
                      ? "text-orange-500"
                      : "text-gray-900"
                }`}
              >
                {orderData.status}
              </Typography>
            </div>

            <div className="flex">
              <Typography variant="body2" className="text-gray-600 w-40">
                Date of delivery:
              </Typography>
              <Typography variant="body2" className="text-gray-900">
                {orderData.deliveryDate}
              </Typography>
            </div>

            <div className="flex">
              <Typography variant="body2" className="text-gray-600 w-40">
                Delivered to:
              </Typography>
              <Typography variant="body2" className="text-gray-900">
                {orderData.deliveryAddress}
              </Typography>
            </div>

            <div className="flex">
              <Typography variant="body2" className="text-gray-600 w-40">
                Payment:
              </Typography>
              <Typography variant="body2" className="text-gray-900">
                {orderData.paymentStatus}
              </Typography>
            </div>

            <div className="flex">
              <Typography
                variant="body2"
                className="text-gray-600 w-40 font-semibold"
              >
                Total:
              </Typography>
              <Typography
                variant="body2"
                className="text-gray-900 font-semibold"
              >
                {orderData.total}
              </Typography>
            </div>

            <div className="flex">
              <Typography variant="body2" className="text-gray-600 w-40">
                Transaction ID:
              </Typography>
              <Typography variant="body2" className="text-gray-900 text-xs">
                {orderData.transactionId}
              </Typography>
            </div>
          </div>

          <div className="mb-4 border-b border-gray-200">
            <HorizontalLinearAlternativeLabelStepper
              currentStatus={orderData.status}
            />
            
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 gap-6">
            {orderData.items.map((item) => (
              <ProductItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
