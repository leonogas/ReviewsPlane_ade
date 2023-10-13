const superagent = require("superagent");
import { promises as fs } from "fs";

export default function handler(req, res) {
  const number = Number(req.query.number);

  res.status(200).send("OK: " + number);
}
