import { API_URL } from '../config/apiConfig';
import { auth } from '../Utility/firebaseConfig';

const getAuthHeaders = async () => {
  const user = auth.currentUser;
  if (!user) return {};
  
  const token = await user.getIdToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const playlistService = {
  getAllPlaylists: async () => {
    try {
      const response = await fetch(`${API_URL}/playlists`);
      if (!response.ok) throw new Error('Failed to fetch playlists');
      return await response.json();
    } catch (error) {
      console.error('Fetch playlists error:', error);
      throw error;
    }
  },

  getUserPlaylists: async () => {
    try {
      console.log('Fetching user playlists...');
      const headers = await getAuthHeaders();
      
      // Log request details for debugging
      console.log('Request URL:', `${API_URL}/playlists/user`);
      console.log('Headers:', JSON.stringify(headers));
      
      const response = await fetch(`${API_URL}/playlists/user`, {
        method: 'GET',
        headers
      });
      
      // Log response details
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error(`Failed to fetch user playlists: ${response.status} ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Playlists fetched successfully:', data.length);
      return data;
    } catch (error) {
      console.error('Fetch user playlists error:', error);
      throw error;
    }
  },

  getPlaylistById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/playlists/${id}`);
      if (!response.ok) throw new Error('Failed to fetch playlist');
      return await response.json();
    } catch (error) {
      console.error('Fetch playlist error:', error);
      throw error;
    }
  },

  createPlaylist: async (playlistData) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_URL}/playlists`, {
        method: 'POST',
        headers,
        body: JSON.stringify(playlistData)
      });
      if (!response.ok) throw new Error('Failed to create playlist');
      return await response.json();
    } catch (error) {
      console.error('Create playlist error:', error);
      throw error;
    }
  },

  addSongsToPlaylist: async (playlistId, songIds) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_URL}/playlists/${playlistId}/songs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ songIds })
      });
      if (!response.ok) throw new Error('Failed to add songs to playlist');
      return await response.json();
    } catch (error) {
      console.error('Add songs to playlist error:', error);
      throw error;
    }
  },

  removeSongFromPlaylist: async (playlistId, songId) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_URL}/playlists/${playlistId}/songs/${songId}`, {
        method: 'DELETE',
        headers
      });
      if (!response.ok) throw new Error('Failed to remove song from playlist');
      return await response.json();
    } catch (error) {
      console.error('Remove song from playlist error:', error);
      throw error;
    }
  },

  deletePlaylist: async (id) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_URL}/playlists/${id}`, {
        method: 'DELETE',
        headers
      });
      if (!response.ok) throw new Error('Failed to delete playlist');
      return await response.json();
    } catch (error) {
      console.error('Delete playlist error:', error);
      throw error;
    }
  }
};