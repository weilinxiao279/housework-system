// 家务积分管理系统 - 主程序

// 默认任务配置
const DEFAULT_TASKS = [
    { id: 1, name: '擦桌面/台面', points: 2, monthlyLimit: 3, note: '', completed: 0 },
    { id: 2, name: '整理桌面/地面杂物', points: 2, monthlyLimit: 3, note: '', completed: 0 },
    { id: 3, name: '全扫地+拖地', points: 1, monthlyLimit: 3, note: '', completed: 0 },
    { id: 4, name: '厨房灶台', points: 1.5, monthlyLimit: 3, note: '', completed: 0 },
    { id: 5, name: '厨房地板', points: 2.5, monthlyLimit: 3, note: '', completed: 0 },
    { id: 6, name: '清洗卫生间', points: 5, monthlyLimit: 3, note: '洗手池+地板+坑+刷子+冲水', completed: 0 },
    { id: 7, name: '套餐：客厅全部', points: 3, monthlyLimit: 2, note: '仅限周末', completed: 0 },
    { id: 8, name: '套餐：餐厅全部', points: 3, monthlyLimit: 2, note: '仅限周末', completed: 0 },
    { id: 9, name: '套餐：卧室全部', points: 4, monthlyLimit: 2, note: '仅限周末', completed: 0 },
    { id: 10, name: '套餐：厨房全部', points: 3, monthlyLimit: 2, note: '仅限周末', completed: 0 }
];

// 数据存储键名
const STORAGE_KEYS = {
    TASKS: 'housework_tasks',
    RECORDS: 'housework_records',
    WALLET: 'housework_wallet',
    LEAVES: 'housework_leaves',
    MONTH: 'housework_current_month',
    EXCHANGE_RATE: 'housework_exchange_rate',
    TOTAL_POINTS: 'housework_total_points'
};

// VIP等级配置 - 星星→月亮→太阳→皇冠进阶路线
const VIP_LEVELS = [
    // 星星阶段 (VIP1-VIP6) - 铜色到金色渐变
    { level: 1, name: 'VIP1', minPoints: 0, maxPoints: 10, badge: '⭐', color: '#CD7F32', bgColor: 'linear-gradient(135deg, #DEB887 0%, #CD7F32 100%)', stage: '星星' },
    { level: 2, name: 'VIP2', minPoints: 10, maxPoints: 25, badge: '⭐⭐', color: '#B87333', bgColor: 'linear-gradient(135deg, #CD853F 0%, #B87333 100%)', stage: '星星' },
    { level: 3, name: 'VIP3', minPoints: 25, maxPoints: 50, badge: '⭐⭐⭐', color: '#DAA520', bgColor: 'linear-gradient(135deg, #F0E68C 0%, #DAA520 100%)', stage: '星星' },
    { level: 4, name: 'VIP4', minPoints: 50, maxPoints: 75, badge: '⭐⭐⭐⭐', color: '#FFD700', bgColor: 'linear-gradient(135deg, #FFFACD 0%, #FFD700 100%)', stage: '星星' },
    { level: 5, name: 'VIP5', minPoints: 75, maxPoints: 100, badge: '⭐⭐⭐⭐⭐', color: '#FFC125', bgColor: 'linear-gradient(135deg, #FFEC8B 0%, #FFC125 100%)', stage: '星星' },
    { level: 6, name: 'VIP6', minPoints: 100, maxPoints: 125, badge: '✨⭐✨', color: '#FFB90F', bgColor: 'linear-gradient(135deg, #FFE7BA 0%, #FFB90F 100%)', stage: '星星' },
    
    // 月亮阶段 (VIP7-VIP12) - 银蓝到深蓝渐变
    { level: 7, name: 'VIP7', minPoints: 125, maxPoints: 150, badge: '🌙', color: '#C0C0C0', bgColor: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)', stage: '月亮' },
    { level: 8, name: 'VIP8', minPoints: 150, maxPoints: 175, badge: '🌙🌙', color: '#B0C4DE', bgColor: 'linear-gradient(135deg, #D3D3D3 0%, #B0C4DE 100%)', stage: '月亮' },
    { level: 9, name: 'VIP9', minPoints: 175, maxPoints: 200, badge: '🌙🌙🌙', color: '#87CEEB', bgColor: 'linear-gradient(135deg, #B0E0E6 0%, #87CEEB 100%)', stage: '月亮' },
    { level: 10, name: 'VIP10', minPoints: 200, maxPoints: 225, badge: '🌙✨🌙', color: '#4682B4', bgColor: 'linear-gradient(135deg, #87CEFA 0%, #4682B4 100%)', stage: '月亮' },
    { level: 11, name: 'VIP11', minPoints: 225, maxPoints: 250, badge: '🌙🌙🌙🌙', color: '#4169E1', bgColor: 'linear-gradient(135deg, #6495ED 0%, #4169E1 100%)', stage: '月亮' },
    { level: 12, name: 'VIP12', minPoints: 250, maxPoints: 275, badge: '🌙✨🌙✨🌙', color: '#0000CD', bgColor: 'linear-gradient(135deg, #4169E1 0%, #0000CD 100%)', stage: '月亮' },
    
    // 太阳阶段 (VIP13-VIP16) - 橙红到金黄渐变
    { level: 13, name: 'VIP13', minPoints: 275, maxPoints: 300, badge: '☀️', color: '#FF8C00', bgColor: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)', stage: '太阳' },
    { level: 14, name: 'VIP14', minPoints: 300, maxPoints: 325, badge: '☀️☀️', color: '#FF7F50', bgColor: 'linear-gradient(135deg, #FF8C69 0%, #FF7F50 100%)', stage: '太阳' },
    { level: 15, name: 'VIP15', minPoints: 325, maxPoints: 350, badge: '☀️☀️☀️', color: '#FF6347', bgColor: 'linear-gradient(135deg, #FF7F50 0%, #FF6347 100%)', stage: '太阳' },
    { level: 16, name: 'VIP16', minPoints: 350, maxPoints: 375, badge: '🔥☀️🔥', color: '#FF4500', bgColor: 'linear-gradient(135deg, #FF6347 0%, #FF4500 100%)', stage: '太阳' },
    
    // 皇冠阶段 (VIP17-VIP18) - 紫金到金红渐变
    { level: 17, name: 'VIP17', minPoints: 375, maxPoints: 400, badge: '👑', color: '#FFD700', bgColor: 'linear-gradient(135deg, #DAA520 0%, #FFD700 50%, #FF6347 100%)', stage: '皇冠' },
    { level: 18, name: 'VIP18', minPoints: 400, maxPoints: Infinity, badge: '👑👑👑', color: '#FF1493', bgColor: 'linear-gradient(135deg, #FFD700 0%, #FF1493 50%, #8B008B 100%)', stage: '皇冠' }
];

