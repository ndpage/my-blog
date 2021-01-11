
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import fetch from 'node-fetch'
import remark from 'remark'  //Used to render markdown
import html from 'remark-html'


// These imports are used for adding Sanity to the project
import groq from 'groq' //groq is used to query the data 
import client from '../client'  // client is a component that connects to the Sanity API with the dataset and ProjectID

/*  Function: This function uses GROQ query to fetch desired data from the Sanity API
  groq is a node module that is installed with npm install groq 
  */   
  const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body
}`

const postsDirectory = path.join(process.cwd(), 'posts')

/**
 * Function: getSortedPostsDataFS()
 * Description: Returns data from a markdown file (.md) and returns the file name and parsed data
 */
export function getSortedPostsDataFS() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')
    
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

/* 
  API data fetch
  Function: getSortedPostsDataAPI
  NEED TO ADD CODE TO FETCH DATA FROM EXTERNAL API
*/
export async function getSortedPostsDataAPI(context) {
// fetch post data from an external API endpoint

const { slug = "" } = context.query
const res = await client.fetch(query, {slug})
console.log(res)
return res.json()
}


/* 
  Database data fetching 
  *** MUST IMPORT WHICHEVER DATABASE SDK YOU WANT TO USE FOR FUNCTION TO WORK***

*/

// const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsDataDB() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}


/* 
* Function: getAllPostIds 
 *  Description: This function is used for returning an array of objects which are individual blog posts 
*/
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}


/*
 * Function: getAllPostIdsFromAPI()
 * Description: This gets blog post IDs from external API. This function can be used for data from any API, you just need to configure it accordingly. 
 *  
 */
export async function getAllPostIdsFromAPI() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..')
  const posts = await res.json()
  return posts.map(post => {
    return {
      params: {
        id: post.id
      }
    }
  })
}

/*
  Function: getPostData()
  Description: This function gets the data in the .md file using the gray-matter file parser module
 */
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content) 
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}