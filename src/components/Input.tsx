import React from 'react';
import './style/input.css';

interface Props{
    setInput:React.Dispatch<React.SetStateAction<string>>,
    value:string;
    placeholder:string;
}

const Input: React.FC<Props> = ({setInput, value, placeholder}) => {
  return (
    <input placeholder={placeholder} className="input" name="text" type="text" value={value} onChange={(e)=>{setInput(e.target.value)}}/>
  )
}

export default Input;