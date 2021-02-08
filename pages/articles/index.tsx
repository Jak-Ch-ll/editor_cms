import { Article } from "@prisma/client";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useState } from "react";

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/articles");
  const articleData: Article[] = await res.json();

  return {
    props: {
      articleData,
    },
  };
};

export default function Blogposts({
  articleData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [articles, setArticles] = useState(articleData);

  const deleteArticle = async (id: number) => {
    try {
      await fetch(`/api/articles/${id}`, {
        method: "DELETE",
      });

      setArticles(articles.filter(article => article.id !== id));
    } catch (err) {
      console.log("Error while deleting", err);
    }
  };

  const listArticles = articles.map(article => {
    return (
      <li key={article.id}>
        <h2>{article.title}</h2>
        <p>{article.previewText}</p>
        <Link href={`/api/articles/${article.id}/edit`}>
          <a>Edit</a>
        </Link>
        <button onClick={() => deleteArticle(article.id)}>Delete</button>
      </li>
    );
  });

  return (
    <main>
      <ul>{listArticles}</ul>
    </main>
  );
}
