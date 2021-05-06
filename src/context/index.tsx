import React from 'react';

import PlaylistProvider from './playListContext';
import PlayerProvide from './playerContext';

interface props {
  children: React.ReactNode;
}

const index: React.FC<props> = ({children}) => {
  return (
    <PlayerProvide>
      <PlaylistProvider>{children}</PlaylistProvider>
    </PlayerProvide>
  );
};

export default index;
