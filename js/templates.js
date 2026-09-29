const projects = [
    {
        title: "Campanha de arrecadação",
        category: "Doações",
        description:
            "Ação destinada à arrecadação de alimentos, roupas e materiais essenciais para famílias em situação de vulnerabilidade."
    },
    {
        title: "Voluntariado comunitário",
        category: "Voluntariado",
        description:
            "Programa para pessoas que desejam contribuir com tempo, conhecimentos e habilidades em ações sociais."
    },
    {
        title: "Ações de integração",
        category: "Comunidade",
        description:
            "Atividades voltadas para fortalecer vínculos comunitários e incentivar a participação social."
    }
];

export function renderHome() {
    return `
        <section class="hero" aria-labelledby="home-title">
            <div class="container hero-grid">

                <div class="hero-content">
                    <span class="eyebrow">
                        Transformação social
                    </span>

                    <h1 id="home-title">
                        Juntos podemos fazer mais
                    </h1>

                    <p>
                        Nossa missão é aproximar pessoas dispostas a ajudar
                        de iniciativas que geram impacto positivo na comunidade.
                    </p>

                    <div class="button-group">
                        <a
                            class="button"
                            href="#/projetos"
                            data-route-link="/projetos"
                        >
                            Conhecer projetos
                        </a>

                        <a
                            class="button button-secondary"
                            href="#/cadastro"
                            data-route-link="/cadastro"
                        >
                            Quero ser voluntário
                        </a>
                    </div>
                </div>

                <div class="hero-image-wrapper">
                    <img
                        class="hero-image"
                        src="/projeto-ong/imagens/ong-voluntarios.png"
                        alt="Grupo de voluntários da ONG Juntos Fazemos Mais reunidos em uma ação comunitária"
                        width="1200"
                        height="800"
                    >
                </div>

            </div>
        </section>

        <section
            class="page-section"
            aria-labelledby="about-title"
        >
            <div class="container">

                <header class="section-header">
                    <h2 id="about-title">
                        Sobre a iniciativa
                    </h2>

                    <p>
                        A ONG Juntos Fazemos Mais busca incentivar o
                        voluntariado e facilitar a participação das pessoas
                        em projetos de impacto social.
                    </p>
                </header>

                <div class="content-grid">
                    <article class="card">
                        <span class="badge">Solidariedade</span>

                        <h3>Conectar pessoas</h3>

                        <p>
                            Criamos oportunidades para que pessoas possam
                            contribuir com causas sociais.
                        </p>
                    </article>

                    <article class="card">
                        <span class="badge badge-secondary">Impacto</span>

                        <h3>Gerar transformação</h3>

                        <p>
                            Incentivamos ações que contribuam para uma
                            comunidade mais colaborativa.
                        </p>
                    </article>

                    <article class="card">
                        <span class="badge">Participação</span>

                        <h3>Fortalecer comunidades</h3>

                        <p>
                            O voluntariado permite transformar pequenas
                            atitudes em resultados coletivos.
                        </p>
                    </article>
                </div>
            </div>
        </section>
    `;
}

export function renderProjects() {
    const projectCards = projects
        .map(
            (project) => `
                <article class="card">
                    <span class="badge">
                        ${project.category}
                    </span>

                    <h2>${project.title}</h2>

                    <p>
                        ${project.description}
                    </p>

                    <button
                        class="button"
                        type="button"
                        data-project="${project.title}"
                    >
                        Saiba mais
                    </button>
                </article>
            `
        )
        .join("");

    return `
        <section
            class="page-section"
            aria-labelledby="projects-title"
        >
            <div class="container">

                <header class="section-header">
                    <h1 id="projects-title">
                        Nossos projetos
                    </h1>

                    <p>
                        Conheça algumas das iniciativas desenvolvidas
                        para incentivar a participação e o impacto social.
                    </p>
                </header>

                <div
                    class="content-grid"
                    aria-label="Lista de projetos"
                >
                    ${projectCards}
                </div>

            </div>
        </section>
    `;
}

