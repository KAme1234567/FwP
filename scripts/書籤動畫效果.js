document.addEventListener('DOMContentLoaded', function() {
  var links = document.querySelectorAll('.div1 a');

  links.forEach(function(link) {
      link.addEventListener('click', function(e) {
          e.preventDefault(); // 阻止默認的連結行為

          var targetId = this.getAttribute('href').substring(1); // 獲取目標元素的 ID
          var targetElement = document.getElementById(targetId);

          if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' }); // 使用平滑滾動效果
          }
      });
  });
});