document.addEventListener("DOMContentLoaded", () => {
  // Form
  const form = document.getElementById("form");

  // Input fields
  const firstNameInput = document.getElementById("first-name");
  const lastNameInput = document.getElementById("last-name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const passwordInput2 = document.getElementById("password2");

  // Validation messages
  const validationMessages = document.querySelectorAll(".validation-msg");

  // Regular expressions
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/; // Letters, accented letters, and spaces
  const emailInputRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email format
  const lowercaseRegex = /[a-z]/; // Lowercase letters
  const uppercaseRegex = /[A-Z]/; // Uppercase letters
  const numberRegex = /\d/; // Numbers
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; // Special characters
  const lengthRegex = /^.{8,}$/; // At least 8 characters

  // Submit button
  const submitButton = form.querySelector('input[type="submit"]');

  /**
   * Checks if all input fields are valid and updates the submit button accordingly.
   * It loops through all validation messages and checks if they have the class
   * "text-green-500". If all of them do, the submit button is enabled and turns
   * blue. If not, the submit button is disabled and turns gray.
   */
  function validate() {
    const allValid = Array.from(validationMessages).every((msg) =>
      msg.classList.contains("text-green-500")
    );
    submitButton.disabled = !allValid;
    submitButton.classList.toggle("bg-gray-400", !allValid);
    submitButton.classList.toggle("hover:bg-gray-400", !allValid);
    submitButton.classList.toggle("bg-blue-500", allValid);
  }

  /**
   * Updates the styling and content of a validation message element based on a condition.
   *
   * @param {boolean} condition - The condition that determines the styling of the element.
   * @param {HTMLElement} element - The element to be updated, typically a validation message.
   */
  function updateMessages(condition, element) {
    if (condition) {
      element.classList.remove("text-red-500");
      element.classList.add("text-green-500");
      element.innerHTML = `<i class="fa-solid fa-check"></i> ${element.textContent.trim()}`;
    } else {
      element.classList.remove("text-green-500");
      element.classList.add("text-red-500");
      element.innerHTML = `<i class="fa-solid fa-xmark"></i> ${element.textContent.trim()}`;
    }

    validate();
  }

  // Field Event Listeners
  firstNameInput.addEventListener("input", () => {
    updateMessages(nameRegex.test(firstNameInput.value), validationMessages[0]);
  });

  lastNameInput.addEventListener("input", () => {
    updateMessages(nameRegex.test(lastNameInput.value), validationMessages[0]);
  });

  emailInput.addEventListener("input", () => {
    updateMessages(
      emailInputRegex.test(emailInput.value),
      validationMessages[1]
    );
  });

  passwordInput.addEventListener("input", () => {
    updateMessages(
      lowercaseRegex.test(passwordInput.value),
      validationMessages[2]
    );
    updateMessages(
      uppercaseRegex.test(passwordInput.value),
      validationMessages[3]
    );
    updateMessages(
      numberRegex.test(passwordInput.value),
      validationMessages[4]
    );
    updateMessages(
      specialCharRegex.test(passwordInput.value),
      validationMessages[5]
    );
    updateMessages(
      lengthRegex.test(passwordInput.value),
      validationMessages[6]
    );
  });

  passwordInput2.addEventListener("input", () => {
    updateMessages(
      passwordInput.value === passwordInput2.value,
      validationMessages[7]
    );
  });

  // Form Event Listener
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Congratulations! You've been doxxed! :D");
  });
});
