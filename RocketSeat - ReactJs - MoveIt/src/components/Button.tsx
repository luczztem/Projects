import { useState } from 'react';

interface ButtonProps {
    color: string;
    children: string;
}

export function Button(props: ButtonProps) {
    const [counter, setCounter] = useState(1)

    function increment() {
        //debugger
        setCounter(counter + 1);
        console.log(counter)
    }

    return (
        <button 
            type="button" 
            style={{ backgroundColor: props.color }} 
            onClick={increment}    
        >            
            {props.children} <strong> <h2>{counter}</h2> </strong>
        </button>
    );
}