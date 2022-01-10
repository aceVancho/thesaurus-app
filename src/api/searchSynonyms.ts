import { wordsApiHeader, wordsApiUrl, thesaurusApiURL } from '../consts';
const axios = require("axios").default;

export default async function searchSynonyms(text: string): Promise<any> {

  const searchText = text;

  // var options = {
  //   method: 'GET',
  //   url: wordsApiUrl(searchText),
  //   headers: wordsApiHeader
  // };

  var options = {
    method: 'GET',
    url: thesaurusApiURL(searchText)
  }
  
  let response;
  // let response;

  try {
     response = await axios.request(options)
    //  response2 = await axios.request(options2)
  } catch(error) {
      console.log(error)
  };
  return response;
}