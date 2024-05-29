'use client';

import { createContext, useState } from 'react';

export const DataContext = createContext<any | null>(null);

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [advertData, setAdvertData] = useState<any | null>(null);
  const [postData, setPostData] = useState<any | null>(null);

  return (
    <DataContext.Provider
      value={{
        advertData,
        setAdvertData,
        postData,
        setPostData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
