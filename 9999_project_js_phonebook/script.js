let contacts = [
    {"name": "Naser", "number": "09199364751"},
    {"name": "Hesam", "number": "09929192306"}
]



document.getElementById('addContact').addEventListener('click', function() {
    var newContactName = document.getElementById('newContactName').value;
    var newContactNumber = document.getElementById('newContactNumber').value;
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].name === newContactName) {
            alert("Contact exists");
            console.log(contacts);
            break;
        }
        else{
            var newContactToAdd = {name: newContactName, number: newContactNumber};
            contacts.push(newContactToAdd);
        }
        console.log(contacts);
    }
});