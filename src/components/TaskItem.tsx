import React from "react";

// define Task type
interface Task{
    id: number;
    subject: string;
    desc: string,
    completed: boolean;
    showDesc: boolean;
}
// define Props drilling types
interface Props{
    task: Task;
    setTasks:React.Dispatch<React.SetStateAction<Task[]>>,
    tasks: Task[],
    setHistory: React.Dispatch<React.SetStateAction<Task[]>>,
}

const Task: React.FC<Props> = ({task, tasks, setTasks, setHistory})=>{

    // execute task completion
    const doneTask = (id: number) => {
        try{
            setTasks(
                tasks.map((task) =>
                    task.id === id ? { ...task, completed: !task.completed } : task
                )
            );
        }
        catch(error){
            console.error("Error on trying close the task:\n",error);
            return alert("Error on trying close the task, please try again later");
        }
    };

    // expend the task to see the description of it
    const openDescription = (id: number) => {
        try{
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id ? { ...task, showDesc: !task.showDesc } : task
                )
            );
        }
        catch(error){
            console.error("Error on trying open description:\n",error);
            return alert("Error on trying open description, please try again later");
        }
    };

    // delete task and move it to history
    const deleteTask = (id: number) => {
        try{
            const taskToDelete = tasks.find(task => task.id === id);
            if (taskToDelete) {
                setHistory((prevHistory) => [...prevHistory, taskToDelete]);
            }
            setTasks(tasks.filter((task) => task.id !== id));
        }
        catch(error){
            console.error("Error on trying delete task:\n",error);
            return alert("Error on trying delete task, please try again later");
        }
    };


    return(
        <li key={task.id} className={task.completed ? "completed" : ""}>
            <div className="taskContainer">
                <div
                    className="taskSubject"
                    onClick={()=>openDescription(task.id)}>
                    {task.subject}
                </div>
                <div className="task_marks">
                    <button onClick={() => doneTask(task.id)}>✔️</button>
                    <button onClick={() => deleteTask(task.id)}>❌</button>
                </div>
            </div>
            {task.showDesc && 
                <div className="task_desc" >
                    {task.desc}
                </div>
            }
        </li>
    );
}

export default Task;