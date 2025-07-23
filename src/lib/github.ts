// Sample GitHub configuration for profile picture uploads
// You'll need to set up your own GitHub repository and personal access token

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_OWNER = 'razinrayees';
const GITHUB_REPO = 'resumin-assets';
const GITHUB_PATH = 'images';

export interface GitHubUploadResponse {
  success: boolean;
  url?: string;
  error?: string;
}

export const uploadImageToGitHub = async (
  file: File,
  filename: string
): Promise<GitHubUploadResponse> => {
  try {
    // Check if GitHub token is configured
    if (!GITHUB_TOKEN || GITHUB_TOKEN === 'your_github_personal_access_token_here') {
      return {
        success: false,
        error: 'GitHub token not configured. Please set VITE_GITHUB_TOKEN in your .env file.',
      };
    }

    // Convert file to base64
    const base64Content = await fileToBase64(file);
    
    // Remove data URL prefix
    const base64Data = base64Content.split(',')[1];
    
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}/${filename}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Upload profile picture: ${filename}`,
          content: base64Data,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      
      // Handle specific GitHub API errors
      if (response.status === 401) {
        return {
          success: false,
          error: 'Invalid GitHub token. Please check your VITE_GITHUB_TOKEN in the .env file.',
        };
      }
      
      if (response.status === 403) {
        return {
          success: false,
          error: 'GitHub token lacks required permissions. Please ensure it has "repo" scope.',
        };
      }
      
      throw new Error(errorData.message || `GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Return the raw GitHub URL
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/${GITHUB_PATH}/${filename}`;
    
    return {
      success: true,
      url: rawUrl,
    };
  } catch (error) {
    console.error('Error uploading to GitHub:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred while uploading to GitHub',
    };
  }
};

export const deleteImageFromGitHub = async (filename: string): Promise<boolean> => {
  try {
    // Check if GitHub token is configured
    if (!GITHUB_TOKEN || GITHUB_TOKEN === 'your_github_personal_access_token_here') {
      console.error('GitHub token not configured');
      return false;
    }

    // First, get the file to get its SHA
    const getResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}/${filename}`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
        },
      }
    );

    if (!getResponse.ok) {
      return false; // File doesn't exist or can't be accessed
    }

    const fileData = await getResponse.json();
    
    // Delete the file
    const deleteResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}/${filename}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Delete profile picture: ${filename}`,
          sha: fileData.sha,
        }),
      }
    );

    return deleteResponse.ok;
  } catch (error) {
    console.error('Error deleting from GitHub:', error);
    return false;
  }
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const generateUniqueFilename = (originalName: string, userId: string): string => {
  const extension = originalName.split('.').pop();
  const timestamp = Date.now();
  return `profile_${userId}_${timestamp}.${extension}`;
};