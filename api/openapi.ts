// api/openapi.ts
export default function handler(req, res) {
  const spec = {
    openapi: "3.1.0",
    info: {
      title: "UMKM Profit Recipes API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://temanumkm.vercel.app/api", // ganti sesuai domain Vercel kamu
      },
    ],
    paths: {
      "/ideas": {
        get: {
          summary: "List ide usaha margin tinggi",
          responses: {
            "200": {
              description: "OK",
            },
          },
        },
      },
      "/costing/compute": {
        post: {
          summary: "Hitung HPP per porsi",
          responses: {
            "200": {
              description: "OK",
            },
          },
        },
      },
    },
  };

  res.status(200).json(spec);
}
