
import React from 'react';
import { Video } from '../../hooks/useFetchVideos';
import useUpdatePlaylist from '../../hooks/useUpdatePlaylist';
import useDeleteVideoFromPlaylist from '../../hooks/useDeleteVideoFromPlaylist';
import { Playlist } from '../../hooks/useFetchPlaylist';

interface VideoThumbnailProps {
    video: Video;
    inPlaylist: boolean;
    playlistId?: number;
    setPlaylist: (playlist: Playlist) => void;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({video, inPlaylist, playlistId, setPlaylist}) => {
    const { updateData } = useUpdatePlaylist();
    const { deleteVideo } = useDeleteVideoFromPlaylist();
    const maxDescriptionSize = 100;

    const addEllipsis = video?.description && video.description.length > maxDescriptionSize;

    const addToPlaylistClasses = "focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bg-blue-700 hover:bg-red-800";
    const removeFromPlaylistClasses = "focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 bg-red-700 hover:bg-red-800";
    let actionButtonClasses = "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none";
    actionButtonClasses += !inPlaylist ? addToPlaylistClasses: removeFromPlaylistClasses;

    const actionButton = async (id: number) => {

        console.log(id, playlistId, inPlaylist);
        
        if (!playlistId) return;
        
        if(!inPlaylist) {
            const newPlaylist = await updateData({video_ids: [id], id: playlistId})
            setPlaylist(newPlaylist);
        } else {
            const newPlaylist = await deleteVideo(id)
            setPlaylist(newPlaylist);
        }
    }

    return <div className="basis-1/3 m-1 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#" className='block h-48'>
        <img className="rounded-lg h-auto max-w-lg mx-auto h-full" src={video.thumbnail_url} alt="" />
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{video.title}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{video.description?.substring(0, maxDescriptionSize)}{addEllipsis && "..."}</p>

        {<button onClick={() => actionButton(video.id)} className={actionButtonClasses}>
            {!inPlaylist ? "Add to playlist": "Remove from playlist"}
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>}
        
    </div>
</div>
}

export default VideoThumbnail;