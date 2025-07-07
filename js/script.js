// 页面路由系统
const pageRoutes = {
    'home': {
        title: '首页',
        breadcrumb: ['首页']
    },
    'ai-fake-info-government': {
        title: '政府 - AI虚假信息治理',
        breadcrumb: ['首页', 'AI虚假信息治理', '政府']
    },
    'ai-fake-info-media': {
        title: '媒体 - AI虚假信息治理',
        breadcrumb: ['首页', 'AI虚假信息治理', '媒体']
    },
    'ai-fake-info-public': {
        title: '公众 - AI虚假信息治理',
        breadcrumb: ['首页', 'AI虚假信息治理', '公众']
    },
    'ai-fake-info-academia': {
        title: '学界 - AI虚假信息治理',
        breadcrumb: ['首页', 'AI虚假信息治理', '学界']
    },
    'ai-fake-info-cases': {
        title: '案例 - AI虚假信息治理',
        breadcrumb: ['首页', 'AI虚假信息治理', '案例']
    },
    'ai-literacy-about': {
        title: '关于系统 - AI素养智能测评',
        breadcrumb: ['首页', 'AI素养智能测评系统', '关于系统']
    },
    'ai-literacy-digital': {
        title: '数字素养智能测评',
        breadcrumb: ['首页', 'AI素养智能测评系统', '数字素养智能测评']
    },
    'ai-literacy-ai': {
        title: 'AI素养智能测评',
        breadcrumb: ['首页', 'AI素养智能测评系统', 'AI素养智能测评']
    },
    'ai-copyright-guide': {
        title: 'AI版权问题指南',
        breadcrumb: ['首页', 'AI版权治理体系', 'AI版权问题指南']
    },
    'ai-copyright-cases': {
        title: 'AI版权司法案例库',
        breadcrumb: ['首页', 'AI版权治理体系', 'AI版权司法案例库']
    },
    'representative-regions': {
        title: '代表地区',
        breadcrumb: ['首页', 'AI虚假信息治理', '政府', '代表地区']
    },
    'global-policy': {
        title: '全球治理政策库',
        breadcrumb: ['首页', 'AI虚假信息治理', '政府', '全球治理政策库']
    },
  
    // ... 现有路由 ...
    'media-tool-fact-check-guide': {
        title: '事实核查指南 - 媒体工具',
        breadcrumb: ['首页', 'AI虚假信息治理', '媒体', '事实核查指南']
    },
    'media-tool-ai-detection-tools': {
        title: 'AI检测工具 - 媒体工具',
        breadcrumb: ['首页', 'AI虚假信息治理', '媒体', 'AI检测工具']
    },
    // ... 其他工具路由

    'ai-content-guide': {
        title: 'AI生成内容识别指南',
        breadcrumb: ['首页', 'AI虚假信息治理', '公众', 'AI生成内容识别指南']
    },
    'credibility-framework': {
        title: '信息可信度评估框架',
        breadcrumb: ['首页', 'AI虚假信息治理', '公众', '信息可信度评估框架']
    },
    'public-verification': {
        title: '公众参与式核查指南',
        breadcrumb: ['首页', 'AI虚假信息治理', '公众', '公众参与式核查指南']
    }
};

// 轮播图相关变量
let currentSlideIndex = 0;
let slides = [];
let indicators = [];
let totalSlides = 0;

// 初始化轮播图变量
function initCarousel() {
    slides = document.querySelectorAll('.carousel-slide');
    indicators = document.querySelectorAll('.indicator');
    totalSlides = slides.length;
}

// 切换到指定幻灯片
function showSlide(index) {
    if (totalSlides === 0) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
}

// 下一张/上一张幻灯片
function changeSlide(direction) {
    if (totalSlides === 0) return;
    
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    showSlide(currentSlideIndex);
}

// 点击指示器切换
function currentSlide(index) {
    if (totalSlides === 0) return;
    
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// 自动轮播
function autoSlide() {
    if (totalSlides === 0) return;
    
    currentSlideIndex++;
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    }
    showSlide(currentSlideIndex);
}

