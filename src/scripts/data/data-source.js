const API_URL = 'https://notes-api.dicoding.dev/v2';

class DataSource {
  static async getNotes() {
    try {
      const response = await fetch(`${API_URL}/notes`);
      const responseJson = await response.json();

      if (responseJson.status !== 'success') {
        return { error: true, message: responseJson.message };
      }

      return { error: false, data: responseJson.data };
    } catch (error) {
      return {
        error: true,
        message: 'Failed to fetch notes. Please check your connection.',
      };
    }
  }

  static async getArchivedNotes() {
    try {
      const response = await fetch(`${API_URL}/notes/archived`);
      const responseJson = await response.json();

      if (responseJson.status !== 'success') {
        return { error: true, message: responseJson.message };
      }

      return { error: false, data: responseJson.data };
    } catch (error) {
      return {
        error: true,
        message: 'Failed to fetch archived notes. Please check your connection.',
      };
    }
  }

  static async getSingleNote(id) {
    try {
      const response = await fetch(`${API_URL}/notes/${id}`);
      const responseJson = await response.json();

      if (responseJson.status !== 'success') {
        return { error: true, message: responseJson.message };
      }

      return { error: false, data: responseJson.data };
    } catch (error) {
      return {
        error: true,
        message: 'Failed to fetch note detail. Please check your connection.',
      };
    }
  }

  static async createNote(title, body) {
    try {
      const response = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });

      const responseJson = await response.json();

      if (responseJson.status !== 'success') {
        return { error: true, message: responseJson.message };
      }

      return { error: false, data: responseJson.data };
    } catch (error) {
      return {
        error: true,
        message: 'Failed to create note. Please check your connection.',
      };
    }
  }

  static async archiveNote(id) {
    try {
      const response = await fetch(`${API_URL}/notes/${id}/archive`, {
        method: 'POST',
      });

      const responseJson = await response.json();

      if (responseJson.status !== 'success') {
        return { error: true, message: responseJson.message };
      }

      return { error: false, message: responseJson.message };
    } catch (error) {
      return {
        error: true,
        message: 'Failed to archive note. Please check your connection.',
      };
    }
  }

  static async unarchiveNote(id) {
    try {
      const response = await fetch(`${API_URL}/notes/${id}/unarchive`, {
        method: 'POST',
      });

      const responseJson = await response.json();

      if (responseJson.status !== 'success') {
        return { error: true, message: responseJson.message };
      }

      return { error: false, message: responseJson.message };
    } catch (error) {
      return {
        error: true,
        message: 'Failed to unarchive note. Please check your connection.',
      };
    }
  }

  static async deleteNote(id) {
    try {
      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: 'DELETE',
      });

      const responseJson = await response.json();

      if (responseJson.status !== 'success') {
        return { error: true, message: responseJson.message };
      }

      return { error: false, message: responseJson.message };
    } catch (error) {
      return {
        error: true,
        message: 'Failed to delete note. Please check your connection.',
      };
    }
  }
}

export default DataSource;
