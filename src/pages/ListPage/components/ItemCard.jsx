import { Link } from 'react-router-dom';
import styles from './ItemCard.module.scss';
import ShowAvatars from './ShowAvatars';
import ShowEmoji from './ShowEmoji';
import { getBackgroundStylesFromPostData } from '@/utils/getBackgroundStylesFromPostData';
import { getContentStylesFromPostData } from '@/utils/getContentStylesFromPostData';
import { getIsCardDarkFromPostData } from '../../../utils/getIsCardDarkFromPostData';

const ItemCard = ({
  id,
  name,
  backgroundColor,
  backgroundImageURL,
  messageCount,
  recentMessages = [],
  topReactions = [],
}) => {
  // 배경 설정: 이미지가 있으면 이미지, 없으면 컬러
  const backgroundStyle = getBackgroundStylesFromPostData({ backgroundColor, backgroundImageURL });

  // 밝은 색: 검정 텍스트
  // 어두운 색: 하얀색 텍스트
  // 이미지: 하얀색 텍스트 / 어두운색 overlay 적용
  const contentStyle = getContentStylesFromPostData(backgroundImageURL);

  //카드가 밝은 색인지 어두운 색인지 판별
  //이미지: true
  //어두운 색: true
  //밝은 색: false
  const isCardDark = getIsCardDarkFromPostData(backgroundImageURL);

  //isCardDark true: 밝은색 선
  //isCardDark false: 어두운색 선
  const myDivClassName = isCardDark
    ? `${styles['item-card__myDiv']} ${styles['card-dark']}`
    : `${styles['item-card__myDiv']} ${styles['card-light']}`;

  return (
    <Link to={`/post/${id}`} className={styles['item-card__link']}>
      <div className={styles['item-card']} style={backgroundStyle}>
        {/* 밝은조명 효과 */}
        <div className={styles['item-card__shinning']} style={isCardDark ? { opacity: 0.4 } : {}} />
        {/* 어두운 음영 효과 */}
        <div className={styles['item-card__shadow']} style={isCardDark ? { opacity: 0.4 } : {}} />
        <div className={styles['item-card__content']} style={contentStyle}>
          <h3 className={styles['item-card__title']}>To. {name}</h3>

          <div className={styles['item-card__avatars-area']}>
            {/* 프로필 아바타 영역 (최대 3) */}

            <ShowAvatars
              profiles={recentMessages}
              totalCount={messageCount}
              loading={false}
              error={null}
            />
          </div>

          <p className={styles['item-card__meta']}>
            {!messageCount ? (
              `아직 받은 메세지가 없어요🥲`
            ) : (
              <span>
                <strong style={{ fontWeight: 700 }}>{messageCount}</strong>명이 작성했어요!
              </span>
            )}
          </p>

          {!messageCount ? (
            <div style={{ paddingBottom: '30px' }}>롤링 페이퍼 꾸미러가기</div>
          ) : (
            <div className={myDivClassName} />
          )}

          {/* 반응 이모지 영역 (최대 3) */}

          <div className={styles['item-card__emojis-area']}>
            <ShowEmoji emojis={topReactions} />
          </div>
        </div>
      </div>
    </Link>
  );
};

const Skeleton = () => {
  return (
    <div className={styles['skeleton-card']}>
      <div className={styles['skeleton-card__content']}>
        <div className={styles['skeleton-card__title']} />
        <div className={styles['skeleton-card__profile']} />
        <div className={styles['skeleton-card__meta']} />
        <div className={styles['skeleton-card__myDiv']} />
        <div className={styles['skeleton-card__emojis-area']}>
          {new Array(3).fill(0).map((_, i) => (
            <div key={i} className={styles['skeleton-card__emoji']} />
          ))}
        </div>
      </div>
    </div>
  );
};

ItemCard.skeleton = Skeleton;

export default ItemCard;
