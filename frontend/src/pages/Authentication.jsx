import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login"; //if the mode is not set -> set to login

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode for auth" }, { status: 422 });
  }
  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  const response = await fetch("http://localhost:8000/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw json(
      { message: "Could not authenticate this user" },
      { status: 500 }
    );
  }

  const resData = await response.json();
  const token = resData.token;
  localStorage.setItem("token", token);
 
  const expiration = new Date(); // get the time now
  expiration.setHours(expiration.getHours() + 1); // get the hour now and add 1 hour more to it
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
