import { removeUserInfoCookie } from "@/actions/user-action";

export async function GET(req: Request) {
  const redirect = new URL(req.url).searchParams.get("redirect");

  await removeUserInfoCookie();

  return Response.redirect(redirect ?? "/", 302); // 302: Temporary Redirect
}
