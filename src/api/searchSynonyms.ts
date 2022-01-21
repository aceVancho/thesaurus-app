import { wordsApiHeader, wordsApiUrl } from '../consts';
import { CurrentSearchModel, store } from '../Models/CurrentSearchModel';
import { ResultsModel } from '../Models/ResultsModel';
import { v4 as uuidv4 } from 'uuid';
import { removeAllPressedStyles } from '../utils/handleStyleChange';

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

  // Populate CurrentSearchModel and ResultsModel
  CurrentSearchModel.create({
    id: uuidv4(),
    apiEndpoint: synonymResponse?.config?.url,
    searchWord: searchText,
  })

  synonymResponse?.data?.results?.forEach((result: any) => {
      ResultsModel.create(result)
  })

  // Remove any current filters and reset styles
  // store.currentSearch?.setFilterIsEnabled()
  removeAllPressedStyles();

  console.log('response (in searchSynonyms.ts):', synonymResponse)
  return synonymResponse;
}