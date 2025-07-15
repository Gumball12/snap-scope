import { createContext, useContext, useState, ReactNode } from 'react';

interface FileContextType {
  files: File[];
  setFiles: (files: File[]) => void;
}

const FileContext = createContext<FileContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useFiles = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFiles must be used within a FileProvider');
  }
  return context;
};

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileContext.Provider value={{ files, setFiles }}>
      {children}
    </FileContext.Provider>
  );
};
