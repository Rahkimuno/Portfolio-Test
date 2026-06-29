document.addEventListener('DOMContentLoaded', () => {
  const carouselImgs = document.querySelectorAll('.carousel-img');

  carouselImgs.forEach(img => {
    img.addEventListener('click', () => {
      // Create a modal for the enlarged image
      const modal = document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.background = 'rgba(0, 0, 0, 0.9)';
      modal.style.display = 'flex';
      modal.style.justifyContent = 'center';
      modal.style.alignItems = 'center';
      modal.style.zIndex = '1000';

      const modalImg = document.createElement('img');
      modalImg.src = img.src;
      modalImg.style.maxWidth = '80%';
      modalImg.style.maxHeight = '80%';

      modal.appendChild(modalImg);
      document.body.appendChild(modal);

      // Close modal on click
      modal.addEventListener('click', () => {
        modal.remove();
      });
    });
  });
});
