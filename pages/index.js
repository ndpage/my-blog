import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello! I am a control systems and software engineer. 
          Feel free to check out my <a href="www.linkedin.com">LinkedIn</a> page and GitHub page</p>
        <p>
          <Link href="/posts/first-post"><a>My first post</a></Link>
        </p>
      </section>
    </Layout>
  )
}