import React from 'react'

export default function CustomerDelete(props) {

    function deleteCustomer(){
        const url='/api/customers/'+props.id
        fetch(url,{
            method: 'DELETE'
        }).then(
            props.refreshState()
        )
        


    }

    return (
        <button onClick={deleteCustomer}>
            삭제
        </button>
    )
}
