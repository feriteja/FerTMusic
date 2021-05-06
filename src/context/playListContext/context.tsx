import React, {createContext, useContext} from 'react';
import {iMusic} from '../../constant/interface';

type contextType = {
  playList: iMusic[];
};

export const PlayListContext = createContext<contextType>({} as contextType);

export const usePlaylist = () => {
  const context = useContext(PlayListContext);
  return context;
};
