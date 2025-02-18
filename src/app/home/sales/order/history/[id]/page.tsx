import { auth } from "@/auth";
import SalesDetails from "@/components/sales/sales.details";

const SalesOrderHistoryDetailPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = await params;
  const session = await auth();

  return <SalesDetails id={id} session={session} />;
};

export default SalesOrderHistoryDetailPage;
