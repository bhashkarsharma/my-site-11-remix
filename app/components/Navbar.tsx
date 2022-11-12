import { FaBars } from 'react-icons/fa';
import { Link, NavLink } from 'remix';
import { SITE } from '~/constants/global';

export default function Navbar() {
    return (
        <div className="w-full navbar">
            <div className="flex-1 px-2 mx-2 text-lg font-bold">
                <Link to="/">{SITE.title}</Link>
            </div>
            <div className="flex-none hidden md:block">
                <ul className="menu horizontal">
                    {SITE.navLinks.map((item) => (
                        <li key={item.to}>
                            <NavLink className="btn btn-ghost rounded-btn" to={item.to}>
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-none md:hidden">
                <label htmlFor="nav-drawer" className="btn btn-square btn-ghost">
                    <FaBars size="2em" />
                </label>
            </div>
        </div>
    );
}
