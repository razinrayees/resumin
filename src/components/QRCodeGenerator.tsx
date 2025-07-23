import React, { useState, useEffect } from 'react';
import { QrCode, Download, Copy, Share2 } from 'lucide-react';
import { generateQRCode, downloadQRCode } from '../utils/qrGenerator';
import toast from 'react-hot-toast';

interface QRCodeGeneratorProps {
  profileUrl: string;
  profileName: string;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  profileUrl,
  profileName
}) => {
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateQR = async () => {
      try {
        setLoading(true);
        const dataURL = await generateQRCode(profileUrl, {
          size: 200,
          margin: 2,
          color: {
            dark: '#1f2937', // gray-800
            light: '#ffffff'
          }
        });
        setQrCodeDataURL(dataURL);
      } catch (error) {
        console.error('Error generating QR code:', error);
        toast.error('Failed to generate QR code');
      } finally {
        setLoading(false);
      }
    };

    if (profileUrl) {
      generateQR();
    }
  }, [profileUrl]);

  const handleDownload = () => {
    if (qrCodeDataURL) {
      const filename = `${profileName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_qr_code.png`;
      downloadQRCode(qrCodeDataURL, filename);
      toast.success('QR code downloaded!');
    }
  };

  const handleCopyImage = async () => {
    if (!qrCodeDataURL) return;

    try {
      // Convert data URL to blob
      const response = await fetch(qrCodeDataURL);
      const blob = await response.blob();
      
      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      
      toast.success('QR code copied to clipboard!');
    } catch (error) {
      console.error('Error copying QR code:', error);
      toast.error('Failed to copy QR code');
    }
  };

  const handleShare = async () => {
    if (navigator.share && qrCodeDataURL) {
      try {
        const response = await fetch(qrCodeDataURL);
        const blob = await response.blob();
        const file = new File([blob], `${profileName}_qr_code.png`, { type: 'image/png' });
        
        await navigator.share({
          title: `${profileName}'s Resume QR Code`,
          text: `Scan this QR code to view ${profileName}'s resume`,
          files: [file]
        });
      } catch (error) {
        console.error('Error sharing QR code:', error);
        // Fallback to copying URL
        navigator.clipboard.writeText(profileUrl);
        toast.success('Profile URL copied to clipboard!');
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(profileUrl);
      toast.success('Profile URL copied to clipboard!');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <QrCode size={20} className="text-purple-600" />
        </div>
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">QR Code</h3>
      </div>
      
      <p className="text-gray-600 text-xs sm:text-sm mb-4">
        Share your resume instantly with a QR code
      </p>

      <div className="flex flex-col items-center space-y-4">
        {loading ? (
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : qrCodeDataURL ? (
          <div className="bg-white p-3 rounded-lg border-2 border-gray-200">
            <img
              src={qrCodeDataURL}
              alt="QR Code for profile"
              className="w-32 h-32 sm:w-40 sm:h-40"
            />
          </div>
        ) : (
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-sm">Failed to load</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <button
            onClick={handleDownload}
            disabled={!qrCodeDataURL}
            className="flex items-center justify-center px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm font-medium"
          >
            <Download size={14} className="mr-1" />
            Download
          </button>
          
          <button
            onClick={handleCopyImage}
            disabled={!qrCodeDataURL}
            className="flex items-center justify-center px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm font-medium"
          >
            <Copy size={14} className="mr-1" />
            Copy
          </button>
          
          <button
            onClick={handleShare}
            disabled={!qrCodeDataURL}
            className="flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm font-medium"
          >
            <Share2 size={14} className="mr-1" />
            Share
          </button>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          Anyone can scan this QR code to view your resume instantly
        </p>
      </div>
    </div>
  );
};