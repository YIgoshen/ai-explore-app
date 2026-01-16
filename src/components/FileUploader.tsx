import React, { useRef } from 'react';
import './FileUploader.css';

interface FileUploaderProps {
  onFileLoaded: (content: string) => void;
  disabled?: boolean;
}

/**
 * Component for uploading and reading JSONL files
 */
export function FileUploader({ onFileLoaded, disabled = false }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      onFileLoaded(content);
    } catch (err) {
      console.error('Failed to read file:', err);
      alert('Failed to read file. Please try again.');
    }

    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="file-uploader">
      <input
        ref={fileInputRef}
        type="file"
        accept=".jsonl"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button onClick={handleClick} disabled={disabled} className="upload-btn">
        📁 Load .jsonl File
      </button>
    </div>
  );
}
