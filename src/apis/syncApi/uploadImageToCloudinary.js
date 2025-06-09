export const uploadImageToCloudinary = async (imageFileObject) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const timestamp = Date.now();
  const baseName = imageFileObject.name.replace(/\.[^/.]+$/, ''); // 확장자 제거
  const formData = new FormData();
  formData.append('file', imageFileObject);
  formData.append('upload_preset', 'rolling_preset');
  formData.append('public_id', `images/${baseName}_${timestamp}`);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || 'Cloudinary upload failed');
    }
    const data = await res.json();
    return data.url;
  } catch (e) {
    console.error(e);
  }
};
