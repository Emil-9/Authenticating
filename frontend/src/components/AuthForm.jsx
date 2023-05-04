import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const data = useActionData(); // action data is any data returned from auth page after submitting the form
  // for exp if the form action returned 422 -> this data we can get here

  const [searchParams] = useSearchParams(); // this hook returns an array and we need the search
  const isLogin = searchParams.get("mode") === "login";
  const navigaton = useNavigation();
  const isSubmitting = navigaton.state === "submitting";
  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {data && data.errors && (
          <ul>
            {
              // object is js method that retreives the json values keys and put it in an array
              // here we are getting the array of error messages that returns from the form
              Object.values(data.errors).map((err) => (
                <li>{err.message}</li>
              ))
            }
          </ul>
        )}
        {
          // if we have any other messages than error messages
          data && data.message && <p>{data.message}</p>
        }
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button>{isSubmitting ? "submitting..." : "Save"}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
