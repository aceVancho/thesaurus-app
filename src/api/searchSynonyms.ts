import { wordsApiHeader, wordsApiUrl, thesaurusApiURL } from '../consts';
import { CurrentSearchModel, SynonymsModel, ResultsModel } from '../Models/CurrentSearchModel';
import { v4 as uuidv4 } from 'uuid';

const axios = require("axios").default;

export default async function searchSynonyms(text: string): Promise<any> {

  const searchText = text;
  let synonymResponse;
  let wordResponse;

  var wordOptions = {
    method: 'GET',
    url: wordsApiUrl(searchText),
    headers: wordsApiHeader
  };

  var synonymsOptions = {
    method: 'GET',
    url: thesaurusApiURL(searchText)
  }
  
  try {
    synonymResponse = await axios.request(synonymsOptions)
    wordResponse = await axios.request(wordOptions)
    synonymResponse['wordsAPIResponse'] = wordResponse;
  } catch(error) {
      console.log(error)
  };
  
  // const synonymsArray:string[] = [];
  // synonymResponse?.wordsAPIResponse?.data?.results?.map((result: any) => {
  //   return result?.synonyms?.map((word: string) => {
  //     return synonymsArray.push(word)
  //   })
  // })

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
    synonyms: synonymsModel,
    // results: []
  })

  synonymResponse?.wordsAPIResponse?.data?.results?.forEach((result: any) => {
      ResultsModel.create(result)
  })
  console.log('response (in searchSynonyms.ts):', synonymResponse)
  // console.log('synonymsArray (in searchSynonyms.ts):', synonymsArray)

  return synonymResponse;
}