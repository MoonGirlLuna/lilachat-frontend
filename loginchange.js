let uname = document.querySelector('#uname').value;
let pin = document.querySelector('#pin').value; 
let newUname = document.querySelector('#newuname').value;
let newPin = document.querySelector('#newpin').value; 
// let selected = document.querySelector('#selected').value;
// let custom = document.querySelector('#custom').value;
// let pronouns = ''
let responseText;
const form = document.querySelector('form');
const API_URL = `http://127.0.0.1:8000`

form.addEventListener("submit", async function(event) {
    event.preventDefault();
    const formData = new FormData(form);

    uname = formData.get('uname');
    pin = formData.get('pin');
    newUname = formData.get('newuname');
    newPin = formData.get('newpin');
    // selected = formData.get('selected');
    // custom = formData.get('custom')

    // if (custom !== '') {
    //   pronouns = custom
    // } else {
    //   pronouns = selected
    // }

    if (newUname === '') {
        newUname = uname
    }
    if (newPin === '') {
        newPin = pin
    }
    
    const userNotFound = await getUname();

    if (userNotFound !== `User ${uname}`) {
      document.querySelector("#incorrect").innerHTML = `user ${uname} was not found`
    } else {
      loginChange()
    }
})

async function getUname() {
  let response = await fetch(`${API_URL}/api/users/${uname}`);
  responseText = await response.text();
  return responseText;
}

async function loginChange() {
const rawResponse = await fetch(`${API_URL}/api/users/change/${uname}/${pin}/${newUname}/${newPin}`, {
    method: 'POST',
    headers: {
      'Accept': 'text/plain'
    },
    body: ""
});
//rawResponse.then(window.location.replace("http://127.0.0.1:5500/login.html"))
}