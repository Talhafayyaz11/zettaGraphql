import { getName, getEmoticons, getLinks } from "./utils";

const records = async (_, { message = "" }: { message: string }) => {
  const mentions = getName(message);
  const emoticons = getEmoticons(message);
  const links = await getLinks(message);

  return {
    mentions,
    emoticons,
    links,
  };
};

export { records };
