const main = document.querySelector('.main_content')
const main1 = document.querySelector('.tab-container')
// 添加页面滚动事件
window.addEventListener('scroll', function () {
  // 1.获取页面滚动的距离
  const n = parseInt(document.documentElement.scrollTop)
  if (n >= 700) {
    main.style.opacity = '1'
  }
})

// 监控用户是否离开
const view = document.querySelector('.headerContent')
// 为document对象添加visibilitychange事件监听器
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden') {
    view.innerHTML = '怎么走了~'
  } else if (document.visibilityState === 'visible') {
    view.innerHTML = '欢迎回来!'
  }
});


// 轮播图js
const link = document.querySelector('#banner-link') //获取链接
const link1 = document.querySelector('#a-link') //获取链接
const img = document.querySelector('#banner_img') //获取图片
const title = document.querySelector('.banner_content h3')
const content = document.querySelector('.banner_content .p')
const banner = document.querySelector('.content .banner')
const dots = document.querySelectorAll('.banner ul li')
// 重要
const dotsArray = Array.from(dots);

const arr = [
  {
    url: '../../img/background3.jpg', title: 'html中引入字体图片的方法(全流程)',
    Text: '我们在前端开发中,会发现其他网站中,有很多小图标,第一反应是使用精灵图,但是精灵图有一个缺点,修改麻烦,所以我介绍一个新的方法-字体图标',
    link: "./html/引入字体图标的方法.html"
  },
  { url: '../../img/background5.jpg', title: '网站建设日志', Text: '关于此网站建设的记录', link: "./html/网站建设实况.html" },
  { url: '../../img/background7.jpg', title: 'php正则表达式', Text: '关于正则表达式的一些常用概念及练习', link: './html/正则表达式.html' },
  { url: '../../img/background9.jpg', title: '轮播图4', Text: '内容4', link: './html/index.html' },
  { url: '../../img/background10.jpg', title: '轮播图5', Text: '内容5', link: './html/index.html' },
];

// 公用属性

function common() {
  img.src = arr[i].url;
  link.href = arr[i].link;
  link1.href = arr[i].link;
  title.innerHTML = arr[i].title;
  content.innerHTML = arr[i].Text;
  document.querySelector('.banner .active').classList.remove('active');
  document.querySelector(`.banner li:nth-child(${i + 1})`).classList.add('active')
}

let i = 0
let n = 0
banner.addEventListener('mouseleave', function () {
  n = setInterval(function () {
    i++
    if (i >= arr.length) {
      i = 0
    }
    // 调用函数
    common();
  }, 5000)

})
banner.addEventListener('mouseenter', function () {
  clearInterval(n)
})

// 点击小圆点事件处理函数
function handleDotClick(event) {
  // 获取点击的小圆点的索引
  const dotIndex = Array.prototype.indexOf.call(dotsArray, event.target);

  // 移除所有小圆点的 active 类
  dotsArray.forEach(dot => dot.classList.remove('active'));

  // 为当前点击的小圆点添加 active 类
  event.target.classList.add('active');

  // 更新全局变量 i
  i = dotIndex;

  // 调用函数更新轮播图内容
  common();
}

// 为每个小圆点添加点击事件监听器
dotsArray.forEach((dot, index) => {
  dot.addEventListener('click', handleDotClick);

  // 初始化时，如果有默认激活的小圆点，则设置对应的 i 值
  if (dot.classList.contains('active')) {
    i = index;
    common(); // 初始化时调用一次以设置正确的轮播图内容
  }
});


// 更换背景
document.addEventListener('DOMContentLoaded', function () {
  const openPopup = document.getElementById('openPopup');
  const closePopup = document.getElementById('closePopup');
  const closeSection = document.getElementById('closeSection');
  const openSection = document.getElementById('openSection')
  const popNav = document.querySelector('.popNav')
  const content1 = document.querySelector('.content1')
  const popBox = document.getElementById('popBox');
  const title = document.querySelector('.title.draggable');
  const resizeHandle = document.getElementById('resizeHandle');
  const imgs = document.querySelectorAll('.content1 li img');
  const savedBgImage = localStorage.getItem('bgImage');

  if (savedBgImage) {
    document.body.style.backgroundImage = `url(${savedBgImage})`;
  }
  // 拖动功能初始化(1.isDragging跟踪是否正在拖动, 2.offsetX和offsetY存储鼠标相对于拖动元素左上角的偏移量。)
  let isDragging = false;
  let offsetX, offsetY;

  // 拖动开始事件监听器：当用户按下鼠标按钮时，开始拖动操作，并禁用文本选择。
  popNav.addEventListener('mousedown', function (e) {
    isDragging = true;
    offsetX = e.clientX - popBox.offsetLeft;
    offsetY = e.clientY - popBox.offsetTop;
    document.body.style.userSelect = 'none'; // Prevent text selection
  });
  // 鼠标移动事件监听器：当鼠标移动时，如果正在拖动，则更新拖动元素的位置。
  document.addEventListener('mousemove', function (e) {
    if (isDragging) {
      popBox.style.left = `${e.clientX - offsetX}px`;
      popBox.style.top = `${e.clientY - offsetY}px`;
    }
  });
  // 拖动结束事件监听器：当用户释放鼠标按钮时，结束拖动操作，并重新启用文本选择。
  document.addEventListener('mouseup', function () {
    isDragging = false;
    document.body.style.userSelect = ''; // Allow text selection again
  });

  // 调整大小功能：当用户按下调整大小手柄时，开始调整popBox元素的大小。这通过监听mousemove和mouseup事件来实现，类似于拖动功能。
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

  // 弹出框的显示和隐藏：点击openPopup按钮显示弹出框，点击closePopup按钮隐藏弹出框
  openPopup.addEventListener('click', function () {
    popBox.style.display = 'block';
  });

  closePopup.addEventListener('click', function (e) {
    e.preventDefault();
    popBox.style.display = 'none';
  });

  // 内容区域的显示和隐藏:点击closeSection按钮隐藏内容区域content1，点击openSection按钮显示内容区域。
  closeSection.addEventListener('click', function (e) {
    e.preventDefault();
    content1.style.display = 'none';
  });
  openSection.addEventListener('click', function (e) {
    e.preventDefault();
    content1.style.display = 'block';
  })
  //  图片点击事件监听器：为content1中的每张图片添加一个点击事件监听器。当图片被点击时，将其设置为背景图片，并将其存储在localStorage中。
  // 同时，移除其他图片的selected类，并为当前图片添加该类。
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

// 电梯效果

// 监听滚动事件
window.addEventListener('scroll', function () {
  // 计算滚动百分比
  const scrolledHeight = window.pageYOffset || document.documentElement.scrollTop;
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = (scrolledHeight / totalHeight) * 100;
  // 更新显示百分比的元素
  document.getElementById('scroll-percentage').innerText = `${Math.round(percentage)}%`;
});

// 缓慢滚动到顶部
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// 滚动到页面的指定百分比位置
function scrollToPercent(percent) {

  const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollTarget = totalScrollHeight * (percent / 100);
  window.scrollTo({
    top: scrollTarget,
    behavior: 'smooth'
  });
}

// 缓慢滚动到底部
function scrollToBottom() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  });
}

// 初始化显示百分比
window.dispatchEvent(new Event('scroll')); // 触发一次滚动事件以显示初始百分比

