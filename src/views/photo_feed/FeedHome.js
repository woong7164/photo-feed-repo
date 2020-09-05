import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import URL from '../../api/url';
import * as UTIL from '../../utils/functions/loacalStorage';
import useInterSection from '../../utils/hooks/useIntersection';

import BookMark from './components/Bookmark';

import '../../assets/styles/styles.css';

const FeedHome = () => {
  const [isLast, setIsLast] = useState(false);
  const [feedData, setFeedData] = useState([
    {
      id: '',
      image_url: '',
      nickname: '',
      profile_image_url: '',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isOnlyBookmarked, setIsOnlyBookmarked] = useState(false);

  const [_, setRef] = useInterSection(async (entry, observer) => {
    observer.unobserve(entry.target);
    setIsLoading(true);
    setPage((states) => states + 1);
  }, {});

  const isBookmarkedData = (id) => {
    const obj = UTIL.getLSBookmarkData(id);
    return id in obj && obj[id];
  };

  useEffect(() => {
    const getFeedData = async (page) => {
      setIsLoading(true);
      try {
        const response = await axios.get(URL.GET_PHOTO_LIST(page));
        if (response.status === 200 && Array.isArray(response.data)) {
          const feed = response.data;
          setIsLoading(false);
          if (feed.length > 0) {
            if (page === 1) {
              setFeedData(feed);
            } else {
              setFeedData((states) => states.concat(feed));
            }
            console.log('feed', feedData);
          } else {
            setIsLast(true);
          }
        } else {
          alert('API 데이터 적합성 오류');
        }
      } catch (e) {
        alert('API 통신 오류');
      }
    };

    getFeedData(page);
  }, [page]);

  return (
    <section className="contents">
      <div className="wrapper">
        <div className="checkbox">
          <label>
            <input
              onChange={() => setIsOnlyBookmarked(!isOnlyBookmarked)}
              type="checkbox"
            />
            <span>스크랩한 것만 보기</span>
          </label>
        </div>
        <div className="feedWrapper">
          <ul>
            {feedData.map((feed, i) => {
              const isActive = isOnlyBookmarked
                ? isBookmarkedData(feed.id)
                : true;
              return (
                <>
                  {isActive && (
                    <li className="box" key={feed.id}>
                      <span>
                        <div className="profile">
                          <img src={feed.profile_image_url} alt=""></img>
                          <p>{feed.nickname + '/' + feed.id}</p>
                        </div>
                        <img className="boxImg" src={feed.image_url} alt="" />
                        <BookMark
                          id={feed.id}
                          isOnlyBookmarked={isOnlyBookmarked}
                        />
                      </span>
                    </li>
                  )}
                  <div
                    ref={i === feedData.length - 1 && !isLast ? setRef : null}
                  ></div>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FeedHome;