// 全局数据
let appData = {
    tasks: [],
    records: [],
    wallet: 0,
    leavesUsed: 0,
    currentMonth: '',
    exchangeRate: 2.5,
    totalPoints: 0
};

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

// 初始化
function initApp() {
    const now = new Date();
    const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    
    // 检查是否是新月
    const savedMonth = localStorage.getItem(STORAGE_KEYS.MONTH);
    if (savedMonth !== currentMonthKey) {
        // 新月，重置月度数据
        if (savedMonth) {
            showToast(`已进入 ${currentMonthKey} 月，月度数据已重置`, 'success');
        }
        localStorage.setItem(STORAGE_KEYS.MONTH, currentMonthKey);
        resetMonthlyData();
    }
    
    appData.currentMonth = currentMonthKey;
    
    // 加载数据
    loadData();
    
    // 渲染界面
    renderAll();
    
    // 初始化滑块
    initSlider();
    
    // 绑定事件
    bindEvents();
}

// 绑定事件
function bindEvents() {
    // 现金提现按钮
    document.querySelector('.cash-withdraw').addEventListener('click', openWithdrawModal);
    
    // 交易记录标签切换
    document.querySelectorAll('.transaction-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.transaction-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderTransactionList(this.dataset.filter);
        });
    });
    
    // 后门按钮点击检测
    setupBackdoor();
    
    // 伪装按钮点击提示
    setupFakeFeatureBtn();
}

// 伪装按钮功能
function setupFakeFeatureBtn() {
    const fakeBtn = document.getElementById('fakeFeatureBtn');
    if (fakeBtn) {
        fakeBtn.addEventListener('click', function(e) {
            // 如果点击的是真正的后门按钮，不执行此逻辑
            if (e.target.id === 'backdoorBtn') return;
            
            showToast('敬请期待！', 'info');
        });
    }
}

// 后门功能
let backdoorClickCount = 0;
let backdoorTimer = null;

function setupBackdoor() {
    const backdoorBtn = document.getElementById('backdoorBtn');
    if (backdoorBtn) {
        backdoorBtn.addEventListener('click', function() {
            backdoorClickCount++;
            
            // 重置定时器
            if (backdoorTimer) {
                clearTimeout(backdoorTimer);
            }
            
            // 3秒内连续点击6次
            backdoorTimer = setTimeout(() => {
                backdoorClickCount = 0;
            }, 3000);
            
            // 连续点击6次
            if (backdoorClickCount >= 6) {
                openBackdoor();
                backdoorClickCount = 0;
            } else {
                // 点击次数不足6次，显示"敬请期待"提示
                showToast('敬请期待！', 'info');
            }
        });
    }
}

// 打开后门
function openBackdoor() {
    // 填充当前值
    document.getElementById('adminPoints').value = '';
    document.getElementById('adminTotalPoints').value = '';
    document.getElementById('adminWallet').value = appData.wallet;
    document.getElementById('adminLeaves').value = appData.leavesUsed;
    document.getElementById('adminExchangeRate').value = appData.exchangeRate;
    document.getElementById('currentExchangeRate').textContent = appData.exchangeRate;
    document.getElementById('currentTotalPoints').textContent = appData.totalPoints.toFixed(1);
    
    openModal('backdoorModal');
}

// 管理员增加积分
function adminAddPoints() {
    const points = parseFloat(document.getElementById('adminPoints').value);
    if (isNaN(points) || points <= 0) {
        showToast('请输入有效积分数量', 'error');
        return;
    }
    
    // 添加积分记录
    const record = {
        id: Date.now(),
        taskId: 0,
        taskName: '管理员增加积分',
        points: points,
        type: 'earn',
        note: '管理员操作',
        date: new Date().toISOString()
    };
    
    appData.records.push(record);
    saveRecords();
    renderAll();
    
    showToast(`成功增加 ${points} 积分！`, 'success');
}

// 管理员减少积分
function adminRemovePoints() {
    const points = parseFloat(document.getElementById('adminPoints').value);
    if (isNaN(points) || points <= 0) {
        showToast('请输入有效积分数量', 'error');
        return;
    }
    
    if (getCurrentPoints() < points) {
        showToast('积分不足', 'error');
        return;
    }
    
    // 添加积分记录
    const record = {
        id: Date.now(),
        taskId: 0,
        taskName: '管理员减少积分',
        points: -points,
        type: 'penalty',
        note: '管理员操作',
        date: new Date().toISOString()
    };
    
    appData.records.push(record);
    saveRecords();
    renderAll();
    
    showToast(`成功减少 ${points} 积分！`, 'success');
}

