import React from 'react'
import '../Styles/LeaveCardStyle.css';

const LeaveCard = (props)=>{
    return(
        <>
            <div className='leavecard'>
                <h2 className='card-heading'>{props.type}</h2>
                <p className='card-para'>{props.description}</p>
                <h1>Total Leave Count : {props.allottedLeaves}</h1>
                <h5>Note :- {props.note}</h5>
            </div>
        </>
    )
}

export default LeaveCard

