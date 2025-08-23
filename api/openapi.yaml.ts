// api/openapi.yaml.ts
export default function handler(req, res) {
  const yaml = `
openapi: 3.1.0
info:
  title: UMKM Profit Recipes API
  version: "1.0.0"

servers:
  - url: https://temanumkm.vercel.app/api

paths:
  /ideas:
    get:
      summary: List ide usaha margin tinggi
      operationId: get_ideas
      responses:
        "200":
          description: OK

  /costing/compute:
    post:
      summary: Hitung HPP per porsi dan rekomendasi harga
      operationId: post_costing_compute
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CostingComputeRequest"
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/CostingComputeResponse"

  /pricing/suggest:
    post:
      summary: Saran harga jual berdasarkan HPP, target margin, kompetitor
      operationId: post_pricing_suggest
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PricingSuggestRequest"
      responses:
        "200":
          description: OK

  /bep/compute:
    post:
      summary: Hitung break-even point (unit, omzet, estimasi hari)
      operationId: post_bep_compute
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/BepComputeRequest"
      responses:
        "200":
          description: OK

  /simulation/profit:
    post:
      summary: Simulasi omzet & laba periode
      operationId: post_simulation_profit
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/SimulationProfitRequest"
      responses:
        "200":
          description: OK

components:
  schemas:
    Ingredient:
      type: object
      properties:
        name: { type: string, example: "Tapioka" }
        qty: { type: number, example: 1 }
        unit_price: { type: number, example: 12000 }
        unit: { type: string, example: "kg" }

    CostingComputeRequest:
      type: object
      required: [batch_size, ingredients]
      properties:
        recipe_name: { type: string, example: "Siomay Batagor" }
        batch_size: { type: integer, example: 50 }
        ingredients:
          type: array
          items: { $ref: "#/components/schemas/Ingredient" }
        overhead:
          type: object
          additionalProperties: { type: number }
          example: { gas: 10000, listrik: 5000 }
        packaging_per_unit: { type: number, example: 500 }
        target_margin: { type: number, example: 0.5 }
        rounding_step: { type: number, example: 500 }

    CostingComputeResponse:
      type: object
      properties:
        recipe_name: { type: string }
        batch:
          type: object
          properties:
            size: { type: integer }
            ingredient_cost: { type: number }
            overhead_total: { type: number }
            packaging_total: { type: number }
            batch_cost: { type: number }
        per_unit:
          type: object
          properties:
            hpp: { type: number }
            packaging: { type: number }
        recommended_price: { type: number }
        target_margin: { type: number }
        scenarios:
          type: array
          items:
            type: object
            properties:
              margin: { type: number }
              price: { type: number }
        note: { type: string }

    PricingSuggestRequest:
      type: object
      required: [hpp_per_unit]
      properties:
        hpp_per_unit: { type: number, example: 3000 }
        target_margin_pct: { type: number, example: 60 }
        competitor_price: { type: number, example: 6000 }
        rounding:
          type: string
          enum: ["nearest-500", "99", "round"]
          example: "nearest-500"

    BepComputeRequest:
      type: object
      required: [fixed_costs, sell_price, variable_cost]
      properties:
        fixed_costs: { type: number, example: 1500000 }
        sell_price: { type: number, example: 7000 }
        variable_cost: { type: number, example: 3000 }
        avg_daily_sales: { type: number, example: 80 }

    SimulationProfitRequest:
      type: object
      required: [sell_price, hpp_per_unit, daily_sales, days]
      properties:
        sell_price: { type: number, example: 7000 }
        hpp_per_unit: { type: number, example: 3000 }
        daily_sales: { type: number, example: 100 }
        days: { type: number, example: 30 }
        marketing_cost_pct: { type: number, example: 5 }
        wastage_rate_pct: { type: number, example: 2 }
`.trim();

  res.setHeader("Content-Type", "text/yaml; charset=utf-8");
  res.status(200).send(yaml);
}
