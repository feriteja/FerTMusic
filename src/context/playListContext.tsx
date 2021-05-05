import React, {ContextType, useEffect, useState} from 'react';
import TrackPlayer from 'react-native-track-player';
import MusicFiles, {
  Constants,
  CoverImage,
} from 'react-native-get-music-files-v3dev-test';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {iMusic} from '../constant/interface';

interface props {
  children: React.ReactNode;
}

type contextType = {
  playList: iMusic[];
};

export const MusicListContext = React.createContext<contextType>(
  {} as contextType,
);

const playListContext: React.FC<props> = ({children}) => {
  const [playList, setPlayList] = useState([]);

  const checkPermission = async () => {
    const storagePermit = await check(
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    );

    switch (storagePermit) {
      case RESULTS.UNAVAILABLE:
        request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
          console.log(result);
        });
        break;
      case RESULTS.DENIED:
        console.log(
          'The permission has not been requested / is denied but requestable',
        );
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        break;
      case RESULTS.GRANTED:
        setUpMusicList();
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        break;
    }
  };

  const setUpMusicList = async () => {
    try {
      await TrackPlayer.setupPlayer();
      const list = await MusicFiles.getAll({
        cover: true,
        batchSize: 0,
        batchNumber: 0,
        minimumSongDuration: 20000,
        sortBy: Constants.SortBy.Title,
        sortOrder: Constants.SortOrder.Ascending,
      });

      const musicList: iMusic[] =
        list?.results?.map(song => {
          return {
            album: song.album,
            artist: song.artist,
            duration: song.duration,
            id: song.id,
            url: song.path,
            title: song.title,
          };
        }) || {};

      await TrackPlayer.add(musicList);
      setPlayList(musicList);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return (
    <MusicListContext.Provider value={playList}>
      {children}
    </MusicListContext.Provider>
  );
};

export default playListContext;
