/**
 * Unveiling Shanghai - Interactive Logic
 * Redesigned for Archive/Museum Aesthetic
 */

// ============================================================================
// Data Source (Archive Records)
// ============================================================================

const narrativeData = {
    default: {
        title: 'Trace the Shifts',
        content: `
            <p class="narrative-text">Glide across the map to peel back the concrete skyline.</p>
            <p class="narrative-text">Beneath the steel and concrete, discover the hidden memories of the city.</p>
        `
    },
    facade: {
        title: 'The Facade',
        content: `
            <p class="narrative-text"><strong>The Miracle:</strong> In a single generation, Shanghai transformed from farmland and low-rise buildings into a steel and glass skyline known to the world.</p>
            <p class="narrative-text"><strong>The Expansion:</strong> The city exploded outward, ballooning from 308 square kilometers in 1984 to 1302 square kilometers by 2014.</p>
            <p class="narrative-text"><strong>The Question:</strong> We gained convenience, cleaner neighborhoods, and global status. But as we replaced twisted alleyways with "concrete jungles," did we build a city of "sameness"? Beneath the glittering skyscrapers, a difficult reality remains hidden.</p>
        `
    },
    'lost-identities': {
        title: 'Lost Identities',
        content: `
            <p class="narrative-text"><strong>Vanishing History:</strong> The Longtang (alleyway houses)—a unique blend of Chinese and Western architecture—defined Shanghai's soul for decades. Now, they are largely memories buried under fresh rubble.</p>
            <div class="quote">
                "Pudong is not my Shanghai."
            </div>
            <p class="narrative-text"><strong>The Sentiment:</strong> Their heartbreak is captured in a single phrase: "Pudong is not my Shanghai". A "home" is a social fabric, not just plumbing and walls; when we erase the landscape, we erase the identity attached to it.</p>
        `
    },
    'nice-apartment-trap': {
        title: 'The "Nice Apartment" Trap',
        content: `
            <p class="narrative-text"><strong>The Trade-off:</strong> Resettlement policies offer a "nice apartment" and a one-time cash payout. But a one-time payment is not a livelihood.</p>
            <p class="narrative-text"><strong>Marginalization:</strong> Many residents are pushed to the suburban edges, far from the city center's economic hub. This is "geographical marginalization".</p>
            <p class="narrative-text"><strong>The Reality:</strong> For the lower class, this isn't an upgrade; it is the destruction of stable economic foundations and the loss of affordable living. We are handing people keys to a new house while taking away their means to survive.</p>
        `
    },
    'concrete-vs-community': {
        title: 'Concrete vs. Community',
        content: `
            <p class="narrative-text"><strong>Hardware without Software:</strong> We have mastered building the "hardware" (apartments), but we fail to build the "software" (public spaces and social bonds).</p>
            <p class="narrative-text"><strong>The Void:</strong> Without well-designed public spaces, new developments become sterile environments where organic community ties cannot form.</p>
            <p class="narrative-text"><strong>Generational Divide:</strong> While Gen Z adapts to the "cosmopolitan imaginary," the elderly lose their deep-rooted social networks, and the displaced face isolation in remote districts. We are building houses, not homes.</p>
        `
    }
};

// ============================================================================
// Initialization
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    setupInteractions();
    setupMapListeners();
    setupJuxtaposeLabels();
    setupJuxtaposeSliderEffects();
    setupTitleScrollAnimation();
    setupTabsScrollAnimation();
    setupBlackSectionAnimation();
    setupCustomCursor();
    setupGlitchEffect();
    setupLandmarks();
    setupLandmarkTab();
});

