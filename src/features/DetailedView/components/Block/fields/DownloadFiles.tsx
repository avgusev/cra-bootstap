type DownloadFilesProps = {
  files: {
    isChanged: boolean;
    value: {
      id: string;
      isDeleted: boolean;
      isNew: boolean;
      name: string;
    }[];
  };
};

const DownloadFiles = (_props: DownloadFilesProps) => {
  return <></>;
};

export default DownloadFiles;
