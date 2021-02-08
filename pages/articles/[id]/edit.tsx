import { OutputData } from "@editorjs/editorjs";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Editor from "../../../components/Editor";
import prisma from "../../../prisma/prisma";

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const id = parseInt(params!.id as string);

  const data = await prisma.article.findUnique({
    where: {
      id,
    },
    select: {
      url: true,
      title: true,
      previewText: true,
      content: true,
    },
    rejectOnNotFound: true,
  });

  const article = {
    id,
    ...data,
    content: (data.content as unknown) as OutputData,
  };

  console.log(article);

  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await prisma.article.findMany();

  const paths = articles.map(article => ({
    params: {
      id: article.id.toString(),
    },
  }));

  return { paths, fallback: false };
};

export default function Blogposts({
  article,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(article);
  return (
    <main>
      <Editor article={article} />
    </main>
  );
}
