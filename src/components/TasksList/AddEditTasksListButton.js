import React, { useCallback, useState } from 'react';
import Button from '../Button';
import './AddEditTasksListButton.scss';

export default function AddEditTasksListButton(props) {
  const { createTasksList } = props;
  const [tasksListName, setTasksListName] = useState('');

  const onCreateTasksClicked = useCallback(
    (e) => {
      e.preventDefault();
      createTasksList({ name: tasksListName });
      setTasksListName('');
    },
    [createTasksList, tasksListName],
  );

  return (
    <form className="AddEditTasksListButton" onSubmit={onCreateTasksClicked}>
      <input
        value={tasksListName}
        onChange={(e) => setTasksListName(e.target.value)}
      />
      <Button className="AddEditTasksListButton--submit" type="submit">
        Add a tasks list
      </Button>
    </form>
  );
}
