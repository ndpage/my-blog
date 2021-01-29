import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
//import { getSortedPostsDataFS } from '../lib/posts' //This parses the posts .md files
//import Date from '../components/date'

import groq from 'groq'
import client from '../client'

const query = groq`*[_type == "author"]|order(publishedAt desc)`

export async function getStaticProps(){
  const authors = await client.fetch(query)
  return {
    props: {
      authors,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 5, // In seconds
  }
}


export default function Authors({ authors }) {
  return (
    <>
    <Layout authors>
      <Head>
        <title>{siteTitle}: Authors</title>
      </Head>
      <section>
      <h2 className={utilStyles.headingLg}>Authors</h2>
      <ul className={utilStyles.list}>
        {authors.map(
              ({ _id, name = '', slug = '' }) =>
                slug && (
                  <Link href="/author/[slug]" as={`/author/${slug.current}`}>
                    <a> 
                      <li key={_id} className={utilStyles.listItem}>
                        {name}
                     </li>
                   </a>
                </Link>
                )
              )}
        </ul>
      </section>
    </Layout>
    </>
  )
}