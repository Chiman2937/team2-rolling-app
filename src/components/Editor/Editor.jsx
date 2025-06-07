// src/components/Editor/Editor.jsx

import React, { useEffect, useMemo } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import ToolbarPlugin from './Toolbar';
import styles from './Editor.module.scss';

/**
 * 에디터 내용 변경 시 HTML을 상위(onUpdate)로 전달
 */
function OnEditorChange({ onUpdate }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const remove = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const html = $generateHtmlFromNodes(editor);
        console.log('현재 HTML:', html);
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
 */
export default function Editor({ content = '', onUpdate }) {
  // 1) theme: 텍스트 포맷 → CSS 클래스 매핑
  const theme = {
    text: {
      bold: styles.editor__textBold,
      italic: styles.editor__textItalic,
      underline: styles.editor__textUnderline,
      strikethrough: styles.editor__textStrikethrough,
    },
  };

  // 2) initialEditorState: content가 있으면 파싱해서 노드 트리로 초기화
  const initialEditorState = useMemo(() => {
    if (!content) return null;
    const dom = new DOMParser().parseFromString(content, 'text/html');
    return (editor) => $generateNodesFromDOM(editor, dom);
  }, [content]);

  // 3) initialConfig: LexicalComposer에 전달할 초기 설정
  const initialConfig = {
    namespace: 'MessageEditor',
    theme,
    initialEditorState,
    onError(error) {
      console.error('Lexical Error:', error);
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />

      {/* RichTextPlugin 하나로 bold/italic/underline/strikethrough 지원 */}
      <RichTextPlugin
        contentEditable={<ContentEditable className={styles.editor__content} />}
        placeholder={<div className={styles.editor__placeholder}>내용을 입력해 주세요…</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />

      <HistoryPlugin />
      <OnEditorChange onUpdate={onUpdate} />
    </LexicalComposer>
  );
}
