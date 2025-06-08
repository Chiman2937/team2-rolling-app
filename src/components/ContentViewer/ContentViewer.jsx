// src/components/ContentViewer/ContentViewer.jsx

import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';

/**
 * 안전한 HTML 뷰어
 *
 * @param {Object} props
 * @param {string} props.content     - 렌더링할 HTML 문자열
 * @param {number} [props.maxLength] - 최대 텍스트 길이(초과 시 말줄임). 기본값: 무제한
 * @param {string} [props.className] - 최외곽 wrapper에 추가할 CSS 클래스
 * @param {React.CSSProperties} [props.style] - wrapper에 추가할 인라인 스타일
 */
export default function ContentViewer({ content = '', maxLength, className = '', style = {} }) {
  // 1) XSS 방지용으로 HTML 소독
  const sanitizedHtml = useMemo(() => DOMPurify.sanitize(content), [content]);

  // 2) 텍스트만 추출해서 maxLength 초과 시 말줄임 처리
  const displayedHtml = useMemo(() => {
    if (typeof maxLength !== 'number') {
      return sanitizedHtml;
    }
    const div = document.createElement('div');
    div.innerHTML = sanitizedHtml;
    const text = div.textContent || '';
    if (text.length <= maxLength) {
      return sanitizedHtml;
    }
    // 포맷 유지 없이 텍스트만 슬라이스하여 말줄임
    return `<p>${text.slice(0, maxLength)}…</p>`;
  }, [sanitizedHtml, maxLength]);

  return (
    <div
      className={className}
      style={{
        width: '100%',
        overflow: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        ...style,
      }}
    >
      {/* sanitize → truncate된 HTML만 주입 */}
      <div className='viewer-content' dangerouslySetInnerHTML={{ __html: displayedHtml }} />
    </div>
  );
}
