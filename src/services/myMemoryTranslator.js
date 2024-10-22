// traductor con My Memory API
import axios from "axios";

const baseUrl = "https://api.mymemory.translated.net/get";

export async function translateText({ fromLanguage, toLanguage, text }) {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        q: text,
        langpair: `${fromLanguage}|${toLanguage}`,
      },
    });

    if (response.data.responseStatus === 200) {
      return response.data.responseData.translatedText.toLowerCase();
    } else {
      throw new Error(response.data.responseDetails);
    }
  } catch (error) {
    console.log(error);
    alert("Error en la traducción");
  }
}
