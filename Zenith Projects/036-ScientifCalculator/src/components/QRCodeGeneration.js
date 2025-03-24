import React, { useState } from 'react';
import { QRCode } from 'react-qr-code';

const QRCodeGeneration = () => {
  const [qrCode, setQRCode] = useState('');
  const [qrCodeData, setQRCodeData] = useState('');

  const handleGenerateQRCode = () => {
    setQRCodeData(qrCode);
  };

  return (
    <div>
      <h2>QR Code Generation</h2>
      <input type="text" value={qrCode} onChange={(event) => setQRCode(event.target.value)} />
      <button onClick={handleGenerateQRCode}>Generate QR Code</button>
      <QRCode value={qrCodeData} />
    </div>
  );
};

export default QRCodeGeneration;