import { type Product, type ProductVariant } from "../types/productTypes";
import { Heart } from "lucide-react";
import { Typography } from "@mui/material";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSetFavouriteMutation } from "../Pages/ProductDetails/productApiSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
    navigate(`/${id}`);
  };

  const [setFavourite, { isLoading, isSuccess, isError, error }] =
    useSetFavouriteMutation();

  const handleSetHeart = async (id: number | string) => {
    console.log(id);
    try {
      await setFavourite({
        userId: 1,
        productId: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-80 aspect-3/4 flex flex-col relative cursor-pointer">
      <div
        onClick={() => handleRouteToProduct(product.id)}
        className="w-full h-[80%] bg-gray-100"
      >
        <img
          className="h-full w-full object-cover"
          src={product.productUrl}
        ></img>
      </div>

      <div className="m-3 flex-1">
        <div className="flex justify-start items-center gap-5">
          <Typography fontWeight="bold" variant="h5">
            {product.brand}
          </Typography>

          <button
            disabled={isLoading}
            onClick={() => handleSetHeart(product.id)}
            className="cursor-pointer"
          >
            {product.isFavourite ? (
              <FavoriteIcon />
            ) : (
              <Heart className="self-end m-3" />
            )}
          </button>
        </div>
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
