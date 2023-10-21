import { useState } from 'react';
import apiService from '../services/api-service';

const getEmptyTask = () => {
    const cur = new Date();
    return {
        priority: 1,
        title: '',
        description: '',
        due_date: (new Date(cur.setMonth(cur.getMonth()+1))).getTime(),
        status: 'OPEN'
    };
};

const formatDueDate = (timestamp) => {
    if (!timestamp) {
        const cur = new Date();
        return new Date(cur.setMonth(cur.getMonth()+1));
    }
    return new Date(timestamp);
};

const TaskEdit = ({ taskCommandHandler, currentUser, task }) => {
    const initDate = (task !== null) ? formatDueDate(task.due_date) : formatDueDate(null);
    const [currentTask, setCurrentTask] = useState(task || getEmptyTask());
    const [dueDate, setDueDate] = useState(initDate);
    const [formState, setFormState] = useState({
        priority: {
            valid: true,
            msg: ''
        },
        status: {
            valid: true,
            msg: ''
        },
        title: {
            valid: true,
            msg: ''
        },
        description: {
            valid: true,
            msg: ''
        }

    });

    const isFormValid = () => {
        //return isFieldValid('priority') && isFieldValid('title') && isFieldValid('description');
        let priority = checkFieldValid('priority');
        let title = checkFieldValid('title');
        let description = checkFieldValid('description');

        setFormState({ ...formState, priority, title, description });

        const isValid = priority.valid && title.valid && description.valid;
        
        return isValid;
    };

    const checkFieldValid = (fieldName) => {
        switch(fieldName) {
            case 'priority':
                if ((currentTask.priority.length && currentTask.priority.length === 0) || !Number.isInteger(parseInt(currentTask.priority, 10)) || parseInt(currentTask.priority, 10) < 1) {
                    return { valid: false, msg: 'Priority is required and must be a positive integer.' };
                    // setFormState({ ...formState, priority : { valud: false, msg: 'Priority is required and must be a positive integer.' }});
                    // return false;
                }
                break;
            default:
                if (currentTask[fieldName].length === 0) {
                    return { valid: false, msg: `${fieldName} is required!` };
                    // const newFormState = { ...formState };
                    // newFormState[fieldName] = { valid: false, msg: `${fieldName} is required!` };
                    // setFormState(newFormState);
                    // return false;
                }                
        }
        return { valid: true, msg: '' };
    };

    const onTaskChange = (e) => {
        const field = e.target.name;
        const updatedTask = { ...currentTask };

        switch(e.target.type) {
            case 'date':
                const updatedDate = new Date(e.target.value);
                updatedTask[field] = updatedDate.getTime();
                setDueDate(updatedDate);
            break;
            default:
                updatedTask[field] = e.target.value;
        }

        console.log(`field changed ${field}`);
        console.dir(updatedTask);

        setCurrentTask(updatedTask);
    };

    const onSubmit = () => {
        if (!isFormValid()) {
            return;
        }

        console.dir(currentUser);
        console.dir(currentTask);

        console.log("Task onSubmit");

        if (task && task.id) {
            apiService.updateTask(currentUser.jwt, task.id, currentTask)
            .then(results => {
                console.dir(results);
                taskCommandHandler({ command: "list", taskId: null });
            })
            .catch(err => { console.dir(err); })
        } else {
            apiService.createTask(currentUser.jwt, currentTask)
            .then(results => {
                console.dir(results);
                taskCommandHandler({ command: "list", taskId: null });
            })
            .catch(err => { console.dir(err); })
        }
    };

    const onCancel = () => {
        console.log("Task onCancel");
        taskCommandHandler({ command: "cancel", taskId: null });
    }

    return (
        <>
            <div className="task">
                <h2>Task Edit</h2>
            </div>
            <div>
                {
                    task && task.id !== null &&
                    <div>
                        <label>ID</label>
                        <label>{task.id}</label>
                    </div>
                }
                <div>
                    <label>Priority</label>
                    <input type="text" name="priority" value={currentTask.priority} onChange={onTaskChange} />
                    <label className='error'>{formState.priority.msg}</label>
                </div>
                <div>
                    <label>Status</label>
                    <select name="status" value={currentTask.status} onChange={onTaskChange}>
                        <option value="OPEN">OPEN</option>
                        <option value="CLOSED">CLOSED</option>
                    </select>
                </div>
                <div>
                    <label>Title</label>
                    <input type="text" name="title" value={currentTask.title} onChange={onTaskChange} />
                    <label className='error'>{formState.title.msg}</label>
                </div>
                <div>
                    <label>Description</label>
                    <textarea rows={4} name="description" value={currentTask.description} onChange={onTaskChange} />
                    <label className='error'>{formState.description.msg}</label>
                </div>
                <div>
                    <label>Due Date</label>
                    <input type="date" name="due_date" value={dueDate.toISOString().split('T')[0]} onChange={onTaskChange} />
                </div>
                {
                    task && task.id !== null &&
                    <>
                        <div>
                            <label>Last Updated</label>
                            <label>{(new Date(currentTask.updated_at)).toISOString().split('T')[0]}</label>
                        </div>
                        <div>
                            <label>Created</label>
                            <label>{(new Date(currentTask.created_at)).toISOString().split('T')[0]}</label>
                        </div>
                    </>
                }
            </div>
            <div>
                <button onClick={onSubmit}>Submit</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </>
    );
}

export default TaskEdit;
