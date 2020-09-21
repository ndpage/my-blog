import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import fetch from 'node-fetch'


const postsDirectory = path.join(process.cwd(), 'posts')

/* 
  Get sorted posts data from the file system 
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
export async function getSortedPostsDataAPI() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..')
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
  getAllPostIds 
  This function is used for returning an array of objects which are individual blog posts 
  

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