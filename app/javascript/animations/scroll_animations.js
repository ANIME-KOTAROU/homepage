// ========================================
// スクロールアニメーション
// ========================================

export function initScrollAnimations() {
  // アニメーション対象の要素を取得
  const animatedElements = document.querySelectorAll(
    '.fade-in, .slide-in-left, .slide-in-right, .scale-in'
  );
  
  // ページロード時に既に画面内にある要素を即座に表示
  animatedElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInView) {
      // 画面内にあれば即座に表示（アニメーションなし）
      element.classList.add('is-visible');
    }
  });
  
  // Intersection Observer API を使用（スクロール後の要素用）
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // 要素の10%が表示されたら発火
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 要素が表示範囲に入ったらアニメーションクラスを追加
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);
  
  // まだ表示されていない要素のみ監視
  animatedElements.forEach(element => {
    if (!element.classList.contains('is-visible')) {
      observer.observe(element);
    }
  });
  
  // スクロールに応じたヘッダーのスタイル変更
  const header = document.getElementById('header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // スクロール量に応じてクラスを追加/削除
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // スムーススクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // # のみの場合は処理しない
      if (href === '#') {
        return;
      }
      
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// カウントアップアニメーション（統計セクション用）
export function initCountUpAnimation() {
  const counters = document.querySelectorAll('.stats-section__item-number');
  
  const animateCounter = (element) => {
    const target = parseInt(element.textContent);
    const duration = 2000; // 2秒
    const increment = target / (duration / 16); // 60fps想定
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.ceil(current) + '+';
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + '+';
      }
    };
    
    updateCounter();
  };
  
  // Intersection Observerでカウンターが表示されたら開始
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// 初期化時にカウントアップも実行
document.addEventListener('DOMContentLoaded', () => {
  initCountUpAnimation();
});
