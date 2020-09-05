// react
import * as React from 'react';
import { useState, useEffect } from 'react';

//utils
import * as UTIL from '../../../utils/functions/loacalStorage';
import CONSTANTS from '../../../constants/key';

/**
 * 스크랩 컴포넌트
 * @props id : 사진 아이디
 */
const BookMark = ({ id }) => {
  //스크랩 여부
  const [isBookmarked, setIsBookmarked] = useState(false);

  /**
   * 스크랩 여부 판단
   * @param id : 사진 아이디
   */
  const getIsBookmarked = (id) => {
    const obj = UTIL.getLSBookmarkData();
    setIsBookmarked(id in obj && obj[id]);
  };

  /**
   * 스크랩 실행
   * @param id : 사진 아이디
   */
  const onClickBookmark = (id) => {
    const obj = UTIL.getLSBookmarkData();
    if (id in obj) {
      delete obj[id];
    } else {
      obj[id] = true;
    }
    localStorage.setItem(CONSTANTS.LS_BOOKMARK_KEY, JSON.stringify(obj));

    //로컬스토리지 저장 후 isBookmarked 변경
    getIsBookmarked(id);
  };

  /**
   * id 변경시 값이 유효할 떄 스크랩여부 판단
   */
  useEffect(() => {
    if (id) {
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
        <img src="/icons/icon_dib_off.svg" alt="스크랩 하기" />
        <img src="/icons/con_dib_on.svg" alt="스크랩 삭제하기" />
      </button>
    </>
  );
};

export default BookMark;
