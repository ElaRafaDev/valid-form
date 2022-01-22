class ValidateForm {
  constructor() {
    this.form = document.querySelector('.guest-card');
    this.events();
  }

  events() {
    this.form.addEventListener('submit', e => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const fieldsValid = this.isValidFields();
    const passwordsValid = this.isValidPassword();

    if (fieldsValid && passwordsValid) {
      alert('Formulário enviado');
      location.reload();
    }
  }

  isValidPassword() {
    let valid = true;

    const password = this.form.querySelector('.password');
    const repeatPassword = this.form.querySelector('.repeat-password');

    if (password.value !== repeatPassword.value) {
      this.creatError(repeatPassword, 'Precisa confirmar sua senha.');
      valid = false;
    }

    if (password.value.length < 6 || password.value.length > 12) {
      this.creatError(password, 'Senha precisa estar entre 6 e 12 caracteres.');
      valid = false;
    }

    return valid;
  }

  isValidFields() {
    let valid = true;

    for (let errorText of this.form.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for (let camp of this.form.querySelectorAll('.validate')) {

      const labelName = camp.previousElementSibling.innerHTML;

      if (!camp.value) {
        this.creatError(camp, `Campo "${labelName}" não pode estar em branco.`);
        valid = false;
      } else {
        if (camp.classList.contains('cpf')) {
          if (!this.validateCpf(camp)) valid = false;
        }

        if (camp.classList.contains('user')) {
          if (!this.validateUser(camp)) valid = false;
        }
      }
    }

    return valid;
  }

  validateUser(camp) {
    const user = camp.value;

    if (user.length < 3 || user.length > 12) {
      this.creatError(camp, 'Usuário precisa ter entre 3 e 12 caracteres.');
      return false;
    }

    if (!user.match(/^[a-zA-Z0-9]+$/g)) {
      this.creatError(camp, 'Nome de usuário precisa conter apenas letras e/ou números.');
      return false;
    }

    return true;
  }

  validateCpf(camp) {
    const cpf = new ValidateCPF(camp.value);

    if (!cpf.validate()) {
      this.creatError(camp, 'CPF inválido.');
      return false;
    }

    return true;
  }

  creatError(camp, message) {
    const div = document.createElement("div");

    div.innerHTML = message;
    div.classList.add('error-text');

    camp.insertAdjacentElement('afterend', div);
  }
}

const validate = new ValidateForm();