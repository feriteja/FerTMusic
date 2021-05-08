import React, {useEffect, useState} from 'react';
import {PlayerContext} from './context';
import TrackPlayer, {
  addEventListener,
  getCurrentTrack,
  getTrack,
  STATE_PAUSED,
  STATE_PLAYING,
  TrackPlayerEvents,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import MusicInfo from 'expo-music-info';
import {AppState} from 'react-native';

const {PLAYBACK_STATE} = TrackPlayerEvents;

interface props {
  children: React.ReactNode;
}

const index: React.FC<props> = ({children}) => {
  const [isReady, setIsReady] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<
    TrackPlayer.Track | undefined
  >();
  const [artWork, setArtWork] = useState<string | undefined>('');
  const [isPlaying, setIsPlaying] = useState(false);

  //listen  is player curently playing
  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], event => {
    if (event.type === PLAYBACK_STATE) {
      if (event.state === STATE_PLAYING) {
        setIsPlaying(true);
      } else if (event.state === STATE_PAUSED) {
        setIsPlaying(false);
      }
    }
  });

  // player Capability
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

    return () => TrackPlayer.destroy();
  }, []);

  //player Listener to curent track
  useEffect(() => {
    addEventListener(TrackPlayerEvents.PLAYBACK_TRACK_CHANGED, async () => {
      const trackId = await getCurrentTrack();
      const trackInfo = await getTrack(trackId);

      if (trackInfo) {
        setCurrentTrack(trackInfo);
      }
    });

    AppState.addEventListener('change', async appState => {
      if (appState == 'active') {
        const state = await TrackPlayer.getState();

        setIsPlaying(state == TrackPlayer.STATE_PLAYING);
      }
    });
  }, []);

  const skipToNext = () => {
    TrackPlayer.skipToNext();
  };

  const skiptoPrev = () => {
    TrackPlayer.skipToPrevious();
  };

  const playhandler = () => {
    isPlaying ? TrackPlayer.pause() : TrackPlayer.play();
  };

  return (
    <PlayerContext.Provider
      value={{
        isReady,
        currentTrack,
        artWork,
        setArtWork,
        isPlaying,
        skiptoPrev,
        skipToNext,
        playhandler,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default index;