// 管理员设置提现上限
function adminSetWithdrawLimit() {
    const limit = parseFloat(document.getElementById('adminWithdrawLimit').value);
    if (isNaN(limit) || limit <= 0) {
        showToast('请输入有效额度', 'error');
        return;
    }
    
    // 这里可以存储提现上限，目前系统是硬编码100元
    // 实际使用中可以存储到localStorage
    showToast(`提现上限已设置为 ${limit} 元`, 'success');
}

// 管理员增加钱包金额
function adminAddWallet() {
    const amount = parseFloat(document.getElementById('adminWallet').value);
    if (isNaN(amount) || amount <= 0) {
        showToast('请输入有效金额', 'error');
        return;
    }
    
    appData.wallet += amount;
    saveWallet();
    renderAll();
    
    showToast(`成功增加 ${amount} 元到钱包！`, 'success');
}

// 管理员减少钱包金额
function adminRemoveWallet() {
    const amount = parseFloat(document.getElementById('adminWallet').value);
    if (isNaN(amount) || amount <= 0) {
        showToast('请输入有效金额', 'error');
        return;
    }
    
    if (appData.wallet < amount) {
        showToast('钱包金额不足', 'error');
        return;
    }
    
    appData.wallet -= amount;
    saveWallet();
    renderAll();
    
    showToast(`成功减少 ${amount} 元钱包金额！`, 'success');
}

// 管理员设置请假次数
function adminSetLeaves() {
    const leaves = parseInt(document.getElementById('adminLeaves').value);
    if (isNaN(leaves) || leaves < 0 || leaves > 6) {
        showToast('请输入0-6之间的数字', 'error');
        return;
    }
    
    appData.leavesUsed = leaves;
    saveLeaves();
    renderAll();
    
    showToast(`请假次数已设置为 ${leaves} 次！`, 'success');
}

// 初始化滑块
function initSlider() {
    const slider = document.getElementById('pointsSlider');
    if (slider) {
        slider.addEventListener('input', function() {
            const value = parseInt(this.value);
            const time = value * appData.exchangeRate;
            
            // 更新滑块点
            document.querySelectorAll('.slider-point').forEach((point, index) => {
                if (index + 1 === value) {
                    point.classList.add('active');
                } else {
                    point.classList.remove('active');
                }
            });
            
            // 更新时间显示
            document.querySelector('.time-amount').textContent = time + ' 分钟';
            
            // 检查积分是否足够
            updateExchangeButton();
        });
    }
}

// 更新兑换按钮状态
function updateExchangeButton() {
    const slider = document.getElementById('pointsSlider');
    const btn = document.getElementById('exchangeBtn');
    const points = parseInt(slider.value);
    
    const totalPoints = getCurrentPoints();
    
    if (totalPoints >= points) {
        btn.classList.add('active');
        btn.textContent = '兑换';
        btn.onclick = function() {
            exchangeGameTime(points);
        };
    } else {
        btn.classList.remove('active');
        btn.textContent = '积分不足';
        btn.onclick = null;
    }
}

// 加载数据
function loadData() {
    // 加载任务
    const savedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (savedTasks) {
        appData.tasks = JSON.parse(savedTasks);
    } else {
        appData.tasks = JSON.parse(JSON.stringify(DEFAULT_TASKS));
        saveTasks();
    }
    
    // 加载记录
    const savedRecords = localStorage.getItem(STORAGE_KEYS.RECORDS);
    if (savedRecords) {
        appData.records = JSON.parse(savedRecords);
    }
    
    // 加载钱包
    const savedWallet = localStorage.getItem(STORAGE_KEYS.WALLET);
    if (savedWallet) {
        appData.wallet = parseFloat(savedWallet);
    }
    
    // 加载请假次数
    const savedLeaves = localStorage.getItem(STORAGE_KEYS.LEAVES);
    if (savedLeaves) {
        appData.leavesUsed = parseInt(savedLeaves);
    }
    
    // 加载兑换比例
    const savedExchangeRate = localStorage.getItem(STORAGE_KEYS.EXCHANGE_RATE);
    if (savedExchangeRate) {
        appData.exchangeRate = parseFloat(savedExchangeRate);
    } else {
        appData.exchangeRate = 2.5;
        saveExchangeRate();
    }
    
    // 加载累计积分
    const savedTotalPoints = localStorage.getItem(STORAGE_KEYS.TOTAL_POINTS);
    if (savedTotalPoints) {
        appData.totalPoints = parseFloat(savedTotalPoints);
    } else {
        appData.totalPoints = 0;
        saveTotalPoints();
    }
}

// 保存任务
function saveTasks() {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(appData.tasks));
}

// 保存记录
function saveRecords() {
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(appData.records));
}

// 保存钱包
function saveWallet() {
    localStorage.setItem(STORAGE_KEYS.WALLET, appData.wallet.toString());
}

// 保存请假次数
function saveLeaves() {
    localStorage.setItem(STORAGE_KEYS.LEAVES, appData.leavesUsed.toString());
}

// 保存兑换比例
function saveExchangeRate() {
    localStorage.setItem(STORAGE_KEYS.EXCHANGE_RATE, appData.exchangeRate.toString());
}

