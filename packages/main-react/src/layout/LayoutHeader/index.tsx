import React from 'react';
import { FormattedMessage } from 'react-intl';

const LayoutHeader: React.FC = () => {
  return (
    <header className="layout-header">
      <FormattedMessage id="layout.header" />
    </header>
  );
};

export default LayoutHeader;
