
import Head from 'next/head'
import Layout from '../../components/layout'
import Post from '../../components/post'
import UtilsStyle from '../../styles/utils.module.css'

// Global variables 
const pageName = 'Welcome!'

// Main post function 
export default function FirstPost() {
  return (
    <>
    <Head> 
  <title>{pageName}</title>
    </Head>
      <Layout>
          <h1>{pageName}</h1>
          <p className={UtilsStyle.subtext}>Semptember 18, 2020</p> 
        <Post> 
          <p>Hello world!</p> 
          <p> As an engineer and tech enthusiast, I was wanted to find a way to connect with other engineers and individuals who are passionate about technology, so I created this website
               to share my thoughts and connect with you! 
            </p>
          <h3 className={UtilsStyle.headingLg}>A Little About Me</h3>
          <p>I am an engineer at <a href="https://www.boschrexroth.com/en/xc/" target="_blank">Bosch Rexroth</a> in the Greeenville, South Carolina area.I am part of the Mobile Hydraulics Research and Devleopment group, with a focus on mechatronics systems.</p>
          <p> I graduated May 2018 from <a href="https://www.ncsu.edu/" target="_blank"> North Carolina State University</a> with a Bachelor of Science in Engineering with a concentration in Mechatronics (electro-mechanical systems).</p>
          <p>Thanks for reading!</p>
        </Post>
      </Layout>
    </>
  )
}
