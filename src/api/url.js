const makeUrlPath = (path, page) => {
  if (page > 0) {
    return `${path}/page_${page}.json`;
  }
  return `${path}/page_1.json`;
};

const PATH = "/bucketplace-coding-test/cards";

const URL = {
  GET_PHOTO_LIST: (page) => {
    return makeUrlPath(PATH, page);
  }
};

export default URL;
