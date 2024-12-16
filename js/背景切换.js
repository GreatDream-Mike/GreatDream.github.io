document.addEventListener('DOMContentLoaded', function () {
  const openPopup = document.getElementById('openPopup');
  const closePopup = document.getElementById('closePopup');
  const closeSection = document.getElementById('closeSection');
  const popBox = document.getElementById('popBox');
  const title = document.querySelector('.title.draggable');
  const resizeHandle = document.getElementById('resizeHandle');
  const imgs = document.querySelectorAll('.content1 li img');
  const savedBgImage = localStorage.getItem('bgImage');

  if (savedBgImage) {
    document.body.style.backgroundImage = `url(${savedBgImage})`;
  }

  let isDragging = false;
  let offsetX, offsetY;

  title.addEventListener('mousedown', function (e) {
    isDragging = true;
    offsetX = e.clientX - popBox.offsetLeft;
    offsetY = e.clientY - popBox.offsetTop;
    document.body.style.userSelect = 'none'; // Prevent text selection
  });

  document.addEventListener('mousemove', function (e) {
    if (isDragging) {
      popBox.style.left = `${e.clientX - offsetX}px`;
      popBox.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
    document.body.style.userSelect = ''; // Allow text selection again
  });

  resizeHandle.addEventListener('mousedown', function (e) {
    let startWidth = popBox.offsetWidth;
    let startHeight = popBox.offsetHeight;
    let startX = e.clientX;
    let startY = e.clientY;

    function onMouseMove(moveEvent) {
      let newWidth = startWidth + (moveEvent.clientX - startX);
      let newHeight = startHeight + (moveEvent.clientY - startY);
      popBox.style.width = `${Math.max(300, newWidth)}px`; // Minimum width
      popBox.style.height = `${Math.max(200, newHeight)}px`; // Minimum height
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  openPopup.addEventListener('click', function () {
    popBox.style.display = 'block';
  });

  closePopup.addEventListener('click', function (e) {
    e.preventDefault();
    popBox.style.display = 'none';
  });

  closeSection.addEventListener('click', function (e) {
    e.preventDefault();
    popBox.style.display = 'none';
  });

  imgs.forEach(img => {
    img.addEventListener('click', function () {
      const bgImage = img.src;
      document.body.style.backgroundImage = `url(${bgImage})`;
      localStorage.setItem('bgImage', bgImage);

      imgs.forEach(i => i.classList.remove('selected'));
      img.classList.add('selected');
    });
  });
});