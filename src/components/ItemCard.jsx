import styles from '@/components/ItemCard.module.scss';
import defaultImg from '@/assets/images/default_img_profile.png';
import Badge from '@/components/Badge.jsx';

function ItemCard() {
  return (
    <section className={styles['card']}>
      <div className={styles['card__main']}>
        <div className={styles['card__author']}>
          <img src={defaultImg} className={styles['card__author-image']} alt='프로필 이미지' />
          <div className={styles['card__author-info']}>
            <div className={styles['card__author-text']}>
              From. <div className={styles['card__author-name']}>김동운</div>
            </div>
            <Badge relationType='동료' />
          </div>
        </div>
        <hr className={styles['card__divider']} />
        <div className={styles['card__content']}>
          코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요! 코로나가 또다시
          기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요! 코로나가 또다시 기승을 부리는
          요즘이네요. 건강, 체력 모두 조심 또 하세요! 코로나가 또다시 기승을 부리는 요즘이네요.
          건강, 체력 모두 조심 또 하세요! 코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두
          조심 또 하세요!
        </div>
      </div>
      <div className={styles['card__date']}>2023.07.08</div>
    </section>
  );
}

export default ItemCard;
