import {EditorState, RichUtils, DraftEditorCommand} from "draft-js";
import React, {useEffect, useState} from "react";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {convertFromHTML, convertToHTML} from "draft-convert";

type TextEditorProp = {
  value: string;
  onChange: (value: string) => void;
}

export const TextEditor = (props: TextEditorProp) => {
  const { onChange, value } = props;

  const [state, setState] = useState(EditorState.createEmpty());

  const handleKeyCommand = (command: DraftEditorCommand, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setState(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  useEffect(() => {
    const html = convertToHTML(state.getCurrentContent());
    onChange(html)
  }, [state]);

  useEffect(() => {
    const text = convertFromHTML(value);
    const newState = EditorState.createWithContent(text);
    setState(newState);
  }, []);

  return (
    <div>
      <Editor
        defaultEditorState={state}
        editorState={state}
        onEditorStateChange={setState}
        handleKeyCommand={handleKeyCommand}
        toolbar={{

        }}
        wrapperClassName="editor-wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="editor-toolbar-class"
      />
    </div>
  );
};
