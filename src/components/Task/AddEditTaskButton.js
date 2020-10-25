import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import Button from '../Button';
import Textarea from '../Textarea';
import './AddEditTaskButton.scss';

export default function AddEditTaskButton(props) {
  const { task, createTask } = props;
  const [description, setDescription] = useState(task?.task ?? '');
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);

  const onCreateTasksClicked = useCallback(
    (e) => {
      e.preventDefault();
      createTask({ task: description });
      setDescription('');
      setIsEditing(false);
    },
    [createTask, description],
  );

  useLayoutEffect(() => {
    if (isEditing) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="AddEditTaskButton">
      {isEditing ? (
        <form
          className="AddEditTaskButton--form"
          onSubmit={onCreateTasksClicked}
        >
          <Textarea
            ref={textareaRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onSubmit={onCreateTasksClicked}
          />
          <div className="AddEditTaskButton--actions-container">
            <Button type="submit" className="AddEditTaskButton--add success">
              Add task
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
      ) : (
        <Button
          className="AddEditTaskButton--button outline"
          onClick={() => setIsEditing(true)}
        >
          <ion-icon name="add-outline"></ion-icon> Add another task
        </Button>
      )}
    </div>
  );
}
