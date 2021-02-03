// NextJS components
import Head from "next/head";
import Layout from "../../components/layout";

//import { getAllPostIds, getPostData, getSortedPostsDataAPI } from '../../lib/posts'
//import Date from '../../components/date'
//import utilStyles from '../../styles/utils.module.css'

import groq from "groq"; //groq is used to query the data
import client from "../../client"; // client is a component that connects to the Sanity API with the dataset and ProjectID
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

export const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body, 
}`;

/* 
Function: urlFor 
*/
function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

export async function getStaticPaths() {
  const query = `*[_type == "post"]`; // {'slug':slug.current} was included when using the for loop
  const posts = await client.fetch(query);

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { slug: post.slug.current },
  }));

  return { paths, fallback: false };
}

// Gets the data from Sanity studio using a GROQ query
export async function getStaticProps(context) {
  const slug = context.params.slug;
  const post = await client.fetch(query, { slug });
  return {
    props: {
      post,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 5, // In seconds
  };
}

/*  --------------------------------------------------------------
  Funtion: Post()
  Description: Post function is used to display the fetched data from the Sanity API and GROQ query on the page
*/
export default function Post({ post }) {
  console.log(post);
  const {
    title = " Missing Title",
    name = " Missing Name",
    categories,
    authorImage,
    body = [],
  } = post;
  return (
    <Layout post>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1>{title}</h1>
        <span>By {name}</span>
        {/*authorImage && (
        <div>
          <img
            src={urlFor(authorImage)
              .width(100)
              .url()}
              />
        </div>
        )*/}
        <div>
          {categories && (
            <ul>
              {categories.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          )}
        </div>
        <BlockContent
          blocks={body}
          imageOptions={{ w: 540, h: 460, fit: "max" }}
          {...client.config()}
        />
      </article>
    </Layout>
  );
}
