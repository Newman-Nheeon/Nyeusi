"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
// import { signIn, signOut, useSession, getProviders } from "next-auth/react";
// , "ACTIVITIES", "BLOG", "", ''
const navLinks = [
  { href: "https://nyeusi.org/about-us/", text: "ABOUT" },
  { href: "https://nyeusi.org/our-activities/", text: "ACTIVITIES" },
  { href: "https://nyeusi.org/blog/", text: "BLOG" },
  { href: "https://nyeusi.org/nyeungana/", text: "NYEUNGANA" },
  { href: "https://nyeusi.org/loyalty/", text: "LOYALTY" },
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
      <div className="lg:hidden flex relative  z-10">
        <img
          src="/assets/icons/menu.svg"
          alt="menu"
          width={40}
          height={40}
          onClick={() => setToggleDropdown((prev) => !prev)}
        />

        {/* Render dropdown menu if toggleDropdown is true */}
        {toggleDropdown && (
          <div className="dropdown ">
            {isUserLoggedIn ? (
              <div className="dropdown" onClick={closeDropdown}>
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="cursor-pointer"
                    onClick={closeDropdown}
                  >
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
                <Link
                  href="https://nyeusi.org/support-us/"
                  className="yellow_btn w-40"
                  onClick={closeDropdown}
                >
                  SUPPORT US
                </Link>
                {/* <Link
                  href="/register"
                  className="outline_btn"
                  onClick={closeDropdown}
                >
                  REGISTER
                </Link> */}
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
            <Link href="/support" className="yellow_btn">
              SUPPORT US
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-5 text-white">
            {navLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                {link.text}
              </Link>
            ))}
            <Link href="/support" className="yellow_btn">
              SUPPORT US
            </Link>
            {/* <Link href="/register" className="outline_btn">
              REGISTER
            </Link> */}

            {}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