// 页面切换功能 - 恢复原始逻辑
function showPage(pageId) {
    // 隐藏所有页面
    const allPages = document.querySelectorAll('.page-content');
    allPages.forEach(page => page.classList.remove('active'));
    
    // 显示目标页面
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // 更新面包屑
    updateBreadcrumb(pageId);
    
    // 更新页面标题
    if (pageRoutes[pageId]) {
        document.title = pageRoutes[pageId].title + ' - AITrust智信';
    }
    
    // 更新导航状态
    updateNavigation(pageId);
    
    // 滚动到顶部
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // 关闭所有下拉菜单
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
    
    // 更新浏览器URL
    history.pushState({page: pageId}, '', `#${pageId}`);
}

// 更新面包屑导航
function updateBreadcrumb(pageId) {
    const breadcrumbContainer = document.getElementById('breadcrumb');
    const breadcrumbList = document.getElementById('breadcrumb-list');
    
    if (!breadcrumbContainer || !breadcrumbList) return;
    
    if (pageId === 'home') {
        breadcrumbContainer.style.display = 'none';
        return;
    }
    
    const route = pageRoutes[pageId];
    if (!route) return;
    
    breadcrumbContainer.style.display = 'block';
    breadcrumbList.innerHTML = '';
    
    route.breadcrumb.forEach((crumb, index) => {
        const li = document.createElement('li');
        if (index === route.breadcrumb.length - 1) {
            li.textContent = crumb;
        } else {
            const a = document.createElement('a');
            a.textContent = crumb;
            a.href = '#';
            if (index === 0) {
                a.onclick = () => showPage('home');
            }
            li.appendChild(a);
        }
        breadcrumbList.appendChild(li);
    });
}

// 更新导航active状态
function updateNavigation(pageId) {
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    if (pageId === 'home') {
        const homeLink = document.querySelector('.main-nav a[onclick*="home"]');
        if (homeLink) homeLink.classList.add('active');
    }
}

// 区域选择功能
function selectRegion(region) {
    console.log('选择了区域:', region);
    const regionNames = {
        'europe': '欧洲',
        'north-america': '北美洲',
        'asia': '亚洲',
        'oceania': '澳洲',
        'africa': '非洲',
        'south-america': '南美洲'
    };
    alert('您选择了: ' + regionNames[region]);
}

// 政策库打开功能 - 支持域内和域外
function openPolicyLib(type) {
    console.log('打开政策库:', type);
    
    // 隐藏政府页面
    const governmentPage = document.getElementById('ai-fake-info-government-page');
    if (governmentPage) {
        governmentPage.classList.remove('active');
    }
    
    // 隐藏所有政策库页面
    const foreignPolicyPage = document.getElementById('foreign-policy-library');
    const internalPolicyPage = document.getElementById('internal-policy-library');
    
    if (foreignPolicyPage) {
        foreignPolicyPage.style.display = 'none';
        foreignPolicyPage.classList.remove('active');
    }
    
    if (internalPolicyPage) {
        internalPolicyPage.style.display = 'none';
        internalPolicyPage.classList.remove('active');
    }
    
    // 根据类型显示相应页面
    if (type === 'external') {
        if (foreignPolicyPage) {
            foreignPolicyPage.style.display = 'block';
            foreignPolicyPage.classList.add('active');
            updatePolicyLibBreadcrumb('域外政策库');
        } else {
            console.error('找不到域外政策库页面');
        }
    } else if (type === 'internal') {
        if (internalPolicyPage) {
            internalPolicyPage.style.display = 'block';
            internalPolicyPage.classList.add('active');
            updatePolicyLibBreadcrumb('域内政策库');
        } else {
            console.error('找不到域内政策库页面');
        }
    }
    
    // 滚动到顶部
    window.scrollTo(0, 0);
}

