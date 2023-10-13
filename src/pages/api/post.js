export default function handler(req, res) {
  const { title, post } = JSON.parse(req.body);

  // Then save the post data to a database
  res.status(200).json({ message: "Post created successfully" });
}
