// src/components/Editor/Editor.jsx

import React, { useEffect, useMemo } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { $getRoot } from 'lexical';
import ToolbarPlugin from './Toolbar';
import styles from './Editor.module.scss';
import { getFontFamily } from '@/constants/fontMap';

/**
 * 에디터 내용 변경 시 HTML을 상위(onUpdate)로 전달
 */
function OnEditorChange({ onUpdate }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const remove = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const html = $generateHtmlFromNodes(editor);
        onUpdate(html);
      });
    });
    return remove;
  }, [editor, onUpdate]);

  return null;
}

/**
 * Editor 컴포넌트
 * @param {string} content - 초기 HTML
 * @param {(html: string) => void} onUpdate - 변경된 HTML 콜백
 * @param {React.CSSProperties} [style] - 에디터 스타일
 * @param {string} [font='Pretendard'] - 에디터 폰트 (기본: Pretendard)
 * @param {string} [className=''] - 최외곽 wrapper에 추가할 CSS 클래스
 * @param {boolean} [readOnly=false] - 읽기 전용 모드 여부
 */
export default function Editor({
  content = '',
  onUpdate = () => {},
  style = {},
  readOnly = false,
  font = 'Pretendard',
  className = '',
}) {
  // 1) theme: 텍스트 포맷 → CSS 클래스 매핑
  const theme = {
    text: {
      bold: styles.editor__textBold,
      italic: styles.editor__textItalic,
      underline: styles.editor__textUnderline,
      strikethrough: styles.editor__textStrikethrough,
    },
  };
  console.log('foooont', font, 'getFontFamily(font)', getFontFamily(font));

  // 2) initialEditorState: content가 있으면 파싱해서 DOM => 노드 트리로 초기화
  const initialEditorState = useMemo(() => {
    if (!content) return null;
    const dom = new DOMParser().parseFromString(content, 'text/html');

    return (editor) => {
      editor.update(() => {
        const nodes = $generateNodesFromDOM(editor, dom); // DOM에서 노드 생성
        const root = $getRoot(); // 현재 에디터의 루트 노드 가져오기
        root.clear(); // 기존 내용 삭제 (필요 없으면 제거)
        root.append(...nodes); // 파싱된 노드 삽입
      });
    };
  }, [content]);

  // 3) initialConfig: LexicalComposer에 전달할 초기 설정
  const initialConfig = {
    namespace: 'MessageEditor', // 네임스페이스 설정
    theme, // 에디터 테마 설정
    editorState: initialEditorState, // 초기 에디터 상태 설정
    editable: !readOnly, // 읽기 전용 모드 설정
    onError(error) {
      console.error('Lexical Error:', error);
    },
  };
  console.log('font', font, 'getFontFamily(font)', getFontFamily(font));
  return (
    <div
      className={className}
      style={{
        fontFamily: getFontFamily(font),
        ...style,
      }}
    >
      <LexicalComposer initialConfig={initialConfig}>
        {!readOnly && <ToolbarPlugin />}

        {/* RichTextPlugin 하나로 bold/italic/underline/strikethrough 지원 */}
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              style={{ fontFamily: getFontFamily(font) }}
              className={styles.editor__content}
            />
          }
          placeholder={
            readOnly ? null : (
              <div className={styles.editor__placeholder}>내용을 입력해 주세요…</div>
            )
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        {!readOnly && <HistoryPlugin />}
        {!readOnly && <OnEditorChange onUpdate={onUpdate} />}
      </LexicalComposer>
    </div>
  );
}
