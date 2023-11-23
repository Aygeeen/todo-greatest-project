import React, {useState} from "react";
import "./todo-styles.css";

export default function ToDo() {
    const [taskList, setTaskList] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [searchId, setSearchId] = useState('');
    const [searchedTask, setSearchedTask] = useState(null);
    const [editIndex, setEditIndex] = useState(-1);
    const [editValue, setEditValue] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === "newTask") setNewTask(value);
        else if (name === "searchId") setSearchId(value);
        else if (name === "editValue") setEditValue(value);
    };

    const addTask = () => {
        if (newTask.trim() !== '') {
            setTaskList([newTask, ...taskList]);
            setNewTask('');
        }
    };

    const handleDeleteTask = (indexToDelete) => {
        const updatedTask = taskList.filter((_, index) => index !== indexToDelete);
        setTaskList(updatedTask);
    };

    const handleEdit = (indexToEdit) => {
        setEditIndex(indexToEdit);
        setEditValue(taskList[indexToEdit]);
    };

    const handleSave = () => {
        const updatedTasks = [...taskList];
        updatedTasks[editIndex] = editValue;
        setTaskList(updatedTasks);
        setEditIndex(-1);
        setEditValue('');
    };

    const handleCancel = () => {
        setEditIndex(-1);
        setEditValue('');
    };

    const handleSearch = () => {
        const foundTask = taskList.find((_, index) => index.toString() === searchId);
        setSearchedTask(foundTask || null);
    };

    return (
        <div className="todo-container">
            <h2>TODO LIST</h2>
            <div>
                <input onChange={handleChange} name="newTask" value={newTask}/>
                <button onClick={addTask} className="blue">Добавить Задачу</button>
            </div>

            <div>
                <input
                    placeholder="ID"
                    value={searchId}
                    onChange={handleChange}
                    name="searchId"
                    className="inputId"
                />
                <button onClick={handleSearch} className="blue">Найти</button>
                {searchedTask !== null && <div>Найденная задача: {searchedTask}</div>}
            </div>

            {taskList.map((task, index) => (
                <div className="all-todos" key={index}>

                    {editIndex === index ? (
                        <div>
                            <input
                                value={editValue}
                                onChange={handleChange}
                                name="editValue"
                            />
                            <button onClick={handleSave} className="blue">Сохранить</button>
                            <button onClick={handleCancel} className="red">Отмена</button>
                        </div>
                    ) : (
                        <div>
                            <span onClick={() => handleEdit(index)}>{task}</span>
                            <button className='red' onClick={() => handleDeleteTask(index)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}