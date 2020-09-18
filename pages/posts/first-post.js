
import Head from 'next/head'
import Layout from '../../components/layout'

export default function FirstPost() {
  return (
    <>
    <Head>  
      <title>First Post</title>
    </Head>
    <Layout>
      <h1>First Post</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
        Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. 
        Voluptatum ducimus voluptates voluptas?</p>
      <p>Thanks for reading!</p>
      </Layout>
    </>
  )
}
