import NavBar from '@/components/NavBar/NavBar'
import React from 'react'

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
        <NavBar/>
      <div>{children}</div>
    </main>
  );
}

export default RootLayout
