// hooks/useFetchVideos.ts

import { useState } from 'react';
import { fetchVideos } from '../api/api';

export interface Video {
    id: number;
    title: string;
    video_id: string;
    views: number;
    likes: number;
    comments: number;
    description?: string | null;
    thumbnail_url: string;
    created_at: string; // ISO 8601 formatted date string
    updated_at: string; // ISO 8601 formatted date string
  }

export interface VideoResult {
    count: number;
    next: string;
    previous: string;
    results: Video[];
}

const useFetchVideos = () => {
  const [videos, setVideos] = useState<VideoResult>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = (page: number, search: string = "") => {
    const fetchVideosData = async () => {
      try {
        const data = await fetchVideos(page, search);
        setVideos(data);
      } catch (apiError) {
        setError(apiError as string);
      } finally {
        setLoading(false);
      }
    };

    fetchVideosData();
  };

  return { videos, loading, error, fetchData };
};

export default useFetchVideos;
