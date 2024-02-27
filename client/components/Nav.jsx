"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
// import { signIn, signOut, useSession, getProviders } from "next-auth/react";
// , "ACTIVITIES", "BLOG", "", ''
const navLinks = [
  { href: "/about", text: "ABOUT" },
  { href: "/activities", text: "ACTIVITIES" },
  { href: "/activities", text: "BLOG" },
  { href: "/activities", text: "NYEUNGANA" },
  { href: "/activities", text: "LOYALTY" },
];

const Nav = () => {
  const isUserLoggedIn = false;

  const [toggleDropdown, setToggleDropdown] = useState(true);

  return (
    <nav className="flex-between w-full mb-16 pt-8">
      <Link href="/" className="flex">
        <Image
          src="/assets/images/nyeusi-logo.png"
          alt="Promptopia Logo"
          width={200}
          height={200}
          className="object-contain"
        />
      </Link>

      {/*Mobile Navigation*/}
      <div className="lg:hidden flex relative">
        <img
          src="/assets/icons/menu.svg"
          alt="menu"
          width={40}
          height={40}
          onClick={() => setToggleDropdown((prev) => !prev)}
        />

        {/* Render dropdown menu if toggleDropdown is true */}
        {toggleDropdown && (
          <div className="dropdown">
            {isUserLoggedIn ? (
              <div className="dropdown">
                {navLinks.map((link, index) => (
                  <Link key={index} href={link.href}>
                    {link.text}
                  </Link>
                ))}
                <button className="yellow_btn">SUPPORT US</button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-5 text-white">
                {navLinks.map((link, index) => (
                  <Link key={index} href={link.href}>
                    {link.text}
                  </Link>
                ))}
                <button className="yellow_btn w-40">SUPPORT US</button>
                <button className="outline_btn w-40">REGISTER</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="lg:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex items-center gap-5 text-white">
            {navLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                {link.text}
              </Link>
            ))}
            <button className="yellow_btn">SUPPORT US</button>
          </div>
        ) : (
          <div className="flex items-center gap-5 text-white">
            {navLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                {link.text}
              </Link>
            ))}
            <button className="yellow_btn">SUPPORT US</button>
            <button className="outline_btn">REGISTER</button>

            {}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