// 保存累计积分
function saveTotalPoints() {
    localStorage.setItem(STORAGE_KEYS.TOTAL_POINTS, appData.totalPoints.toString());
}

// 获取当前VIP等级
function getCurrentVIPLevel() {
    for (let i = VIP_LEVELS.length - 1; i >= 0; i--) {
        if (appData.totalPoints >= VIP_LEVELS[i].minPoints) {
            return VIP_LEVELS[i];
        }
    }
    return VIP_LEVELS[0];
}

// 获取下一级VIP信息
function getNextVIPLevel() {
    const currentLevel = getCurrentVIPLevel();
    if (currentLevel.level < 18) {
        return VIP_LEVELS[currentLevel.level];
    }
    return null;
}

// 计算升级进度百分比
function getVIPProgress() {
    const currentLevel = getCurrentVIPLevel();
    const nextLevel = getNextVIPLevel();
    
    if (!nextLevel) {
        return 100;
    }
    
    const progress = ((appData.totalPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100;
    return Math.min(100, Math.max(0, progress));
}

// 增加累计积分
function addTotalPoints(points) {
    const oldLevel = getCurrentVIPLevel();
    appData.totalPoints += points;
    saveTotalPoints();
    
    const newLevel = getCurrentVIPLevel();
    
    // 检查是否升级
    if (newLevel.level > oldLevel.level) {
        showToast(`🎉 恭喜升级！您已晋升为 ${newLevel.name}！`, 'success');
    }
    
    return newLevel;
}

// 管理员设置兑换比例
function adminSetExchangeRate() {
    const rate = parseFloat(document.getElementById('adminExchangeRate').value);
    if (isNaN(rate) || rate <= 0) {
        showToast('请输入有效的兑换比例', 'error');
        return;
    }
    
    appData.exchangeRate = rate;
    saveExchangeRate();
    
    // 更新显示
    document.getElementById('currentExchangeRate').textContent = rate;
    renderExchangePage();
    
    showToast(`兑换比例已设置为 1积分 = ${rate} 分钟！`, 'success');
}

// 加密和解密功能
const ENCRYPTION_KEY = 'housework_secret_key_2026';

// 加密函数
function encrypt(text) {
    let encrypted = '';
    for (let i = 0; i < text.length; i++) {
        const keyChar = ENCRYPTION_KEY[i % ENCRYPTION_KEY.length];
        const encryptedChar = String.fromCharCode(text.charCodeAt(i) ^ keyChar.charCodeAt(0));
        encrypted += encryptedChar;
    }
    
    // 使用更可靠的编码方式
    return btoa(unescape(encodeURIComponent(encrypted)));
}

// 解密函数
function decrypt(encryptedText) {
    try {
        // 使用对应的解码方式
        const decoded = decodeURIComponent(escape(atob(encryptedText)));
        let decrypted = '';
        for (let i = 0; i < decoded.length; i++) {
            const keyChar = ENCRYPTION_KEY[i % ENCRYPTION_KEY.length];
            const decryptedChar = String.fromCharCode(decoded.charCodeAt(i) ^ keyChar.charCodeAt(0));
            decrypted += decryptedChar;
        }
        return decrypted;
    } catch (error) {
        throw new Error('解密失败，请检查输入的文本是否正确');
    }
}

// 重置月度数据
function resetMonthlyData() {
    // 重置任务完成次数
    appData.tasks.forEach(task => {
        task.completed = 0;
    });
    saveTasks();
    
    // 清空记录
    appData.records = [];
    saveRecords();
    
    // 重置请假次数
    appData.leavesUsed = 0;
    saveLeaves();
}

// 渲染所有界面
// 更新VIP等级显示
function updateVIPDisplay() {
    const currentLevel = getCurrentVIPLevel();
    const nextLevel = getNextVIPLevel();
    const progress = getVIPProgress();
    
    // 更新徽章
    const badgeEl = document.getElementById('vipBadge');
    if (badgeEl) {
        badgeEl.textContent = currentLevel.badge;
        badgeEl.style.background = currentLevel.bgColor;
    }
    
    // 更新名称
    const nameEl = document.getElementById('vipName');
    if (nameEl) {
        nameEl.textContent = currentLevel.name;
        nameEl.style.color = currentLevel.color;
    }
    
    // 更新进度条
    const progressFill = document.getElementById('vipProgressFill');
    const progressText = document.getElementById('vipProgressText');
    
    if (progressFill) {
        progressFill.style.width = progress + '%';
    }
    
    if (progressText) {
        if (nextLevel) {
            progressText.textContent = `${Math.floor(appData.totalPoints)}/${nextLevel.minPoints}`;
        } else {
            progressText.textContent = '已满级';
        }
    }
}

// 打开VIP等级详情弹窗
function openVIPLevelModal() {
    const currentLevel = getCurrentVIPLevel();
    const nextLevel = getNextVIPLevel();
    const progress = getVIPProgress();
    
    // 更新当前状态
    document.getElementById('vipCurrentBadge').textContent = currentLevel.badge;
    document.getElementById('vipCurrentBadge').style.background = currentLevel.bgColor;
    document.getElementById('vipCurrentName').textContent = currentLevel.name;
    document.getElementById('vipCurrentName').style.color = currentLevel.color;
    document.getElementById('vipCurrentPoints').textContent = appData.totalPoints.toFixed(1);
    
    // 更新进度条
    document.getElementById('vipModalProgressFill').style.width = progress + '%';
    if (nextLevel) {
        document.getElementById('vipModalProgressText').textContent = `${Math.floor(appData.totalPoints)}/${nextLevel.minPoints}`;
    } else {
        document.getElementById('vipModalProgressText').textContent = '已满级';
    }
    
    // 生成等级列表 - 按阶段分组
    const levelsList = document.getElementById('vipLevelsList');
    levelsList.innerHTML = '';
    
    // 定义阶段配置
    const stages = [
        { name: '星星阶段', icon: '⭐', color: '#FFD700', levels: VIP_LEVELS.filter(l => l.stage === '星星') },
        { name: '月亮阶段', icon: '🌙', color: '#4169E1', levels: VIP_LEVELS.filter(l => l.stage === '月亮') },
        { name: '太阳阶段', icon: '☀️', color: '#FF6347', levels: VIP_LEVELS.filter(l => l.stage === '太阳') },
        { name: '皇冠阶段', icon: '👑', color: '#FF1493', levels: VIP_LEVELS.filter(l => l.stage === '皇冠') }
    ];
    
    stages.forEach(stage => {
        // 创建阶段标题
        const stageHeader = document.createElement('div');
        stageHeader.className = 'vip-stage-header';
        stageHeader.innerHTML = `
            <div class="vip-stage-icon" style="background: ${stage.color}20; color: ${stage.color}">${stage.icon}</div>
            <div class="vip-stage-name" style="color: ${stage.color}">${stage.name}</div>
            <div class="vip-stage-line" style="background: linear-gradient(90deg, ${stage.color}40, transparent)"></div>
        `;
        levelsList.appendChild(stageHeader);
        
        // 创建阶段等级网格
        const stageGrid = document.createElement('div');
        stageGrid.className = 'vip-stage-grid';
        
        stage.levels.forEach(level => {
            const isCurrent = level.level === currentLevel.level;
            const isUnlocked = appData.totalPoints >= level.minPoints;
            
            const levelCard = document.createElement('div');
            levelCard.className = `vip-level-card ${isCurrent ? 'current' : ''} ${isUnlocked ? 'unlocked' : 'locked'}`;
            levelCard.innerHTML = `
                <div class="vip-card-badge" style="background: ${level.bgColor}">${level.badge}</div>
                <div class="vip-card-name" style="color: ${level.color}">${level.name}</div>
                <div class="vip-card-points">${level.minPoints}积分</div>
                ${isCurrent ? '<div class="vip-card-mark current">当前</div>' : ''}
                ${isUnlocked && !isCurrent ? '<div class="vip-card-mark unlocked">✓</div>' : ''}
            `;
            stageGrid.appendChild(levelCard);
        });
        
        levelsList.appendChild(stageGrid);
    });
    
    openModal('vipLevelModal');
}

// 管理员增加累计积分
function adminAddTotalPoints() {
    const points = parseFloat(document.getElementById('adminTotalPoints').value);
    if (isNaN(points) || points <= 0) {
        showToast('请输入有效的积分数量', 'error');
        return;
    }
    
    addTotalPoints(points);
    document.getElementById('currentTotalPoints').textContent = appData.totalPoints.toFixed(1);
    renderAll();
    showToast(`已增加 ${points} 累计积分！`, 'success');
}

// 管理员设置累计积分
function adminSetTotalPoints() {
    const points = parseFloat(document.getElementById('adminTotalPoints').value);
    if (isNaN(points) || points < 0) {
        showToast('请输入有效的积分数量', 'error');
        return;
    }
    
    appData.totalPoints = points;
    saveTotalPoints();
    document.getElementById('currentTotalPoints').textContent = appData.totalPoints.toFixed(1);
    renderAll();
    showToast(`累计积分已设置为 ${points}！`, 'success');
}

function renderAll() {
    renderHeader();
    renderTaskList();
    renderExchangePage();
    renderMyPage();
    renderTaskSelect();
}

// 渲染顶部标题栏
function renderHeader() {
    const points = getCurrentPoints();
    document.querySelector('.current-points').textContent = points.toFixed(1);
    document.querySelector('.points-label').textContent = `= ${points.toFixed(1)} 元`;
    document.querySelector('.total-points').textContent = points.toFixed(1);
    document.querySelector('.profile-info .points-label').textContent = `= ${points.toFixed(1)} 元`;
    
    // 更新VIP等级显示
    updateVIPDisplay();
}

// 获取当前积分
function getCurrentPoints() {
    const totalPoints = appData.records
        .filter(r => r.type === 'earn')
        .reduce((sum, r) => sum + r.points, 0);
    
    const penalties = appData.records
        .filter(r => r.type === 'penalty' || r.type === 'withdraw' || r.type === 'exchange')
        .reduce((sum, r) => sum + Math.abs(r.points), 0);
    
    return Math.max(0, totalPoints - penalties);
}

// 渲染任务列表
function renderTaskList() {
    const container = document.getElementById('taskList');
    
    if (appData.tasks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <p>暂无任务，请先添加任务</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = appData.tasks.map(task => {
        const isFull = task.completed >= task.monthlyLimit;
        
        return `
            <div class="task-item ${isFull ? 'disabled' : ''}">
                <div class="task-info">
                    <div class="task-name">${task.name}</div>
                    <div class="task-progress">本月已完成 ${task.completed}/${task.monthlyLimit} 次</div>
                </div>
                <div class="task-points" ${!isFull ? 'onclick="openTaskModal()"' : ''}>
                    +${task.points} 积分
                </div>
            </div>
        `;
    }).join('');
}

// 渲染兑换页面
function renderExchangePage() {
    const today = new Date().toDateString();
    const todayExchanges = appData.records.filter(r => 
        r.type === 'exchange' && new Date(r.date).toDateString() === today
    ).length;
    
    document.getElementById('todayExchangeCount').textContent = todayExchanges;
    
    // 更新兑换比例显示
    const rateDisplay = document.getElementById('exchangeRateDisplay');
    if (rateDisplay) {
        rateDisplay.textContent = appData.exchangeRate;
    }
    
    // 更新滑块显示
    const slider = document.getElementById('pointsSlider');
    if (slider) {
        const value = parseInt(slider.value);
        const time = value * appData.exchangeRate;
        document.querySelector('.time-amount').textContent = time + ' 分钟';
    }
    
    updateExchangeButton();
}

// 渲染我的页面
function renderMyPage() {
    // 计算统计数据
    const totalEarned = appData.records
        .filter(r => r.type === 'earn')
        .reduce((sum, r) => sum + r.points, 0);
    
    const totalSpent = appData.records
        .filter(r => r.type === 'penalty' || r.type === 'withdraw' || r.type === 'exchange')
        .reduce((sum, r) => sum + Math.abs(r.points), 0);
    
    const monthlyWithdraw = appData.records
        .filter(r => r.type === 'withdraw')
        .reduce((sum, r) => sum + Math.abs(r.points), 0);
    
    const withdrawable = Math.min(getCurrentPoints(), 100);
    
    // 更新统计数据
    document.getElementById('totalEarned').textContent = totalEarned.toFixed(1);
    document.getElementById('totalSpent').textContent = totalSpent.toFixed(1);
    document.getElementById('monthlyWithdraw').textContent = monthlyWithdraw.toFixed(1);
    document.getElementById('withdrawableBalance').textContent = withdrawable.toFixed(1);
    
    // 渲染交易记录
    renderTransactionList('all');
}

// 渲染交易记录
function renderTransactionList(filter = 'all') {
    const container = document.getElementById('transactionList');
    
    // 按时间倒序
    const sortedRecords = [...appData.records].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    
    // 过滤记录
    let filteredRecords = sortedRecords;
    if (filter === 'earn') {
        filteredRecords = sortedRecords.filter(r => r.type === 'earn');
    } else if (filter === 'spend') {
        filteredRecords = sortedRecords.filter(r => 
            r.type === 'penalty' || r.type === 'withdraw' || r.type === 'exchange'
        );
    }
    
    if (filteredRecords.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <p>暂无交易记录</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredRecords.map(record => {
        const date = new Date(record.date);
        const dateStr = `${date.getMonth() + 1}月${date.getDate()}日 ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        const isPositive = record.type === 'earn';
        
        return `
            <div class="transaction-item">
                <div class="transaction-info">
                    <div class="transaction-name">${record.taskName}</div>
                    <div class="transaction-date">${dateStr}</div>
                </div>
                <div class="transaction-amount ${isPositive ? 'positive' : 'negative'}">
                    ${isPositive ? '+' : ''}${record.points} 分
                </div>
            </div>
        `;
    }).join('');
}

// 渲染任务选择下拉框
function renderTaskSelect() {
    const select = document.getElementById('taskSelect');
    const availableTasks = appData.tasks.filter(t => t.completed < t.monthlyLimit);
    
    select.innerHTML = availableTasks.map(task => 
        `<option value="${task.id}">${task.name} (+${task.points}分)</option>`
    ).join('');
    
    // 更新任务信息显示
    updateTaskInfo();
    
    // 监听选择变化
    select.onchange = updateTaskInfo;
}

// 更新任务信息显示
function updateTaskInfo() {
    const select = document.getElementById('taskSelect');
    const infoDiv = document.getElementById('taskInfo');
    
    if (!select.value) {
        infoDiv.innerHTML = '<p>本月所有任务已完成！</p>';
        return;
    }
    
    const taskId = parseInt(select.value);
    const task = appData.tasks.find(t => t.id === taskId);
    
    if (task) {
        infoDiv.innerHTML = `
            <p><strong>任务：</strong>${task.name}</p>
            <p><strong>积分：</strong>+${task.points} 分</p>
            <p><strong>本月进度：</strong>${task.completed}/${task.monthlyLimit} 次</p>
            ${task.note ? `<p><strong>备注：</strong>${task.note}</p>` : ''}
        `;
    }
}

// 页面切换
function switchPage(pageId) {
    // 更新导航状态
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    event.target.closest('.nav-item').classList.add('active');
    
    // 更新页面显示
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    // 重新渲染当前页面
    if (pageId === 'homePage') {
        renderTaskList();
    } else if (pageId === 'exchangePage') {
        renderExchangePage();
    } else if (pageId === 'myPage') {
        renderMyPage();
    }
}

// 打开弹窗
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

// 关闭弹窗
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// 打开任务打卡弹窗
function openTaskModal() {
    renderTaskSelect();
    document.getElementById('taskNote').value = '';
    openModal('taskModal');
}

// 打开提现弹窗
function openWithdrawModal() {
    const available = Math.min(getCurrentPoints(), 100);
    document.getElementById('withdrawAvailable').textContent = available.toFixed(1);
    document.getElementById('withdrawAmount').value = '';
    document.getElementById('withdrawAmount').max = available;
    openModal('withdrawModal');
}

// 打开请假弹窗
function openLeaveModal() {
    const remaining = Math.max(0, 6 - appData.leavesUsed);
    document.getElementById('leaveRemaining').textContent = remaining;
    document.getElementById('leaveReason').value = '';
    openModal('leaveModal');
}

// 打开数据管理弹窗
function openDataModal() {
    openModal('dataModal');
}

// 打开任务管理弹窗
function openTaskManager() {
    renderTaskEditList();
    openModal('taskManagerModal');
}

// 完成任务打卡
function completeTask() {
    const select = document.getElementById('taskSelect');
    if (!select.value) {
        showToast('本月没有可完成的任务', 'error');
        return;
    }
    
    const taskId = parseInt(select.value);
    const task = appData.tasks.find(t => t.id === taskId);
    
    if (!task) return;
    
    if (task.completed >= task.monthlyLimit) {
        showToast('该任务本月已完成上限', 'error');
        return;
    }
    
    // 更新任务完成次数
    task.completed++;
    saveTasks();
    
    // 添加记录
    const note = document.getElementById('taskNote').value.trim();
    const record = {
        id: Date.now(),
        taskId: task.id,
        taskName: task.name,
        points: task.points,
        type: 'earn',
        note: note,
        date: new Date().toISOString()
    };
    
    appData.records.push(record);
    saveRecords();
    
    // 增加累计积分
    addTotalPoints(task.points);
    
    // 刷新界面
    renderAll();
    closeModal('taskModal');
    
    showToast(`完成 "${task.name}"，获得 ${task.points} 积分！`, 'success');
}

// 确认提现
function confirmWithdraw() {
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    
    if (isNaN(amount) || amount < 25) {
        showToast('提现金额至少为25元', 'error');
        return;
    }
    
    const available = Math.min(getCurrentPoints(), 100);
    if (amount > available) {
        showToast('提现金额不能超过可用积分', 'error');
        return;
    }
    
    // 添加提现记录
    const record = {
        id: Date.now(),
        taskId: 0,
        taskName: '提现到荷包',
        points: -amount,
        type: 'withdraw',
        note: `提现 ${amount} 元到听哈鸡的荷包`,
        date: new Date().toISOString()
    };
    
    appData.records.push(record);
    saveRecords();
    
    // 更新钱包
    appData.wallet += amount;
    saveWallet();
    
    // 刷新界面
    renderAll();
    closeModal('withdrawModal');
    
    showToast(`成功提现 ${amount} 元到荷包！`, 'success');
}

// 确认请假
function confirmLeave() {
    if (appData.leavesUsed >= 6) {
        showToast('本月请假次数已用完', 'error');
        return;
    }
    
    const reason = document.getElementById('leaveReason').value.trim();
    
    // 添加请假记录
    const record = {
        id: Date.now(),
        taskId: 0,
        taskName: '请假',
        points: 0,
        type: 'leave',
        note: reason || '请假',
        date: new Date().toISOString()
    };
    
    appData.records.push(record);
    saveRecords();
    
    // 更新请假次数
    appData.leavesUsed++;
    saveLeaves();
    
    // 刷新界面
    renderAll();
    closeModal('leaveModal');
    
    const remaining = 6 - appData.leavesUsed;
    showToast(`请假成功！本月还剩 ${remaining} 次请假机会`, 'success');
}

// 兑换游戏时间
function exchangeGameTime(points) {
    if (getCurrentPoints() < points) {
        showToast('积分不足', 'error');
        return;
    }
    
    // 检查今日兑换次数
    const today = new Date().toDateString();
    const todayExchanges = appData.records.filter(r => 
        r.type === 'exchange' && new Date(r.date).toDateString() === today
    ).length;
    
    if (todayExchanges >= 2) {
        showToast('今日兑换次数已达上限', 'error');
        return;
    }
    
    const minutes = points * appData.exchangeRate;
    
    // 添加兑换记录
    const record = {
        id: Date.now(),
        taskId: 0,
        taskName: `兑换游戏时间 ${minutes}分钟`,
        points: -points,
        type: 'exchange',
        note: `兑换 ${minutes} 分钟游戏时间`,
        date: new Date().toISOString()
    };
    
    appData.records.push(record);
    saveRecords();
    
    // 刷新界面
    renderAll();
    
    showToast(`成功兑换 ${minutes} 分钟游戏时间！`, 'success');
}

// 渲染任务编辑列表
function renderTaskEditList() {
    const container = document.getElementById('taskEditList');
    
    container.innerHTML = appData.tasks.map((task, index) => `
        <div class="task-edit-item" data-index="${index}">
            <input type="text" value="${task.name}" placeholder="任务名称" class="edit-name">
            <input type="number" value="${task.points}" placeholder="积分" step="0.1" class="edit-points small">
            <input type="number" value="${task.monthlyLimit}" placeholder="上限" class="edit-limit small">
            <input type="text" value="${task.note}" placeholder="备注" class="edit-note">
            <button class="btn btn-danger" onclick="deleteTask(${index})">删除</button>
        </div>
    `).join('');
}

// 添加新任务
function addNewTask() {
    const name = document.getElementById('newTaskName').value.trim();
    const points = parseFloat(document.getElementById('newTaskPoints').value);
    const limit = parseInt(document.getElementById('newTaskLimit').value);
    const note = document.getElementById('newTaskNote').value.trim();
    
    if (!name || isNaN(points) || isNaN(limit)) {
        showToast('请填写完整的任务信息', 'error');
        return;
    }
    
    const newTask = {
        id: Date.now(),
        name: name,
        points: points,
        monthlyLimit: limit,
        note: note,
        completed: 0
    };
    
    appData.tasks.push(newTask);
    saveTasks();
    
    // 清空表单
    document.getElementById('newTaskName').value = '';
    document.getElementById('newTaskPoints').value = '';
    document.getElementById('newTaskLimit').value = '';
    document.getElementById('newTaskNote').value = '';
    
    // 刷新列表
    renderTaskEditList();
    renderTaskList();
    
    showToast('任务添加成功！', 'success');
}

// 删除任务
function deleteTask(index) {
    if (!confirm('确定要删除这个任务吗？')) return;
    
    appData.tasks.splice(index, 1);
    saveTasks();
    renderTaskEditList();
    renderTaskList();
    
    showToast('任务已删除', 'success');
}

// 保存编辑的任务（通过事件委托）
document.addEventListener('change', function(e) {
    if (e.target.classList.contains('edit-name') ||
        e.target.classList.contains('edit-points') ||
        e.target.classList.contains('edit-limit') ||
        e.target.classList.contains('edit-note')) {
        
        const item = e.target.closest('.task-edit-item');
        const index = parseInt(item.dataset.index);
        
        const task = appData.tasks[index];
        task.name = item.querySelector('.edit-name').value;
        task.points = parseFloat(item.querySelector('.edit-points').value);
        task.monthlyLimit = parseInt(item.querySelector('.edit-limit').value);
        task.note = item.querySelector('.edit-note').value;
        
        saveTasks();
        renderTaskList();
        renderTaskSelect();
    }
});

// 导出数据
function exportData() {
    const data = {
        tasks: appData.tasks,
        records: appData.records,
        wallet: appData.wallet,
        leavesUsed: appData.leavesUsed,
        currentMonth: appData.currentMonth,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `家务积分数据_${appData.currentMonth}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('数据导出成功！', 'success');
}

// 导入数据
function importData(input) {
    const file = input.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.tasks) {
                appData.tasks = data.tasks;
                saveTasks();
            }
            if (data.records) {
                appData.records = data.records;
                saveRecords();
            }
            if (data.wallet !== undefined) {
                appData.wallet = data.wallet;
                saveWallet();
            }
            if (data.leavesUsed !== undefined) {
                appData.leavesUsed = data.leavesUsed;
                saveLeaves();
            }
            if (data.exchangeRate !== undefined) {
                appData.exchangeRate = data.exchangeRate;
                saveExchangeRate();
            }
            
            renderAll();
            showToast('数据导入成功！', 'success');
        } catch (err) {
            showToast('数据文件格式错误', 'error');
        }
    };
    reader.readAsText(file);
    
    // 清空input
    input.value = '';
}

// 重置所有数据
function resetAllData() {
    if (!confirm('确定要重置所有数据吗？这将清空所有任务、记录和钱包！')) return;
    
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.RECORDS);
    localStorage.removeItem(STORAGE_KEYS.WALLET);
    localStorage.removeItem(STORAGE_KEYS.LEAVES);
    localStorage.removeItem(STORAGE_KEYS.MONTH);
    
    appData.tasks = JSON.parse(JSON.stringify(DEFAULT_TASKS));
    appData.records = [];
    appData.wallet = 0;
    appData.leavesUsed = 0;
    
    saveTasks();
    saveRecords();
    saveWallet();
    saveLeaves();
    
    renderAll();
    showToast('所有数据已重置！', 'success');
}

// 打开文本导入弹窗
function openTextImportModal() {
    openModal('textImportModal');
}

// 打开文本导出弹窗
function openTextExportModal() {
    try {
        const data = {
            tasks: appData.tasks,
            records: appData.records,
            wallet: appData.wallet,
            leavesUsed: appData.leavesUsed,
            currentMonth: appData.currentMonth,
            exchangeRate: appData.exchangeRate,
            exportDate: new Date().toISOString()
        };
        
        const jsonString = JSON.stringify(data, null, 2);
        const encryptedText = encrypt(jsonString);
        
        // 显示到文本区域
        document.getElementById('textExportData').value = encryptedText;
        openModal('textExportModal');
    } catch (error) {
        console.error('导出文本失败:', error);
        showToast('导出失败，请重试', 'error');
    }
}

// 复制文本到剪贴板
function copyTextToClipboard() {
    const text = document.getElementById('textExportData').value;
    if (!text) {
        showToast('没有可复制的文本', 'error');
        return;
    }
    
    navigator.clipboard.writeText(text)
        .then(() => {
            showToast('已复制到剪贴板！', 'success');
        })
        .catch(err => {
            console.error('复制失败:', err);
            showToast('复制失败，请手动复制', 'error');
        });
}

// 从文本导入
function importTextData() {
    const text = document.getElementById('textImportData').value.trim();
    if (!text) {
        showToast('请输入文本数据', 'error');
        return;
    }
    
    try {
        const decryptedText = decrypt(text);
        const data = JSON.parse(decryptedText);
        
        if (data.tasks) {
            appData.tasks = data.tasks;
            saveTasks();
        }
        if (data.records) {
            appData.records = data.records;
            saveRecords();
        }
        if (data.wallet !== undefined) {
            appData.wallet = data.wallet;
            saveWallet();
        }
        if (data.leavesUsed !== undefined) {
            appData.leavesUsed = data.leavesUsed;
            saveLeaves();
        }
        if (data.exchangeRate !== undefined) {
            appData.exchangeRate = data.exchangeRate;
            saveExchangeRate();
        }
        
        renderAll();
        closeModal('textImportModal');
        showToast('文本数据导入成功！', 'success');
    } catch (error) {
        showToast(error.message || '导入失败，请检查文本数据', 'error');
    }
}

// 显示提示
function showToast(message, type = 'info') {
    // 移除已有的toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// 点击弹窗外部关闭
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}
