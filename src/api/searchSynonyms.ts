import { wordsApiHeader, wordsApiUrl } from '../consts';
import { CurrentSearchModel } from '../Models/CurrentSearchModel';
import { ResultsModel } from '../Models/ResultsModel';
import { v4 as uuidv4 } from 'uuid';

const axios = require("axios").default;

export default async function searchSynonyms(text: string): Promise<any> {

  const searchText = text;
  let synonymResponse;
  const wordOptions = {
    method: 'GET',
    url: wordsApiUrl(searchText),
    headers: wordsApiHeader
  };
  
  try {
    synonymResponse = await axios.request(wordOptions)
  } catch(error) {
      console.log(error)
  };

  CurrentSearchModel.create({
    id: uuidv4(),
    apiEndpoint: synonymResponse?.config?.url,
    searchWord: searchText,
  })

  synonymResponse?.data?.results?.forEach((result: any) => {
      ResultsModel.create(result)
  })

  console.log('response (in searchSynonyms.ts):', synonymResponse)
  return synonymResponse;
}