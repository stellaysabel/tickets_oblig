package com.example.tickets_oblig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TicketRepository {

    @Autowired
    private JdbcTemplate db;

    public void addTickets(Ticket ticket) {
        String sql = "INSERT INTO Ticket (movie, amount, firstName, lastName, email, phoneNumber) VALUES(?,?,?,?,?,?)";
        db.update(sql, ticket.getMovie(), ticket.getAmount(),ticket.getFirstName(),ticket.getLastName(),ticket.getEmail(),ticket.getPhoneNumber());
    }

    public List<Ticket> fetchTickets() {
        String sql = "SELECT * FROM Ticket ORDER BY lastName";
        List<Ticket> allTickets = db.query(sql, new BeanPropertyRowMapper(Ticket.class));
        return allTickets;
    }


    public void deleteTicket() {
        String sql = "DELETE FROM Ticket";
        db.update(sql);
    }
}
