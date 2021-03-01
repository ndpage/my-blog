/* 
  Layout.js
  Provides site wide layout
*/
import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Nathan Page";
export const siteTitle = "Nathan Page";

export default function Layout({ home, post, children }) {
  const navItems = [
    {
      itemName: "About Me",
      url: "author/nathan-page",
    },
    {
      itemName: "Blog",
      url: "/posts",
    },
    {
      itemName: "Contact",
      url: "/contact",
    },
  ];
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Nathan Page personal website and blog for software developement and learning"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <header className={styles.header}>
        {/*
        <navbar className={styles.navBar}>
          {navItems.map((item) => (
            <Link href="/" as={`${item.url}`}>
              <a className={styles.navItem}>{item.itemName}</a>
            </Link>
          ))}
        </navbar>
        */}
        {home ? (
          <>
            <img
              src="/images/profile.jpeg"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/profile.jpeg"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name}
                />
              </a>
            </Link>
            {/*<h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
        </h2>*/}
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <footer className={styles.footer}>
        <p>&copy; 2021 Nathan Page</p>
        <section>
          <a
            href="https://github.com/ndpage"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/github.svg" alt="Github Logo" />
          </a>
          <a
            href="https://www.linkedin.com/in/nathan-page-2018/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/linkedin.svg" alt="Linkedin Logo" />
          </a>
        </section>
        <div className={utilStyles.smallText}>
          Icons made by{"   "}
          <a
            href="https://www.flaticon.com/authors/pixel-perfect"
            title="Pixel perfect"
          >
            Pixel perfect
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </footer>
    </div>
  );
}
