import React from 'react';
import { FormattedMessage } from 'react-intl';

const LayoutAside: React.FC = () => {
  return (
    <aside className="layout-aside">
      <FormattedMessage id="layout.aside" />
    </aside>
  );
};

export default LayoutAside;
