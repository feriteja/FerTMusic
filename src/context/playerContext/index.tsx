import React, {useEffect, useState} from 'react';
import {PlayerContext} from './context';
import TrackPlayer, {
  addEventListener,
  getCurrentTrack,
  getTrack,
  TrackPlayerEvents,
} from 'react-native-track-player';

interface props {
  children: React.ReactNode;
}

const index: React.FC<props> = ({children}) => {
  const [isReady, setIsReady] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<TrackPlayer.Track | null>(
    null,
  );

  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SEEK_TO,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SEEK_TO,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        ],
      }).then(() => setIsReady(true));
    });
  }, []);

  useEffect(() => {
    addEventListener(TrackPlayerEvents.PLAYBACK_TRACK_CHANGED, async () => {
      const trackId = await getCurrentTrack();
      const trackInfo = await getTrack(trackId);

      if (trackInfo) {
        setCurrentTrack(trackInfo);
      }
    });
  }, []);

  return (
    <PlayerContext.Provider value={{isReady, currentTrack}}>
      {children}
    </PlayerContext.Provider>
  );
};

export default index;
