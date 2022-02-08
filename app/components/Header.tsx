import { Link } from 'remix';
import { tw } from 'brise';

const Navbar = tw.header`
  navbar
  mb-2
  shadow-lg
  bg-neutral
  text-neutral-content
`;

const NavbarStart = tw.div`
  px-2
  mx-2
  navbar-start
`;

const NavbarEnd = tw.div`
  navbar-end
`;

const NAV_LINKS = [
  {
    to: '/',
    label: 'Home',
  },
  {
    to: '/blog',
    label: 'Blog',
  },
  {
    to: '/about',
    label: 'About',
  },
  {
    to: '/resume',
    label: 'Resume',
  },
];

export default function Header() {
  return (
    <Navbar>
      <NavbarStart>
        <span className="text-lg font-bold">
          <Link to="/">Bhashkar Sharma</Link>
        </span>
      </NavbarStart>

      <NavbarEnd>
        <div className="flex items-stretch">
          {NAV_LINKS.map((item) => (
            <Link
              className="btn btn-ghost btn-sm rounded-btn"
              to={item.to}
              key={item.to}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </NavbarEnd>
    </Navbar>
  );
}
