
const authBox = document.getElementById("authBox");
const card = document.getElementById("card");

/* show card after intro */
setTimeout(() => {
  authBox.classList.remove("hidden");
}, 4200);

/* switch */
function goRegister() {
  card.classList.add("register");
}

function goLogin() {
  card.classList.remove("register");
}

/* register */
function register() {
  if (!remail.value || !rpass.value) {
    alert("Complete all fields");
    return;
  }

  localStorage.setItem("fashionUser", JSON.stringify({
    email: remail.value,
    pass: rpass.value
  }));

  alert("Account created go to login");
  goLogin();
}

/* login */
function login() {
  const user = JSON.parse(localStorage.getItem("fashionUser"));
  if (!user) {
    goRegister();
    return;
  }

  if (lemail.value === user.email && lpass.value === user.pass) {
    alert("Welcome to Fashion ");
    window.location.href = "home.html";
  } else {
    alert("Wrong email or password");
  }
}

