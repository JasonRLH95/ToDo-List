import React, { useLayoutEffect, useState } from 'react';
import Input from './Input';

// define Task type
interface Task {
    id: number;
    subject: string;
    desc: string,
    completed: boolean;
    showDesc: boolean;
}
// define Props drilling types
interface Props{
    setTasks:React.Dispatch<React.SetStateAction<Task[]>>,
    tasks: Task[],
}

const AddTaskForm: React.FC<Props> = ({setTasks, tasks}) => {

    const [subject, setSubject] = useState("");
    const [desc, setDesc] = useState("");
    const [addTaskFlag,setAddTaskFlag] = useState(false);

    // catching the element to perform dynamic height changes
    var addTaskContainer = document.querySelector(".input-container") as HTMLElement | null;

    // to make sure it's not null when initiate
    useLayoutEffect(()=>{
        try{
            addTaskContainer = document.querySelector(".input-container") as HTMLElement | null;
        }
        catch(error){
            console.error("Error on layout effect:\n", error);
            return alert("Something went wrong, try reload the page");
        }
    },[])

    const addTask = () => {
        try{
            if (subject.trim() === "" || desc.trim() === "") {
                alert("must fill all fields first!");
                return;
            }
            const newTask: Task = {
                id: Date.now(),
                subject,
                desc,
                completed: false,
                showDesc: false,
            };
            setTasks([...tasks, newTask]);
            if(addTaskContainer){
                addTaskContainer.style.height = "50px";
            }
            setSubject("");
            setDesc("");
            setAddTaskFlag(false);
        }
        catch(error){
            console.error("Error on adding new task:\n", error);
            return alert("Error on adding new task, try again later");
        }
    };
    // Open Task Add Option
    const openAddTask=()=>{
        try{
            setAddTaskFlag(true);
            if(addTaskContainer){
                addTaskContainer.style.height = "100px";
            }
        }
        catch(error){
            console.error("Error on open adding new task option:\n", error);
            return alert("Error on open adding new task option, try again later");
        }
    }

    return (
        <div className="input-container">
            {!addTaskFlag ? (
                <button
                    onClick={openAddTask}
                    className="addTask_button">
                    New Task
                </button>
            ) : (
                <div
                    className="addTask_div">
                    <div className="addTask_inputs_div">
                        <Input setInput={setSubject} value={subject} placeholder={"Enter a task subject"}/>
                        <Input setInput={setDesc} value={desc} placeholder={"Add task description"}/>
                    </div>
                    <button onClick={addTask}>Add</button>
                </div>
            )}
        </div>
    )
}

export default AddTaskForm;