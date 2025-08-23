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
      responses:
        "200":
          description: OK
  /costing/compute:
    post:
      summary: Hitung HPP per porsi
      responses:
        "200":
          description: OK
  `;
  res.setHeader("Content-Type", "text/yaml");
  res.status(200).send(yaml);
}
