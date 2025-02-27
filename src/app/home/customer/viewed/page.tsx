import { auth } from "@/auth";
import CustomerRecently from "@/components/customer/customer.recently";

const CustomerViewedPage = async () => {
  const session = await auth();
  return (
    <>
      {session ? <CustomerRecently session={session} /> : <CustomerRecently />}
    </>
  );
};
export default CustomerViewedPage;
