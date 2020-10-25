import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import AddEditButton from '../AddEditButton/AddEditButton';
import { TasksList, useTasksLists } from '../TasksList';
import './Board.scss';

export default function BoardPage() {
  const {
    tasksLists,
    loading,
    error,
    createTasksList,
    updateTasksList,
    deleteTasksList,
    deleteAllTasks,
  } = useTasksLists();
  const addEditButtonRef = useRef(null);

  const sortedTasksLists = useMemo(() => sortTasksLists(tasksLists), [
    tasksLists,
  ]);

  useEffect(() => {
    // When everything is empty in the board then show the textarea opened
    // instead of showing the Add button.
    if (tasksLists?.length === 0) {
      addEditButtonRef.current.toggleEditing(true);
    }
  }, [tasksLists]);

  const onAddClick = useCallback(
    (tasksListName) => {
      createTasksList({ name: tasksListName });
    },
    [createTasksList],
  );

  return (
    <>
      <div className="Board">
        {sortedTasksLists.map((tasksList) => (
          <TasksList
            key={`task-${tasksList.id}`}
            tasksList={tasksList}
            updateTasksList={updateTasksList}
            deleteTasksList={deleteTasksList}
            deleteAllTasks={deleteAllTasks}
          />
        ))}
        <div className="Board--add-edit-button">
          <AddEditButton
            ref={addEditButtonRef}
            foldedButtonText="Add another list"
            submitButtonText="Add list"
            onAddClick={onAddClick}
          />
        </div>
      </div>
      {loading && <div>Loading list of tasks ...</div>}
      {error && <div>{getTasksListErrorMessage(error)}</div>}
    </>
  );
}

// Sorting by id but createdAt should be preferred.
// createdAt is not returning the date with time so that's
// why id is used instead.
function sortTasksLists(tasksLists) {
  return tasksLists ? tasksLists.sort((a, b) => a.id - b.id) : [];
}

function getTasksListErrorMessage(error) {
  switch (error.status) {
    case 401:
      return 'Not authorized to tasks list content';
    case 500:
      return 'Internal server error';
    default:
      return 'An unexpected error ocurred';
  }
}
