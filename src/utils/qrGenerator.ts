import QRCode from 'qrcode';

export interface QRCodeOptions {
  size?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

export const generateQRCode = async (
  text: string,
  options: QRCodeOptions = {}
): Promise<string> => {
  const {
    size = 256,
    margin = 4,
    color = {
      dark: '#000000',
      light: '#FFFFFF'
    }
  } = options;

  try {
    const qrCodeDataURL = await QRCode.toDataURL(text, {
      width: size,
      margin,
      color,
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      rendererOpts: {
        quality: 0.92
      }
    });

    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

export const downloadQRCode = (dataURL: string, filename: string = 'qr-code.png') => {
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};