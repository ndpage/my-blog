import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h2>Intro</h2>
        <p>Hello! I am a control systems and software engineer based in Greenville, South Carolina. 
            Feel free to check out my <a href="https://www.linkedin.com/in/nathan-page-2018/" target="_blank" rel="noopener noreferrer">LinkedIn </a> 
              and <a href="https://github.com/ndpage" target="_blank" rel="noopener noreferrer"> GitHub</a> pages to see my projects and experience.
          </p>
          <p> Check out my blog posts below to learn more about me and my interests and passions.</p>
      </section>
      <section className={utilStyles.headingMd}> 
        <h2> 
          Blog
        </h2>
        <p>
          <Link href="/posts/first-post">
            <a>Welcome!
              <p className={utilStyles.subtext}>Semptember 18, 2020</p> 
            </a>
            </Link>
        </p>
      </section>
    </Layout>
  )
}