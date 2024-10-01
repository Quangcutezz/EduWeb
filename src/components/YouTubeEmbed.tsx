const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
    return (
        <div className="video-responsive">
            <iframe
                style={{
                    height: '30rem',
                    borderRadius: '10px',
                }}
                src={`https://www.youtube.com/embed/${videoId}?si=V33EMbS9GTq9hPF0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
        </div>
    );
};

export default YouTubeEmbed;
