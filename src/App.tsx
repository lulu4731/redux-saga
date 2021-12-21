import React from 'react';
import TaskBoard from './components/TaskBoard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalLoading from './components/GlobalLoading';

function App() {
    return (
        <div className="App">
            <ToastContainer />
            <GlobalLoading/>
            <TaskBoard />
        </div>
    );
}

export default App
