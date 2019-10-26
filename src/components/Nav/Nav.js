import React from 'react';
import Link from 'next/link';
import './Nav.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/scan', label: 'Scan' }
];

const Nav = () => (
  <nav>
    <ul>
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav
