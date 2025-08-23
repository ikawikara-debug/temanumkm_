// api/[[...path]].ts
// Auth super-sederhana via header X-API-Key yang dibandingkan dengan ENV API_KEY
// Default untuk tes lokal: "mami-umkm-123"
const json = (data: any, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...extra }
  });

const allowCors = (req: Request) => ({
  "access-control-allow-origin": req.headers.get("origin") || "*",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "Content-Type, X-API-Key"
});

export default async function handler(req: Request) {
  const cors = allowCors(req);
  if (req.method === "OPTIONS") return new Response("", { status: 204, headers: cors });

  // ---- Auth ----
  const need = process.env.API_KEY || "mami-umkm-123";
  const got = req.headers.get("x-api-key");
  if (got !== need) return json({ error: "Unauthorized" }, 401, cors);

  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api\/?/, ""); // ambil path setelah /api/

  // ---- Routes ----
  if (req.method === "GET" && (path === "" || path === "/" || path === "health")) {
    return json({ ok: true, service: "UMKM Profit API", time: new Date().toISOString() }, 200, cors);
  }

  if (req.method === "GET" && path === "ideas") {
    const ideas = [
      { id: "idea-1", name: "Es Teh 16oz", category: "drink", est_capital: 450_000, est_margin_pct: 65 },
      { id: "idea-2", name: "Cilok Bumbu Kacang", category: "snack", est_capital: 350_000, est_margin_pct: 60 },
      { id: "idea-3", name: "Pisang Cokelat Mini", category: "dessert", est_capital: 300_000, est_margin_pct: 58 }
    ];
    return json(ideas, 200, cors);
  }

  return json({ error: "Route not found", path }, 404, cors);
}
