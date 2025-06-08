export const uploadImageToCloudinary = async (imageFileObject) => {
  const formData = new FormData();
  formData.append('file', imageFileObject);
  formData.append('upload_preset', 'rolling_preset');

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/dxho7f5dm/image/upload', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || 'Cloudinary upload failed');
    }
    const data = await res.json();
    return data.secure_url || data.url;
  } catch (e) {
    console.error(e);
  }
};
