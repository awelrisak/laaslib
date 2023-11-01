"use server"


const apiKey = process.env.GOOGLE_API_KEY as string;

// Set the endpoint for Google Books API
const apiUrl = `https://www.googleapis.com/books/v1/volumes`;

const initialParams = {
  key: apiKey,
  q: "subject:cook",
  startIndex: "0",
  printType: "books",
  maxResults: "30",
}

export async function getGoogleBooks(
   params: Record<string, string> = initialParams,
   ) {
      
  if (!params?.key) {
    params.key = apiKey;
  }

  const url = new URL(apiUrl);
  url.search = new URLSearchParams(params).toString();

  try {
    const response = await fetch(url.toString(), {
      cache: "no-store"
    })    
    
    if(!response.ok){
      throw new Error(Response.stutus)
    }
    
    const data = await response.json();
    
    
    
    
    return {
      ...data,
      items: data.items?.filter(item => Boolean(item))
    };    
    
  } catch (error: any) {
    throw new Error(`Could not get google books: ${error?.message}`);
  }
}
