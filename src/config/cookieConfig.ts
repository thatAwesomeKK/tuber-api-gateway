import env from "../helper/env";

const cookieConfig = (type: string) => {
  return {
    sameSite:
      env.NODE_ENV === "production" ? ("none" as any) : (false as boolean),
    secure: env.NODE_ENV === "production" ? true : false,
    domain: env.COOKIE_DOMAIN,
    expires: new Date(
      Date.now() +
        (type == "refreshToken"
          ? 30 * 24 * 60 * 60 * 1000
          : 14 * 24 * 60 * 60 * 1000)
    ),
    httpOnly: true,
  };
};

export const accessTokenExpiry = 14 * 24 * 60 * 60 * 1000;
export default cookieConfig;
