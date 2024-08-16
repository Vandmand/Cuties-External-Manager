export const convertToWikiLink = (endpoint: string) => {
  const convertedEndpoint = endpoint.split(" ").join("_");

  return `https://escapefromtarkov.fandom.com/wiki/${convertedEndpoint}`;
};
