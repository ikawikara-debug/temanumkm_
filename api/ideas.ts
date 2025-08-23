// api/ideas.ts
export default function handler(req, res) {
  const ideas = [
    { id: 1, name: "Es Teh Jumbo", margin: "70%" },
    { id: 2, name: "Cemilan Serba 10K", margin: "60%" },
    { id: 3, name: "Aneka Gorengan Premium", margin: "55%" },
    { id: 4, name: "Nasi Ayam Geprek", margin: "50%" }
  ];

  res.status(200).json({
    message: "List ide usaha margin tinggi",
    data: ideas
  });
}
