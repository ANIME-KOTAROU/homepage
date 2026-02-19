// ========================================
// ナビゲーション機能
// ========================================

export function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  
  if (hamburger && navMenu) {
    // ハンバーガーメニューのクリックイベント
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      navMenu.classList.toggle('is-open');
      
      // body のスクロールを制御
      document.body.style.overflow = navMenu.classList.contains('is-open') ? 'hidden' : '';
    });
    
    // メニュー内のリンクをクリックしたらメニューを閉じる
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
    
    // ウィンドウリサイズ時にメニューをリセット
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        hamburger.classList.remove('is-active');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }
  
  // アクティブなナビゲーションアイテムのハイライト
  highlightActiveNav();
}

// 現在のページに応じてナビゲーションアイテムをハイライト
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.header__nav-item');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath || (currentPath === '/' && href === '/')) {
      item.style.color = '#4a7c2c'; // $primary-light
    }
  });
}

// ページ内セクションに応じたナビゲーションハイライト（スクロール連動）
export function initScrollSpyNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__nav-item[href^="#"]');
  
  if (sections.length === 0 || navLinks.length === 0) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // すべてのナビリンクから active クラスを削除
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // 対応するナビリンクに active クラスを追加
        const activeLink = document.querySelector(`.header__nav-item[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// DOMContentLoaded時に初期化
document.addEventListener('DOMContentLoaded', () => {
  initScrollSpyNavigation();
});
