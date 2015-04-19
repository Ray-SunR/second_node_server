// Userlist data array for filling in info box

var userListData = [];

// DOM ready
$(document).ready(function(){
    console.log("Start populating table");
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
    $('#btnAddUser').on('click', addUser);
    console.log("A click listner has been added to the button");
    populateTable();
});

function addUser(event){
    event.preventDefault();

    var errorCount = 0;

    $('#addUser input').each(function(){
       if ($(this).val() === '') {errorCount++;}
    });

    if (errorCount == 0){
        var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'age': $('#addUser fieldset input#inputUserAge').val(),
            'location': $('#addUser fieldset input#inputUserLocation').val(),
            'gender': $('#addUser fieldset input#inputUserGender').val()
        }

        console.log(newUser);

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === ' ') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

//Fill table with data
function populateTable(){
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/users/userlist', function(data){
        userListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
        $('#userList table tbody').html(tableContent);
    });
};

function showUserInfo(even){
    event.preventDefault();

    var thisUserName = $(this).attr('rel');

    var arrayPosition = userListData.map(function(arrayItem)
    {
        return arrayItem.username;
    }).indexOf(thisUserName);

    var userData = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoName').text(userData.fullname);
    $('#userInfoAge').text(userData.age);
    $('#userInfoGender').text(userData.gender);
    $('#userInfoLocation').text(userData.location);
};