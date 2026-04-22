import { useRef, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import DefaultImage from '../../assets/upload-photo-here.png';

const GENERATE_UPLOAD_URL = gql`
  mutation($filename: String!, $contentType: String!) {
    generateUploadUrl(filename: $filename, contentType: $contentType)
  }
`;

export function useImageUpload(initialPortraitImageUrl) {
  const [avatarURL, setAvatarURL] = useState(initialPortraitImageUrl ?? DefaultImage);
  const [portraitimageurl, setPortraitImageUrl] = useState(initialPortraitImageUrl);
  const fileUploadRef = useRef();

  const [generateUploadUrl] = useMutation(GENERATE_UPLOAD_URL);

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };

  const uploadImageDisplay = async () => {
    const uploadedFile = fileUploadRef.current.files[0];
    setAvatarURL(URL.createObjectURL(uploadedFile));

    const { data } = await generateUploadUrl({
      variables: {
        filename: uploadedFile.name,
        contentType: uploadedFile.type,
      },
    });

    const presignedUrl = data.generateUploadUrl;

    await fetch(presignedUrl, {
      method: 'PUT',
      body: uploadedFile,
      headers: { 'Content-Type': uploadedFile.type },
    });

    setPortraitImageUrl(presignedUrl.split('?')[0]);
  };

  return {
    avatarURL,
    setAvatarURL,
    portraitimageurl,
    setPortraitImageUrl,
    fileUploadRef,
    handleImageUpload,
    uploadImageDisplay,
  };
}

export default useImageUpload;
