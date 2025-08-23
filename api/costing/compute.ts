// api/costing/compute.ts
// Hitung HPP per porsi + rekomendasi harga jual

type Ingredient = { name: string; qty: number; unit?: string; unit_price: number };
type Overhead = Record<string, number>;

function sumObject(o: Overhead = {}) {
  return Object.values(o || {}).reduce((a, b) => a + (Number(b) || 0), 0);
}

function roundUp(x: number, step: number = 500) {
  return Math.ceil(x / step) * step;
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  try {
    const {
      recipe_name = "Produk UMKM",
      batch_size,
      ingredients = [],
      overhead = {},
      packaging_per_unit = 0,
      target_margin = 0.5, // 50% default
      rounding_step = 500  // pembulatan ke kelipatan 500
    } = req.body || {};

    if (!batch_size || batch_size <= 0) {
      return res.status(400).json({ error: "batch_size wajib > 0" });
    }
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: "ingredients wajib diisi" });
    }

    // Biaya bahan
    const ingredient_cost = (ingredients as Ingredient[]).reduce((sum, it) => {
      const line = (Number(it.qty) || 0) * (Number(it.unit_price) || 0);
      return sum + line;
    }, 0);

    // Overhead total (gas, listrik, sewa, gaji, dll)
    const overhead_total = sumObject(overhead);

    // Packaging total
    const packaging_total = (Number(packaging_per_unit) || 0) * Number(batch_size);

    // Total biaya 1 batch
    const batch_cost = ingredient_cost + overhead_total + packaging_total;

    // HPP per porsi
    const hpp_per_unit = batch_cost / Number(batch_size);

    // Rekomendasi harga jual
    const price_target = hpp_per_unit / (1 - Number(target_margin || 0));
    const recommended_price = roundUp(price_target, Number(rounding_step) || 500);

    // Alternatif skenario margin
    const scenarios = [0.3, 0.4, 0.5, 0.6].map((m) => ({
      margin: m,
      price: roundUp(hpp_per_unit / (1 - m), Number(rounding_step) || 500)
    }));

    return res.status(200).json({
      recipe_name,
      batch: {
        size: batch_size,
        ingredient_cost,
        overhead_total,
        packaging_total,
        batch_cost
      },
      per_unit: {
        hpp: Number(hpp_per_unit.toFixed(2)),
        packaging: Number(packaging_per_unit)
      },
      recommended_price,
      target_margin,
      scenarios,
      note: "Ubah rounding_step untuk pembulatan (default 500)."
    });
  } catch (e) {
    return res.status(500).json({ error: "Server error", detail: String(e) });
  }
}
