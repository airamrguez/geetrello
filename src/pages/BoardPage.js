import React from 'react';
import Board from '../components/Board';
import Header from '../components/Header';
import './BoardPage.scss';

export default function BoardPage() {
  return (
    <div className="BoardPage">
      <Header />
      <div className="page-content">
        <Board />
      </div>
    </div>
  );
}
