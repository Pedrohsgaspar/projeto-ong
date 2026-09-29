const STORAGE_KEY = "ong-juntos-fazemos-mais-cadastros";

export function getRegistrations() {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);

        if (!storedData) {
            return [];
        }

        const parsedData = JSON.parse(storedData);

        return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
        console.error(
            "Não foi possível recuperar os cadastros:",
            error
        );

        return [];
    }
}

export function saveRegistration(registration) {
    const registrations = getRegistrations();

    registrations.push({
        ...registration,
        createdAt: new Date().toISOString()
    });

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(registrations)
    );
}

export function clearRegistrations() {
    localStorage.removeItem(STORAGE_KEY);
}
