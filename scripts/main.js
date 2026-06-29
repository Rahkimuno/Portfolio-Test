document.addEventListener('DOMContentLoaded', () => {
  const unlockBtn = document.getElementById('unlock-btn');
  const paywall = document.getElementById('paywall');
  const submitBtn = document.getElementById('submit-code');
  const codeInput = document.getElementById('code-input');
  const errorMessage = document.getElementById('error-message');
  const cancelBtn = document.getElementById('cancel-btn');
  const premiumButton = document.getElementById('premium-button');

  // Check if premium content is unlocked
  if (localStorage.getItem('premiumUnlocked') === 'true') {
    showPremiumButton();
  }

  // Open paywall when unlock button is clicked
  if (unlockBtn) {
    unlockBtn.addEventListener('click', () => {
      paywall.style.display = 'flex';
    });
  }

  // Close paywall when cancel button is clicked
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      paywall.style.display = 'none';
      codeInput.value = ''; // Clear the input field
      errorMessage.classList.add('hidden');
    });
  }

  // Handle code submission
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      if (codeInput.value === 'SALIM') {
        paywall.style.display = 'none';
        // Store the unlock state in localStorage
        localStorage.setItem('premiumUnlocked', 'true');
        // Show the premium button
        showPremiumButton();
        // Redirect to premium content page
        window.location.href = 'premium-content.html';
      } else {
        errorMessage.classList.remove('hidden');
      }
    });
  }

  // Function to show the premium button
  function showPremiumButton() {
    if (premiumButton) {
      premiumButton.style.display = 'block';
    }
  }
});
