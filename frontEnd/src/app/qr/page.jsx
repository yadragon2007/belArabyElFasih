"use client"
import React from 'react';

import { Scanner } from '@yudiel/react-qr-scanner';

const Page = () => {
  return <Scanner onScan={(result) => console.log(result)} />
}

export default Page;
