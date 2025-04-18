class ToastNotification extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="toast-container"></div>
      `;

    const style = document.createElement('style');
    style.textContent = `
        .toast-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
        }
        
        .toast {
          min-width: 250px;
          margin-bottom: 10px;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
          animation: slide-in 0.5s, fade-out 0.5s 2.5s forwards;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .toast-success {
          background-color: #4CAF50;
          color: white;
        }
        
        .toast-error {
          background-color: #F44336;
          color: white;
        }
        
        .toast-info {
          background-color: #2196F3;
          color: white;
        }
        
        .toast-close {
          cursor: pointer;
          background: none;
          border: none;
          color: white;
          font-size: 18px;
        }
        
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `;

    this.appendChild(style);
  }

  show(message, type = 'info') {
    const toastContainer = this.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`);

    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close">&times;</button>
      `;

    toastContainer.appendChild(toast);

    const closeButton = toast.querySelector('.toast-close');
    closeButton.addEventListener('click', () => {
      toastContainer.removeChild(toast);
    });

    // Auto remove after 3 seconds
    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, 3000);
  }

  showSuccess(message) {
    this.show(message, 'success');
  }

  showError(message) {
    this.show(message, 'error');
  }

  showInfo(message) {
    this.show(message, 'info');
  }
}

customElements.define('toast-notification', ToastNotification);
