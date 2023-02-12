import { apiRequest } from "../api-request";
import { dataURL } from "../endpoint";

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}

export function setTokenCookies(response) {
  const accessToken = response.accessToken.split("Bearer ")[1];
  const refreshToken = response.refreshToken;

  setCookie("accessToken", accessToken, { expires: 1200 });
  setCookie("refreshToken", refreshToken);
}

export function clearTokenCookies() {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
}

export async function refreshAccessAndContinue(
  dispatch,
  callback,
  navigate,
  payload
) {
  try {
    const innerResponse = await apiRequest(`${dataURL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    });
    const accessToken = innerResponse.accessToken.split("Bearer ")[1];
    setCookie("accessToken", accessToken, { expires: 1200 });
    dispatch(payload ? callback(payload) : callback());
  } catch (error) {
    if (error === 401) navigate("/login", { replace: true });
  }
}
