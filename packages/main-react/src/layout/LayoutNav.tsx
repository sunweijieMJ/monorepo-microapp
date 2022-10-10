import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';

const LayoutNav: React.FC = () => {
  let activeIndex = window.location.pathname;

  const handleClick: MenuProps['onClick'] = (e) => {
    activeIndex = e.key;
    window.location.href = e.key;
  };

  const items = [
    { label: 'vue HomePage1', key: '/micro-vue/HomePage1' },
    { label: 'vue HomePage2', key: '/micro-vue/HomePage2' },
    { label: 'react HomePage1', key: '/micro-react/HomePage1' },
    { label: 'react HomePage2', key: '/micro-react/HomePage2' },
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
