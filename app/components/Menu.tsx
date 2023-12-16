import { HomeRounded, PersonRounded } from "@mui/icons-material";

type Link = {
  path: string;
  label: string;
};

type MenuProps = {
  links: Link[];
};

const Menu = ({ links }: MenuProps) => {
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
          <PersonRounded />
        </a>
      </li>
    </ul>
  );
};

export default Menu;
