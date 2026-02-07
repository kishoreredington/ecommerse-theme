import React from "react";
import { Download, MoreVertical } from "lucide-react";
import { useGetAllOrdersQuery } from "../ProductDetails/productApiSlice";
import { Typography } from "@mui/material";

export default function OrderDetails() {
  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllOrdersQuery(undefined);

  const orderData = {
    orderNumber: "73262",
    products: 4,
    customer: "Alex John",
    date: "13:45, Nov 10, 2025",
    status: "On the way",
    deliveryDate: "Fri, 13 Nov, 2025",
    deliveryAddress: "Great street, New York Brooklyn 5A, PO: 212891",
    total: "USD 340.00",
    items: [
      {
        id: 1,
        name: "Great product name goes here",
        quantity: 1,
        price: 340,
        color: "Silver",
        size: "Large",
        image: "☕",
      },
      {
        id: 2,
        name: "Table lamp for office or bedroom",
        quantity: 1,
        price: 76,
        color: "Silver",
        size: "Large",
        image: "💡",
      },
      {
        id: 3,
        name: "Great product name goes here",
        quantity: 2,
        price: 87,
        color: "Silver",
        size: "Large",
        image: "🏺",
      },
      {
        id: 4,
        name: "Great cup white minimalist style",
        quantity: 1,
        price: 340,
        color: "Silver",
        size: "Large",
        image: "☕",
      },
    ],
  };

  return (
    <div className="w-full bg-gray-50 mt-3">
      <div className="w-full mx-auto bg-white rounded-2xl shadow-sm p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <Typography variant="h4">
              Order #: {orderData.orderNumber}
            </Typography>
            <p className="text-gray-500">
              {orderData.products} Products | By {orderData.customer} |{" "}
              {orderData.date}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download size={18} />
              <span className="font-medium">Download invoice</span>
            </button>
            <button className="p-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Order Info */}
        <div className="grid grid-cols-2 gap-x-32 gap-y-4 mb-8 pb-8 border-b border-gray-200">
          <div className="flex">
            <span className="text-gray-600 w-40">Status:</span>
            <span className="font-medium text-orange-500">
              {orderData.status}
            </span>
          </div>
          <div className="flex">
            <span className="text-gray-600 w-40">Date of delivery:</span>
            <span className="text-gray-900">{orderData.deliveryDate}</span>
          </div>
          <div className="flex">
            <span className="text-gray-600 w-40">Delivered to:</span>
            <span className="text-gray-900">{orderData.deliveryAddress}</span>
          </div>
          <div className="flex">
            <span className="text-gray-600 w-40 font-semibold">Total:</span>
            <span className="text-gray-900 font-semibold">
              {orderData.total}
            </span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-6">
          {orderData.items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-28 h-28 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-5xl">{item.image}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {item.name}
                </h3>
                <div className="space-y-1 text-gray-600">
                  <p>
                    Quantity: {item.quantity}x = USD {item.price}
                  </p>
                  <p>Color: {item.color}</p>
                  <p>Size: {item.size}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