// 强制应用 JuxtaposeJS 标签样式
function setupJuxtaposeLabels() {
    // 等待 JuxtaposeJS 初始化完成
    setTimeout(() => {
        const labels = document.querySelectorAll('.jx-knightlab div.jx-image div.jx-label');
        labels.forEach(label => {
            label.style.backgroundColor = '#f4f1ea';
            label.style.background = '#f4f1ea';
            label.style.color = '#000';
            label.style.opacity = '1';
            label.style.fontFamily = 'Broadway, cursive';
            
            // 确保内部文字也是黑色并使用 Broadway
            const spans = label.querySelectorAll('*');
            spans.forEach(span => {
                span.style.color = '#000';
                span.style.fontFamily = 'Broadway, cursive';
            });
        });
    }, 500);
    
    // 监听 DOM 变化，确保新添加的标签也被应用样式
    const observer = new MutationObserver(() => {
        const labels = document.querySelectorAll('.jx-knightlab div.jx-image div.jx-label');
        labels.forEach(label => {
            label.style.backgroundColor = '#f4f1ea';
            label.style.background = '#f4f1ea';
            label.style.color = '#000';
            label.style.opacity = '1';
            label.style.fontFamily = 'Broadway, cursive';
            
            const spans = label.querySelectorAll('*');
            spans.forEach(span => {
                span.style.color = '#000';
                span.style.fontFamily = 'Broadway, cursive';
            });
        });
    });
    
    const juxtaposeContainer = document.querySelector('.juxtapose-frame');
    if (juxtaposeContainer) {
        observer.observe(juxtaposeContainer, {
            childList: true,
            subtree: true
        });
    }
}

// ============================================================================
// Juxtapose Slider Effects (为 slider 添加动效)
// ============================================================================

