import { nameRegex, emoticonRegex, urlRegex } from "./constants";
import getTitle from "url-metadata";

export const getName = (str: string) => {
  try {
    const parsed = str
      .match(nameRegex)
      ?.map((mention) => mention.replace("@", ""));
    return parsed;
  } catch (err) {
     console.error("Error occured in getName",err)
    return [];
  }
};

export const getEmoticons = (str: string) => {
  try {
    const parsed = str.match(emoticonRegex)?.map((x) => x.replace(/[()]/g, ""));
    return parsed;
  } catch (err) {
      console.error("Error occured in getEmoticons",err)
    return [];
  }
};

export const getLinks = async (str: string) => {
  try {
    const urls = str.match(urlRegex)?.map(async (url) => {
      const {title = ''} = await getTitle(url) || {};
      console.log()
      return { url, title };
    }) || [];
    const links = await Promise.all(urls as any);
    return links;
  } catch (err) {
     console.error("Error occured in getLinks",err)
    return [];
  }
};
