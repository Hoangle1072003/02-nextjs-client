import { auth } from "@/auth";
import EditPhoneDetails from "@/components/customer/customer.editPhone";
import { Suspense } from "react";

const EditPhonePage = async () => {
  const session = await auth();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPhoneDetails session={session} />
    </Suspense>
  );
};
export default EditPhonePage;