export function renderRegistration() {
    return `
        <section
            class="page-section"
            aria-labelledby="registration-title"
        >
            <div class="container">

                <header class="section-header">
                    <h1 id="registration-title">
                        Cadastro de voluntário
                    </h1>

                    <p>
                        Preencha os dados abaixo para registrar seu
                        interesse em participar das ações da ONG.
                    </p>
                </header>

                <div class="alert alert-info" role="note">
                    <span aria-hidden="true">ⓘ</span>

                    <p>
                        Os campos marcados com
                        <span class="required">*</span>
                        são obrigatórios.
                    </p>
                </div>

                <div class="form-container">
                    <form
                        id="volunteer-form"
                        novalidate
                        aria-describedby="form-status"
                    >

                        <div
                            id="form-status"
                            class="field-error"
                            aria-live="polite"
                        ></div>

                        <fieldset>
                            <legend>Dados pessoais</legend>

                            <div class="form-grid">

                                <div class="field">
                                    <label for="name">
                                        Nome completo
                                        <span class="required"
                                            aria-hidden="true">*</span>
                                    </label>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autocomplete="name"
                                        required
                                        aria-required="true"
                                    >

                                    <div
                                        class="field-error"
                                        data-error-for="name"
                                        aria-live="polite"
                                    ></div>
                                </div>

                                <div class="field">
                                    <label for="cpf">
                                        CPF
                                        <span class="required"
                                            aria-hidden="true">*</span>
                                    </label>

                                    <input
                                        id="cpf"
                                        name="cpf"
                                        type="text"
                                        inputmode="numeric"
                                        autocomplete="off"
                                        placeholder="000.000.000-00"
                                        maxlength="14"
                                        required
                                    >

                                    <div
                                        class="field-error"
                                        data-error-for="cpf"
                                        aria-live="polite"
                                    ></div>
                                </div>

                                <div class="field">
                                    <label for="email">
                                        E-mail
                                        <span class="required"
                                            aria-hidden="true">*</span>
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autocomplete="email"
                                        required
                                    >

                                    <div
                                        class="field-error"
                                        data-error-for="email"
                                        aria-live="polite"
                                    ></div>
                                </div>

                                <div class="field">
                                    <label for="phone">
                                        Telefone
                                        <span class="required"
                                            aria-hidden="true">*</span>
                                    </label>

                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        inputmode="numeric"
                                        autocomplete="tel"
                                        placeholder="(00) 00000-0000"
                                        maxlength="15"
                                        required
                                    >

                                    <div
                                        class="field-error"
                                        data-error-for="phone"
                                        aria-live="polite"
                                    ></div>
                                </div>

                            </div>
                        </fieldset>

                        <fieldset>
                            <legend>Endereço</legend>

                            <div class="form-grid">

                                <div class="field">
                                    <label for="cep">
                                        CEP
                                        <span class="required"
                                            aria-hidden="true">*</span>
                                    </label>

                                    <input
                                        id="cep"
                                        name="cep"
                                        type="text"
                                        inputmode="numeric"
                                        autocomplete="postal-code"
                                        placeholder="00000-000"
                                        maxlength="9"
                                        required
                                    >

                                    <div
                                        class="field-error"
                                        data-error-for="cep"
                                        aria-live="polite"
                                    ></div>
                                </div>

                                <div class="field">
                                    <label for="city">
                                        Cidade
                                        <span class="required"
                                            aria-hidden="true">*</span>
                                    </label>

                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        autocomplete="address-level2"
                                        required
                                    >

                                    <div
                                        class="field-error"
                                        data-error-for="city"
                                        aria-live="polite"
                                    ></div>
                                </div>

                                <div class="field-full">
                                    <label for="address">
                                        Endereço
                                        <span class="required"
                                            aria-hidden="true">*</span>
                                    </label>

                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        required
                                    >

                                    <div
                                        class="field-error"
                                        data-error-for="address"
                                        aria-live="polite"
                                    ></div>
                                </div>

                            </div>
                        </fieldset>

                        <fieldset>
                            <legend>Interesses</legend>

                            <div class="checkbox-group">

                                <label class="checkbox-option">
                                    <input
                                        type="checkbox"
                                        name="interests"
                                        value="doacoes"
                                    >

                                    <span>Doações</span>
                                </label>

                                <label class="checkbox-option">
                                    <input
                                        type="checkbox"
                                        name="interests"
                                        value="voluntariado"
                                    >

                                    <span>Voluntariado</span>
                                </label>

                                <label class="checkbox-option">
                                    <input
                                        type="checkbox"
                                        name="interests"
                                        value="eventos"
                                    >

                                    <span>Eventos</span>
                                </label>

                            </div>

                            <div
                                class="field-error"
                                data-error-for="interests"
                                aria-live="polite"
                            ></div>
                        </fieldset>

                        <div class="form-actions">
                            <button
                                class="button button-secondary"
                                type="reset"
                            >
                                Limpar
                            </button>

                            <button
                                class="button"
                                type="submit"
                            >
                                Enviar cadastro
                            </button>
                        </div>

                    </form>
                </div>

                <div
                    id="registration-history"
                    class="registration-list"
                    aria-labelledby="history-title"
                ></div>

            </div>
        </section>
    `;
}

export function renderNotFound() {
    return `
        <section
            class="page-section"
            aria-labelledby="not-found-title"
        >
            <div class="container empty-state">

                <h1 id="not-found-title">
                    Página não encontrada
                </h1>

                <p>
                    A rota acessada não existe.
                </p>

                <a
                    class="button"
                    href="#/"
                    data-route-link="/"
                >
                    Voltar ao início
                </a>

            </div>
        </section>
    `;
}

export function renderRegistrationHistory(registrations) {
    if (!registrations.length) {
        return `
            <div class="empty-state">
                <h2 id="history-title">
                    Cadastros realizados neste navegador
                </h2>

                <p>
                    Nenhum cadastro foi armazenado localmente.
                </p>
            </div>
        `;
    }

    const items = registrations
        .map(
            (registration) => `
                <article class="registration-item">
                    <div>
                        <strong>${registration.name}</strong>
                        <p>${registration.email}</p>
                    </div>

                    <span class="badge">
                        Cadastro salvo
                    </span>
                </article>
            `
        )
        .join("");

    return `
        <section aria-labelledby="history-title">
            <header class="section-header">
                <h2 id="history-title">
                    Cadastros realizados neste navegador
                </h2>

                <p>
                    Os dados abaixo estão armazenados localmente no navegador.
                </p>
            </header>

            ${items}
        </section>
    `;
}
