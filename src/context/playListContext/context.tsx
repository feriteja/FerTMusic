import React, {createContext, useContext} from 'react';
import {Track} from 'react-native-track-player';

type contextType = {
  playList: Track[];
};

export const PlayListContext = createContext<contextType>({} as contextType);

export const usePlaylist = () => {
  const context = useContext(PlayListContext);
  return context;
};
