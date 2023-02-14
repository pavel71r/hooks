import React from 'react';

import './Footer.css';
import Filters from '../Filters/Filters';

type FooterType = {
  statusCount: number;
  buttonsFilter: (e: string) => void;
  clearCompleted: () => void;
};

const Footer = (props: FooterType) => {
  return (
    <div className="Footer">
      <span>{props.statusCount} item left</span>
      <Filters
        buttonsFilter={(value) => {
          props.buttonsFilter(value);
        }}
      />
      <button className="ClearCompleted" onClick={props.clearCompleted}>
        Clear completed
      </button>
    </div>
  );
};

export default Footer;
