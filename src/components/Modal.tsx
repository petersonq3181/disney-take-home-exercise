import { Tile as TileType } from '../types/types';
import { getTileImageUrl, getTileTitle } from '../utils/utils';

interface ModalProps {
  tile: TileType;
}

function Modal({ tile }: ModalProps) {
  const imageUrl = getTileImageUrl(tile)
  const videoUrl = tile.videoArt?.[0]?.mediaMetadata?.urls?.[0]?.url;
  const title = getTileTitle(tile); 

  return (
    <div className="modal-overlay" >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {videoUrl ? (
          <video src={videoUrl} autoPlay loop className="modal-video" />
        ) : <img src={imageUrl} alt="" className="tile-img" /> }

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
