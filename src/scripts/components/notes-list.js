import DataSource from '../data/data-source.js';

class NotesList extends HTMLElement {
  constructor() {
    super();
    this.notes = [];
    this.isArchived = false;
    this.render();
  }

  static get observedAttributes() {
    return ['is-archived'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'is-archived') {
      this.isArchived = newValue === 'true';
      this.loadNotes();
    }
  }

  connectedCallback() {
    this.loadNotes();
  }

  async loadNotes() {
    // Show loading indicator
    document.querySelector('loading-indicator').showLoading();

    let result;
    if (this.isArchived) {
      result = await DataSource.getArchivedNotes();
    } else {
      result = await DataSource.getNotes();
    }

    // Hide loading indicator
    document.querySelector('loading-indicator').hideLoading();

    const toastNotification = document.querySelector('toast-notification');

    if (result.error) {
      toastNotification.showError(result.message);
    } else {
      this.notes = result.data;
      this.updateNotesList();
    }
  }

  render() {
    this.innerHTML = `
      <div class="notes-container">
        <h2>${this.isArchived ? 'Archived Notes' : 'Active Notes'}</h2>
        <div class="notes-grid"></div>
        <div class="empty-state" style="display: none;">
          <p>No notes found. Create a new note to get started!</p>
        </div>
      </div>
    `;
  }

  updateNotesList() {
    this.render();

    const notesGrid = this.querySelector('.notes-grid');
    const emptyState = this.querySelector('.empty-state');

    if (this.notes.length === 0) {
      notesGrid.style.display = 'none';
      emptyState.style.display = 'block';
      return;
    }

    notesGrid.style.display = 'grid';
    emptyState.style.display = 'none';

    this.notes.forEach((note) => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note-item');
      noteElement.setAttribute('data-id', note.id);

      const formattedDate = new Date(note.createdAt).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p class="note-date">${formattedDate}</p>
        <p class="note-body">${note.body}</p>
        <div class="note-actions">
          <button class="${this.isArchived ? 'unarchive-button' : 'archive-button'}">
            ${this.isArchived ? 'Unarchive' : 'Archive'}
          </button>
          <button class="delete-button">Delete</button>
        </div>
      `;

      notesGrid.appendChild(noteElement);

      // Setup event listeners for each note
      const archiveButton = noteElement.querySelector(
        `.${this.isArchived ? 'unarchive-button' : 'archive-button'}`
      );
      const deleteButton = noteElement.querySelector('.delete-button');

      archiveButton.addEventListener('click', () => this.handleArchiveToggle(note.id));
      deleteButton.addEventListener('click', () => this.handleDelete(note.id));
    });

    // Add animation to notes
    const noteItems = notesGrid.querySelectorAll('.note-item');
    noteItems.forEach((item, index) => {
      item.style.animation = `fadeIn 0.3s ease-in-out ${index * 0.1}s forwards`;
      item.style.opacity = '0';
    });
  }

  async handleArchiveToggle(id) {
    // Show loading indicator
    document.querySelector('loading-indicator').showLoading();

    let result;
    if (this.isArchived) {
      result = await DataSource.unarchiveNote(id);
    } else {
      result = await DataSource.archiveNote(id);
    }

    // Hide loading indicator
    document.querySelector('loading-indicator').hideLoading();

    const toastNotification = document.querySelector('toast-notification');

    if (result.error) {
      toastNotification.showError(result.message);
    } else {
      toastNotification.showSuccess(result.message);
      this.loadNotes();
    }
  }

  async handleDelete(id) {
    if (confirm('Are you sure you want to delete this note?')) {
      // Show loading indicator
      document.querySelector('loading-indicator').showLoading();

      const result = await DataSource.deleteNote(id);

      // Hide loading indicator
      document.querySelector('loading-indicator').hideLoading();

      const toastNotification = document.querySelector('toast-notification');

      if (result.error) {
        toastNotification.showError(result.message);
      } else {
        toastNotification.showSuccess(result.message);
        this.loadNotes();
      }
    }
  }
}

customElements.define('notes-list', NotesList);
