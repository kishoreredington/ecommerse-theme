import {
  useCreateOrderMutation,
  useVerifyOrderMutation,
} from "../../Pages/RazerPay/RazerPayApiSlice";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type BuyOptions = {
  amount?: number;
  name?: string;
  description?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  addressId?: number;
  items: {
    variantId: number;
    quantity: number;
  }[];
};

export const useRazorpayBuy = () => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [verifyOrder, { isLoading: orderVerificationLoading }] =
    useVerifyOrderMutation();

  const handleBuy = async ({
    name = "Alphery",
    prefill,
    addressId,
    items,
  }: BuyOptions) => {
    try {
      const { strapiOrder, orderId } = await createOrder({
        addressId: addressId,
        items,
      }).unwrap();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: strapiOrder.amount,
        currency: "INR",
        order_id: strapiOrder.id,
        name,
        description: "Premium Growth Plan",

        image:
          "https://media.about.nike.com/img/cf68f541-fc92-4373-91cb-086ae0fe2f88/002-nike-logos-swoosh-white.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjowLCJ0b3AiOjAsIndpZHRoIjo1MDAwLCJoZWlnaHQiOjI4MTN9LCJyZXNpemUiOnsid2lkdGgiOjY0MH19fQ%3D%3D&s=cc94b2cc61c9c80ba68eb593e20d3bd8345d1ce8817f826c1c3126aae59e7933",

        handler: async (response: any) => {
          try {
            await verifyOrder({ ...response }).unwrap();
          } catch (error) {
            console.log(error);
          }
        },

        prefill,
        theme: { color: "#000" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Payment failed", err);
    }
  };

  return { handleBuy, isLoading };
};
