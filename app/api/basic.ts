export default function handler(req, res) {
  const { id } = req.query; // Access dynamic parameter
  res.status(200).json({ userId: id });
}
