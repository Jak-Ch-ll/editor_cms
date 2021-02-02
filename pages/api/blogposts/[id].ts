import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>()
  // GET ONE blogpost
  .get(async (req, res) => {
    console.log("GETTING ONE BLOGPOST");
    res.status(200).send("This will be a blogpost");
  })
  // UPDATE a blogpost
  .put(async (req, res) => {
    console.log("UPDATING ONE BLOGPOST");
    res.status(200).send("Updated");
  })
  //DESTROY a blogpost
  .delete(async (req, res) => {
    console.log("DELETING ONE BLOGPOST");
    res.status(204).end();
  });

export default handler;
