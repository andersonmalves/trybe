import React from 'react';
import Search from './Search';
import FilterByNumber from './FilterByNumber';

function Header() {
  return (
    <div>
      <Search />
      <FilterByNumber />
    </div>
  );
}

export default Header;
