// api/bep.ts
// Endpoint: POST /api/bep
// Body JSON: { "fixedCost": number, "price": number, "variableCost": number }

type Req = any;
type Res = any;

function num(x: any) {
  if (typeof x === "number") return x;
  if (typeof x === "string") {
    // buang titik/koma pemisah ribuan lalu parse
    const cleaned = x.replace(/[.\s]/g, "").replace(",", ".");
    const n = Number(cleaned);
    if (!isNaN(n)) return n;
  }
  return NaN;
}

export default async function handler(req: Req, res: Res) {
  // CORS simpel (opsional, aman untuk Actions)
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fixedCost, price, variableCost } = req.body || {};

    const FC = num(fixedCost);
    const P = num(price);
    const VC = num(variableCost);

    if ([FC, P, VC].some((v) => !isFinite(v))) {
      return res.status(400).json({
        error: "Data tidak lengkap/valid. Kirim fixedCost, price, variableCost (angka).",
      });
    }

    const contribution = P - VC;
    if (contribution <= 0) {
      return res.status(400).json({
        error:
          "Margin kontribusi ≤ 0. Pastikan harga jual > biaya variabel per porsi.",
      });
    }

    const bepUnit = Math.ceil(FC / contribution);
    const bepOmzet = bepUnit * P;

    return res.status(200).json({
      message: "Hasil perhitungan BEP",
      fixedCost: FC,
      price: P,
      variableCost: VC,
      contribution,
      bepUnit,
      bepOmzet,
    });
  } catch (e: any) {
    return res.status(500).json({ error: "Server error", detail: String(e?.message || e) });
  }
}
