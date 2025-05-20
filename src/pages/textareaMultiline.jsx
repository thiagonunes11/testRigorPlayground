import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../styles/textareaMultiline.css';
import '../styles/homePage.css'

const TextareaMultiline = () => {
  const [text, setText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    setCharCount(value.length);
    setLineCount(value.split('\n').length);
  };

  return (
    <Layout
      title="Textarea Multiline"
      description="Validate multiline input capabilities."
    >
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="textarea-container">
            <textarea
              className="form-control multiline-textarea"
              value={text}
              onChange={handleTextChange}
              placeholder="Type multiple lines of text here..."
              rows={10}
            />
            <div className="textarea-stats">
              <span>Characters: {charCount}</span>
              <span>Lines: {lineCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextareaMultiline;