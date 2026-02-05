import { Typography } from "@mui/material";
import { Products } from "../data";
import { type Product } from "../types/productTypes";
import ProductCard from "../Components/ProductCard";
import BigProductCard from "../Components/BigBroductCard";
import { useGetAllProductsQuery } from "./ProductDetails/productApiSlice";

const Dashboard = () => {
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllProductsQuery(undefined);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  if (isError) {
    return <div>Unable to fetch the products</div>;
  }

  const { data } = products;

  return (
    <div className="flex flex-col gap-5">
      <Typography variant="h1">CATALOG</Typography>

      <div className="flex items-start gap-10">
        <div className="flex flex-wrap gap-10">
          {data.slice(0, 2).map((product: Product) => (
            <ProductCard product={product} />
          ))}
        </div>
        <div className="flex-1">
          <BigProductCard product={data[2]} />
        </div>
      </div>

      <div className="flex items-start gap-10">
        <div className="flex-1">
          <BigProductCard product={data[2]} />
        </div>
        <div className="flex flex-wrap gap-10">
          {data.slice(0, 2).map((product: Product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>

      <div className="w-full h-140 aspect-video flex justify-between items-end p-5">
        <div className="flex flex-col">
          <Typography variant="h1">Nercesio</Typography>
          <Typography variant="h1">rodriguez</Typography>
          <Typography variant="h5">The New Fragrance</Typography>
        </div>
        <div className="w-[40%] h-full">
          <BigProductCard product={data[3]} />
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center">
        {console.log("CHECKING RESULTANT", data.slice(4))}
        {data.slice(0, 4).map((product: Product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
