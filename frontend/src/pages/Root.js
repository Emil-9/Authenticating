import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    // if the token does not exist dont do anything
    if (!token) {
      return;
    }
    // if the token is expired logout
    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }
    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);
    // if the token is not expired check how much is the duration to logout after it ends
    // this timeout function is for long sessions -> if the user didn't logout
    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
