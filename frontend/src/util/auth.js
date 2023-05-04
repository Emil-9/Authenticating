import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate  = localStorage.getItem("expiration");   // this storage is a string
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();   // get the current date
  const duration = expirationDate.getTime() - now.getTime();  // get time will get the time in ms
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
  const tokenDuration = getTokenDuration();

  if (!token) {
    return null;
  }

  if (tokenDuration < 0) {
    return "EXPIRED";
  }
  
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }
  return null;
}
