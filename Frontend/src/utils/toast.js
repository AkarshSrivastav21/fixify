let toastContainer = null;

const createToastContainer = () => {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
};

const showToast = (message, type = 'info', duration = 4000) => {
  const container = createToastContainer();
  
  const toast = document.createElement('div');
  toast.style.cssText = `
    background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 
                 type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 
                 type === 'warning' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 
                 'linear-gradient(135deg, #3b82f6, #2563eb)'};
    color: white;
    padding: 16px 24px;
    border-radius: 16px;
    margin-bottom: 12px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-weight: 600;
    font-size: 14px;
    max-width: 400px;
    word-wrap: break-word;
    pointer-events: auto;
    cursor: pointer;
    transform: translateX(100%);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 12px;
  `;
  
  const icon = type === 'success' ? '✅' : 
               type === 'error' ? '❌' : 
               type === 'warning' ? '⚠️' : 'ℹ️';
  
  toast.innerHTML = `
    <span style="font-size: 18px;">${icon}</span>
    <span>${message}</span>
    <span style="margin-left: auto; opacity: 0.7; font-size: 18px;">×</span>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 10);
  
  const removeToast = () => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  };
  
  toast.addEventListener('click', removeToast);
  setTimeout(removeToast, duration);
};

export { showToast };