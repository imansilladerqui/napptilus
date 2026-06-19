import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  const baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  if (!baseUrl || !apiKey) {
    return NextResponse.json({ message: "Missing API_BASE_URL or API_KEY" }, { status: 503 });
  }

  const { pathname, search } = request.nextUrl;
  const externalPath = pathname.replace(/^\/api/, "");
  const url = new URL(`${baseUrl}${externalPath}${search}`);

  const headers = new Headers(request.headers);
  headers.set("x-api-key", apiKey);
  headers.set("Content-Type", "application/json");

  return NextResponse.rewrite(url, { request: { headers } });
};

export const config = {
  matcher: ["/api/products", "/api/products/:path*"],
};
