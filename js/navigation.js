const ROUTES = {
    "/": "home",
    "/projetos": "projetos",
    "/cadastro": "cadastro"
};

export function getCurrentRoute() {
    const hash = window.location.hash || "#/";

    const path = hash.replace(/^#/, "") || "/";

    return ROUTES[path] || "404";
}

export function navigate(path) {
    const normalizedPath = path.startsWith("#")
        ? path
        : `#${path}`;

    if (window.location.hash !== normalizedPath) {
        window.location.hash = normalizedPath;
    } else {
        window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
}

export function initializeNavigation(render) {
    document.addEventListener("click", (event) => {
        const link = event.target.closest("[data-route-link]");

        if (!link) {
            return;
        }

        event.preventDefault();

        navigate(link.getAttribute("href"));
    });

    window.addEventListener("hashchange", render);
}

export function updateActiveNavigation() {
    const currentRoute = getCurrentRoute();

    document.querySelectorAll("[data-route-link]").forEach((link) => {
        const linkPath = link
            .getAttribute("href")
            .replace(/^#/, "");

        if (linkPath === `/${currentRoute === "home" ? "" : currentRoute}`) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}
