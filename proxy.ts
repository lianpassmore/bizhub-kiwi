import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
  ],
}

export default function middleware(req: NextRequest) {
  const url = req.nextUrl
  const hostname = req.headers.get("host") || ""

  // 1. Check if we are on localhost or an IP address (any port)
  const isLocalhost = hostname.includes("localhost")
  const isIPAddress = /^(\d{1,3}\.){3}\d{1,3}(:\d+)?$/.test(hostname)

  // 2. Define the main domains that should NOT be rewritten
  // If it is localhost, IP address, www, or bizhub.kiwi, do nothing
  if (isLocalhost || isIPAddress || hostname === "www" || hostname === "bizhub.kiwi") {
    return NextResponse.next()
  }

  // 3. If we are here, it means we are on a subdomain (e.g. plumber-joe.bizhub.kiwi)
  const subdomain = hostname.split('.')[0]
  console.log(`Rewriting subdomain ${subdomain} to /business/${subdomain}`)

  url.pathname = `/business/${subdomain}${url.pathname}`
  return NextResponse.rewrite(url)
}