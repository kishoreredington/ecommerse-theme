import { type Product, type ProductVariant } from "../types/productTypes";
import { Heart } from "lucide-react";
import { Typography } from "@mui/material";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  product,
  showVarient = true,
  showProductName = true,
  showPrice = true,
}: {
  product: Product;
  showVarient?: boolean;
  showProductName?: boolean;
  showPrice?: boolean;
}) => {
  const navigate = useNavigate();
  const handleRouteToProduct = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      onClick={() => handleRouteToProduct(product.id)}
      className="w-80 aspect-3/4 flex flex-col relative cursor-pointer"
    >
      <div className="absolute z-20 top-0.5 right-0.5 cursor-pointer">
        <Heart className="self-end m-3" />
      </div>

      <div className="w-full h-[80%] bg-gray-100">
        <img
          className="h-full w-full object-cover"
          src={product.productUrl}
        ></img>
      </div>

      <div className="m-3 flex-1">
        <Typography fontWeight="bold" variant="h5">
          {product.brand}
        </Typography>
        {showProductName && (
          <Typography variant="body1">{product.name}</Typography>
        )}

        {showVarient && (
          <div className="flex mt-3 gap-3">
            {product.variants.map((varients: ProductVariant) => {
              return <Chip label={varients.size} variant="outlined" />;
            })}
          </div>
        )}

        {showPrice && <Typography variant="h6">$ {product.price}</Typography>}
      </div>
    </div>
  );
};

export default ProductCard;
