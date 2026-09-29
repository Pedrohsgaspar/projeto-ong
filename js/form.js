import {
    getRegistrations,
    saveRegistration
} from "./storage.js";

import {
    renderRegistrationHistory
} from "./templates.js";

function onlyNumbers(value) {
    return value.replace(/\D/g, "");
}

function formatCPF(value) {
    const numbers = onlyNumbers(value).slice(0, 11);

    return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function formatPhone(value) {
    const numbers = onlyNumbers(value).slice(0, 11);

    if (numbers.length <= 10) {
        return numbers
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
}

function formatCEP(value) {
    const numbers = onlyNumbers(value).slice(0, 8);

    return numbers.replace(/(\d{5})(\d)/, "$1-$2");
}

function setFieldError(input, message) {
    const errorElement = document.querySelector(
        `[data-error-for="${input.name}"]`
    );

    input.setAttribute("aria-invalid", "true");

    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearFieldError(input) {
    const errorElement = document.querySelector(
        `[data-error-for="${input.name}"]`
    );

    input.removeAttribute("aria-invalid");

    if (errorElement) {
        errorElement.textContent = "";
    }
}

function validateCPF(cpf) {
    const numbers = onlyNumbers(cpf);

    if (numbers.length !== 11) {
        return false;
    }

    if (/^(\d)\1{10}$/.test(numbers)) {
        return false;
    }

    let sum = 0;

    for (let i = 0; i < 9; i++) {
        sum += Number(numbers[i]) * (10 - i);
    }

    let digit = 11 - (sum % 11);

    if (digit >= 10) {
        digit = 0;
    }

    if (digit !== Number(numbers[9])) {
        return false;
    }

    sum = 0;

    for (let i = 0; i < 10; i++) {
        sum += Number(numbers[i]) * (11 - i);
    }

    digit = 11 - (sum % 11);

    if (digit >= 10) {
        digit = 0;
    }

    return digit === Number(numbers[10]);
}

function validatePhone(phone) {
    return onlyNumbers(phone).length >= 10;
}

function validateCEP(cep) {
    return onlyNumbers(cep).length === 8;
}

function validateForm(form) {
    let valid = true;

    const inputs = form.querySelectorAll(
        "input:not([type='checkbox']), select, textarea"
    );

    inputs.forEach((input) => {
        clearFieldError(input);

        if (input.required && !input.value.trim()) {
            setFieldError(
                input,
                "Este campo é obrigatório."
            );

            valid = false;

            return;
        }

        if (
            input.type === "email" &&
            input.value &&
            !input.validity.valid
        ) {
            setFieldError(
                input,
                "Digite um endereço de e-mail válido."
            );

            valid = false;
        }

        if (
            input.name === "cpf" &&
            input.value &&
            !validateCPF(input.value)
        ) {
            setFieldError(
                input,
                "Digite um CPF válido."
            );

            valid = false;
        }

        if (
            input.name === "phone" &&
            input.value &&
            !validatePhone(input.value)
        ) {
            setFieldError(
                input,
                "Digite um telefone válido."
            );

            valid = false;
        }

        if (
            input.name === "cep" &&
            input.value &&
            !validateCEP(input.value)
        ) {
            setFieldError(
                input,
                "Digite um CEP válido."
            );

            valid = false;
        }
    });

    const interests = form.querySelectorAll(
        'input[name="interests"]:checked'
    );

    const interestError = form.querySelector(
        '[data-error-for="interests"]'
    );

    if (!interests.length) {
        if (interestError) {
            interestError.textContent =
                "Selecione pelo menos uma área de interesse.";
        }

        valid = false;
    } else if (interestError) {
        interestError.textContent = "";
    }

    const status = form.querySelector("#form-status");

    if (!valid && status) {
        status.textContent =
            "Revise os campos destacados antes de enviar o formulário.";
    }

    if (valid && status) {
        status.textContent = "";
    }

    return valid;
}

function collectFormData(form) {
    const formData = new FormData(form);

    return {
        name: formData.get("name").trim(),
        cpf: formData.get("cpf").trim(),
        email: formData.get("email").trim(),
        phone: formData.get("phone").trim(),
        cep: formData.get("cep").trim(),
        city: formData.get("city").trim(),
        address: formData.get("address").trim(),
        interests: formData.getAll("interests")
    };
}

function showToast(message, type = "success") {
    const container = document.querySelector(
        "#toast-container"
    );

    if (!container) {
        return;
    }

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.setAttribute("role", "status");

    toast.textContent = message;

    container.appendChild(toast);

    window.setTimeout(() => {
        toast.remove();
    }, 4000);
}

function updateHistory() {
    const history = document.querySelector(
        "#registration-history"
    );

    if (!history) {
        return;
    }

    history.innerHTML = renderRegistrationHistory(
        getRegistrations()
    );
}

export function initializeForm() {
    const form = document.querySelector("#volunteer-form");

    if (!form) {
        return;
    }

    const cpf = form.querySelector("#cpf");
    const phone = form.querySelector("#phone");
    const cep = form.querySelector("#cep");

    cpf?.addEventListener("input", (event) => {
        event.target.value = formatCPF(
            event.target.value
        );

        clearFieldError(event.target);
    });

    phone?.addEventListener("input", (event) => {
        event.target.value = formatPhone(
            event.target.value
        );

        clearFieldError(event.target);
    });

    cep?.addEventListener("input", (event) => {
        event.target.value = formatCEP(
            event.target.value
        );

        clearFieldError(event.target);
    });

    form.addEventListener("input", (event) => {
        if (event.target.matches("input, select, textarea")) {
            clearFieldError(event.target);
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!validateForm(form)) {
            const firstInvalid = form.querySelector(
                '[aria-invalid="true"]'
            );

            firstInvalid?.focus();

            showToast(
                "Corrija os campos destacados.",
                "error"
            );

            return;
        }

        const registration = collectFormData(form);

        saveRegistration(registration);

        form.reset();

        form.querySelectorAll(
            'input[aria-invalid="true"]'
        ).forEach((input) => {
            clearFieldError(input);
        });

        const status = form.querySelector("#form-status");

        if (status) {
            status.textContent =
                "Cadastro realizado com sucesso.";
        }

        showToast(
            "Cadastro realizado com sucesso.",
            "success"
        );

        updateHistory();
    });

    form.addEventListener("reset", () => {
        window.setTimeout(() => {
            form.querySelectorAll(
                '[aria-invalid="true"]'
            ).forEach((input) => {
                clearFieldError(input);
            });

            const status = form.querySelector("#form-status");

            if (status) {
                status.textContent = "";
            }
        }, 0);
    });

    updateHistory();
}
