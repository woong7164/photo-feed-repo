import React, { useState } from 'react';

//views
import BookMark from './Bookmark';

/**
 *  사진 피드 단일요소 콤포넌트
 * @props feed : 사진 아이디
 */
const Feed = ({ feed, isOnlyBookmarked }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  return (
    <>
      {(isOnlyBookmarked ? !isDeleted : true) && (
        <li className="box" key={feed.id}>
          <span>
            <div className="profile">
              <img src={feed.profile_image_url} alt=""></img>
              <p>{feed.nickname}</p>
            </div>
            <img className="boxImg" src={feed.image_url} alt="" />
            <BookMark id={feed.id} setIsDeleted={setIsDeleted} />
          </span>
        </li>
      )}
    </>
  );
};

export default Feed;
