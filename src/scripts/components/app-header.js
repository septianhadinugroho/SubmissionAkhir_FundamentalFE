class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
        <header>
          <h1>Notes App</h1>
          <p>Catat dan Simpan Ide Anda</p>
          <nav>
            <button id="showActiveNotes" class="nav-button active">Active Notes</button>
            <button id="showArchivedNotes" class="nav-button">Archived Notes</button>
          </nav>
        </header>
      `;

    this.addEventListeners();
  }

  addEventListeners() {
    const activeButton = this.querySelector('#showActiveNotes');
    const archivedButton = this.querySelector('#showArchivedNotes');

    activeButton.addEventListener('click', () => {
      activeButton.classList.add('active');
      archivedButton.classList.remove('active');
      this.dispatchEvent(
        new CustomEvent('view-changed', {
          detail: { view: 'active' },
          bubbles: true,
        })
      );
    });

    archivedButton.addEventListener('click', () => {
      archivedButton.classList.add('active');
      activeButton.classList.remove('active');
      this.dispatchEvent(
        new CustomEvent('view-changed', {
          detail: { view: 'archived' },
          bubbles: true,
        })
      );
    });
  }
}

customElements.define('app-header', AppHeader);
