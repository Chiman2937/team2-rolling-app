// src/constants/fontMap.js

/**
 * @typedef {Object} FontStyle
 * @property {string} fontFamily   - 해당 폰트의 CSS font-family 값
 */

/**
 * FONT_STYLES: 각 폰트 이름 → 스타일 매핑
 * (COLOR_STYLES와 동일한 형태)
 *
 */

const FONT_STYLES = {
  Pretendard: {
    /* --font-family-base 가 없다면 즉시 'Pretendard', sans-serif 사용 */
    fontFamily: "var(--font-family-base, 'Pretendard', sans-serif)",
  },
  'Noto Sans': {
    fontFamily: "var(--font-family-noto-sans, 'Noto Sans', sans-serif)",
  },
  나눔명조: {
    fontFamily: "var(--font-family-nanum-myeongjo, 'Nanum Myeongjo', serif)",
  },
  '나눔손글씨 손편지체': {
    fontFamily: "var(--font-family-nanum-son-pyeonji, 'Nanum Son Pyeonji', cursive)",
  },
};

/**
 * FONT_OPTIONS: API 에 보낼 순수 문자열 배열
 * (키 순서가 유지되도록 Object.keys 사용)
 */
export const FONT_OPTIONS = /** @type {Array<keyof typeof FONT_STYLES>} */ (
  Object.keys(FONT_STYLES)
);

/**
 * FONT_DROPDOWN_ITEMS: Dropdown 컴포넌트에 넘길 아이템 배열
 * - value: API 로 전송할 문자열
 * - label: 목록에 보여줄 텍스트
 * - style: 각 아이템에 인라인 스타일로 적용될 CSS
 */
export const FONT_DROPDOWN_ITEMS = FONT_OPTIONS.map((fontName) => ({
  value: fontName,
  label: fontName,
  style: {
    fontFamily: FONT_STYLES[fontName].fontFamily,
  },
}));

/**
 * getFontStyle: 폰트 이름에 해당하는 스타일 객체를 반환
 * - 폰트 이름이 FONT_STYLES에 없으면 기본 폰트(Noto Sans) 스타일 반환
 * @param {*} fontName
 */

export function getFontStyle(fontName) {
  if (FONT_STYLES[fontName]) {
    return FONT_STYLES[fontName];
  }
  // 없다면 에러 던짐
  throw new Error(`존재하지 않는 폰트 : ${fontName}`);
}

/**
 * getFontFamily: 폰트 이름에 해당하는 fontFamily 값을 반환
 * - 폰트 이름이 FONT_STYLES에 없으면 기본 폰트(Noto Sans) 스타일 반환
 * @param {string} fontName
 * @returns {string}
 */
export function getFontFamily(fontName) {
  return getFontStyle(fontName).fontFamily;
}
