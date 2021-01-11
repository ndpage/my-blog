
// NextJS components
import Head from 'next/head'
import Layout from '../../components/layout'

//import { getAllPostIds, getPostData, getSortedPostsDataAPI } from '../../lib/posts'
//import Date from '../../components/date'
//import utilStyles from '../../styles/utils.module.css'

import groq from 'groq' //groq is used to query the data 
import client from '../../client'  // client is a component that connects to the Sanity API with the dataset and ProjectID
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'

/* 
Function: urlFor 
*/
function urlFor (source) {
  return imageUrlBuilder(client).image(source)
}

export const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body
}`

/*
export async function getStaticPaths() {
  const data = await client.fetch(`*[_type == "post"]{'slug':slug.current}`)
  const paths = []
  
  var i=0
  for(i=0;i<data.length;i++){
    paths[i] = "/post/"+data[i].slug
  }

  return {
    paths,
    fallback: false
  }
}

// Gets the data from Sanity studio using a GROQ query
export async function getStaticProps({params}) {
  const {slug=""} = params
  const postData = await client.fetch(query, {slug})
  console.log(postData.title)
  return {
    props: {postData}
  }
}
*/

export async function getServerSideProps(context) {

  const { slug = "" } = context.query
  const post = await client.fetch(query, {slug})

  return {
    props: {post}, // will be passed to the page component as props
  }
}


/*  Funtion: Post
Description: Post function is used to display the fetched data from the Sanity API and GROQ query on the page
*/
export default function Post({post}){
  const {
    title = ' Missing Title',
    name = ' Missing Name',
    categories,
    authorImage,
    body = []
  } = post
  return (
    <Layout post> 
     <Head>
      <title>{title}</title>
    </Head>
    <article>
      <h1>{title}</h1>
      <span>By {name}</span>
      {categories && (
        <ul>
          {categories.map(category => <li key={category}>{category}</li>)}
        </ul>
      )}
      {authorImage && (
        <div>
          <img
            src={urlFor(authorImage)
              .width(50)
              .url()}
              />
        </div>
      )}
      <BlockContent
        blocks={body}
        imageOptions={{ w: 320, h: 240, fit: 'max' }}
        {...client.config()}
        />
    </article>
  </Layout> 
  )
}

// ======================= OLD POST FUNCTION =====================
/*
// Gets the data from function getPostData() defined in posts.js
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
*/
 
/*
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

// Main Post function for returning the data of a blog post
export default function Post({ postData }) {
  return (
    <Layout>
    <Head>
      <title>{postData.title}</title>
    </Head>
    <article>
    <h1 className={utilStyles.headingLg}>{postData.title}</h1>
    <div className={utilStyles.lightText}>
    <Date dateString={postData.date} />
    </div>
    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
    </Layout>
    )
  }
  */

