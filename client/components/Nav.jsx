"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { href: "/", text: "SIGN UP" }, // Root page for sign-up
  { href: "/vote", text: "VOTE" }, // Vote page
  { href: "https://nyeusi.org", text: "HOME" }, // Official website
];

const Nav = () => {
  const isUserLoggedIn = false;

  const [toggleDropdown, setToggleDropdown] = useState(false);

  const closeDropdown = () => {
    setToggleDropdown(false);
  };

  return (
    <nav className="flex-between w-full mb-16 pt-8">
      <Link href="/" className="flex">
        <Image
          src="/assets/images/nyeusi-logo.png"
          alt="nyeusi"
          width={200}
          height={200}
          className="object-contain cursor-pointer"
        />
      </Link>

      {/*Mobile Navigation*/}
      <div className="lg:hidden flex relative z-10">
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
              <div className="dropdown" onClick={closeDropdown}>
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="cursor-pointer text-white gilam-bold"
                    onClick={closeDropdown}
                  >
                    {link.text}
                  </Link>
                ))}
                <button className="yellow_btn gilam-bold">SUPPORT</button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-5 text-white">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="gilam-bold text-white"
                  >
                    {link.text}
                  </Link>
                ))}
                <Link
                  href="https://nyeusi.org/support-us/"
                  className="yellow_btn w-40 gilam-bold"
                  onClick={closeDropdown}
                >
                  SUPPORT
                </Link>
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
              <Link
                key={index}
                href={link.href}
                className="gilam-bold text-white"
              >
                {link.text}
              </Link>
            ))}
            <Link
              href="https://nyeusi.org/support-us/"
              className="yellow_btn gilam-bold"
            >
              SUPPORT US
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-5 text-white">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="gilam-bold text-white"
              >
                {link.text}
              </Link>
            ))}
            <Link
              href="https://nyeusi.org/support-us/"
              className="yellow_btn gilam-bold"
            >
              SUPPORT US
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
