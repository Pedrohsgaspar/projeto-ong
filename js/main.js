import {
    getCurrentRoute,
    initializeNavigation,
    updateActiveNavigation
} from "./navigation.js";

import {
    renderHome,
    renderProjects,
    renderRegistration,
    renderNotFound
} from "./templates.js";

import {
    initializeForm
} from "./form.js";

const app = document.querySelector("#app");

function render() {
    if (!app) {
        return;
    }

    const route = getCurrentRoute();

    switch (route) {
        case "home":
            app.innerHTML = renderHome();
            break;

        case "projetos":
            app.innerHTML = renderProjects();
            break;

        case "cadastro":
            app.innerHTML = renderRegistration();
            initializeForm();
            break;

        default:
            app.innerHTML = renderNotFound();
    }

    updateActiveNavigation();

    app.focus();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function initializeMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector("#main-navigation");

    if (!menuToggle || !navigation) {
        return;
    }

    menuToggle.addEventListener("click", () => {
        const isOpen =
            navigation.classList.toggle("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Fechar menu de navegação"
                : "Abrir menu de navegação"
        );
    });

    navigation.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            navigation.classList.remove("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menu de navegação"
            );
        }
    });
}

function initializeModal() {
    const modal = document.querySelector("#modal");
    const modalBody = document.querySelector("#modal-body");
    const modalTitle = document.querySelector("#modal-title");

    if (!modal || !modalBody || !modalTitle) {
        return;
    }

    let lastFocusedElement = null;

    function openModal(title, content) {
        lastFocusedElement =
            document.activeElement;

        modalTitle.textContent = title;

        modalBody.innerHTML = `
            <p>${content}</p>
        `;

        modal.classList.add("is-open");

        modal.setAttribute("aria-hidden", "false");

        modal.querySelector(".modal-close")?.focus();
    }

    function closeModal() {
        modal.classList.remove("is-open");

        modal.setAttribute("aria-hidden", "true");

        lastFocusedElement?.focus();
    }

    document.addEventListener("click", (event) => {
        const projectButton =
            event.target.closest("[data-project]");

        if (projectButton) {
            const projectName =
                projectButton.dataset.project;

            openModal(
                projectName,
                "Esta iniciativa faz parte das ações da ONG Juntos Fazemos Mais. Em uma próxima etapa, serão disponibilizadas informações detalhadas sobre participação, datas e formas de contribuição."
            );

            return;
        }

        if (event.target.closest("[data-modal-close]")) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            modal.classList.contains("is-open")
        ) {
            closeModal();
        }
    });
}

function initializeYear() {
    const yearElement =
        document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }
}

function initializeApplication() {
    initializeMenu();

    initializeModal();

    initializeYear();

    initializeNavigation(render);

    render();
}

document.addEventListener(
    "DOMContentLoaded",
    initializeApplication
);
