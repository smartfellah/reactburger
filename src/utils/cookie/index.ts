import { apiRequest } from "../api-request";
import { dataURL } from "../endpoint";
import { TAccessTokenResponse } from "../types";

export function setCookie(
  name: string,
  value: string | null,
  minutes?: number
): void {
  let expires = "";
  if (minutes) {
    let date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name + "=" + (value || "") + expires + "; path=/;SameSite=Lax";
}

export function getCookie(cname: string): string {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function deleteCookie(name: string): void {
  setCookie(name, "", -1);
}

export function setTokenCookies(response: any): void {
  const accessToken = response.accessToken.split("Bearer ")[1];
  const refreshToken = response.refreshToken;

  setCookie("accessToken", accessToken, 20);
  setCookie("refreshToken", refreshToken, 60 * 24 * 3);
}

export function clearTokenCookies() {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
}

export async function refreshAccessAndContinue(
  dispatch: any,
  callback: any,
  navigate: any,
  payload: any
) {
  try {
    const innerResponse = await apiRequest<TAccessTokenResponse>(
      `${dataURL}/auth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: getCookie("refreshToken") }),
      }
    );
    setTokenCookies(innerResponse);
    dispatch(payload ? callback(payload) : callback());
  } catch (error) {
    if (error === 401) navigate("/login", { replace: true });
  }
}
