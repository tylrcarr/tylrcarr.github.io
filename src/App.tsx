import React, {useState} from 'react';
import './App.css';

function App() {
    const [count, setCount] = useState<number>(0);
    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(prev => prev + 1)}>click</button>
        </div>
    );
}

export default App;
