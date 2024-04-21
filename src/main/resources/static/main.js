let tickets = [];

// Define the validateEmail function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Define the validatePhoneNumber function
function validatePhoneNumber(phone) {
    const phoneRegex = /^\d{8}$/;
    return phoneRegex.test(phone);
}
function addTicket() {
    // fetch the values from HTML form
    let selectedMovie = document.getElementById("movies").value;
    let selectedAmount = document.getElementById("amount").value;
    let selectFirstName = document.getElementById("firstname").value;
    let selectedLastName = document.getElementById("surname").value;
    let selectedEmail = document.getElementById("email").value;
    let selectedPhoneNumber = document.getElementById("phonenumber").value;

    // put the values into "ticket" object
    const ticket = {
        movie: selectedMovie,
        amount: selectedAmount,
        firstName: selectFirstName,
        lastName: selectedLastName,
        email: selectedEmail,
        phoneNumber: selectedPhoneNumber
    };

    // initializes errors found. This will be used to identify if there are validation errors.
    let errorsFound = 0;

    // validation start
    if (ticket.movie === '') {
        $('#movieDiv').addClass('error');
        $('#movieDiv .errorText').html('Please choose a movie');
        errorsFound++;
    } else {
        $('#movieDiv').removeClass('error');
        $('#movieDiv .errorText').html('');
    }

    // Input validation
    if (ticket.amount < 1) {
        $('#amountDiv .errorText').html('Please enter amount higher than 0');
        $('#amountDiv').addClass('error');
        errorsFound++;
    } else {
        $('#amountDiv .errorText').html('');
        $('#amountDiv').removeClass('error');
    }
    if (ticket.firstName === "") {
        $('#firstnameDiv .errorText').html('Please enter first name');
        $('#firstnameDiv').addClass('error');
        errorsFound++;
    } else {
        $('#firstnameDiv .errorText').html('');
        $('#firstnameDiv').removeClass('error');
    }
    if (ticket.lastName === "") {
        $('#surnameDiv .errorText').html('Please enter last name');
        $('#surnameDiv').addClass('error');
        errorsFound++;
    } else {
        $('#surnameDiv .errorText').html('');
        $('#surnameDiv').removeClass('error');
    }
    if (ticket.phoneNumber === "") {
        $('#phonenumberDiv .errorText').html('Please enter phone number');
        $('#phonenumberDiv').addClass('error');
        errorsFound++;
    } else if ( ! validatePhoneNumber(ticket.phoneNumber ) ) {
            $('#phonenumberDiv .errorText').html('Please enter 8-digit phone number');
            $('#phonenumberDiv').addClass('error');
            errorsFound++;
    } else {
        $('#phonenumberDiv .errorText').html('');
        $('#phonenumberDiv').removeClass('error');
    }
    if (ticket.email === "") {
        $('#emailDiv .errorText').html('Please enter email address');
        $('#emailDiv').addClass('error');
        errorsFound++;
    } else if ( ! validateEmail(ticket.email) ) {
        $('#emailDiv .errorText').html('Please enter a valid email address');
        $('#emailDiv').addClass('error');
        errorsFound++;
    } else {
        $('#emailDiv .errorText').html('');
        $('#emailDiv').removeClass('error');
    }
    // end of validation

    // if there are errors found, exit the function.
    if (errorsFound > 0) {
        return;
    }
    // Continue if no errors with validation

    // pushes the "ticket" object to the array "tickets".
   //  tickets.push(ticket);

    displayTickets(); // Call the function to display tickets

    // resets
    document.getElementById("movies").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("firstname").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("phonenumber").value = "";
    document.getElementById("email").value = "";

    $.ajax({
        type : 'POST',
        url : "/tickets",
        data : JSON.stringify(ticket),
        contentType: 'application/json',
        success : function(result, status, xhr){
            console.log(result);
        },
        error : function(xhr, status, error) {
            console.log(xhr.responseText);
        }
    });

}

function buyTickets() {

    $.ajax({
        type : 'POST',
        url : "/tickets",
        data : tickets,
        success : function(result, status, xhr){
            console.log(result);
        }
    });

}

function displayTickets() {
    let output = "";
    for (let i = 0; i < tickets.length; i++) {
        output+= tickets[i].movie + " " + tickets[i].amount + " " + tickets[i].firstName +
            " " + tickets[i].lastName + " " + tickets[i].phoneNumber + " " + tickets[i].email;
    }
    document.getElementById("output").innerHTML = output;
}

function deleteTicket() {
    tickets = [];
    console.log(tickets);
    displayTickets();
}