// 更新政策库面包屑 - 简化版本
function updatePolicyLibBreadcrumb(libName) {
    const breadcrumbContainer = document.getElementById('breadcrumb');
    const breadcrumbList = document.getElementById('breadcrumb-list');
    
    if (breadcrumbContainer && breadcrumbList) {
        breadcrumbContainer.style.display = 'block';
        breadcrumbList.innerHTML = `
            <li><a href="#" onclick="showPage('home')">首页</a></li>
            <li><a href="#" onclick="showPage('ai-fake-info-government')">AI虚假信息治理</a></li>
            <li><a href="#" onclick="goToGovernment()">政府</a></li>
            <li class="active">${libName}</li>
        `;
    }
}

// 更新返回政府页面的函数
function goToGovernment() {
    // 隐藏域外政策库页面
    const foreignPolicyPage = document.getElementById('foreign-policy-library');
    if (foreignPolicyPage) {
        foreignPolicyPage.style.display = 'none';
        foreignPolicyPage.classList.remove('active');
    }
    
    // 隐藏域内政策库页面
    const internalPolicyPage = document.getElementById('internal-policy-library');
    if (internalPolicyPage) {
        internalPolicyPage.style.display = 'none';
        internalPolicyPage.classList.remove('active');
    }
    
    // 显示政府页面
    showPage('ai-fake-info-government');
}

// 初始化下拉菜单功能
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 关闭其他打开的下拉菜单
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // 切换当前下拉菜单
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // 点击页面其他地方关闭下拉菜单
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// 初始化动画效果
function initAnimations() {
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.region-item, .product-card, .news-item');
        animatedElements.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
}

// 监听浏览器前进后退按钮
window.addEventListener('popstate', function(e) {
    const pageId = window.location.hash.substring(1) || 'home';
    showPage(pageId);
});

// 文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化轮播图
    initCarousel();
    if (totalSlides > 0) {
        showSlide(0);
        // 启动自动轮播（每5秒切换一次）
        setInterval(autoSlide, 5000);
    }
    
    // 初始化页面
    const pageId = window.location.hash.substring(1) || 'home';
    showPage(pageId);
    
    // 初始化下拉菜单
    initDropdowns();
    
    // 初始化动画效果
    initAnimations();
});

// 更新下载PDF函数
function downloadPDF(region) {
    const pdfUrls = {
        'europe': 'docs/europe_dsa_policy.pdf',
        'north-america': 'docs/north_america_policy.pdf',
        'asia': 'docs/asia_policy.pdf',
        'oceania': 'docs/oceania_policy.pdf',
        'africa': 'docs/africa_policy.pdf',
        'south-america': 'docs/south_america_policy.pdf',
        'foreign-policy': 'docs/foreign-policy_policy.pdf',
        'internal-policy': 'docs/internal-policy_policy.pdf'  // 新增域内政策库PDF
    };
    
    if (pdfUrls[region]) {
        window.open(pdfUrls[region], '_blank');
    } else {
        alert('文档暂未上传，敬请期待！');
    }
}

// 切换PDF全屏查看
function toggleFullscreen(elementId) {
    const element = document.getElementById(elementId);
    
    if (!document.fullscreenElement) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) { /* Safari */
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { /* IE11 */
            element.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
}

// 显示相关案例
function showRelatedCases(region) {
    // 实现显示相关案例的逻辑
    alert(`正在加载${getRegionName(region)}地区的相关案例，敬请期待！`);
}

// 地区选择函数
function selectRegion(region) {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));
    
    // 显示对应的地区页面
    const targetPage = document.getElementById(region + '-region-page');
    if (targetPage) {
        targetPage.classList.add('active');
        
        // 更新面包屑导航
        const breadcrumbList = document.getElementById('breadcrumb-list');
        if (breadcrumbList) {
            breadcrumbList.innerHTML = `
                <li><a href="#" onclick="showPage('home')">首页</a></li>
                <li><a href="#" onclick="showPage('ai-fake-info-government')">政府 - AI虚假信息治理</a></li>
                <li class="active">${getRegionName(region)}</li>
            `;
        }
        
        document.getElementById('breadcrumb').style.display = 'block';
    } else {
        console.error(`找不到ID为 ${region}-region-page 的页面元素`);
    }
    
    // 滚动到顶部
    window.scrollTo(0, 0);
}

