// アニメーション関連のインポート
import { initScrollAnimations } from './animations/scroll_animations';
import { initNavigation } from './animations/navigation';

// DOMContentLoaded時に実行
document.addEventListener('DOMContentLoaded', () => {
  // スクロールアニメーションの初期化
  initScrollAnimations();
  
  // ナビゲーション機能の初期化
  initNavigation();
  
  console.log('アプリケーションが読み込まれました');
});
