

function SideBarItem( { title, href }: { title: string, href: string } ) {
    return (
        <a href={href} className="side-bar-item flex items-center space-x-4 p-2 text-3xl">
            <b>{title}</b>
        </a>
    );
}

export default SideBarItem;