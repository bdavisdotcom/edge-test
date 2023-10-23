import { useState } from 'react';
import apiService from '../services/api-service';

const getEmptyTask = () => {
    const cur = new Date();
    return {
        priority: 1,
        title: '',
        description: '',
        due_date: (new Date(cur.setMonth(cur.getMonth()+1))).getTime(),
        status: 'OPEN',
        created_at: cur.getTime(),
        updated_at: cur.getTime()
    };
};

const formatDisplayDate = (timestamp) => {
    return new Date(timestamp);
};

const formatDateForInputControl = (dt) => {
    // var d = (new Date(timestamp));
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    return dt.toISOString().slice(0,16);
}

const TaskEdit = ({ taskCommandHandler, currentUser, task }) => {
    const initTask = task || getEmptyTask(); // for initializing states only
    const initDate = formatDisplayDate(initTask.due_date);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentTask, setCurrentTask] = useState(initTask);
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
                }
                break;
            default:
                if (currentTask[fieldName].length === 0) {
                    return { valid: false, msg: `${fieldName} is required!` };
                }                
        }
        return { valid: true, msg: '' };
    };

    const onTaskChange = (e) => {
        const field = e.target.name;
        const updatedTask = { ...currentTask };

        switch(e.target.type) {
            case 'datetime-local':
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

        if (task && task.id) {
            apiService.updateTask(currentUser.jwt, task.id, currentTask)
            .then(results => {
                console.dir(results);
                taskCommandHandler({ command: "list", taskId: null });
            })
            .catch(err => {
                console.dir(err);
                setErrorMessage('Error updating task. See console for details.');
            })
        } else {
            apiService.createTask(currentUser.jwt, currentTask)
            .then(results => {
                console.dir(results);
                taskCommandHandler({ command: "list", taskId: null });
            })
            .catch(err => {
                console.dir(err);
                setErrorMessage('Error creating task. See console for details.');
            })
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
                    <div className='form-col'>
                        <div>
                            <label>ID</label>
                            <label>{task.id}</label>
                        </div>
                    </div>
                }
                <div>
                    <div className='form-col'>
                        <label>Priority</label>
                    </div>
                    <input type="text" name="priority" value={currentTask.priority} onChange={onTaskChange} />
                    <label className='error'>{formState.priority.msg}</label>
                </div>
                <div>
                    <div className='form-col'>
                        <label>Status</label>
                    </div>
                    <select name="status" value={currentTask.status} onChange={onTaskChange}>
                        <option value="OPEN">OPEN</option>
                        <option value="CLOSED">CLOSED</option>
                    </select>
                </div>
                <div>
                    <div className='form-col'>
                        <label>Title</label>
                    </div>
                    <input type="text" name="title" value={currentTask.title} onChange={onTaskChange} />
                    <label className='error'>{formState.title.msg}</label>
                </div>
                <div>
                    <div className='form-col'>
                        <label>Description</label>
                    </div>
                    <textarea rows={4} name="description" value={currentTask.description} onChange={onTaskChange} />
                    <label className='error'>{formState.description.msg}</label>
                </div>
                <div>
                    <div className='form-col'>
                        <label>Due Date</label>
                    </div>
                    <input type="datetime-local" name="due_date" value={formatDateForInputControl(dueDate)} onChange={onTaskChange} />
                </div>
            </div>
            <div className='inline-container'>
                <button onClick={onSubmit}>Submit</button>
                <button onClick={onCancel}>Cancel</button>
                <label className='error'>{errorMessage}</label>
            </div>
        </>
    );
}

export default TaskEdit;
