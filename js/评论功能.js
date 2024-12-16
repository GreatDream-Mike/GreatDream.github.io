document.addEventListener('DOMContentLoaded', () => {
  const userNameInput = document.getElementById('userName');
  const commentInput = document.getElementById('commentInput');
  const avatarInput = document.getElementById('avatarInput');
  const avatarPreview = document.getElementById('avatarPreview');
  const systemSelect = document.getElementById('systemSelect');
  const regionSelect = document.getElementById('regionSelect');
  const submitButton = document.getElementById('submitButton');
  const commentsList = document.getElementById('commentsList');

  // 从LocalStorage获取评论数据并显示
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.forEach(comment => {
    displayComment(comment);
  });

  avatarInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        avatarPreview.src = e.target.result;
        avatarPreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });


  submitButton.addEventListener('click', () => {
    const userName = userNameInput.value.trim();
    const commentText = commentInput.value.trim();
    const avatar = avatarPreview.style.display === 'block' ? avatarPreview.src : 'https://via.placeholder.com/70';
    const system = systemSelect.value;
    const region = regionSelect.value;

    if (userName && commentText) {
      const newComment = {
        name: userName,
        avatar: avatar,
        text: commentText,
        time: new Date().toLocaleString(),
        system: system,
        region: region
      };
      comments.push(newComment);
      localStorage.setItem('comments', JSON.stringify(comments));
      displayComment(newComment);
      userNameInput.value = '';
      commentInput.value = '';
      avatarPreview.src = 'https://via.placeholder.com/70';
      avatarPreview.style.display = 'none';
      systemSelect.selectedIndex = 0; // 重置为默认选项
      regionSelect.selectedIndex = 0; // 重置为默认选项
    }
  });



  // 1. 为每条评论添加一个删除按钮

  function displayComment(comment) {
    const li = document.createElement('li');
    const avatarImg = document.createElement('img');
    avatarImg.src = comment.avatar;
    avatarImg.alt = 'User Avatar';

    const contentDiv = document.createElement('div');
    const nameSpan = document.createElement('span');
    nameSpan.textContent = comment.name;
    nameSpan.style.fontWeight = 'bold';
    nameSpan.style.marginRight = '10px';

    const textP = document.createElement('p');
    textP.textContent = comment.text;

    const metaSpan = document.createElement('span');
    metaSpan.className = 'meta';
    metaSpan.textContent = ` - ${comment.time} (System: ${comment.system}, Region: ${comment.region})`;

    contentDiv.appendChild(nameSpan);
    contentDiv.appendChild(textP);
    li.appendChild(avatarImg);
    li.appendChild(contentDiv);
    li.appendChild(metaSpan); // 将metaSpan放在内容之后

    commentsList.appendChild(li);
  }
  function displayComment(comment) {
    const li = document.createElement('li');
    const avatarImg = document.createElement('img');
    avatarImg.src = comment.avatar;
    avatarImg.alt = 'User Avatar';

    const contentDiv = document.createElement('div');
    const nameSpan = document.createElement('span');
    nameSpan.textContent = comment.name;
    nameSpan.style.fontWeight = 'bold';
    nameSpan.style.marginRight = '10px';

    const textP = document.createElement('p');
    textP.textContent = comment.text;

    const metaSpan = document.createElement('span');
    metaSpan.className = 'meta';
    metaSpan.textContent = ` - ${comment.time} (System: ${comment.system}, Region: ${comment.region})`;

    // 创建删除按钮
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.color = 'red';
    deleteButton.style.marginLeft = '10px';

    // 将事件监听器添加到删除按钮
    deleteButton.addEventListener('click', () => {
      deleteComment(comment);
    });

    contentDiv.appendChild(nameSpan);
    contentDiv.appendChild(textP);
    li.appendChild(avatarImg);
    li.appendChild(contentDiv);
    li.appendChild(metaSpan);
    li.appendChild(deleteButton); // 将删除按钮添加到列表中

    commentsList.appendChild(li);
  }
  function deleteComment(commentToDelete) {
    // 从comments数组中移除评论
    const index = comments.findIndex(comment => comment.name === commentToDelete.name && comment.text === commentToDelete.text);
    if (index !== -1) {
      comments.splice(index, 1);
    }

    // 更新localStorage中的评论数据
    localStorage.setItem('comments', JSON.stringify(comments));

    // 从DOM中移除对应的评论元素
    const commentsList = document.getElementById('commentsList');
    const liElements = commentsList.getElementsByTagName('li');
    for (let i = 0; i < liElements.length; i++) {
      const commentElement = liElements[i];
      const nameSpan = commentElement.querySelector('span');
      const textP = commentElement.querySelector('p');
      if (nameSpan && textP && nameSpan.textContent === commentToDelete.name && textP.textContent === commentToDelete.text) {
        commentsList.removeChild(commentElement);
        break;
      }
    }
  }
});