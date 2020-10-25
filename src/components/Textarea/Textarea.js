import React, { useCallback, forwardRef, createRef } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import classNames from 'classnames';
import './Textarea.scss';

const Textarea = forwardRef((props, textareaRef) => {
  const { onSubmit, className, ...rest } = props;
  textareaRef = textareaRef ?? createRef(null);

  const onKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        onSubmit(e);
        textareaRef.current.blur();
      }
    },
    [onSubmit, textareaRef],
  );

  return (
    <TextareaAutosize
      className={classNames('Textarea', className)}
      ref={textareaRef}
      {...rest}
      onKeyDown={onKeyDown}
      style={{ minHeight: '100%', padding: 10 }}
    />
  );
});

export default Textarea;
