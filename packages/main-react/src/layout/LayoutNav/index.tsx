import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LayoutNav: React.FC = () => {
  let activeIndex = window.location.pathname;
  const navigate = useNavigate();

  const handleClick: MenuProps['onClick'] = (e) => {
    activeIndex = e.key;
    navigate(activeIndex);
  };

  const items = [
    { label: 'fp HomePage1', key: '/micro-fp/HomePage1' },
    { label: 'fp HomePage2', key: '/micro-fp/HomePage2' },
    { label: 'opod HomePage1', key: '/micro-opod/HomePage1' },
    { label: 'opod HomePage2', key: '/micro-opod/HomePage2' },
  ];

  return (
    <nav className="layout-nav">
      <Menu
        defaultSelectedKeys={[activeIndex]}
        items={items}
        onClick={handleClick}
      />
    </nav>
  );
};

export default LayoutNav;
