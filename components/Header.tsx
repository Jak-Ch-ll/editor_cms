import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Header.module.scss";

export default function Header() {
  const navTargets = [
    {
      url: "/blogposts",
      text: "All blogposts",
    },
    {
      url: "/blogposts/new",
      text: "Create New",
    },
  ];

  const router = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <Link href="/">
          <a>Next CMS</a>
        </Link>
      </div>

      <nav>
        <ul>
          {navTargets.map((target, i) => {
            return (
              <li
                key={i}
                {...(target.url === router.pathname && {
                  className: styles.current,
                })}
              >
                <Link href={target.url}>
                  <a>{target.text}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
