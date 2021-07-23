//VARIBLES

let username = localStorage.getItem('username');

//LOGOUT FETCH FUNCTION

async function logout() {
    let sendLogoutInfo = { "name": username }
    fetch('/api/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(sendRegisterInfo),
    });
    document.querySelector("#errormessage").innerHTML = 'Logged out.'
    localStorage.removeItem('username')

  }
  