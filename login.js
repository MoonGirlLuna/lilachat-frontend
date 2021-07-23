
//SETTING VARIABLES. GRABBING CONTENTS FROM FORM.

let uname = document.querySelector('#uname').value;
let pin = document.querySelector('#pin').value;
const form = document.querySelector('form');
let username = localStorage.getItem('username');

// SUBMIT FORM FUNCTION. AND FETCH USERNAME AND PIN FROM API. 

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(form);

  uname = formData.get('uname');
  pin = formData.get('pin');

  try {
    const loginInfo = await loginFetch();

    console.log(loginInfo)

    if (loginInfo.status === 200) {
      login()
    } else {
      incorrectLogin()
    }
  } catch(e) {
    console.log(e);
    document.querySelector("#errormessage").innerHTML = 'An Error has Occurred. Try again later. ' + e.toString();
  }
})


// LOGIN FETCH

async function loginFetch() {
  let sendLoginInfo = { "name": uname, "pin": pin }
  return await fetch('/api/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendLoginInfo),
  });
}


// FUNCTIONS FOR WHETHER THE LOGIN WAS A SUCCESS OR FAILURE

function login() {
  window.location.replace("/index.html")
  document.querySelector("#errormessage").innerHTML = ''
  localStorage.setItem('username', `${uname}`);

  if (username != '') {
    document.querySelector("#username").innerHTML = `Logged in as ${username}`
  }
}

function incorrectLogin() {
  console.log('Incorrect Login!')
  document.querySelector("#errormessage").innerHTML = 'Incorrect Login.'
}