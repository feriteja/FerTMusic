import React, {ContextType, useEffect, useState} from 'react';
import TrackPlayer, {Track, TrackType} from 'react-native-track-player';
import MusicFiles, {Constants} from 'react-native-get-music-files-v3dev-test';
import {
  check,
  requestMultiple,
  checkMultiple,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {iMusic} from '../../constant/interface';
import {PlayListContext} from './context';

interface props {
  children: React.ReactNode;
}

const playListContext: React.FC<props> = ({children}) => {
  const [playList, setPlayList] = useState<iMusic[]>([]);

  const checkPermission = async () => {
    const storagePermit = await checkMultiple([
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]);
    console.log(storagePermit);

    switch (storagePermit['android.permission.READ_EXTERNAL_STORAGE']) {
      case RESULTS.UNAVAILABLE:
        request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
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

      console.log(list);

      const musicList: any =
        list?.results?.map(song => {
          return {
            album: song.album,
            artist: song.artist,
            duration: song.duration,
            id: song.id,
            url: song.path,
            title: song.title,
            // artwork: musicInfo,
          };
        }) || {};

      await TrackPlayer.add(musicList);
      setPlayList(musicList);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const skip = (id: string) => {
    return TrackPlayer.skip(id);
  };

  const next = useEffect(() => {
    checkPermission();
    return () => TrackPlayer.destroy();
  }, []);

  return (
    <PlayListContext.Provider value={{playList}}>
      {children}
    </PlayListContext.Provider>
  );
};

export default playListContext;
