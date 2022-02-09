import { NavLink } from 'remix';
import { SITE } from '~/constants/global';

export default function SideDrawer() {
    const handleClick = () => {
        const drawerCheckbox: HTMLInputElement | null =
            document.querySelector('#nav-drawer');

        if (drawerCheckbox) {
            drawerCheckbox.checked = false;
        }
    };

    return (
        <div className="drawer-side">
            <label htmlFor="nav-drawer" className="drawer-overlay"></label>
            <ul className="p-4 overflow-y-auto menu w-80 bg-base-100">
                {SITE.navLinks.map((item) => (
                    <li key={item.to}>
                        <NavLink to={item.to} onClick={handleClick}>
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}
