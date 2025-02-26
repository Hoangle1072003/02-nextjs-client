import { auth } from "@/auth";
import CustomerDelete from "@/components/customer/customer.delete";

const DeleteAccountPage = async () => {
  const session = await auth();

  return (
    <>
      <CustomerDelete session={session} />
    </>
  );
};
export default DeleteAccountPage;
