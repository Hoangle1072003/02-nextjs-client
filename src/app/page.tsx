import { auth } from "@/auth";
import AppPage from "./home/page";

const Home = async () => {
  const session = await auth();
  console.log("session", session);

  return (
    <>
      <AppPage />
    </>
  );
};
export default Home;
