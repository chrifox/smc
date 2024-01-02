"use client";

import { useContext, useEffect, useState } from "react";
import { HomeRounded, MenuRounded, PersonRounded } from "@mui/icons-material";
import { UserContext } from "../../context/UserContext";
import {
  ACCOUNT,
  CAMPAIGN_LIST,
  CHARACTER_LIST,
  CREATE_CHARACTER,
  HOME,
} from "@/app/constants/routes";

type Link = {
  path: string;
  label: string;
};

type MenuProps = {};

const Menu = ({}: MenuProps) => {
  const { user } = useContext(UserContext);
  const [links, setLinks] = useState<Link[]>([]);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  function toggleMenu() {
    setMenuOpen((previous) => !previous);
  }

  useEffect(() => {
    if (user) {
      setLinks([
        {
          path: CREATE_CHARACTER,
          label: "Create Character",
        },
        {
          path: CHARACTER_LIST,
          label: "Characters",
        },
        {
          path: CAMPAIGN_LIST,
          label: "Campaigns",
        },
      ]);
    }
  }, [user]);

  return (
    <div className="px-4 w-full bg-gray-900">
      <ul className="list-none flex flex-row justify-start items-center">
        <li>
          <a className="flex p-2" href={HOME}>
            <HomeRounded />
          </a>
        </li>

        <div className="hidden sm:flex">
          {links.map((link: Link) => (
            <li key={link.label}>
              <a className="flex p-4" href={link.path}>
                {link.label}
              </a>
            </li>
          ))}
        </div>

        <li className="hidden sm:block ml-auto">
          <a className="flex p-2" href="/user/account">
            <span className="mr-2">{user?.email || ""}</span>
            <PersonRounded />
          </a>
        </li>

        <li className="sm:hidden ml-auto">
          <a className="flex p-2" onClick={toggleMenu}>
            <MenuRounded />
          </a>
        </li>
      </ul>

      {menuOpen && (
        <div className="absolute left-0 w-full bg-gray-900">
          <ul className="list-none flex flex-col">
            <li>
              <a className="flex p-4" href={ACCOUNT}>
                Account
              </a>
            </li>
            {links.map((link: Link) => (
              <li key={link.label}>
                <a className="flex p-4" href={link.path}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
