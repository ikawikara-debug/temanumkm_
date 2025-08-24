// api/bep/compute.ts
export default function handler(req, res) {
  if (req.method === "POST") {
    const { fixedCost, price, variableCost } = req.body;

    if (!fixedCost || !price || !variableCost) {
      return res.status(400).json({ error: "Input tidak lengkap" });
    }

    const margin = price - variableCost;
    if (margin <= 0) {
      return res.status(400).json({ error: "Margin harus lebih besar dari 0" });
    }

    const bep_unit = Math.ceil(fixedCost / margin);
    const bep_revenue = bep_unit * price;

    res.status(200).json({
      message: "Perhitungan BEP berhasil",
      fixedCost,
      price,
      variableCost,
      margin_per_unit: margin,
      bep_unit,
      bep_revenue
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