// 获取地区名称
function getRegionName(region) {
    const regionNames = {
        'europe': '欧洲',
        'north-america': '北美洲',
        'asia': '亚洲',
        'oceania': '大洋洲',
        'africa': '非洲',
        'south-america': '南美洲'
    };
    return regionNames[region] || region;
}

// 处理PDF加载错误
function handlePDFError(region) {
    const iframe = document.querySelector(`#${region}-pdf-viewer iframe`);
    const errorDiv = document.getElementById(`${region}-pdf-error`);
    
    if (iframe) iframe.style.display = 'none';
    if (errorDiv) errorDiv.style.display = 'block';
}

// 使用Google PDF查看器
function loadGoogleViewer(region) {
    const pdfUrls = {
        'europe': 'docs/europe_dsa_policy.pdf',
        'north-america': 'docs/north_america_policy.pdf',
        'asia': 'docs/asia_policy.pdf',
        'oceania': 'docs/oceania_policy.pdf',
        'africa': 'docs/africa_policy.pdf',
        'south-america': 'docs/south_america_policy.pdf',
        'foreign-policy': 'docs/foreign-policy_policy.pdf'
    };
    
    const pdfUrl = pdfUrls[region];
    if (!pdfUrl) return;
    
    const fullUrl = window.location.origin + '/' + pdfUrl;
    const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fullUrl)}&embedded=true`;
    
    const iframe = document.querySelector(`#${region}-pdf-viewer iframe`);
    const errorDiv = document.getElementById(`${region}-pdf-error`);
    
    if (iframe) {
        iframe.src = googleViewerUrl;
        iframe.style.display = 'block';
    }
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// 显示相关案例
function showRelatedCases(region) {
    // 隐藏所有案例区域
    document.querySelectorAll('.related-cases').forEach(element => {
        element.style.display = 'none';
    });
    
    // 显示对应地区的案例
    const casesElement = document.getElementById(region + '-cases');
    if (casesElement) {
        casesElement.style.display = 'block';
        // 平滑滚动到案例部分
        casesElement.scrollIntoView({ behavior: 'smooth' });
    } else {
        alert(`正在加载${getRegionName(region)}地区的相关案例，敬请期待！`);
    }
}

// 打开媒体链接
function openMediaLink(url, name) {
    if (url === '#') {
        alert(`${name} 页面正在建设中，敬请期待！`);
    } else {
        // 在新窗口中打开链接
        window.open(url, '_blank');
        
        // 可选：记录用户点击
        console.log(`用户访问了: ${name} - ${url}`);
    }
}

// 打开工具页面
function openToolPage(toolType) {
    const toolNames = {
        'fact-check-guide': '事实核查指南',
        'ai-detection-tools': 'AI检测工具',
        'media-ethics': '媒体伦理准则',
        'training-resources': '培训资源'
    };
    
    const toolName = toolNames[toolType] || '未知工具';
    
    // 这里可以根据需要跳转到具体的工具页面
    // 目前显示提示信息
    alert(`${toolName}功能正在开发中，敬请期待！`);
    
    // 如果将来有具体的工具页面，可以这样跳转：
    // showPage(`media-tool-${toolType}`);
}
// 响应式图片切换
function updateBackgroundImages() {
    const slides = document.querySelectorAll('.slide-background');
    const isMobile = window.innerWidth <= 768;
    
    slides.forEach(slide => {
        const desktopImg = slide.getAttribute('data-desktop');
        const mobileImg = slide.getAttribute('data-mobile');
        const imgSrc = isMobile ? mobileImg : desktopImg;
        slide.style.backgroundImage = `url('${imgSrc}')`;
    });
}

// 页面加载和窗口大小改变时调用
window.addEventListener('load', updateBackgroundImages);
window.addEventListener('resize', updateBackgroundImages);