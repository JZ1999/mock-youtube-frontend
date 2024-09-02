import React, { ReactNode } from 'react';

interface HeaderProps {
    children?: ReactNode;
}

const Header: React.FC<HeaderProps> = (props) => {
    return <nav>Navigation {props.children}</nav>
}

export default Header;