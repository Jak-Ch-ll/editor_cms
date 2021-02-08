import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import prisma from "../../../prisma/prisma";

const handler = nc<NextApiRequest, NextApiResponse>()
  // GET ONE blogpost
  .get(async (req, res) => {
    console.log("GETTING ONE BLOGPOST");
    res.status(200).send("This will be a blogpost");
  })
  // UPDATE a blogpost
  .patch(async (req, res) => {
    console.log("UPDATING ONE BLOGPOST");

    const newData = JSON.parse(req.body);
    console.dir(newData);

    await prisma.article.update({
      where: {
        id: newData.id,
      },
      data: newData,
    });

    res.status(200).send("Updated");
  })
  //DESTROY a blogpost
  .delete(async (req, res) => {
    console.log("DELETING ONE BLOGPOST");

    const id = parseInt(req.query.id as string);

    await prisma.article.delete({
      where: {
        id,
      },
    });

    res.status(204).end();
  });

export default handler;
