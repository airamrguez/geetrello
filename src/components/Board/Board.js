import React, { useMemo } from 'react';
import { TasksList, AddEditTasksListButton, useTasksLists } from '../TasksList';
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

  const sortedTasksLists = useMemo(() => sortTasksLists(tasksLists), [
    tasksLists,
  ]);

  return (
    <div className="Board">
      {loading && <div>Loading list of tasks ...</div>}
      {sortedTasksLists.map((tasksList) => (
        <TasksList
          key={`task-${tasksList.id}`}
          tasksList={tasksList}
          updateTasksList={updateTasksList}
          deleteTasksList={deleteTasksList}
          deleteAllTasks={deleteAllTasks}
        />
      ))}
      <AddEditTasksListButton createTasksList={createTasksList} />
      {error && <div>{getTasksListErrorMessage(error)}</div>}
    </div>
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
