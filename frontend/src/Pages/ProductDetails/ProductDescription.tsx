import { Typography } from "@mui/material";
import CommonButton from "../../Components/CustomButton";

export default function ProductDescription() {
  return (
    <div className="flex-2 rounded-2xl bg-white p-4">
      {/* Tabs */}
      <div className="flex gap-6 border-b text-sm">
        <button className="pb-3 font-medium text-black border-b-2 border-black">
          Details
        </button>
        <button className="pb-3 text-gray-400 hover:text-black">
          About brand
        </button>
        <button className="pb-3 text-gray-400 hover:text-black">
          Delivery
        </button>
      </div>

      {/* Characteristics */}
      <div className="mt-6">
        <Typography variant="h5">Characteristics</Typography>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <Typography>group of fragrances</Typography>
            <span className="flex-1 border-b border-dotted border-gray-300" />
            <Typography>amber, resinous</Typography>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Typography>perfumer</Typography>
            <span className="flex-1 border-b border-dotted border-gray-300" />
            <Typography className="font-medium text-black">
              Louise Turner
            </Typography>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Typography>release date</Typography>
            <span className="flex-1 border-b border-dotted border-gray-300" />
            <Typography className="font-medium text-black">2018</Typography>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-8">
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
      </div>
    </div>
  );
}
