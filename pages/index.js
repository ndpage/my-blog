import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
//import { getSortedPostsDataFS } from '../lib/posts' //This parses the posts .md files
//import Date from '../components/date'

// Imports for Sanity components and features
import BlockContent from "@sanity/block-content-to-react";
import groq from "groq";
import client from "../client";

const query = groq`
*[_type == "post" && publishedAt < now()]|order(publishedAt desc)
`;
/* const bio = groq`
*[_type == "bio"][0]
`; */

/*
  getStaticProps function is used to render a page with data.
  This index.js page uses static side generation
  export async function getStaticProps() {
    const allPostsData = getSortedPostsDataFS()
    
    return {
      props: {
        allPostsData
      }
    }
  }
  */

export async function getStaticProps() {
  const allPostsData = await client.fetch(query);
  const bioData = await client.fetch(`*[_type == "bio"][0]`);
  return {
    props: {
      allPostsData,
      bioData,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 5, // In seconds
  };
}

/**
 * Function: Home({allPostsData})
 * Description: The Home function houses the short bio and the links to the blog posts
 *               Blog posts are parsed by getSortedPostsDataFS() and displayed with getStaticProps()
 */
export default function Home({ allPostsData, bioData }) {
  return (
    <>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section>
          <BlockContent blocks={bioData.bio} {...client.config()} />
        </section>
        <section>
          <h3>Blog</h3>
          <ul className={utilStyles.list}>
            {allPostsData.map(
              ({ _id, title = "", slug = "", publishedAt = "" }) =>
                slug && (
                  <Link
                    key={_id}
                    href="/post/[slug]"
                    as={`/post/${slug.current}`}
                  >
                    <a>
                      <li key={_id} className={utilStyles.listItem}>
                        {title}
                        {"  "}({new Date(publishedAt).toDateString()})
                      </li>
                    </a>
                  </Link>
                )
            )}
          </ul>
        </section>
      </Layout>
    </>
  );
}
