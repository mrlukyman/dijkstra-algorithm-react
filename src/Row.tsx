import React from 'react'

export const Row = ({children}: {children: React.ReactNode}) => (
  <div style={{flexDirection: 'row', display: 'flex'}}>{children}</div>
)