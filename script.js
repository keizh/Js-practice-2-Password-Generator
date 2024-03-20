const passDisplay = document.querySelector(".input-box input");
const copyIcon = document.querySelector(".input-box span");
const choices = document.querySelectorAll(".option input");
const generatePassword = document.querySelector(".generate-btn");
const passLength = document.querySelector(".pass-length input");
const strength = document.querySelector(".pass-indicator");

// console.log(passDisplay);
// console.log(copyIcon);
// console.log(choices);
// console.log(generatePassword);
// console.log(strength);
// console.log(passLength);

const characters = {
  lowercase: "qwertyuiopasdfghjklzxcvbnm",
  uppercase: "QWERTYUIOPASDFGHJKLZXCVBNM",
  numbers: "1234567890",
  symbols: "`~!@#$%^&*()_+=][{}|",
};

function generate() {
  let rawpassword = "";
  let realpassword = "";
  let noDuplicates = false;

  choices.forEach((choice) => {
    if (
      choice.checked &&
      choice.id != "spaces" &&
      choice.id != "exc-duplicate"
    ) {
      rawpassword += characters[choice.id];
    } else if (choice.checked && choice.id == "spaces") {
      rawpassword = `  ${rawpassword}  `;
    } else if (choice.checked && choice.id == "exc-duplicate") {
      noDuplicates = true;
    }
  });

  if (noDuplicates && rawpassword.length < passLength.value) {
    alert(
      "Please select additional fields. Since you have chosen to remove duplicates, the number of characters required to fulfill the password length criteria is now higher."
    );
    return;
  }

  console.log(rawpassword);

  for (var i = 0; i < passLength.value; i++) {
    let char = rawpassword[Math.floor(Math.random() * rawpassword.length)];
    if (noDuplicates === false) {
      realpassword += char;
    } else {
      realpassword.length > 0 && realpassword.includes(char)
        ? (i -= 1)
        : (realpassword += char);
    }
  }

  passDisplay.value = realpassword;

  realpassword.length < 8
    ? (strength.id = "weak")
    : realpassword.length < 16
    ? (strength.id = "medium")
    : (strength.id = "strong");
}

generatePassword.addEventListener("click", generate);

copyIcon.addEventListener("click", function () {
  navigator.clipboard.writeText(passDisplay.value);
  copyIcon.textContent = "done_all";
  copyIcon.style.color = "green";
  setTimeout(function () {
    copyIcon.textContent = "copy_all";
    copyIcon.style.color = "#707070";
  }, 750);
});

passLength.addEventListener("change", function () {
  generate();
});
