let tickets = [];

// Define the validateEmail function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); //method returns 'true' if the email matches the pattern and 'false' otherwise
}

// Define the validatePhoneNumber function
function validatePhoneNumber(phone) {
    const phoneRegex = /^\d{8}$/;
    return phoneRegex.test(phone);
}
function addTicket() {
    // fetch the values from HTML form/fiels
    let selectedMovie = document.getElementById("movies").value;
    let selectedAmount = document.getElementById("amount").value;
    let selectFirstName = document.getElementById("firstname").value;
    let selectedLastName = document.getElementById("surname").value;
    let selectedEmail = document.getElementById("email").value;
    let selectedPhoneNumber = document.getElementById("phonenumber").value;

    // put the values into the constructed "ticket" object
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

    // oblig 2: pushes the "ticket" object to the array "tickets".
   //  tickets.push(ticket);

    // resets the form to clear for next booking
    document.getElementById("movies").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("firstname").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("phonenumber").value = "";
    document.getElementById("email").value = "";


    //if validation passes, it sends an ajax POST request to the server's '/tickets' endpoint with the ticket data
    $.ajax({
        type : 'POST',
        url : "/tickets",
        data : JSON.stringify(ticket),
        contentType: 'application/json',
        success : function(result, status, xhr){
            console.log(result);
            displayTickets(); // Call the function to display tickets
        },
        error : function(xhr, status, error) {
            console.log(xhr.responseText);
        }
    });

}

function displayTickets() {

    // sends ajax GET to fetch the ticket data
    $.ajax({
        type : 'GET',
        url : "/tickets",
        contentType: 'application/json',
        success : function(tickets, status, xhr){

            //HTML table to display the details
            let output = "<table class='table'>";
            output += "<thead><tr><th>Movie</th><th>Amount</th><th>Name</th><th>Phonenumber</th><th>E-mail</th><th></th></tr></thead>";
            for (let i = 0; i < tickets.length; i++) {
                output += "<tr>";
                output += "<td>" + tickets[i].movie + "</td>";
                output += "<td>" + tickets[i].amount + "</td>";
                output += "<td>" + tickets[i].firstName + " " + tickets[i].lastName + "</td>";
                output += "<td>" + tickets[i].phoneNumber + "</td>";
                output += "<td>" + tickets[i].email + "</td>";
                output += "<td><a href='#' class='deleteTicket' data-id='"+ tickets[i].id +"'>Delete</a></td>";
                output += "</tr>";
            }
            output += "</table>"
            document.getElementById("output").innerHTML = output;

        },
        error : function(xhr, status, error) {
            console.log(xhr.responseText);
        }
    });

}

// ajax DELETE to '/tickets/{id}' endpount, where {id} represents the ID of the ticket to be deleted
$('#output').on('click', '.deleteTicket',function(){
    let id = $(this).attr('data-id')
    $.ajax({
        type : 'DELETE',
        url : "/tickets/" + id,
        contentType: 'application/json',
        success : function(result, status, xhr){
            console.log(result);
            displayTickets();
        },
        error : function(xhr, status, error) {
            console.log(xhr.responseText);
        }
    });

});

displayTickets(); // On page load, ensuring that any existing tickets are initially displayed to user


