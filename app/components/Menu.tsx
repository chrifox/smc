type Link = {
  path: string;
  label: string;
};

type MenuProps = {
  links: Link[];
};

const Menu = ({ links }: MenuProps) => {
  return (
    <div className="w-full bg-500">
      {links.map((link: Link) => (
        <a className="p-2" href={link.path}>{link.label}</a>
      ))}
    </div>
  );
};

export default Menu;
