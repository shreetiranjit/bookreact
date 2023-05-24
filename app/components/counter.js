import { useState } from "react";


export default function SimpleCounter(props){
    const{user,handleClick} = props;
    return(
        <div> 
            <button onClick={handleClick}> Increment </button> {props.count} 

        </div>
    )
}