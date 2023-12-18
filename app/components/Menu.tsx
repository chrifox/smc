"use client";

import { HomeRounded, PersonRounded } from "@mui/icons-material";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

type Link = {
  path: string;
  label: string;
};

type MenuProps = {
  links: Link[];
};

const Menu = ({ links }: MenuProps) => {
  const { user } = useContext(UserContext);

  return (
    <ul className="px-4 flex flex-row justify-start items-center w-full bg-gray-900">
      <li>
        <a className="flex p-2" href="/">
          <HomeRounded />
        </a>
      </li>

      {links.map((link: Link) => (
        <li key={link.label}>
          <a className="flex p-4" href={link.path}>
            {link.label}
          </a>
        </li>
      ))}

      <li className="ml-auto">
        <a className="flex p-2" href="/user/account">
          <span className="mr-2">{user?.email || ""}</span>
          <PersonRounded />
        </a>
      </li>
    </ul>
  );
};

export default Menu;
