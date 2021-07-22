
//DECLARING VARIABLES AND GRABBING VALUES FROM FORM. 

let uname = document.querySelector('#uname').value;
let pin = document.querySelector('#pin').value;
let selected = document.querySelector('#selected').value;
let custom = document.querySelector('#custom').value;
let pronouns = ''
let responseText;
const form = document.querySelector('form');

//SUBMIT FUNCTION &CHECKING IF USERNAME IS TAKEN

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(form);

  uname = formData.get('uname');
  pin = formData.get('pin');
  selected = formData.get('selected');
  custom = formData.get('custom')

  if (custom !== '') {
    pronouns = custom
  } else {
    pronouns = selected
  }

  try {
    const isTaken = await getUname();

    if (isTaken.status === 'fail') {
      document.querySelector("#errormessage").innerHTML = `${uname} is already taken.`
    } else {
      loginChange()
    }
  } catch {
    document.querySelector("#errormessage").innerHTML = 'An Error has Occurred. Try again later.'
  }
})

//FETCH FUNCTIONS. GETTING USERNAME FROM API & REGISTERING USER ASSIGNED NAME AND PIN. 

async function getUname() {
  let response = await fetch(`/api/users/${uname}`);
  responseJson = await response.json();
  return responseJson;
}

async function register() {
  const rawResponse = await fetch(`/api/register/${uname.toString().toLowerCase()}/${pin.toString()}/${pronouns.toString().toLowerCase().replace("/", ".")}`, {
    method: 'POST',
    headers: {
    },
    body: ""
  });
  document.querySelector("#errormessage").innerHTML = 'Registered!'
  //window.location.replace("/login.html")
}

