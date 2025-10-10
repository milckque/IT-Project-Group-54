import type { MouseEventHandler } from "react";

function SideBarItem({
  title,
  href,
  onClick,
}: {
  title: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  // Keep markup identical for login and logout items. If an onClick is provided
  // we still render an anchor so styling remains the same; href defaults to '#'.
  return (
    <a
      href={href ?? "#"}
      onClick={onClick}
      className="side-bar-item flex items-center space-x-4 p-2 text-3xl"
    >
      <b>{title}</b>
    </a>
  );
}

export default SideBarItem;
