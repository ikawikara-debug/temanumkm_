[15:42, 24/08/2025] Ika - Revlin: // api/bep/compute.ts
export default function handler(req, res) {
  if (req.method === "POST") {
    const { fixed_cost, harga_jual, biaya_variable } = req.body;

    if (!fixed_cost || !harga_jual || !biaya_variable) {
      return res.status(400).json({ error: "Input tidak lengkap" });
    }

    const margin = harga_jual - biaya_variable;
    if (margin <= 0) {
      return res.status(400).json({ error: "Margin harus lebih besar dari 0" });
    }

    // Hitung BEP
    const bep_unit = Math.ceil(fixed_cost / margin);
    const bep_revenue = bep_unit * harga_jual;

    res.status(200).json({
      message: "Perhitungan BEP berhasil",
      fixed_cost,
      harga_jual,
      biaya_variable,
      margin_per_unit: margin,
      bep_unit,
      bep_revenue
 …
[15:45, 24/08/2025] Ika - Revlin: // api/bep/compute.ts
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
[15:46, 24/08/2025] Ika - Revlin: // api/bep/compute.ts
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
