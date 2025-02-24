import { auth } from "@/auth";
import SuspendCustomer from "@/components/customer/customer.suspend";

const SuspendAccountPage = async () => {
  const session = await auth();

  return (
    <>
      <SuspendCustomer session={session} />
    </>
  );
};

export default SuspendAccountPage;
