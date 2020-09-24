import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsDataFS } from '../lib/posts' //This parses the posts .md files
import Date from '../components/date'


/*
  getStaticProps function is used to render a page with data.
  This index.js page uses static side generation
*/
export async function getStaticProps() {
  const allPostsData = getSortedPostsDataFS()
  return {
    props: {
      allPostsData
    }
  }
}
/**
 * Function: Home({allPostsData}) 
 * Description: The Home function houses the short bio and the links to the blog posts
 *               Blog posts are parsed by getSortedPostsDataFS() and displayed with getStaticProps() 
 */

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <article>
        <p>
          Hello! I am a control systems and software engineer based in Greenville, South Carolina. 
        </p>
        <p> Check out my blog posts below to learn more about me and my interests, and check out my <a href="https://www.linkedin.com/in/nathan-page-2018/" target="_blank" rel="noopener noreferrer">LinkedIn </a> 
            and <a href="https://github.com/ndpage" target="_blank" rel="noopener noreferrer"> GitHub</a> pages to see my projects and experience.
        </p>
      </article>
      <section>
      <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br /> 
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}