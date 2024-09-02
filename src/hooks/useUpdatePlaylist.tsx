import { useState } from 'react';
import { updatePlaylist } from '../api/api';
import { Playlist } from './useFetchPlaylist';


const useUpdatePlaylist = () => {
  const [playlist, setPlaylist] = useState<Playlist>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateData = async (playlistUpdate: Playlist) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await updatePlaylist(playlistUpdate)
      setPlaylist(response);
      setLoading(false);
      return response;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { playlist, loading, error, updateData};
};

export default useUpdatePlaylist;
