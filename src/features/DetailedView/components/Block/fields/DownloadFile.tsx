import { useEffect, useState } from 'react';
import mime from 'mime';

import { getFilesDescriptors } from '../../../api';
import type { FileDescriptor } from '../../../types';

import { baseURL } from '../../../../../httpClient';
import SkdfIcon from '../../../../../components/SkdfIcon';

type DownloadFileProps = {
  file: {
    isChanged: boolean;
    value: {
      id: string;
      isDeleted: boolean;
      isNew: boolean;
      name: string;
    }[];
  };
};

const DownloadFile = ({ file }: DownloadFileProps) => {
  const [fileDescriptors, setfileDescriptors] = useState<FileDescriptor[]>([]);

  useEffect(() => {
    getFilesDescriptors(file.value.map((v) => v.id)).then((data) => setfileDescriptors(data));
  }, [file]);

  return (
    <>
      {fileDescriptors.length ? (
        fileDescriptors.map((fileDescriptor) => (
          <a
            className="me-4"
            href={`${baseURL}/common/file/download/${fileDescriptor.id}`}
            target="_blank"
            rel="noreferrer"
            key={fileDescriptor.id}
          >
            <SkdfIcon name="download" /> {mime.getExtension(fileDescriptor.contentType)}
          </a>
        ))
      ) : (
        <span className="text-muted">нет данных</span>
      )}
    </>
  );
};

export default DownloadFile;
