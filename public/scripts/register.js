const $ = (q, s=document) => s.querySelector(q);

document.addEventListener('DOMContentLoaded', () => {
  // Current year
  $("#year").textContent = new Date().getFullYear();

  // Password toggle buttons (both fields)
  const toggles = document.querySelectorAll(".field.password .toggle");
  toggles.forEach((toggle, idx) => {
    toggle.addEventListener("click", () => {
      const pwdInput = toggle.previousElementSibling;
      const on = pwdInput.type === "password";
      pwdInput.type = on ? "text" : "password";
      toggle.classList.toggle("active", on);
      toggle.setAttribute("aria-pressed", on ? "true" : "false");
    });
  });

  // Simple client-side validation demo for registration
  $("#registerForm").addEventListener("submit", (e) => {
    // e.preventDefault();
    const username = $("#username").value.trim();
    const email = $("#email").value.trim();
    const pass = $("#password").value.trim();
    const passConfirm = $("#passwordConfirm").value.trim();

    // Validation flags
    let ok = true;

    if (username.length < 2){
      hint($("#username"), "Please enter your full username");
      ok = false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)){
      hint($("#email"), "Please enter a valid email");
      ok = false;
    }
    if (pass.length < 6){
      hint($("#password"), "Password must be at least 6 characters");
      ok = false;
    }
    if (pass !== passConfirm){
      hint($("#passwordConfirm"), "Passwords do not match");
      ok = false;
    }
    if (!ok) return;

    // Simulate registration process
    loading(true);
    // setTimeout(() => {
    //   loading(false);
    //   alert("Account created successfully!");
    // }, 900);
  });

  function hint(input, msg){
    input.focus();
    input.style.borderColor = "rgba(239, 68, 68, 0.9)";
    input.style.boxShadow = "0 0 0 6px rgba(239, 68, 68, 0.15)";
    toast(msg);
    setTimeout(() => {
      input.style.borderColor = "";
      input.style.boxShadow = "";
    }, 1400);
  }

  function loading(state){
    const btn = $(".btn.primary");
    btn.disabled = state;
    btn.style.opacity = state ? "0.7" : "1";
    btn.textContent = state ? "Registering…" : "Register";
  }

  // Minimal toast
  function toast(text){
    const t = document.createElement("div");
    t.textContent = text;
    t.style.position = "fixed";
    t.style.left = "50%";
    t.style.top = "24px";
    t.style.transform = "translateX(-50%)";
    t.style.background = "rgba(0,0,0,0.8)";
    t.style.color = "#fff";
    t.style.padding = "10px 14px";
    t.style.borderRadius = "10px";
    t.style.fontSize = "14px";
    t.style.zIndex = "9999";
    t.style.boxShadow = "0 8px 24px rgba(0,0,0,0.35)";
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1600);
  }
});
