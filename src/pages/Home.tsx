import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import useFetchVideos, { Video } from '../hooks/useFetchVideos';
import useFetchPlaylist from '../hooks/useFetchPlaylist';
import SearchBar from '../components/SearchBar/SearchBar';
import useCreatePlaylist from '../hooks/useCreatePlaylist';
import VideoThumbnail from '../components/Video/VideoThumbnail';
import Loading from '../components/Loading';
import {useDebounce} from '../utils/debounce';

const HomePage: React.FC = () => {
    const [playlistVideos, setPlaylistVideos] = useState<Video[]>([]);
    const [page, setPage] = useState(1);
    const { videos, loading: videosLoading, fetchData: fetchVideos } = useFetchVideos();
    const { playlist, loading: playlistLoading, setPlaylist } = useFetchPlaylist();
    const { loading: createPlaylistLoading, createPlaylist } = useCreatePlaylist();

    const loading = videosLoading || playlistLoading || createPlaylistLoading;
    
    const shouldShowLoading = loading || !videos?.results.length;

    const [debouncedValue, setValue] = useDebounce<number>(1, 1000);

    useEffect(() => {
        if(!videos) fetchVideos(page)
    }, [videos, page, fetchVideos])
    
    useEffect(() => {
        if (playlist) {
            // Get videos based of the list of video ids from the playlist
            const videosByPlaylistIds: Video[] = [];
            for(const id of playlist.video_ids) {
                const video = videos?.results.filter(video => video.id === id)[0];
                if (video) videosByPlaylistIds.push(video);
            }

            setPlaylistVideos(videosByPlaylistIds);

            // Create a playlist if it does not exist
            if(!playlist.user) {
                createPlaylist({video_ids: []}).then((newPlaylist) => {
                    setPlaylist(newPlaylist);
                })
            }
        }
    }, [playlist, videos?.results]);

    useEffect(() => {        
        if(debouncedValue !== page) {
            setPage(page+1);
        }
    }, [debouncedValue, page])

    useEffect(() => {
        
        // Event listener for scrolling, for lazy loading
        const handleScroll = async () => {
            const offset = 100; // Load next batch of products before reaching the bottom
            
            if (
            Math.round(window.innerHeight + document.documentElement.scrollTop) >=
            document.documentElement.offsetHeight - offset
            ) {                
             setValue(page+1)
            }
        };

        // Add event listener when the component mounts
        document.removeEventListener('scroll', handleScroll);
        document.addEventListener('scroll', handleScroll);

        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [page, setPage]); // Re-run the effect when the page changes
    

    return <main>
        <Header>
            <SearchBar onSearch={(search) => fetchVideos(page, search)}></SearchBar>
        </Header>

        {shouldShowLoading && <Loading></Loading>}

        <section id="playlist" className='m-4 flex max-w justify-center overflow-scroll'>
            <div>My Playlist</div>
            {!shouldShowLoading && (
                playlistVideos.map((video) => (
                <VideoThumbnail key={video.id} video={video}
                 inPlaylist={true} setPlaylist={setPlaylist} playlistId={playlist?.id}/>
                ))
            )}
        </section>

        <div className='flex flex-wrap mx-4 max-w justify-center'>
            <div className='flex-row'>Videos</div>
            {!shouldShowLoading && (
            videos?.results.map((video) => (
            <VideoThumbnail key={video.id} video={video}
             inPlaylist={false} playlistId={playlist?.id} setPlaylist={setPlaylist}/>
            ))
        )}
      </div>
    </main>
}

export default HomePage;