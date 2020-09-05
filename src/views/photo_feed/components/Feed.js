import React from 'react';

//views
import BookMark from './Bookmark';

/**
 *  사진 피드 단일요소 콤포넌트
 * @props feed : 사진 아이디
 */
const Feed = ({ feed }) => {
  return (
    <li className="box" key={feed.id}>
      <span>
        <div className="profile">
          <img src={feed.profile_image_url} alt=""></img>
          <p>{feed.nickname + '/' + feed.id}</p>
        </div>
        <img className="boxImg" src={feed.image_url} alt="" />
        <BookMark id={feed.id} />
      </span>
    </li>
  );
};

export default Feed;
