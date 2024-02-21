import { useStore } from "../global/store";

export const TopNav = () => {
    const { logout } = useStore();

    const handleLogout = () => {
        logout();
    }

    return (
        <header className="bg-white fixed w-full">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <div className="flex items-center justify-center">
                        <img className="h-14 w-auto" src="https://i0.wp.com/www.radioseibo.org/wp-content/uploads/2023/04/Logo-RS.jpeg?fit=185%2C229&ssl=1" alt="Radio Seybo App" />
                        <span className="font-bold text-2xl ml-5 text-zinc-800" >Dashboard</span>
                    </div>
                </div>

                <div className="flex lg:flex lg:flex-1 lg:justify-end">
                    <span onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-100 cursor-pointer bg-red-100 hover:bg-red-700 py-2 px-5 rounded-full transition">
                        Cerrar sesión
                    </span>
                </div>
            </nav>

        </header>
    )
}
