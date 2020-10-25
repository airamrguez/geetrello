import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import Button from '../Button';
import Textarea from '../Textarea';
import './AddEditButton.scss';

export default function AddEditButton(props) {
  const {
    initialDescription = '',
    foldedButtonText = 'Add item',
    submitButtonText = 'Submit',
    onAddClick,
  } = props;
  const [description, setDescription] = useState(initialDescription);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onAddClick(description);
      setDescription('');
      setIsEditing(false);
    },
    [onAddClick, description],
  );

  useLayoutEffect(() => {
    if (isEditing) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="AddEditButton">
      {isEditing ? (
        <div className="AddEditButton--container">
          <form className="AddEditButton--form" onSubmit={onSubmit}>
            <Textarea
              ref={textareaRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onSubmit={onSubmit}
            />
            <div className="AddEditButton--actions-container">
              <Button type="submit" className="AddEditButton--add success">
                {submitButtonText}
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                type="button"
                className="outline"
              >
                <ion-icon name="close-outline"></ion-icon>
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button
          className="AddEditButton--button outline"
          onClick={() => setIsEditing(true)}
        >
          <ion-icon name="add-outline"></ion-icon> {foldedButtonText}
        </Button>
      )}
    </div>
  );
}
