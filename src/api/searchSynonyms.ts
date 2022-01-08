import { wordsApiHeader, wordsApiUrl } from '../consts';
const axios = require("axios").default;

export default async function searchSynonyms(text: string): Promise<any> {

  const searchText = text;

  var options = {
    method: 'GET',
    url: wordsApiUrl(searchText),
    headers: wordsApiHeader
  };
    
  return await new Promise((resolve, reject) => {
    try {
      resolve(axios.request(options))
    } catch(error) {
      reject(error)
    }
  });
}