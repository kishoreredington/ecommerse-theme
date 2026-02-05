import { type Product, type ProductVariant } from "../types/productTypes";
import { Heart } from "lucide-react";
import { Typography } from "@mui/material";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
const BigProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    navigate(`/product/${id}`);
  };
  return (
    <div
      onClick={() => handleNavigate(product.id)}
      className="flex flex-col relative cursor-pointer"
    >
      <div className="absolute z-20 top-0.5 right-0.5 cursor-pointer">
        <Heart className="self-end m-3" />
      </div>

      <div className="w-full h-100 bg-[#eaeaea]">
        <img
          className="h-full w-full object-contain"
          src={product.productUrl}
        ></img>
      </div>

      <div className="m-3 flex-1">
        <div className="flex justify-between items-center">
          <Typography fontWeight="bold" variant="h5">
            {product.brand}
          </Typography>
          <div className="flex gap-3">
            {product.variants.map((varients: ProductVariant) => {
              return <Chip label={varients.size} variant="outlined" />;
            })}
          </div>
        </div>
        <Typography variant="body1">{product.name}</Typography>

        <Typography variant="h6">$ {product.price}</Typography>
      </div>
    </div>
  );
};

export default BigProductCard;
