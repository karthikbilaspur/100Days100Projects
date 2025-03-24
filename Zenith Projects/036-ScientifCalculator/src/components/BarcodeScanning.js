import React, { useState } from 'react';
import { BarcodeScanner } from 'react-barcode-scanner';

const BarcodeScanning = () => {
  const [barcode, setBarcode] = useState('');

  const handleScan = (data) => {
    setBarcode(data);
  };

  return (
    <div>
      <h2>Barcode Scanning</h2>
      <BarcodeScanner onScan={handleScan} />
      <p>Barcode: {barcode}</p>
    </div>
  );
};

export default BarcodeScanning;