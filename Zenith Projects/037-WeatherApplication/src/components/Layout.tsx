// src/components/Layout.tsx

import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-md mx-auto p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;