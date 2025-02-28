import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'

import { displayErrorToast, displayInfoToast, displaySuccessToast } from './ToastMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddTask(props) {
  const [enteredTask, setEnteredTask] = useState('');
  const {token} = useAuth();




  const addTask = () => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     */
    const taskValue = enteredTask.trim();

    if (taskValue === '') {
      displayErrorToast('Please enter a task')
    }
    else {
      axios({
        headers: {
          Authorization: 'Token ' + token
        },
        url: "todo/create/",
        method: 'POST',
        data: {
          title: enteredTask
        },
      })
      .then(res => {
        setEnteredTask("");
        props.displayTasks();
        displaySuccessToast("Task added successfully");
      })
      .catch(function (err) {
        console.log(err);
      })
    }
  }
  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        value={enteredTask}
        onChange={(event) => {
          setEnteredTask(event.target.value)
        }}
      />
      <button
        type='button'
        className='todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded'
        onClick={addTask}
      >
        Add Task
      </button>
      {/* <ToastContainer /> */}
    </div>
  )
}
