import React from 'react';
import PropTypes from 'prop-types';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import IconButton from '@mui/material/IconButton';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import './RichTextEditor.css';

function RichTextEditor({ label, value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
    ],
    content: value,
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML());
    },
  });

  return (
    <div className="rich-text-editor">
      <div className="rich-text-editor__label">{label}</div>
      <div className="rich-text-editor__toolbar">
        <IconButton
          size="small"
          onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }}
          className={editor?.isActive('bold') ? 'is-active' : ''}
        >
          <FormatBoldIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }}
          className={editor?.isActive('italic') ? 'is-active' : ''}
        >
          <FormatItalicIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={editor?.isActive('underline') ? 'is-active' : ''}
        >
          <FormatUnderlinedIcon fontSize="small" />
        </IconButton>
      </div>
      <EditorContent editor={editor} className="rich-text-editor__content" />
    </div>
  );
}

RichTextEditor.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

RichTextEditor.defaultProps = {
  label: '',
  value: '',
};

export default RichTextEditor;
