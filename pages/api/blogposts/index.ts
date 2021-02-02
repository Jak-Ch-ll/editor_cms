import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>()
  // GET ONE blogpost
  .get(async (req, res) => {
    console.log("GETTING ALL BLOGPOSTS");
    res.status(200).send("This will be all blogposts");
  })
  // UPDATE a blogpost
  .post(async (req, res) => {
    console.log("CREATING ONE BLOGPOST");
    res.status(200).send("Created");
  });

export default handler;
