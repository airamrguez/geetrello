import React, { useCallback, useState } from 'react';
import Textarea from '../Textarea';
import Button from '../Button';
import './Task.scss';

export default function Task(props) {
  const { task, loading, error, updateTask, deleteTask } = props;
  const [description, setDescription] = useState(task?.task ?? '');

  const onEditClick = useCallback(() => {
    updateTask(task.id, { task: description });
  }, [description, task.id, updateTask]);

  const onDeleteClick = useCallback(() => {
    deleteTask(task.id);
  }, [deleteTask, task.id]);

  return (
    <>
      <div className="Task">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onSubmit={onEditClick}
        />
        <div>
          <Button className="outline" onClick={onEditClick}>
            <ion-icon name="pencil-outline"></ion-icon>
          </Button>
          <Button className="outline" onClick={onDeleteClick}>
            <ion-icon name="trash-outline"></ion-icon>
          </Button>
        </div>
      </div>
      {loading && <div>Loading task ...</div>}
      {error && <div>{getTaskErrorMessage(error)}</div>}
    </>
  );
}

function getTaskErrorMessage(error) {
  switch (error.status) {
    case 401:
      return 'Not authorized to access this task';
    case 500:
      return 'Internal server error';
    default:
      return 'An unexpected error ocurred';
  }
}
