import React, { useCallback, useState } from 'react';
import Textarea from '../Textarea';
import Button from '../Button';
import AddEditTaskButton from '../Task/AddEditTaskButton';
import Task from '../Task/Task';
import useTasks from './useTasks';
import './TasksList.scss';

export default function TasksList(props) {
  const { tasksList, updateTasksList, deleteTasksList, deleteAllTasks } = props;
  const [tasksListName, setTasksListName] = useState(tasksList.name);
  const {
    tasks,
    refetchTasks,
    createTask,
    updateTask,
    deleteTask,
    loading,
    error,
  } = useTasks(tasksList.id);

  const onUpdateTasksListClick = useCallback(() => {
    updateTasksList(tasksList.id, { name: tasksListName });
  }, [tasksList.id, tasksListName, updateTasksList]);

  const onDeleteTasksListClick = useCallback(async () => {
    deleteTasksList(tasksList.id);
  }, [deleteTasksList, tasksList.id]);

  const onDeleteAllTasksClick = useCallback(async () => {
    await deleteAllTasks(tasksList.id);
    await refetchTasks().promise;
  }, [deleteAllTasks, refetchTasks, tasksList.id]);

  return (
    <div className="TasksListContainer">
      <div className="TasksList">
        <div className="TasksList--header">
          <Textarea
            value={tasksListName}
            onChange={(e) => setTasksListName(e.target.value)}
            onSubmit={onUpdateTasksListClick}
          />
          <button
            className="TasksList--header button"
            onClick={onUpdateTasksListClick}
          >
            <ion-icon name="pencil-outline"></ion-icon>
          </button>
          <button onClick={onDeleteTasksListClick}>
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        </div>
        <div className="TasksList--content">
          <Button
            onClick={onDeleteAllTasksClick}
            className="TasksList--deleteall danger"
          >
            Delete all tasks
          </Button>
          {tasks.map((task) => (
            <Task
              key={`task-${task.id}`}
              task={task}
              createTask={createTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))}
        </div>
        <div className="TasksList--footer">
          <AddEditTaskButton
            taskListID={tasksList.id}
            createTask={createTask}
          />
        </div>
      </div>
      {loading && <div>Loading tasks lists ...</div>}
      {error && <div>{getTasksListErrorMessage(error)}</div>}
    </div>
  );
}

function getTasksListErrorMessage(error) {
  switch (error.status) {
    case 401:
      return 'Unauthorized to see tasks lists';
    case 500:
      return 'Internal server error';
    default:
      return 'An error ocurred';
  }
}
