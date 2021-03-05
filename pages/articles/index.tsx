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
      <tr key={article.id}>
        <td>{article.title}</td>
        <td>{article.previewText}</td>
        <td>
          <Link href={`/articles/${article.id}/edit`}>
            <a className="button">Edit</a>
          </Link>
        </td>
        <td>
          <button className="button" onClick={() => deleteArticle(article.id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <main>
      <table>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Preview Text</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>{listArticles}</tbody>
      </table>
    </main>
  );
}
