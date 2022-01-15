import { wordsApiHeader, wordsApiUrl, thesaurusApiURL } from '../consts';
import { SynonymsModel, CurrentSearchModel } from '../Models/currentSearchModel';
import { v4 as uuidv4 } from 'uuid';
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
  
  console.log('response (in searchSynonyms.ts):', synonymResponse)

  const synonymsModel = SynonymsModel.create({
      noun: synonymResponse.data?.noun?.syn,
      verb: synonymResponse.data?.verb?.syn,
      adverb: synonymResponse.data?.adverb?.syn,
      adjective: synonymResponse.data?.adjective?.syn,
  })

  CurrentSearchModel.create({
      id: uuidv4(),
      apiEndpoint: synonymResponse?.config?.url,
      searchWord: searchText,
      synonyms: synonymsModel
  })

  return synonymResponse;
}