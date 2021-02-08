import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import prisma from "../../../prisma/prisma";

export type NewArticle =
  | (Prisma.Without<
      Prisma.ArticleUncheckedCreateInput,
      Prisma.ArticleCreateInput
    > &
      Prisma.ArticleCreateInput)
  | (Prisma.Without<
      Prisma.ArticleCreateInput,
      Prisma.ArticleUncheckedCreateInput
    > &
      Prisma.ArticleUncheckedCreateInput);

const handler = nc<NextApiRequest, NextApiResponse>()
  // GET ALL blogpost
  .get(async (req, res) => {
    console.log("GETTING ALL BLOGPOSTS");
    const articles = await prisma.article.findMany();
    res.status(200).send(articles);
  })
  // CREATE a blogpost
  .post(async (req, res) => {
    console.log("CREATING ONE BLOGPOST");
    const data = JSON.parse(req.body);
    console.log(data);
    try {
      const newArticle = await prisma.article.create({
        data,
      });
      res.status(201).send(newArticle.id);
    } catch (err) {
      console.log(err);
    }
  });

export default handler;
