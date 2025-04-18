// Import CSS
import './styles/style.css';

// Import Components
import './scripts/components/loading-indicator.js';
import './scripts/components/toast-notification.js';
import './scripts/components/app-header.js';
import './scripts/components/note-form.js';
import './scripts/components/notes-list.js';

// Main Application Logic
const main = () => {
  // Initialize components
  const notesList = document.querySelector('notes-list');
  const appHeader = document.querySelector('app-header');
  const noteForm = document.querySelector('note-form');

  // Listen for view change events
  appHeader.addEventListener('view-changed', (event) => {
    const view = event.detail.view;

    if (view === 'active') {
      notesList.setAttribute('is-archived', 'false');
      noteForm.style.display = 'block';
    } else if (view === 'archived') {
      notesList.setAttribute('is-archived', 'true');
      noteForm.style.display = 'none';
    }
  });

  // Listen for note added events
  noteForm.addEventListener('note-added', () => {
    // Refresh notes list
    notesList.loadNotes();
  });

  // Initialize with active notes view
  notesList.setAttribute('is-archived', 'false');
};

// Run the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', main);
