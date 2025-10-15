(function() {
  'use strict';
  
  let overlayShown = false;
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    document.addEventListener('click', function(e) {
      const target = e.target;
      
      if (target.textContent.includes('Start Assignment') || 
          target.closest('a[href*="assignments"]') ||
          target.closest('button')?.textContent.includes('Start Assignment')) {
        
        if (!overlayShown) {
          e.preventDefault();
          e.stopPropagation();
          interceptSubmission();
          overlayShown = true;
          return false;
        }
      }
      
      if (target.type === 'submit' || 
          target.classList.contains('submit_assignment_link') ||
          target.textContent.includes('Submit Assignment')) {
        
        if (!overlayShown) {
          e.preventDefault();
          e.stopPropagation();
          interceptSubmission();
          overlayShown = true;
          return false;
        }
      }
    }, true);
  }
  
  function spam67() {
    // Create 67s all over the page
    const count = 100; // Number of 67s to spawn
    
    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      span.textContent = '67';
      span.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        font-size: ${Math.random() * 50 + 20}px;
        font-weight: bold;
        color: rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255});
        z-index: 999999;
        pointer-events: none;
        animation: spin ${Math.random() * 3 + 1}s linear infinite;
      `;
      document.body.appendChild(span);
    }
    
    // Add spinning animation
    if (!document.getElementById('spin-style-67')) {
      const style = document.createElement('style');
      style.id = 'spin-style-67';
      style.textContent = `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Refresh page after 3 seconds
    setTimeout(() => {
      location.reload();
    }, 3000);
  }
  
  function show67Tease() {
  // Create 67s briefly
  const count = 30;
  const elements = [];
  
  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.textContent = '67';
    span.style.cssText = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 100}vh;
      font-size: ${Math.random() * 60 + 30}px;
      font-weight: bold;
      color: #ef4444;
      z-index: 999998;
      pointer-events: none;
      animation: fadeInOut 2s ease-in-out;
      opacity: 0;
    `;
    document.body.appendChild(span);
    elements.push(span);
  }
  
  // Add animation style
  if (!document.getElementById('fade-style-67')) {
    const style = document.createElement('style');
    style.id = 'fade-style-67';
    style.textContent = `
      @keyframes fadeInOut {
        0% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 1; transform: scale(1.2); }
        100% { opacity: 0; transform: scale(0.8); }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Remove after animation
  setTimeout(() => {
    elements.forEach(el => el.remove());
  }, 2000);
}

  function interceptSubmission() {
    const overlay = document.createElement('div');
    overlay.id = 'grade-destroyer-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.95);
      z-index: 999999;
      display: flex;
      justify-content: center;
      align-items: center;
    `;
    
    const iframe = document.createElement('iframe');
    iframe.src = chrome.runtime.getURL('destroyer.html');
    iframe.style.cssText = `
      width: 98vw;
      height: 98vh;
      border: none;
      border-radius: 10px;
      background: white;
    `;
    
    overlay.appendChild(iframe);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('message', (event) => {
      if (event.data.type === 'GRADE_DESTROYER_COMPLETE') {
        overlay.remove();
        document.body.style.overflow = '';
        alert('GradeDestroyer challenge complete! You may now submit normally.');
      } else if (event.data.type === 'TIME_UP_SPAM_67') {
        // Remove overlay first
        overlay.remove();
        document.body.style.overflow = '';
        // Spam 67s
        spam67();
      } else if (event.data.type === 'SHOW_67_TEASE') {
      // Show 67s briefly as a tease
      show67Tease();
      }
    });
    
    document.addEventListener('submit', function(e) {
      if (document.getElementById('grade-destroyer-overlay')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, true);
  }
})();