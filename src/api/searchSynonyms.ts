import { wordsApiHeader, wordsApiUrl, thesaurusApiURL } from '../consts';
const axios = require("axios").default;

export default async function searchSynonyms(text: string): Promise<any> {

  const searchText = text;

  var wordOptions = {
    method: 'GET',
    url: wordsApiUrl(searchText),
    headers: wordsApiHeader
  };

  var synonymsOptions = {
    method: 'GET',
    url: thesaurusApiURL(searchText)
  }
  
  let synonymResponse;
  let wordResponse;

  try {
    synonymResponse = await axios.request(synonymsOptions)
    wordResponse = await axios.request(wordOptions)
    synonymResponse['wordsAPIResponse'] = wordResponse;
  } catch(error) {
      console.log(error)
  };
  return synonymResponse;
}