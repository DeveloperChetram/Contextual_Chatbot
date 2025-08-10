const $ = (q, s = document) => s.querySelector(q);

document.addEventListener('DOMContentLoaded', () => {
  $("#loginForm").addEventListener("submit", (e) => {
    let ok = true;
    document.querySelectorAll('.field-error').forEach(el => el.remove());
    const username = $("#username").value.trim();
    const pass = $("#password").value.trim();

    // Username validation: at least 2 chars, no spaces, cannot start with number or hyphen, only letters, numbers, underscores
    if (username.length < 2) {
      hint($("#username"), "Please enter your username");
      ok = false;
    } else if (/\s/.test(username)) {
      hint($("#username"), "Username cannot contain spaces");
      ok = false;
    } else if (/^[0-9\-]/.test(username)) {
      hint($("#username"), "Username cannot start with a number or hyphen");
      ok = false;
    } else if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(username)) {
      hint($("#username"), "Username can only contain letters, numbers, and underscores, and must start with a letter");
      ok = false;
    }

    if (pass.length < 6) {
      hint($("#password"), "Password must be at least 6 characters");
      ok = false;
    }

    if (!ok) {
      e.preventDefault();
      return;
    }
    loading(true);
  });

  function hint(input, msg) {
    const field = input.closest('.field');
    const errorDisplay = document.createElement('p');
    errorDisplay.className = 'field-error';
    errorDisplay.textContent = msg;
    errorDisplay.style.color = 'var(--danger)';
    errorDisplay.style.fontSize = '12px';
    errorDisplay.style.marginTop = '4px';
    const existingError = field.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    field.appendChild(errorDisplay);
    input.focus();
  }

  function loading(state) {
    const btn = $(".btn.primary");
    btn.disabled = state;
    btn.style.opacity = state ? "0.7" : "1";
    btn.textContent = state ? "Logging in…" : "Login";
  }
});