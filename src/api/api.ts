import { Playlist } from "../hooks/useFetchPlaylist";

const API_BASE_URL = `${process.env.REACT_APP_API_URL}`


interface Body {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  [key: string]: any;
}


// Utility function to handle API requests
const fetchApi = async (endpoint: string, method: string = 'GET', body?: Body) => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export const fetchUser = (userId: string) => {
  return fetchApi(`/users/${userId}/`);
};

export const fetchPlaylists = () => {
  return fetchApi('/videos/playlist/');
};

export const savePlaylist = (playlist: Playlist) => {
  return fetchApi('/videos/playlist/', "POST", playlist);
};

export const updatePlaylist = (playlist: Playlist) => {
  return fetchApi(`/videos/playlist/${playlist.id}/`, "PUT", playlist);
};

export const deleteVideoFromPlaylist = (videoId: number) => {
  return fetchApi(`/videos/playlist/video/${videoId}/`, "DELETE");
};

export const fetchVideos = (page: number = 1, search: string = '') => {
  return fetchApi(`/videos/?page=${page}&search=${search}`);
};

export const loginUser = async (username: string, password: string): Promise<string> => {
    const response = await fetchApi('/token/', 'POST', {username, password})
    
    return response.access;
};
