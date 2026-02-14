import { Typography } from "@mui/material";
import { type Product } from "../../type";

export default function ProductDescription({
  productDetail,
}: {
  productDetail: Product;
}) {
  console.log(productDetail);
  return (
    <div className="flex-2 rounded-2xl bg-white p-4">
      {/* Tabs */}
      <div className="flex gap-6 border-b text-sm">
        <button className="pb-3 font-medium text-black border-b-2 border-black">
          Details
        </button>
      </div>

      {/* Characteristics */}
      <div className="mt-6">
        <Typography variant="h5">Characteristics</Typography>
        <Typography variant="body1">{productDetail?.description}</Typography>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <Typography>family</Typography>
            <span className="flex-1 border-b border-dotted border-gray-300" />
            <Typography>{productDetail.family}</Typography>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Typography>gender</Typography>
            <span className="flex-1 border-b border-dotted border-gray-300" />
            <Typography className="font-medium text-black">
              {productDetail.gender}
            </Typography>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Typography>Top Notes</Typography>
            <span className="flex-1 border-b border-dotted border-gray-300" />
            <Typography className="font-medium text-black">
              {productDetail.topNotes}
            </Typography>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Typography>Heart Notes</Typography>
            <span className="flex-1 border-b border-dotted border-gray-300" />
            <Typography className="font-medium text-black">
              {productDetail.heartNotes}
            </Typography>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Typography>Base Notes</Typography>
            <span className="flex-1 border-b border-dotted border-gray-300" />
            <Typography className="font-medium text-black">
              {productDetail.baseNotes}
            </Typography>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Typography>Longevity</Typography>
            <span className="flex-1 border-b border-dotted border-gray-300" />
            <Typography className="font-medium text-black">
              {productDetail.longevity}
            </Typography>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Typography>sillage</Typography>
            <span className="flex-1 border-b border-dotted border-gray-300" />
            <Typography className="font-medium text-black">
              {productDetail.sillage}
            </Typography>
          </div>
        </div>
      </div>

      {/* <div className="mt-8">
        <Typography
          variant="h5"
          className="mb-4 text-sm font-semibold text-black "
        >
          Notes
        </Typography>

        <div className="space-y-2 text-sm mb-2">
          <div className="flex items-center gap-3">
            <Typography variant="caption">cherry</Typography>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <div className="flex items-center gap-3">
            <Typography variant="caption">Sweet</Typography>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <div className="flex items-center gap-3">
            <Typography variant="caption">Almond</Typography>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <div className="flex items-center gap-3">
            <Typography variant="caption">Walnut</Typography>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
        </div>

        <CommonButton>View all notes</CommonButton>

        <button className="mt-4 flex items-center gap-1 text-sm font-medium text-black hover:underline">
          View all notes
        </button>
      </div> */}
    </div>
  );
}
