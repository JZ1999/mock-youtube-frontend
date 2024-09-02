import { useState } from 'react';
import { savePlaylist } from '../api/api';
import { Playlist } from './useFetchPlaylist';


const useCreatePlaylist = () => {
  const [playlist, setPlaylist] = useState<Playlist>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createPlaylist = async (newPlaylist: Playlist) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await savePlaylist(newPlaylist)
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

  return { playlist, loading, error, createPlaylist};
};

export default useCreatePlaylist;
