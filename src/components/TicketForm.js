import React, { useState, useEffect } from "react";
import '../styles.css'

export default function TicketForm({dispatch, editingTicket}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('1')

    useEffect(() => {
        if(editingTicket) {
            setTitle(editingTicket.title)
            setDescription(editingTicket.description)
            setPriority(editingTicket.priority)
        } else {
            clearForm();
        }
    }, [editingTicket])

    const priorityLabels = {
        1: 'Low',
        2: 'Medium',
        3: 'High'
    }

    const clearForm = () => {
        setTitle('')
        setDescription('')
        setPriority('1')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const ticketData = {
            id: editingTicket ? editingTicket.id : new Date().toISOString(),
            title,
            description,
            priority
        }
        dispatch({
            type: editingTicket ? 'UPDATE_TICKET' : 'ADD_TICKET',
            payload: ticketData
        })
        clearForm()
    }

    const handleCancel = () => {
        dispatch({
            type: 'CLEAR_EDITING_TICKET'
        })
        clearForm() 
    }
    return (
        <>
            <form className="ticket-form" onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type='text' className="form-input" onChange={(e)=> setTitle(e.target.value)} value={title}></input>
                </div>
                <div>
                    <label>Description</label>
                    <textarea type='text' className="form-input" onChange={(e)=> setDescription(e.target.value)} value={description}></textarea>
                </div>
                <fieldset className="priority-fieldset">
                    <legend>Priority</legend>
                    {
                        Object.entries(priorityLabels).map(([value, label]) => (
                            <label key={value} className="priority-label">
                                <input className="priority-input" 
                                    type='radio' 
                                    value={value} 
                                    checked={priority === value}
                                    onChange={(e) => setPriority(e.target.value)}
                                    >
                                </input>
                            {label}
                            </label>
                        ))
                    }
                </fieldset>
                <button type='submit' className="button">Submit</button>
                {
                    editingTicket && (
                        <button className="button" onClick={handleCancel}>Cancel Edit</button>
                    )
                }
            </form>
        </>
    )
}