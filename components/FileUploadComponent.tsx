import React, { useState, ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios';

const FileUploadComponent: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response: AxiosResponse = await axios.post('http://localhost:8080/video/upload', formData, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          },
        });

        console.log('File upload successful:', response.data);
        // Perform actions after successful upload
      } catch (error) {
        console.error('Error uploading file:', error);
        // Handle upload error
      }
    } else {
      // Handle case where no file is selected
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      <div>Upload Progress: {uploadProgress}%</div>
      <progress value={uploadProgress} max={100} />
    </div>
  );
};

export default FileUploadComponent;
