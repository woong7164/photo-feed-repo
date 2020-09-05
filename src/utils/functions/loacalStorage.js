import CONSTANTS from '../../constants/key';

export const getLSBookmarkData = () => {
  const bkData = localStorage.getItem(CONSTANTS.LS_BOOKMARK_KEY);
  let obj = bkData === null ? {} : JSON.parse(bkData);
  return obj;
};
