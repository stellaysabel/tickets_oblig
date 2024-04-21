package com.example.tickets_oblig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class TicketController {

    @Autowired
    TicketRepository rep;

    @PostMapping("/tickets")
    public void addTickets(@RequestBody Ticket ticket) {
        rep.addTickets(ticket);
    }

    @GetMapping("/tickets")
    public List<Ticket> fetchTickets() {
        return rep.fetchTickets();
    }

    @DeleteMapping("/tickets")
    public void deleteTicket() {
        rep.deleteTicket();
    }
}
