
import Head from 'next/head'
import Layout from '../../components/layout'
import Post from '../../components/post'
import UtilsStyle from '../../styles/utils.module.css'
import {postDate} from '../../components/layout'

// Global variables 
const pageName = 'Second Post'

// Main post function 
export default function FirstPost() {
  return (
    <>
    <Head> 
  <title>{pageName}</title>
    </Head>
      <Layout>
        <Post> 
          <h1>{pageName}</h1>
          <p> Some text here</p>
          <p className={UtilsStyle.subtext}>Written {postDate[1]}</p> 
        </Post>
      </Layout>
    </>
  )
}
