import { auth } from "@/auth";
import CustomerDetails from "@/components/customer/customer.details";

const CustomerPage = async () => {
  const session = await auth();

  return (
    <>
      <CustomerDetails session={session} />
    </>
  );
};
export default CustomerPage;
