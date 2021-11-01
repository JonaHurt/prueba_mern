import React from 'react'
import { useParams } from 'react-router-dom';

export const Edit = () => {
    let { id } = useParams();
    console.log(id);
    return (
        <div>
            
        </div>
    )
}
