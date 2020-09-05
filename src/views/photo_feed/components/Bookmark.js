// react
import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";

const BookMark = ({ bookmarkFlag, onClickBookMark, cd }) => {
  return (
    <button
      onClick={() => onClickBookMark(bookmarkFlag, cd)}
      type="button"
      className={`btnDibs ${bookmarkFlag === "Y" ? "active" : ""}`}
    >
      <img
        src="/icons/icon_dib_off.svg"
        alt="찜 리스트에 추가하기"
      />
      <img
        src="/icons/con_dib_on.svg"
        alt="찜 리스트에서 삭제하기"
      />
    </button>
  );
};

export default BookMark;
