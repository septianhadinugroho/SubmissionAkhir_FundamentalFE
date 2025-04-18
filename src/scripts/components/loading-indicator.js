class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  static get observedAttributes() {
    return ['is-loading'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'is-loading') {
      if (newValue === 'true') {
        this.style.display = 'flex';
      } else {
        this.style.display = 'none';
      }
    }
  }

  render() {
    this.innerHTML = `
        <div class="loading-spinner">
          <div class="spinner"></div>
        </div>
      `;

    this.style.display = 'none';
    this.style.position = 'fixed';
    this.style.top = '0';
    this.style.left = '0';
    this.style.width = '100%';
    this.style.height = '100%';
    this.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    this.style.justifyContent = 'center';
    this.style.alignItems = 'center';
    this.style.zIndex = '1000';
  }

  showLoading() {
    this.setAttribute('is-loading', 'true');
  }

  hideLoading() {
    this.setAttribute('is-loading', 'false');
  }
}

customElements.define('loading-indicator', LoadingIndicator);
