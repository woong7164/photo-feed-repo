// react
import * as React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';

import * as UTIL from '../../../utils/functions/loacalStorage';

const BookMark = ({ id, isOnlyBookmarked }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const LS_BOOKMARK_KEY = 'bk_data';

  const getIsBookmarked = (id) => {
    const obj = UTIL.getLSBookmarkData();
    setIsBookmarked(id in obj && obj[id]);
  };

  const onClickBookmark = (id) => {
    const obj = UTIL.getLSBookmarkData();
    if (id in obj) {
      delete obj[id];
    } else {
      obj[id] = true;
    }
    localStorage.setItem(LS_BOOKMARK_KEY, JSON.stringify(obj));
    getIsBookmarked(id);
  };

  useEffect(() => {
    if (id) {
      console.log('id  ', id);
      getIsBookmarked(id);
    }
  }, [id]);

  return (
    <>
      <button
        onClick={() => onClickBookmark(id)}
        type="button"
        className={`btnDibs ${isBookmarked ? 'active' : ''}`}
      >
        <img src="/icons/icon_dib_off.svg" alt="찜 리스트에 추가하기" />
        <img src="/icons/con_dib_on.svg" alt="찜 리스트에서 삭제하기" />
      </button>
    </>
  );
};

export default BookMark;