function setupJuxtaposeSliderEffects() {
    // 等待 JuxtaposeJS 初始化完成
    setTimeout(() => {
        const wrapper = document.getElementById('juxtapose-wrapper');
        if (!wrapper) return;
        
        // 查找 slider 控制器
        const slider = wrapper.querySelector('.jx-controller');
        if (!slider) {
            // 如果还没初始化，再等一会儿
            setTimeout(setupJuxtaposeSliderEffects, 500);
            return;
        }
        
        // 为 slider 添加悬停动效
        wrapper.addEventListener('mouseenter', () => {
            if (slider) {
                slider.style.transform = 'scale(1.1)';
                slider.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
        
        wrapper.addEventListener('mouseleave', () => {
            if (slider) {
                slider.style.transform = 'scale(1)';
            }
        });
        
        // 监听 slider 移动，添加平滑动画
        const observer = new MutationObserver(() => {
            if (slider) {
                slider.style.transition = 'left 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
        
        observer.observe(wrapper, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    }, 1000);
}

// ============================================================================
// Interaction Handlers
// ============================================================================

function setupInteractions() {
    const regionBars = document.querySelectorAll('.region-bar');

    regionBars.forEach(bar => {
        bar.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
    
            // 1. Visual State: Update active class
            regionBars.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 2. Data Fetching
            const regionKey = this.getAttribute('data-region');
            if (regionKey) {
                updateNarrative(regionKey);
            } else {
                console.error('No data-region attribute found on:', this);
            }
        });
    });
}

// ============================================================================
// Falling Text Component (React)
// ============================================================================

// Falling Text React Component
const FallingText = ({
    className = '',
    text = '',
    highlightWords = [],
    highlightClass = 'highlighted',
    trigger = 'auto',
    backgroundColor = 'transparent',
    wireframes = false,
    gravity = 1,
    mouseConstraintStiffness = 0.2,
    fontSize = '1rem',
    typingSpeed = 50
}) => {
    const containerRef = React.useRef(null);
    const textRef = React.useRef(null);
    const [effectStarted, setEffectStarted] = React.useState(false);

    // 1. Setup Text & Typing Animation
    React.useEffect(() => {
        if (!textRef.current) return;
        
        // CLEANUP: Clean extra spaces/newlines
        const words = text.trim().split(/\s+/);
        
        const newHTML = words
            .map(word => {
                const cleanWord = word.replace(/[.,;:"""()?]/g, "");
                const isHighlighted = highlightWords.some(hw => cleanWord.toLowerCase().includes(hw.toLowerCase()));
                // 将每个词拆分成字符，创建更明显的打字机效果
                const chars = word.split('').map((char, idx) => {
                    return `<span class="char" style="opacity: 0">${char}</span>`;
                }).join('');
                return `<span class="word ${isHighlighted ? highlightClass : ''}">${chars}</span>`;
            })
            .join(' ');
        
        textRef.current.innerHTML = newHTML;

        // Start Typing Loop - 逐字符显示，增强打字机效果
        const charSpans = textRef.current.querySelectorAll('.char');
        let currentIndex = 0;
        
        if (charSpans.length === 0) return;
        const typeInterval = setInterval(() => {
            if (currentIndex >= charSpans.length) {
                clearInterval(typeInterval);
                
                // Wait 0.6 seconds after typing finishes
                setTimeout(() => {
                    setEffectStarted(true);
                }, 600); 
                return;
            }
            
            if (charSpans[currentIndex]) {
                charSpans[currentIndex].style.opacity = '1';
            }
            currentIndex++;
        }, typingSpeed / 3); // 更快的打字速度，增强打字机效果
        return () => clearInterval(typeInterval);
    }, [text, highlightWords, highlightClass, typingSpeed]);

    // 2. Physics Engine Logic
    React.useEffect(() => {
        if (!effectStarted) return;
        const { Engine, Runner, World, Bodies, Mouse, MouseConstraint, Events } = window.Matter;
        
        const containerRect = containerRef.current.getBoundingClientRect();
        const width = containerRect.width;
        const height = containerRect.height;
        if (width <= 0 || height <= 0) return;
        
        const engine = Engine.create();
        const runner = Runner.create();
        
        engine.world.gravity.y = gravity;
        
        const boundaryOptions = {
            isStatic: true,
            render: { fillStyle: 'transparent' }
        };
        
        // 计算地板位置：在署名上方
        const calculateFloorPosition = () => {
            const footerInfo = document.querySelector('.footer-info');
            let floorY = height - 100; // 默认位置
            
            if (footerInfo && containerRef.current) {
                const footerRect = footerInfo.getBoundingClientRect();
                const containerRect = containerRef.current.getBoundingClientRect();
                // 计算署名相对于容器的位置，地板放在署名上方-6px（署名上移）
                const relativeFooterTop = footerRect.top - containerRect.top;
                if (relativeFooterTop > 0 && relativeFooterTop < height) {
                    floorY = relativeFooterTop - 6; // 负距离，署名上移6px
                }
            }
            return floorY;
        };
        
        // 初始计算地板位置
        let floorY = calculateFloorPosition();
        
        // 创建地板
        const floor = Bodies.rectangle(width / 2, floorY, width, 10, boundaryOptions);
        const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
        const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
        
        // 延迟更新地板位置，确保DOM已渲染
        setTimeout(() => {
            const newFloorY = calculateFloorPosition();
            if (newFloorY !== floorY) {
                Matter.Body.setPosition(floor, { x: width / 2, y: newFloorY });
                floorY = newFloorY;
            }
        }, 500);
        
        // 获取所有词元素用于物理引擎（每个词作为一个整体掉落）
        const wordSpans = textRef.current.querySelectorAll('.word');
        const wordBodies = [];
        
        // 为每个词创建物理体
        wordSpans.forEach(elem => {
            const rect = elem.getBoundingClientRect();
            
            if (rect.width <= 0 || rect.height <= 0) return;
            const x = rect.left - containerRect.left + rect.width / 2;
            const y = rect.top - containerRect.top + rect.height / 2;
            const body = Bodies.rectangle(x, y, rect.width, rect.height, {
                restitution: 0.6,
                frictionAir: 0.02,
                friction: 0.5
            });
            
            Matter.Body.setVelocity(body, {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            });
            Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
            wordBodies.push({ elem, body });
        });
        
        const mouse = Mouse.create(containerRef.current);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: mouseConstraintStiffness,
                render: { visible: false }
            }
        });
        
        // 确保滚动事件不被阻止
        if (containerRef.current) {
            // 允许滚轮事件穿透
            containerRef.current.style.touchAction = 'pan-y';
            
            // 监听滚轮事件，确保不阻止默认行为
            const handleWheel = (e) => {
                // 允许页面滚动
                return true;
            };
            
            containerRef.current.addEventListener('wheel', handleWheel, { passive: true });
            containerRef.current.addEventListener('touchmove', handleWheel, { passive: true });
        }
        
        World.add(engine.world, [
            floor, leftWall, rightWall, 
            mouseConstraint, 
            ...wordBodies.map(wb => wb.body)
        ]);
        
        const updateDom = () => {
            wordBodies.forEach(({ body, elem }) => {
                const { x, y } = body.position;
                const angle = body.angle;
                
                elem.style.position = 'absolute';
                elem.style.left = `${x}px`;
                elem.style.top = `${y}px`;
                elem.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
            });
        };
        
        Events.on(engine, 'afterUpdate', updateDom);
        Runner.run(runner, engine);
        
        // 在文字掉落完成后（约3秒后），禁用鼠标约束以允许页面滚动
        setTimeout(() => {
            if (mouseConstraint && engine.world) {
                // 禁用鼠标约束，允许页面滚动
                mouseConstraint.mouse.element = null;
                // 或者完全移除约束
                try {
                    World.remove(engine.world, mouseConstraint);
                } catch (e) {
                    // 忽略错误
                }
            }
        }, 3000); // 3秒后禁用鼠标约束
        
        return () => {
            Runner.stop(runner);
            Events.off(engine, 'afterUpdate', updateDom);
            World.clear(engine.world);
            Engine.clear(engine);
            // 清理鼠标约束
            if (mouseConstraint && engine.world) {
                try {
                    World.remove(engine.world, mouseConstraint);
                } catch (e) {
                    // 忽略错误
                }
            }
        };
    }, [effectStarted, gravity, mouseConstraintStiffness]);

    return React.createElement('div', {
        ref: containerRef,
        className: `falling-text-container ${className}`
    }, React.createElement('div', {
        ref: textRef,
        className: 'falling-text-target',
        style: {
            fontSize: fontSize,
            lineHeight: 1.6,
            paddingTop: '80px'
        }
    }));
};

// Initialize Falling Text when black section is visible
function initFallingText() {
    const fallingTextRoot = document.getElementById('falling-text-root');
    if (!fallingTextRoot) {
        console.warn('falling-text-root not found');
        return;
    }
    
    // 等待 React 和 ReactDOM 加载
    if (!window.React || !window.ReactDOM) {
        console.warn('React or ReactDOM not loaded, retrying...');
        setTimeout(() => {
            initFallingText();
        }, 100);
        return;
    }
    
    const summaryText = `Once defined by the twisted alleyways of Longtang, Shanghai has been overtaken by a skyline of steel and glass. Yet, beneath this rapid modernization lies a heartbreaking reality: the city is homogenizing, replacing organic communities with a sterile "concrete jungle". As residents lament that "Pudong is not my Shanghai," we witness a profound alienation. If progress demands the erasure of our cultural identity and social fabric, we must ask: is this relentless path of urbanization truly the right answer?`;
    
    const keywords = [
        "Longtang", "Shanghai", "steel", "glass", 
        "modernization", "homogenizing", "organic", 
        "concrete", "jungle", "Pudong", "alienation", 
        "identity", "social", "fabric", "urbanization"
    ];
    
    // 计算文字掉落完成的时间，总时间约6秒
    // 打字完成后等待0.6秒，然后物理引擎开始
    // 文字掉落需要约1.5秒
    // 剩余时间用于打字：6 - 0.6 - 1.5 = 3.9秒
    const targetTotalTime = 6000; // 6秒
    const waitAfterTyping = 600; // 0.6秒
    const fallingTime = 1500; // 文字掉落约1.5秒
    const typingTime = targetTotalTime - waitAfterTyping - fallingTime; // 约3.9秒
    
    // 根据文字长度和打字时间计算打字速度
    const textLength = summaryText.length;
    const charDelay = typingTime / textLength; // 每个字符的延迟时间
    const typingSpeed = charDelay * 3; // typingSpeed / 3 = charDelay
    
    try {
        const root = window.ReactDOM.createRoot(fallingTextRoot);
        root.render(window.React.createElement(FallingText, {
            text: summaryText,
            highlightWords: keywords,
            highlightClass: 'highlighted',
            gravity: 0.40,
            fontSize: '1.5rem',
            typingSpeed: Math.max(10, Math.round(typingSpeed)) // 确保最小值为10ms
        }));
    
        // 在文字掉落完成后显示署名（6秒后）
        const footerInfo = document.querySelector('.footer-info');
        if (footerInfo) {
            setTimeout(() => {
                footerInfo.classList.add('animate-in');
            }, targetTotalTime);
        }
    } catch (error) {
        console.error('Error initializing falling text:', error);
    }
}

// ============================================================================
// Narrative Logic
// ============================================================================

function updateNarrative(key) {
    const container = document.getElementById('narrative-content');
    const narrativeCard = document.querySelector('.narrative-card');
    
    if (!container) {
        console.error('narrative-content element not found');
        return;
    }
    
    // 如果 key 不存在，使用 default
    const data = narrativeData[key] || narrativeData.default;
    
    if (!data) {
        console.error('No data found for key:', key);
        return;
    }

    // 添加淡出和收缩效果
    container.style.opacity = '0';
    container.style.transform = 'translateX(20px) scale(0.98)';
    container.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    
    // 右侧内容区域展开动画
    if (narrativeCard) {
        narrativeCard.style.opacity = '0';
        narrativeCard.style.transform = 'translateX(30px)';
        narrativeCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }

    setTimeout(() => {
        container.innerHTML = `
            <h2>${data.title}</h2>
            ${data.content}
        `;
        
        // 淡入和展开动画
        container.style.opacity = '1';
        container.style.transform = 'translateX(0) scale(1)';
        
        if (narrativeCard) {
            narrativeCard.style.opacity = '1';
            narrativeCard.style.transform = 'translateX(0)';
        }
    }, 400);
}

// ============================================================================
// Map Interaction (Simple Position Check)
// ============================================================================

function setupMapListeners() {
    const wrapper = document.getElementById('juxtapose-wrapper');
    
    if (!wrapper) {
        console.warn('juxtapose-wrapper element not found, map click functionality will be unavailable');
        return;
    }
    
    // 跟踪鼠标状态以区分点击和拖动
    let isDragging = false;
    let mouseDownX = 0;
    let mouseDownY = 0;
    const DRAG_THRESHOLD = 5; // 像素阈值，超过这个距离认为是拖动
    
    // 检查是否点击在 JuxtaposeJS 控制器上
    const isJuxtaposeController = (target) => {
        return target.closest('.jx-controller') || 
               target.closest('.jx-knightlab') ||
               target.closest('.juxtapose');
    };
    
    wrapper.addEventListener('mousedown', (e) => {
        // 如果点击在控制器上，不处理
        if (isJuxtaposeController(e.target)) {
        isDragging = true;
            return;
        }
        
        mouseDownX = e.clientX;
        mouseDownY = e.clientY;
        isDragging = false;
    });
    
    wrapper.addEventListener('mousemove', (e) => {
        if (mouseDownX === 0 && mouseDownY === 0) return;
        
        const deltaX = Math.abs(e.clientX - mouseDownX);
        const deltaY = Math.abs(e.clientY - mouseDownY);
        
        // 如果鼠标移动超过阈值，认为是拖动
        if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
            isDragging = true;
        }
    });
    
    wrapper.addEventListener('mouseup', (e) => {
        // 如果是拖动操作，不触发点击
        if (isDragging || isJuxtaposeController(e.target)) {
            mouseDownX = 0;
            mouseDownY = 0;
            isDragging = false;
            return;
        }
        
        // 只有真正的点击才触发区域选择
        // 由于现在有5个tab，地图点击功能暂时禁用
        // 用户可以通过点击tab来选择区域
        
        // 重置状态
        mouseDownX = 0;
        mouseDownY = 0;
        isDragging = false;
    });
    
    // 鼠标离开时重置状态
    wrapper.addEventListener('mouseleave', () => {
        mouseDownX = 0;
        mouseDownY = 0;
        isDragging = false;
    });
}

// ============================================================================
// Title Scroll Animation
// ============================================================================

function setupTitleScrollAnimation() {
    const header = document.querySelector('.archive-header');
    const title = document.querySelector('.title');
    const subtitle = document.querySelector('.subtitle-en');
    
    if (!header || !title) return;
    
    // 页面加载时立即显示标题和副标题
    const showTitle = () => {
        title.classList.add('animate-in');
        if (subtitle) subtitle.classList.add('animate-in');
    };
    
    // 立即显示（不等待任何条件）
    showTitle();
    
    // 使用 Intersection Observer 来检测滚动（更敏锐的检测）
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 进入视口 - 淡入动画
                title.classList.add('animate-in');
                title.classList.remove('animate-out');
                if (subtitle) {
                    subtitle.classList.add('animate-in');
                    subtitle.classList.remove('animate-out');
                }
            } else {
                // 离开视口 - 出场动画
                if (entry.boundingClientRect.top < 50) {
                    // 向下滚动，标题向上离开（更早触发）
                    title.classList.add('animate-out');
                    title.classList.remove('animate-in');
                    if (subtitle) {
                        subtitle.classList.add('animate-out');
                        subtitle.classList.remove('animate-in');
                    }
                }
            }
        });
    }, {
        threshold: [0, 0.1, 0.5, 1], // 多个阈值，更敏锐的检测
        rootMargin: '-50px 0px 0px 0px' // 提前50px触发
    });
    
    // 添加滚动事件监听作为补充（更实时的检测）
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const rect = header.getBoundingClientRect();
        
        // 向下滚动且标题顶部离开视口超过50px
        if (currentScrollY > lastScrollY && rect.top < -50) {
            title.classList.add('animate-out');
            title.classList.remove('animate-in');
            if (subtitle) {
                subtitle.classList.add('animate-out');
                subtitle.classList.remove('animate-in');
            }
        }
        // 向上滚动且标题回到视口
        else if (currentScrollY < lastScrollY && rect.top > -100) {
            title.classList.add('animate-in');
            title.classList.remove('animate-out');
            if (subtitle) {
                subtitle.classList.add('animate-in');
                subtitle.classList.remove('animate-out');
            }
        }
        
        lastScrollY = currentScrollY;
    };
    
    // 使用节流优化滚动性能
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // 观察 header 元素
    observer.observe(header);
    
    // 页面完全加载后再次确保显示
    window.addEventListener('load', () => {
        showTitle();
    });
}

// ============================================================================
// Tabs Scroll Animation
// ============================================================================

function setupTabsScrollAnimation() {
    const regionsContainer = document.querySelector('.regions-container');
    if (!regionsContainer) return;
    
    const regionBars = document.querySelectorAll('.region-bar');
    if (regionBars.length === 0) return;
    
    // 确保第一个 tab 始终可见 - 强制设置样式
    const firstBar = regionBars[0];
    if (firstBar) {
        firstBar.style.opacity = '1';
        firstBar.style.transform = 'translateY(0)';
        firstBar.style.maxHeight = 'none';
        firstBar.style.height = 'auto';
        firstBar.style.paddingTop = '25px';
        firstBar.style.paddingBottom = '25px';
        firstBar.style.border = '1px solid rgba(0, 0, 0, 0.1)';
        firstBar.style.overflow = 'visible';
        firstBar.style.visibility = 'visible';
    }
    
    // 获取右侧内容区域
    const narrativeCard = document.querySelector('.narrative-card');
    
    // 创建 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 当容器进入视口时，依次为除第一个外的每个 tab 添加展开动画
                // 同时右侧内容区域也开始从黑线中生长
                if (narrativeCard) {
                    narrativeCard.classList.add('animate-in');
                }
                
                regionBars.forEach((bar, index) => {
                    if (index > 0) { // 跳过第一个 tab
                        setTimeout(() => {
                            bar.classList.add('animate-in');
                        }, (index - 1) * 300); // 每个 tab 延迟 300ms，从第一个 tab 中依次展开
                    }
                });
                
                // 动画触发后，停止观察（只触发一次）
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // 降低阈值，更容易触发
        rootMargin: '0px 0px -50px 0px' // 减少提前量
    });
    
    // 观察 regions-container
    observer.observe(regionsContainer);
    
    // 如果页面已经滚动到该位置，立即触发动画
    const rect = regionsContainer.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        // 右侧内容区域立即开始动画
        if (narrativeCard) {
            narrativeCard.classList.add('animate-in');
        }
        
        regionBars.forEach((bar, index) => {
            if (index > 0) {
                setTimeout(() => {
                    bar.classList.add('animate-in');
                }, (index - 1) * 300);
            }
        });
    }
}

// ============================================================================
// Photo Gallery Scroll Animation
// ============================================================================


// ============================================================================
// Black Section Scroll Animation
// ============================================================================

function setupBlackSectionAnimation() {
    const blackSection = document.querySelector('.black-section');
    const footerInfo = document.querySelector('.footer-info');
    if (!blackSection) return;
    
    let fallingTextInitialized = false;
    
    // 创建 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 当黑色区域进入视口时，添加升起动画
                blackSection.classList.add('animate-in');
                blackSection.classList.remove('animate-out');
                
                // 当黑色区域完全升起后，初始化文字掉落效果
                if (!fallingTextInitialized) {
                    setTimeout(() => {
                        initFallingText();
                        fallingTextInitialized = true;
                    }, 1500); // 等待升起动画完成
                }
            } else {
                // 当黑色区域离开视口时，添加退出动画
                if (entry.boundingClientRect.top > window.innerHeight) {
                    // 向上滚动，区域向下退出
                    blackSection.classList.add('animate-out');
                    blackSection.classList.remove('animate-in');
                }
            }
        });
    }, {
        threshold: [0, 0.1, 0.5, 1], // 多个阈值，更敏锐的检测
        rootMargin: '0px 0px -100px 0px' // 提前 100px 触发
    });
    
    // 观察黑色区域
    observer.observe(blackSection);
    
    // 署名动画现在由 initFallingText 函数控制，在文字掉落完成后显示
    
    // 添加滚动事件监听作为补充
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const rect = blackSection.getBoundingClientRect();
        
        // 向下滚动且区域进入视口
        if (currentScrollY > lastScrollY && rect.top < window.innerHeight * 0.8) {
            blackSection.classList.add('animate-in');
            blackSection.classList.remove('animate-out');
        }
        // 向上滚动且区域离开视口
        else if (currentScrollY < lastScrollY && rect.top > window.innerHeight) {
            blackSection.classList.add('animate-out');
            blackSection.classList.remove('animate-in');
        }
        
        lastScrollY = currentScrollY;
    };
    
    // 使用节流优化滚动性能
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ============================================================================
// Custom Cursor Setup
// ============================================================================

function setupCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const ring = document.getElementById('custom-cursor-ring');
    
    if (!cursor || !ring) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    
    const moveCursor = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // 立即更新光标点
        cursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
        
        // 延迟更新圆环，增加流体感
        requestAnimationFrame(() => {
            ringX += (mouseX - ringX - 20) * 0.15;
            ringY += (mouseY - ringY - 20) * 0.15;
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        });
    };
    
    const clickCursor = () => {
        ring.classList.add('click');
        setTimeout(() => {
            ring.classList.remove('click');
        }, 150);
    };
    
    // 鼠标移动事件
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', clickCursor);
    
    // 鼠标离开窗口时隐藏光标
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        ring.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        ring.style.opacity = '1';
    });
}

// ============================================================================
// Glitch Effect Setup
// ============================================================================

function setupGlitchEffect() {
    const title = document.querySelector('.title');
    if (!title) return;
    
    // 为标题添加故障效果的数据属性
    const titleText = title.textContent;
    title.setAttribute('data-text', titleText);
    
    // 可选：启用故障效果（默认关闭，悬停时激活）
    // title.classList.add('glitch-enabled');
}

// ============================================================================
// Landmarks Setup (地标对比区域)
// ============================================================================

function setupLandmarks() {
    const landmarkCards = document.querySelectorAll('.landmark-card');
    if (landmarkCards.length === 0) return;
    
    // 为每个地标卡片设置视差效果和滚动动画
    landmarkCards.forEach((card, index) => {
        const numberElement = card.querySelector('.landmark-number');
        let offset = 0;
        
        // 视差效果
        const handleScroll = () => {
            const rect = card.getBoundingClientRect();
            const scrollY = window.scrollY;
            const speed = 0.15;
            
            // 当元素在视口内时计算视差
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                offset = (rect.top - window.innerHeight / 2) * speed;
                if (numberElement) {
                    numberElement.style.transform = `translateY(${offset * -1}px)`;
                }
            }
        };
                
        // 使用 Intersection Observer 触发进入动画
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    card.classList.add('animate-in');
                    // 开始视差效果
                    window.addEventListener('scroll', handleScroll);
                } else {
                    // 可选：离开视口时移除动画类
                    // card.classList.remove('animate-in');
            }
        });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        observer.observe(card);
        
        // 如果卡片已经在视口内，立即触发动画
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            card.classList.add('animate-in');
            window.addEventListener('scroll', handleScroll);
        }
        
        // 图片悬停效果增强
        const imageContainer = card.querySelector('.landmark-image-container');
        if (imageContainer) {
            imageContainer.addEventListener('mouseenter', () => {
                const statusText = imageContainer.querySelector('.status-text');
                if (statusText) {
                    statusText.textContent = 'EXPLORING_FUTURE...';
                }
            });
            
            imageContainer.addEventListener('mouseleave', () => {
                const statusText = imageContainer.querySelector('.status-text');
                if (statusText) {
                    statusText.textContent = 'TARGET_LOCKED';
                }
            });
    }
});
}

// ============================================================================
// Landmark Tab Interaction
// ============================================================================

function setupLandmarkTab() {
    const tabs = document.querySelectorAll('.landmark-tab');
    
    tabs.forEach(tab => {
        const tabId = tab.getAttribute('data-tab');
        const content = document.querySelector(`.landmark-tab-content[data-content="${tabId}"]`);
        
        if (!content) return;
        
        tab.addEventListener('click', () => {
            const isActive = tab.classList.contains('active');
            
            if (isActive) {
                tab.classList.remove('active');
                content.classList.remove('active');
            } else {
                tab.classList.add('active');
                content.classList.add('active');
            }
        });
    });
}
