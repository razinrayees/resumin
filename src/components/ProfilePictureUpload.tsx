import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Loader2, User } from 'lucide-react';
import { uploadImageToGitHub, deleteImageFromGitHub, generateUniqueFilename } from '../lib/github';
import toast from 'react-hot-toast';

interface ProfilePictureUploadProps {
  currentImageUrl?: string;
  onImageChange: (imageUrl: string | null) => void;
  userId: string;
  disabled?: boolean;
}

export const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  currentImageUrl,
  onImageChange,
  userId,
  disabled = false
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      // Delete old image if exists
      if (currentImageUrl) {
        const oldFilename = currentImageUrl.split('/').pop();
        if (oldFilename) {
          await deleteImageFromGitHub(oldFilename);
        }
      }

      // Generate unique filename
      const filename = generateUniqueFilename(file.name, userId);

      // Upload new image
      const result = await uploadImageToGitHub(file, filename);

      if (result.success && result.url) {
        onImageChange(result.url);
        toast.success('Profile picture updated successfully!');
      } else {
        // Display the specific error message from the GitHub upload
        const errorMessage = result.error || 'Upload failed';
        toast.error(errorMessage);
        console.error('Upload failed:', errorMessage);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload image. Please try again.';
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!currentImageUrl) return;

    setUploading(true);

    try {
      const filename = currentImageUrl.split('/').pop();
      if (filename) {
        await deleteImageFromGitHub(filename);
      }
      onImageChange(null);
      toast.success('Profile picture removed');
    } catch (error) {
      console.error('Error removing image:', error);
      toast.error('Failed to remove image');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Profile Picture
      </label>
      
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        {/* Current Image Display */}
        <div className="relative">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
            {currentImageUrl ? (
              <img
                src={currentImageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to initials if image fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-400 to-pink-400">
                <User size={32} className="text-white" />
              </div>
            )}
          </div>
          
          {currentImageUrl && !disabled && (
            <button
              onClick={handleRemoveImage}
              disabled={uploading}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50"
              title="Remove image"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Upload Area */}
        {!disabled && (
          <div className="flex-1 max-w-md">
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                dragOver
                  ? 'border-orange-400 bg-orange-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {uploading ? (
                <div className="flex flex-col items-center space-y-2">
                  <Loader2 size={24} className="text-orange-600 animate-spin" />
                  <p className="text-sm text-gray-600">Uploading...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <Camera size={32} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Drop an image here, or{' '}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-orange-600 hover:text-orange-700 underline"
                      >
                        browse
                      </button>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileSelect(file);
                }
              }}
              className="hidden"
            />
          </div>
        )}
      </div>

      {!disabled && (
        <div className="text-xs text-gray-500">
          <p>• Recommended: Square image, at least 200x200 pixels</p>
          <p>• Supported formats: JPG, PNG, GIF</p>
          <p>• Maximum file size: 5MB</p>
        </div>
      )}
    </div>
  );
};