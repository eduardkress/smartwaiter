import React from 'react';
import QRCode from 'react-qr-code';

interface ComponentToPrintProps {
  appUrl: string;
  qrCode: string;
}

export class ComponentToPrint extends React.PureComponent<ComponentToPrintProps> {
  render() {
    const { qrCode, appUrl } = this.props;
    return (
      <div className='flex flex-col items-center justify-center'>
        <div className='text-xl'>{'Herzlich Willkommen'}</div>
        <div className='text-base'>{'Scannen Sie den folgenden QR Code zum Bestellen'}</div>
        <div className='my-4 h-[200px] w-[200px]'>
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={appUrl + '/menu?t=' + qrCode}
            viewBox={`0 0 256 256`}
          />
        </div>
        <div className='my-1 text-xs'>Bestellcode geht nicht? Versuchen Sie diesen Link:</div>
        <div className='my-1 text-xs'>{appUrl + '/menu?t=' + qrCode}</div>
      </div>
    );
  }
}
