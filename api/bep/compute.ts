// /api/bep/compute.ts
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    // dukung req.json() (Edge) dan req.body (Node)
    let body: any = req.body;
    if (!body || typeof body !== "object") {
      try {
        body = await req.json?.();
      } catch {}
    }

    const fixedCost = Number(body?.fixedCost);
    const price = Number(body?.price);
    const variableCost = Number(body?.variableCost);

    if (
      !isFinite(fixedCost) ||
      !isFinite(price) ||
      !isFinite(variableCost)
    ) {
      res.status(400).json({ error: "Invalid body. Need fixedCost, price, variableCost (number)." });
      return;
    }

    const contribution = price - variableCost;
    if (contribution <= 0) {
      res.status(400).json({ error: "Harga harus lebih besar dari biaya variabel." });
      return;
    }

    const bepUnits = Math.ceil(fixedCost / contribution);
    const bepRevenue = bepUnits * price;

    res.status(200).json({
      fixedCost,
      price,
      variableCost,
      contribution,
      bepUnits,
      bepRevenue
    });
  } catch (e: any) {
    res.status(500).json({ error: "Server error", detail: String(e?.message || e) });
  }
}
