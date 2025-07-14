import { useEffect, useState, useRef } from 'react'; 
import { Tile as TileType } from '../types/types';
import { getTileImageUrl, getTileTitle } from '../utils/utils';

// seconds to block video preview 
const blockerSeconds = 5; 

const disneyPlusSignUpUrl = 'https://www.disneyplus.com/sign-up';

interface ModalProps {
  tile: TileType;
}

function Modal({ tile }: ModalProps) {
  const imageUrl = getTileImageUrl(tile)
  const videoUrl = tile.videoArt?.[0]?.mediaMetadata?.urls?.[0]?.url;
  const title = getTileTitle(tile); 

  const [showSubscription, setShowSubscription] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoUrl && !loading && videoRef.current) {
      setShowSubscription(false);
      setLoading(false);
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
        setShowSubscription(true);
      }, blockerSeconds * 1000);

      return () => clearTimeout(timer);
    }
  }, [videoUrl, loading]); 

  return (
    <div className="modal-overlay" >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {videoUrl ? (
          <div className="modal-video-wrapper">
            <video 
              ref={videoRef} 
              src={videoUrl} 
              autoPlay 
              loop 
              className="modal-video" 
              onLoadStart={() => setLoading(true)}
              onCanPlay={() => setLoading(false)}
            />
            {loading && (
              <div className="subscription-overlay">
                <p className="subscription-message">Loading...</p>
              </div>
            )}
            {showSubscription && !loading && (
              <div className="subscription-overlay">
                <p className="subscription-message">
                  To continue watching preview {' '}
                  <a
                    href={disneyPlusSignUpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="subscription-link"
                  >
                    Sign up for Disney+ 
                  </a>
                </p>
              </div>
            )}
          </div>
        ) : (
          <img src={imageUrl} alt="" className="tile-img" />
        )}

        <div className="modal-info">
            <div className="modal-info-left">
                <h2>{title}</h2>

                {tile.type && <p><strong>Type:</strong> {tile.type}</p>}
                {tile.currentAvailability?.region && <p><strong>Region:</strong> {tile.currentAvailability.region}</p>}
                {tile.currentAvailability?.kidsMode && <p><strong>Kids mode:</strong> Enabled</p>}
            </div>

            {tile.releases?.length > 0 && (
                <div className="modal-info-right">
                    <h3>Release Info</h3>
                    {tile.releases.map((release, idx) => (
                        <div key={idx} className="release-block">
                            {release.releaseYear && <p><strong>Year:</strong> {release.releaseYear}</p>}
                            {release.releaseDate && <p><strong>Date:</strong> {release.releaseDate}</p>}
                            {release.releaseType && <p><strong>Type:</strong> {release.releaseType}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
