import CartDetails from "@/components/cart/cart.details";
import { auth } from "@/auth";

const CartPage = async () => {
  const session = await auth();

  return (
    <>
      <CartDetails session={session} />
    </>
  );
};
export default CartPage;
