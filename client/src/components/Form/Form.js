import React, {useState, useEffect} from 'react';
import formStyles from '../Form/Form.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createTasks, updateTasks } from '../../actions/tasks';
import { useForm, Controller } from 'react-hook-form';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import NativeSelect from '@mui/material/NativeSelect';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Form = ({show, close, currentId, setCurrentId}) => {

    const { handleSubmit, control  } = useForm();

    const task = useSelector((state) => currentId ? state.tasks.find((p) => p._id === currentId) : null);

    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        isDone: false,
        priority: "",
        dueDate: new Date().toUTCString()
    });

    useEffect(() => {
        if(task) setTaskData(task);
        
    }, [task])

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        if(currentId){
            dispatch(updateTasks(currentId, taskData));
        } else{
            dispatch(createTasks(taskData));
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
            priority: "",
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
                    <ThemeProvider theme={theme}>
                        <TextField 
                            label="Title" 
                            variant="standard"
                            value={taskData.title} 
                            onChange={(e) => setTaskData({...taskData, title: e.target.value})}
                            sx={{color:'success.main'}}
                        />

                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={6}
                            value={taskData.description}
                            onChange={(e) => setTaskData({...taskData, description: e.target.value})}
                        />

                        <label>Done</label>

                        <Checkbox checked={taskData.isDone} onChange={(e) => setTaskData({...taskData, isDone: e.target.checked})} color="primary" />

                        <NativeSelect
                            value={taskData.priority}
                            label="Priority"
                            onChange={(e) => setTaskData({...taskData, priority: e.target.value})}
                        >
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </NativeSelect>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="DateTimePicker"
                                value={taskData.dueDate}
                                onChange={(date) => setTaskData({dueDate: date})}
                            />
                        </LocalizationProvider>
                        
                        <Button type="submit" variant="outlined" size="large">Submit</Button>
                    </ThemeProvider>


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

const theme = createTheme({
    palette: {
      mode: "dark"
    },
  });

export default Form;