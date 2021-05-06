import React, {createContext, useContext} from 'react';

type ContextType = {};

export const PlayerContext = createContext<ContextType>({} as ContextType);

export const usePlayer = () => {
  const context = useContext(PlayerContext);

  return context;
};
