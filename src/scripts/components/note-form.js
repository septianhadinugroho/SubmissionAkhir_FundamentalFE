import DataSource from '../data/data-source.js';

class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.innerHTML = `
      <form id="noteForm">
        <h2>Add New Note</h2>
        
        <input 
          type="text" 
          id="noteTitle" 
          name="title" 
          placeholder="Note Title" 
          required 
          maxlength="50"
        >
        <div id="titleError" class="error-message"></div>
        
        <textarea 
          id="noteBody" 
          name="body" 
          placeholder="Note Content" 
          required 
          rows="5"
          maxlength="500"
        ></textarea>
        <div id="bodyError" class="error-message"></div>
        
        <button type="submit" class="submit-button">Add Note</button>
      </form>
    `;
  }

  setupEventListeners() {
    const form = this.querySelector('#noteForm');
    const titleInput = this.querySelector('#noteTitle');
    const bodyInput = this.querySelector('#noteBody');
    const titleError = this.querySelector('#titleError');
    const bodyError = this.querySelector('#bodyError');

    // Real-time validation
    titleInput.addEventListener('input', () => {
      if (titleInput.validity.valueMissing) {
        titleError.textContent = 'Title cannot be empty';
      } else if (titleInput.validity.tooLong) {
        titleError.textContent = 'Title cannot exceed 50 characters';
      } else {
        titleError.textContent = '';
      }
    });

    bodyInput.addEventListener('input', () => {
      if (bodyInput.validity.valueMissing) {
        bodyError.textContent = 'Content cannot be empty';
      } else if (bodyInput.validity.tooLong) {
        bodyError.textContent = 'Content cannot exceed 500 characters';
      } else {
        bodyError.textContent = '';
      }
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (form.checkValidity()) {
        const title = titleInput.value;
        const body = bodyInput.value;

        // Show loading indicator
        document.querySelector('loading-indicator').showLoading();

        const result = await DataSource.createNote(title, body);

        // Hide loading indicator
        document.querySelector('loading-indicator').hideLoading();

        const toastNotification = document.querySelector('toast-notification');

        if (result.error) {
          toastNotification.showError(result.message);
        } else {
          toastNotification.showSuccess('Note added successfully!');

          // Reset form
          form.reset();

          // Notify that a note has been added
          this.dispatchEvent(
            new CustomEvent('note-added', {
              bubbles: true,
              detail: { note: result.data },
            })
          );
        }
      }
    });
  }
}

customElements.define('note-form', NoteForm);
