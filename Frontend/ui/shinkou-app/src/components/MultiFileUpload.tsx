'use client';

import {
  MultiFileDropzone,
  type FileState,
} from '@/components/upload/MultiFileDropzone';
import axios from 'axios';
import { useState } from 'react';

export function MultiFileDropzoneUsage() {
  const [fileStates, setFileStates] = useState<FileState[]>([]);

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  return (
    <div>
      <MultiFileDropzone
        value={fileStates}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const formData = new FormData();
                formData.append("myImage", addedFileState.file);
                const { data } = await axios.post("/api/fileupload_api", formData);
                console.log(data);
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR');
              }
            }),
          );
        }}
      />
    </div>
  );
}