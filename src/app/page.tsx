import AppPage from "@/app/(home)/page";
import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();
  console.log(session);

  return (
    <>
      <AppPage />
    </>
  );
};
export default Home;
