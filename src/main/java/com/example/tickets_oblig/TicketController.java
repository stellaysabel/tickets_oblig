package com.example.tickets_oblig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
/* import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity; */

import java.util.List;
@RestController //Annotates the class as a REST controller. Handling incoming HTTPS requests and generating appropriate respinses.
public class TicketController {

    @Autowired // Annotates the 'TicketRepository' field for autoatic dependency injection
    TicketRepository rep; // instance of 'TicketRepository' by Spring

    @PostMapping("/tickets")
    public void addTickets(@RequestBody Ticket ticket) {
        rep.addTickets(ticket);
    }

    @GetMapping("/tickets")
    public List<Ticket> fetchTickets() {
        return rep.fetchTickets();
    }

    @DeleteMapping("/tickets/{id}")
    public void deleteTicket(@PathVariable int id) {
        rep.deleteTicket(id);
    }
}
