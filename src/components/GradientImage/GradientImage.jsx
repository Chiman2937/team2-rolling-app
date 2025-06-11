// src/components/GradientImage/GradientImage.jsx
import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './GradientImage.module.scss';

/**
 * GradientImage
 *  - 로딩 중엔 그라디언트 애니메이션 플레이스홀더
 *  - 이미지가 onLoad 되면 fade-in, 플레이스홀더는 fade-out
 *
 * @param {Object}   props
 * @param {string}   props.src        실제 이미지 URL
 * @param {string}   [props.alt]      대체 텍스트
 * @param {string}   [props.className] 추가 클래스
 * @param {Object}   [props.style]    추가 스타일
 * @param {Function} [props.onLoaded] 이미지 로딩 완료 시 호출될 콜백
 * @param {Object}   [props.rest]     기타 <img> 속성
 */
export default function GradientImage({
  src,
  alt = '',
  className = '',
  style = {},
  onClick,
  onLoaded,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = (event) => {
    setLoaded(true);
    if (typeof onLoaded === 'function') {
      onLoaded(event);
    }
  };

  return (
    <div
      className={classNames(className, styles['gradient-image'], {
        [styles['gradient-image--loaded']]: loaded,
      })}
      style={style}
      onClick={onClick}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          className={styles['gradient-image__img']}
          onLoad={handleLoad}
          {...rest}
        />
      )}
    </div>
  );
}
