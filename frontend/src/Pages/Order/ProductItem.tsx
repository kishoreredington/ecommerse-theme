import { Typography } from "@mui/material";

export default function ProductItem({ item }) {
  console.log("CHECKING THE PRODUCT URL", item);
  return (
    <div className="flex gap-4">
      <div className="w-28 h-28 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
        {item.productImage ? (
          <img
            src={item.productUrl}
            alt={item.name}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <Typography variant="h4">📦</Typography>
        )}
      </div>

      <div className="flex-1">
        <Typography
          variant="subtitle1"
          className="font-medium text-gray-900 mb-3"
        >
          {item.name}
        </Typography>

        <div className="space-y-1">
          <Typography variant="body2" className="text-gray-600">
            Quantity: {item.quantity}x = USD {item.price}
          </Typography>

          <Typography variant="body2" className="text-gray-600">
            Size: {item.size}
          </Typography>

          <Typography variant="body2" className="text-gray-600">
            Brand: {item.brand}
          </Typography>
        </div>
      </div>
    </div>
  );
}
