export const generateSlug = (text) => {
  text = text.replace(/&/g, "and").replace(/\//g, "or");
  text = text.toLowerCase();
  text = text.replace(/[\s-]+/g, "-");
  return text;
};

export const getStylistWebURL = ({
  industry = "",
  occupation = "",
  userName = "",
}) => {
  if (!(industry && occupation && userName)) {
    return undefined;
  }

  const category = generateSlug(industry);
  const subcategory = generateSlug(occupation);

  const iosURL = `${API_SERVER}/${category}/${subcategory}/${userName}`;
  const androidURL = `${HTTPS}://${WWW}.${BASE_DOMAIN}/${category}/${subcategory}/${userName}`;

  return Platform.OS === "ios" ? iosURL : androidURL;
};
