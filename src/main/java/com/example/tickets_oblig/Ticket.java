package com.example.tickets_oblig;

public class Ticket {
    private Integer id;
    private String movie;
    private Integer amount;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;

    public Ticket() {
    } //default constructor with no arguments. Initializes a 'Ticket' object with default values.

    public Ticket(Integer id, String movie, Integer amount, String firstName, String lastName, String email, String phoneNumber) {
        this.id = id;
        this.movie = movie;
        this.amount = amount;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMovie() {
        return movie;
    }

    public void setMovie(String movie) {
        this.movie = movie;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public String toString() {
        return "ticket{" +
                "movie='" + movie + '\'' +
                ", amount=" + amount +
                ", name=" + firstName + " " + lastName +
                ", email=" + email +
                ", phonenumber=" + phoneNumber +
                ", first name='" + firstName + '\'' +
                '}';
    }
}
