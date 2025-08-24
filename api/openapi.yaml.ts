// api/openapi.yaml.ts  → GET /api/openapi.yaml
type Req = any;
type Res = any;

export default function handler(req: Req, res: Res) {
  const yaml = `openapi: 3.1.0
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

  /bep/compute:
    post:
      summary: Hitung Break Even Point (BEP)
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

components:
  schemas:
    BepComputeRequest:
      type: object
      properties:
        fixedCost:
          type: number
          description: Biaya tetap per bulan (contoh 3000000)
        price:
          type: number
          description: Harga jual per porsi (contoh 15000)
        variableCost:
          type: number
          description: Biaya variabel per porsi (contoh 8000)
      required:
        - fixedCost
        - price
        - variableCost
`;

  res
    .status(200)
    .setHeader("content-type", "text/yaml; charset=utf-8")
    .send(yaml);
}
