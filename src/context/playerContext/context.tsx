import React, {createContext, useContext} from 'react';
import {Track} from 'react-native-track-player';

type ContextType = {
  currentTrack: Track;
  isReady: boolean;
  artWork: string | undefined;
  setArtWork: (value: string) => void;
};

export const PlayerContext = createContext<ContextType>({} as ContextType);

export const usePlayer = () => {
  const context = useContext(PlayerContext);

  return context;
};
