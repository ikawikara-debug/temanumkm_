// api/openapi.ts
export default function handler() {
  const YAML = `openapi: 3.1.0
info:
  title: UMKM Profit Recipes API
  version: "1.0.0"
servers:
  - url: https://YOUR-PROJECT.vercel.app/api
security:
  - ApiKeyAuth: []
components:
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key
paths:
  /ideas:
    get:
      summary: List ide usaha margin tinggi
      responses:
        "200": { description: OK }
  /health:
    get:
      summary: Cek status API
      responses:
        "200": { description: OK }
`;
  return new Response(YAML, {
    status: 200,
    headers: { "content-type": "text/yaml; charset=utf-8" }
  });
}
