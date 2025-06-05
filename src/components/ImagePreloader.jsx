/**
 *
 * @param {Array} imageUrls
 * @returns
 */
const ImagePreloader = ({ imageUrls = [] }) => {
  return (
    <div style={{ display: 'none' }}>
      {imageUrls.map((url, index) => {
        return <img key={index} src={url} />;
      })}
    </div>
  );
};

export default ImagePreloader;
