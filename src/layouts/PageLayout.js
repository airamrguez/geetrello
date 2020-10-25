import React from 'react';
import classNames from 'classnames';
import Header from '../components/Header';
import './PageLayout.scss';

export default function PageLayout({ className, children }) {
  return (
    <div className={classNames('PageLayout', className)}>
      <Header />
      <div className="page-content">{children}</div>
    </div>
  );
}
