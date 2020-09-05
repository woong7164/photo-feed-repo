import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

//utils
import URL from '$API/url';
import * as UTIL from '$UTILS/functions/loacalStorage';
import useInterSection from '$UTILS/hooks/useIntersection';

//views
import Feed from './components/Feed';

//css
import '$ASSETS/styles/styles.css';

/*
  사진 피드 목록
*/
const FeedHome = () => {
  //마지막 페이지여부
  const [isLast, setIsLast] = useState(false);

  //사진 피드 데이터
  const [feedData, setFeedData] = useState([
    {
      id: '',
      image_url: '',
      nickname: '',
      profile_image_url: '',
    },
  ]);

  //페이지
  const [page, setPage] = useState(1);

  //스크랩만보기 활성여부
  const [isOnlyBookmarked, setIsOnlyBookmarked] = useState(false);

  //뷰포트에서 요소가 감지된다면 다음 페이지 불러온다
  const [_, setRef] = useInterSection(async (entry, observer) => {
    observer.unobserve(entry.target);
    setPage((states) => states + 1);
  }, {});

  //스크랩된 이미지인지 확인
  const isBookmarkedData = (id) => {
    const obj = UTIL.getLSBookmarkData(id);
    return id in obj && obj[id];
  };

  //page 값이 변할때마다 사진 피드 데이터 불러오기 및 데이터 셋팅
  useEffect(() => {
    const getFeedData = async (page) => {
      try {
        //사진 리스트 정보 받기
        const response = await axios.get(URL.GET_PHOTO_LIST(page));
        if (response.status === 200 && Array.isArray(response.data)) {
          const feed = response.data;

          //데이터가 있으면 데이터 셋팅
          if (feed.length > 0) {
            if (page === 1) {
              setFeedData(feed);
            } else {
              setFeedData((states) => states.concat(feed));
            }

            //데이터가 빈값이면 중단
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
                    <Feed isOnlyBookmarked={isOnlyBookmarked} feed={feed} />
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
