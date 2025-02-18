import { auth } from "@/auth";
import PaymentDetails from "@/components/payment/payment.details";
import { sendRequest } from "@/utils/api";

const PaymentPage = async () => {
  const session = await auth();
  if (!session) {
    return null;
  }
  const fetchUserById = await sendRequest<IBackendRes<IUserById>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}identity-service/api/v1/user/${session?.user?.id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  if (!fetchUserById) {
    return null;
  }

  return (
    <>
      <PaymentDetails session={session} user={fetchUserById?.data} />
    </>
  );
};
export default PaymentPage;
