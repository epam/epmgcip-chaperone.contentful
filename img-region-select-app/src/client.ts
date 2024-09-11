import { createClient } from "contentful";

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE || "",
  accessToken:
    process.env.REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN || "",
});

export default client;
