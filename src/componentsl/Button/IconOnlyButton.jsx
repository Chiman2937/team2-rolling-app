function IconOnlyButton({ src, alt = '' }) {
  return (
    <button
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
      }}
    >
      <img src={src} alt={alt} style={{ width: 24, height: 24 }} />
    </button>
  );
}

export default IconOnlyButton;
