import React from 'react';
import '../styles.css'
import TicketItem from './TicketItem';

export default function TicketList({tickets, dispatch}) {
    return(
        <div className='tickets-list'>
            {
                tickets.map(ticket => (
                    <TicketItem key={ticket.id} ticket={ticket} dispatch={dispatch}></TicketItem>
                ))    
            }
        </div>
    )
}