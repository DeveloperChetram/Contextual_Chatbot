const $ = (q, s = document) => s.querySelector(q);

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = $("#loginForm");
  const usernameInput = $("#email");
  const passwordInput = $("#password");
  const submitButton = $(".btn.primary");

  // --- Start of Corrected Code ---

  // 1. Disable the button initially.
  submitButton.disabled = true;

  // 2. Create a single validation function to be called on input.
  const validateForm = () => {
    // Clear previous errors to avoid stacking messages
    document.querySelectorAll('.field-error').forEach(el => el.remove());

    let isFormValid = true;

    // --- Username/Email Validation ---
    const username = usernameInput.value.trim();
    if (username.length < 2) {
      hint(usernameInput, "Username or email is required.");
      isFormValid = false;
    } else if (/\s/.test(username)) {
      hint(usernameInput, "Input cannot contain spaces.");
      isFormValid = false;
    }

    // --- Password Validation ---
    const pass = passwordInput.value.trim();
    if (pass.length < 6) {
      hint(passwordInput, "Password must be at least 6 characters.");
      isFormValid = false;
    }

    // 3. Enable or disable the button based on the overall form validity.
    submitButton.disabled = !isFormValid;
    return isFormValid;
  };

  // 4. Add event listeners to validate as the user types.
  usernameInput.addEventListener('input', validateForm);
  passwordInput.addEventListener('input', validateForm);

  // 5. Add a submit listener as a final check.
  loginForm.addEventListener("submit", (e) => {
    // Run validation one last time on submission attempt
    if (!validateForm()) {
      e.preventDefault(); // Stop submission if invalid
      return;
    }
    loading(true);
  });
  
  // --- End of Corrected Code ---

  function hint(input, msg) {
    const field = input.closest('.field');
    // Ensure no duplicate error messages
    const existingError = field.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    
    const errorDisplay = document.createElement('p');
    errorDisplay.className = 'field-error';
    errorDisplay.textContent = msg;
    errorDisplay.style.color = 'var(--danger)';
    errorDisplay.style.fontSize = '12px';
    errorDisplay.style.marginTop = '4px';
    
    field.appendChild(errorDisplay);
  }

  function loading(state) {
    submitButton.disabled = state;
    submitButton.style.opacity = state ? "0.7" : "1";
    submitButton.textContent = state ? "Logging in…" : "Sign In";
  }

  // Also handle password visibility toggle
  const toggle = $(".field.password .toggle");
  if (toggle) {
      toggle.addEventListener("click", () => {
          const on = passwordInput.type === "password";
          passwordInput.type = on ? "text" : "password";
          toggle.classList.toggle("active", on);
      });
  }
});