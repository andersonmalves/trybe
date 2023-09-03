//  Variáveis
const buttonEnter = document.querySelector('#button-login');
const nameInput = document.querySelector('#firstname');
const lastnameInput = document.querySelector('#lastname');
const phoneOrEmailInput = document.querySelector('#phone_email');
const birthdateInput = document.querySelector('#birthdate');
const radioButtons = document.querySelectorAll('.radio-options');
const buttonRegister = document.querySelector('#facebook-register');
const mainContentDiv = document.querySelector('.main-content');
const inputElements = document.querySelectorAll('.input-element');

//  Criar um alerta ao clicar em 'Entrar'
buttonEnter.addEventListener('click', function () {
  const nameOrPhone = document.querySelector('#user-email-phone').value;
  alert(nameOrPhone);
});

// Retornar o genero escolhido
function getRadioValue() {
  for (let index = 0; index < radioButtons.length; index += 1) {
    if (radioButtons[index].checked) {
      return radioButtons[index].value;
    }
  }
  return false;
}

// Armazenar os dados submetidos pelo usuario
function completedForm() {
  const dataSubmittedDiv = document.createElement('div');
  dataSubmittedDiv.className = 'right-content';
  dataSubmittedDiv.innerText = `Olá, ${nameInput.value} ${lastnameInput.value}
  ${phoneOrEmailInput.value}
  ${birthdateInput.value}
  ${getRadioValue()}
  `;
  mainContentDiv.appendChild(dataSubmittedDiv);
}

// Exibir uma mensagem de "Campos inválidos" se pelo menos um campo não esteja preenchido
buttonRegister.addEventListener('click', function (e) {
  e.preventDefault();
  for (let index = 0; index < inputElements.length; index += 1) {
    if (inputElements[index].value === '') {
      const messageDiv = document.querySelector('.empty-input');
      messageDiv.innerHTML = 'Campos inválidos';
      return false;
    }
  }
  const rightContentDiv = document.querySelector('.right-content');
  rightContentDiv.remove();
  completedForm();
  return true;
});

// Exibir um capo de texto caso a pessoa clique em "personalizado"
const optionCustomized = document.querySelector('#gender-customized');
optionCustomized.addEventListener('click', function () {
  const divCustomizedOption = document.querySelector('.gender-customized');
  divCustomizedOption.style.display = 'block';
});
