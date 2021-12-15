import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import formStyles from '../Form/Form.module.scss';
import { createTasks, updateTasks } from '../../actions/tasks';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';

const Form = ({show, close, currentId, setCurrentId}) => {

    const task = useSelector((state) => currentId ? state.tasks.find((p) => p._id === currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'));

    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        isDone: false,
        priority: 0,
        dueDate: new Date()
    });

    useEffect(() => {
        if(task) setTaskData(task);
        
    }, [task])

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        if(currentId){
            dispatch(updateTasks(currentId, {...taskData, name : user?.result?.name}));
        } else{
            dispatch(createTasks({...taskData, name : user?.result?.name}));

        }
        clear();
        close();
    }

    const clear = () =>{
        setCurrentId(null);
        setTaskData({
            title: '',
            description: '',
            isDone: false,
            priority: 0,
            dueDate: new Date()
        })
    }

    return (
    <>
        {
        show ?
        
        <div className={formStyles.modalContainer} onClick={() => close()}>
            <div className={formStyles.modal} onClick={(e) => e.stopPropagation()}>
                
                <header className={formStyles.header}>
                    <div className={formStyles.title}>{currentId ? 'Edit' : 'Create'} a task</div>
                </header>
                <form onSubmit={onSubmit} className={formStyles.content}>
                    <TextField 
                        label="Title" 
                        variant="standard"
                        value={taskData.title} 
                        onChange={(e) => setTaskData({...taskData, title: e.target.value})}
                        sx={{color:'success.main'}}
                        required
                        inputProps={{
                            minLength: 3,
                            }}
                        fullWidth
                    />

                    <TextField
                        label="Description"
                        multiline
                        rows={6}
                        value={taskData.description}
                        onChange={(e) => setTaskData({...taskData, description: e.target.value})}
                        required
                        fullWidth
                    />

                    <label>Done</label>

                    <Checkbox checked={taskData.isDone} onChange={(e) => setTaskData({...taskData, isDone: e.target.checked})} color="primary" />

                    <Select
                        value={taskData.priority || 0}
                        label="Priority"
                        onChange={(e) => setTaskData({...taskData, priority: e.target.value})}
                    >
                        <MenuItem value={2}>Low</MenuItem>
                        <MenuItem value={1}>Medium</MenuItem>
                        <MenuItem value={0}>High</MenuItem>
                    </Select>

                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            renderInput={(props) => <TextField value={taskData.dueDate} {...props} />}
                            label="When you want to finish"
                            value={taskData.dueDate}
                            onChange={(date) => setTaskData({dueDate: date})}
                            defaultValue={(new Date())}
                        />
                    </LocalizationProvider> */}
                    
                    <Button type="submit" variant="outlined" size="large">Submit</Button>
                </form>
                <footer className={formStyles.footer}>
                    <Button onClick={() => close()} variant="outlined" size="large">Cancel</Button>
                </footer>

            </div>
        </div>
        : null
        }
    </>
    )
}

export default Form;