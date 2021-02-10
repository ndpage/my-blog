// NextJS components
import Head from "next/head";
import Layout from "../../components/layout";

//import utilStyles from '../../styles/utils.module.css'

// Sanity components
import groq from "groq"; //groq is used to query the data
import client from "../../client"; // client is a component that connects to the Sanity API with the dataset and ProjectID
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

export const query = groq`*[_type == "author" && slug.current == $slug][0]{
  bio,
  image,
  name
}`;

/* 
Function: urlFor 
*/
function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

// Fetch data paths from Sanity API
export async function getStaticPaths() {
  const query = `*[_type == "author"]{
    slug
  }`;
  const authors = await client.fetch(query);

  // Get the paths we want to pre-render based on authors
  const paths = authors.map((author) => `/author/${author.slug.current}`);

  return { paths, fallback: false };
}

// Gets the data from Sanity studio using a GROQ query
export async function getStaticProps({ params }) {
  const slug = params.author;
  const author = await client.fetch(query, { slug });
  return {
    props: {
      author,
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
export default function Author({ author }) {
  const { name = "Missing Name", image, bio = [] } = author;
  return (
    <Layout author>
      <Head>
        <title>{name}</title>
      </Head>
      <article>
        <h1>About Me</h1>
        <div>
          <img src={urlFor(image).width(300).url()} />
        </div>
        <BlockContent
          blocks={bio}
          imageOptions={{ w: 540, h: 460, fit: "max" }}
          {...client.config()}
        />
      </article>
    </Layout>
  );
}
