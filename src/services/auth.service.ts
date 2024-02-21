const baseURL = import.meta.env.VITE_BACKEND_URL;

export const loginUser = async (username: string, password: string) => {
    const response = await fetch(`${baseURL}/users/${username}.json`);
    if (response.ok) {
        const user = await response.json();
        console.log({ user });

        if (user.pass === password) {
            return user.name;
        }
    }

    return null;
};
