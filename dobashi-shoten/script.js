// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    // ナビゲーション要素の取得
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.getElementById('scrollTop');

    // ハンバーガーメニューの開閉
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // ナビゲーションリンククリック時にメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // スクロール時のナビバー効果
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        // ナビバーの背景透明度調整
        if (currentScrollY > 50) {
            navbar.style.background = 'rgba(254, 252, 248, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(254, 252, 248, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }

        // スクロールトップボタンの表示/非表示
        if (currentScrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }

        lastScrollY = currentScrollY;
    });

    // スクロールトップボタンのクリックイベント
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // スムーススクロール（アンカーリンク用）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offsetTop = target.offsetTop - 80; // ナビバーの高さを考慮

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // インターセクションオブザーバーによるアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // フェードインアニメーション
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // アニメーション対象要素にクラスを追加
    const animateElements = document.querySelectorAll('.service-card, .info-item, .access-item, .contact-method');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        fadeInObserver.observe(el);
    });

    // 左からスライドイン
    const slideLeftElements = document.querySelectorAll('.about-text, .message-text, .contact-info');
    slideLeftElements.forEach(el => {
        el.classList.add('slide-in-left');
        fadeInObserver.observe(el);
    });

    // 右からスライドイン
    const slideRightElements = document.querySelectorAll('.about-image, .message-image, .contact-form, .map-container');
    slideRightElements.forEach(el => {
        el.classList.add('slide-in-right');
        fadeInObserver.observe(el);
    });

    // パララックス効果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-image');

        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // マウスオーバー効果の強化
    const cards = document.querySelectorAll('.service-card, .info-item, .access-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // フォームの送信処理（ダミー）
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 送信ボタンのテキストを変更
            const submitBtn = this.querySelector('.btn');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = '送信中...';
            submitBtn.disabled = true;

            // 2秒後に完了メッセージを表示
            setTimeout(() => {
                submitBtn.textContent = '送信完了！';
                submitBtn.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';

                // さらに2秒後に元に戻す
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset(); // フォームをリセット
                }, 2000);
            }, 2000);
        });
    }

    // 要素の動的な色変更効果
    const dynamicColorElements = document.querySelectorAll('.nav-link, .btn');
    dynamicColorElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ロゴの回転アニメーション強化
    const logoImg = document.querySelector('.logo-img');
    if (logoImg) {
        logoImg.addEventListener('click', function() {
            this.style.transform = 'scale(1.2) rotate(360deg)';

            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 500);
        });
    }

    // セクションタイトルのアニメーション
    const sectionTitles = document.querySelectorAll('.section-title');
    const titleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.5 });

    sectionTitles.forEach(title => {
        titleObserver.observe(title);
    });

    // カウンターアニメーション（数字があれば）
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const current = parseInt(counter.textContent) || 0;
            const increment = target / 50;

            if (current < target) {
                counter.textContent = Math.ceil(current + increment);
                setTimeout(() => animateCounters(), 50);
            }
        });
    }

    // タイピング効果（メッセージテキスト用）
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // 画像の遅延読み込み
    const images = document.querySelectorAll('img[src="dummy.png"]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';

                // 画像読み込み後にフェードイン
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);

                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // リアルタイム時計機能（フッターに追加可能）
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ja-JP', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });

        const clockElement = document.querySelector('.clock');
        if (clockElement) {
            clockElement.textContent = timeString;
        }
    }

    // 1秒ごとに時計を更新
    setInterval(updateClock, 1000);

    // 背景パーティクル効果
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #e74c3c;
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.3;
            z-index: -1;
            animation: float-particle 4s linear infinite;
        `;

        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 4000);
    }

    // パーティクルのCSSアニメーションを追加
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            to {
                transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // 定期的にパーティクルを生成
    setInterval(createParticle, 3000);

    // ページ読み込み完了時のウェルカムアニメーション
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.animation = 'none';
            heroTitle.offsetHeight; // リフロー強制
            heroTitle.style.animation = 'flipIn 1s ease forwards';
        }
    }, 500);

    // ホバー時の音声効果（オプション）
    function playHoverSound() {
        // Web Audio API を使用した簡単なビープ音
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    // ボタンにホバー音を追加（オプション）
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            // playHoverSound(); // 必要に応じてコメントアウト
        });
    });

    console.log('🎉 土橋商店ウェブサイトが正常に読み込まれました！');
});