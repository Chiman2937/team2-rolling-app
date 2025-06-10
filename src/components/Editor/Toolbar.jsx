// src/components/Editor/Toolbar.jsx

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import ToolbarButton from './components/ToolbarButton';
import styles from './Toolbar.module.scss';
// Lexical 관련 커맨드
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';

// SVG 아이콘을 import (Vite, CRA 환경에서 URL 형태로 반환됨)
import UndoIcon from '@/assets/editorIcons/icon_undo_active.svg';
import UndoInactiveIcon from '@/assets/editorIcons/icon_undo_inactive.svg';
import RedoIcon from '@/assets/editorIcons/icon_redo_active.svg';
import RedoInactiveIcon from '@/assets/editorIcons/icon_redo_inactive.svg';
import BoldIcon from '@/assets/editorIcons/type-bold.svg';
import ItalicIcon from '@/assets/editorIcons/type-italic.svg';
import UnderlineIcon from '@/assets/editorIcons/type-underline.svg';
import StrikethroughIcon from '@/assets/editorIcons/type-strikethrough.svg';
import AlignLeftIcon from '@/assets/editorIcons/text-left.svg';
import AlignCenterIcon from '@/assets/editorIcons/text-center.svg';
import AlignRightIcon from '@/assets/editorIcons/text-right.svg';
import JustifyIcon from '@/assets/editorIcons/justify.svg';

/**
 * Divider 컴포넌트
 */
function Divider() {
  return <div className={styles.toolbar__divider} />;
}

/**
 * ToolbarPlugin 컴포넌트
 * - Lexical 에디터의 툴바를 구현
 * - 포맷 상태(볼드, 이탤릭 등)를 관리하고 버튼 클릭 시 해당 커맨드를 실행
 * - 에디터 상태에 따라 Undo/Redo 버튼 활성화/비활성화 처리
 * - 선택 영역이 변경될 때마다 포맷 상태를 갱신
 * @returns {JSX.Element}
 */

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);

  // toolbar 상태
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  // 선택된 영역의 포맷 상태를 확인하여 Toolbar 버튼 활성화/비활성화 처리
  const updateToolbarState = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);

  useEffect(() => {
    // Lexical 에디터 이벤트 리스너 등록
    return mergeRegister(
      // 에디터 상태가 변경될 때마다 포맷 상태를 갱신
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbarState();
        });
      }),

      // 선택 영역이 바뀔 때마다 포맷 상태를 갱신
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        //(_payload, _editor) => {
        () => {
          updateToolbarState();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),

      // undo 가능한지 여부
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),

      // redo 가능한지 여부
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, updateToolbarState]);

  return (
    <div className={styles.toolbar} ref={toolbarRef}>
      {/** Undo 버튼 **/}
      <ToolbarButton
        icon={UndoIcon}
        inactiveIcon={UndoInactiveIcon}
        label='Undo'
        disabled={!canUndo}
        editor={editor}
        command={UNDO_COMMAND}
        commandArg={undefined}
        style={{ padding: '7px 0' }}
      />

      {/** Redo 버튼 **/}
      <ToolbarButton
        icon={RedoIcon}
        inactiveIcon={RedoInactiveIcon}
        label='Redo'
        disabled={!canRedo}
        editor={editor}
        command={REDO_COMMAND}
        commandArg={undefined}
        style={{ padding: '7px 0' }}
      />

      <Divider />

      {/** Bold 버튼 **/}
      <ToolbarButton
        icon={BoldIcon}
        label='Bold'
        editor={editor}
        command={FORMAT_TEXT_COMMAND}
        commandArg='bold'
        active={isBold}
      />

      {/** Italic 버튼 **/}
      <ToolbarButton
        icon={ItalicIcon}
        label='Italic'
        editor={editor}
        command={FORMAT_TEXT_COMMAND}
        commandArg='italic'
        active={isItalic}
      />

      {/** Underline 버튼 **/}
      <ToolbarButton
        icon={UnderlineIcon}
        label='Underline'
        editor={editor}
        command={FORMAT_TEXT_COMMAND}
        commandArg='underline'
        active={isUnderline}
      />

      {/** Strikethrough 버튼 **/}
      <ToolbarButton
        icon={StrikethroughIcon}
        label='Strikethrough'
        editor={editor}
        command={FORMAT_TEXT_COMMAND}
        commandArg='strikethrough'
        active={isStrikethrough}
      />

      <Divider />

      {/** Left Align 버튼 **/}
      <ToolbarButton
        icon={AlignLeftIcon}
        label='Align Left'
        editor={editor}
        command={FORMAT_ELEMENT_COMMAND}
        commandArg='left'
      />

      {/** Center Align 버튼 **/}
      <ToolbarButton
        icon={AlignCenterIcon}
        label='Align Center'
        editor={editor}
        command={FORMAT_ELEMENT_COMMAND}
        commandArg='center'
      />

      {/** Right Align 버튼 **/}
      <ToolbarButton
        icon={AlignRightIcon}
        label='Align Right'
        editor={editor}
        command={FORMAT_ELEMENT_COMMAND}
        commandArg='right'
      />

      {/** Justify Align 버튼 **/}
      <ToolbarButton
        icon={JustifyIcon}
        label='Justify'
        editor={editor}
        command={FORMAT_ELEMENT_COMMAND}
        commandArg='justify'
      />
    </div>
  );
}
