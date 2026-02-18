const API = "https://snapqr.enzovillarroelv.workers.dev/";

/* ---------- LOGIN ---------- */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    const res = await fetch(API + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, pass })
    });

    const data = await res.json();

    if (data.ok) {
      localStorage.setItem("token", data.token);
      window.location = "dashboard.html";
    } else {
      document.getElementById("msg").innerText = "Login incorrecto";
    }
  });
}

/* ---------- CREAR QR ---------- */
async function crearQR() {
  const url = document.getElementById("url").value;
  const color = document.getElementById("color").value;
  const token = localStorage.getItem("token");

  const res = await fetch(API + "/api/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({ url, color })
  });

  const data = await res.json();

  if (!data.ok) {
    alert("Error al crear QR");
    return;
  }

  const qrURL = API + "/r/" + data.code;
  const img = document.getElementById("qrImg");

  img.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
    encodeURIComponent(qrURL);

  document.getElementById("download").href = img.src;
  document.getElementById("qrBox").style.display = "block";
}

