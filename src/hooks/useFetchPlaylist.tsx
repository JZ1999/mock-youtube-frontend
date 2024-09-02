// hooks/useFetchVideos.ts

import { useState, useEffect } from 'react';
import { fetchPlaylists } from '../api/api';

export interface Playlist {
    id?: number
    video_ids: number[];
    user?: number;
  }

const useFetchPlaylist = () => {
  const [playlist, setPlaylist] = useState<Playlist>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const data = await fetchPlaylists();
        setPlaylist(data);
      } catch (apiError) {
        setError(apiError as string);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistData();
  }, []);

  return { playlist, loading, error, setPlaylist };
};

export default useFetchPlaylist;
