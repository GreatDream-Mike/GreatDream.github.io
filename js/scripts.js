// 1.留言效果
// document.addEventListener('DOMContentLoaded', function () {
//   const contactForm = document.getElementById('contact-form');

//   contactForm.addEventListener('submit', function (event) {
//     event.preventDefault();

//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const message = document.getElementById('message').value;

//     if (name && email && message) {
//       alert('感谢您的留言，我们会尽快回复！');
//       contactForm.reset();
//     } else {
//       alert('请填写所有字段。');
//     }
//   });

//   const readMoreLinks = document.querySelectorAll('.read-more1');
//   readMoreLinks.forEach(link => {
//     link.addEventListener('click', function (event) {
//       event.preventDefault();
//       alert('这篇文章正在建设中，敬请期待！');
//     });
//   });
// });
// 2.弹窗样式
document.addEventListener('DOMContentLoaded', function () {
  var popup = document.getElementById('welcomePopup');

  // 显示弹框  
  function showPopup() {
    popup.classList.add('show');

    // 设置定时器，几秒后隐藏弹框  
    setTimeout(function () {
      closePopup();
    }, 3000); // 5秒后关闭弹框  
  }

  // 隐藏弹框  
  function closePopup() {
    popup.classList.remove('show');
  }
  // 页面加载完毕后显示弹框  
  // showPopup();
});


// 3.网站运行时间js
// 获取页面中的日期元素
const date2 = document.querySelector('footer .date2');
const div = document.querySelector('.box2 .date1');

// 记录网站建立的时间
const websiteStartDate = new Date('2024-11-05T00:00:00');

// 辅助函数，用于格式化数字为两位数
function formatTime(num) {
  return num < 10 ? '0' + num : num;
}

// 计算并返回网站已运行时间的字符串
function getUptime() {
  const now = new Date();
  const elapsedSeconds = Math.floor((now - websiteStartDate) / 1000);
  const daysRun = Math.floor(elapsedSeconds / (24 * 60 * 60));

  // 获取当前时间的小时、分钟和秒
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // 格式化当前时间
  hours = formatTime(hours);
  minutes = formatTime(minutes);
  seconds = formatTime(seconds);

  // 格式化并返回已运行时间的字符串
  return `本站已运行:${daysRun}日${hours}时${minutes}分${seconds}秒`;
}

// 获取并返回当前时间的字符串
function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // 格式化当前时间
  hours = formatTime(hours);
  minutes = formatTime(minutes);
  seconds = formatTime(seconds);

  // 格式化并返回当前时间的字符串
  return `当前时间:${hours}时${minutes}分${seconds}秒`;
}

// 初始设置时间显示
date2.innerHTML = getUptime();
div.innerHTML = getCurrentTime();

// 每秒更新时间显示
setInterval(function () {
  date2.innerHTML = getUptime();
  div.innerHTML = getCurrentTime();
}, 1000);



// 2.下拉箭头划平滑过渡到内容区域
const bottom = document.querySelector('.bottom_button a')

// 添加页面滚动事件监听
bottom.addEventListener('click', function (event) {
  event.preventDefault(); // 防止默认行为（如果 <a> 标签有 href 属性）

  var posts = document.getElementById('posts');

  // 检查 posts 是否位于一个滚动容器内
  // 如果不是，则下面的代码将使整个页面滚动
  // 如果是，您可能需要找到滚动容器并相应地设置其 scrollTop 或 scrollLeft

  // 使用 Element.scrollIntoView() 方法实现平滑滚动
  posts.scrollIntoView({ behavior: 'smooth' });
});


// 导航条的切换效果
const nav = document.querySelector('.nav_banner')
const user = document.querySelector('.box1')
const head = document.querySelector('.container')
console.log(head);
// 头部提示框添加滑动事件
window.addEventListener('scroll', function () {
  const n = parseInt(document.documentElement.scrollTop)
  if (n >= 800) {
    nav.style.transform = 'translateY(0)'
    head.style.opacity = 0

  } else {
    head.style.opacity = 1
    nav.style.transform = 'translateY(-70px)'
  }
})

// tab栏切换

document.addEventListener('DOMContentLoaded', function () {
  var tabItems = document.querySelectorAll('.tab-item');
  var tabContents = document.querySelectorAll('.tab-content');
  var tabScroll = document.getElementById('tabScroll');

  // 点击选项卡切换内容
  tabItems.forEach(function (item, index) {
    item.addEventListener('click', function () {
      tabItems.forEach(function (i) { i.classList.remove('active'); });
      tabContents.forEach(function (c) { c.classList.remove('active'); });

      item.classList.add('active');
      tabContents[index].classList.add('active');

      // 滚动到点击的选项卡位置（可选）
      tabScroll.scrollLeft = item.offsetLeft - tabScroll.clientWidth / 2 + item.clientWidth / 2;
    });
  });

  // 滚动鼠标滑轮切换选项卡
  tabScroll.addEventListener('wheel', function (event) {
    event.preventDefault();

    var currentIndex = Array.prototype.indexOf.call(tabItems, document.querySelector('.tab-item.active'));
    var nextIndex;

    if (event.deltaY < 0) { // 向上滚动
      nextIndex = (currentIndex + 1) % tabItems.length;
    } else { // 向下滚动
      nextIndex = (currentIndex - 1 + tabItems.length) % tabItems.length;
    }

    setTimeout(function () {
      tabItems[currentIndex].classList.remove('active');
      tabContents[currentIndex].classList.remove('active');

      tabItems[nextIndex].classList.add('active');
      tabContents[nextIndex].classList.add('active');

      // 可选：滚动到新的选项卡位置
      tabScroll.scrollLeft = tabItems[nextIndex].offsetLeft - tabScroll.clientWidth / 2 + tabItems[nextIndex].clientWidth / 2;
    }, 200); // 延迟 200 毫秒
  });
});














