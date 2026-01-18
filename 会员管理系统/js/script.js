// 页面导航函数
function navigateTo(pageName) {
    const pageMap = {
        'user-management': 'user-management.html',
        'data-stats': 'data-stats.html',
        'channel-user-management': 'channel-user-management.html'
    };
    
    if (pageMap[pageName]) {
        window.location.href = pageMap[pageName];
    }
}

// 页面加载时初始化统计数据
window.addEventListener('load', function() {
    loadStatsData();
});

// 加载统计数据
function loadStatsData() {
    showLoadingState();
    
    // 模拟API请求延迟
    setTimeout(() => {
        try {
            // 获取统计数据
            const statsData = getStatsData();
            
            // 更新页面显示
            updateStatsDisplay(statsData);
            
            // 显示统计数据
            showStatsData();
        } catch (error) {
            console.error('加载统计数据失败:', error);
            showErrorState();
        }
    }, 1500);
}

// 获取统计数据（模拟后端API返回）
function getStatsData() {
    return {
        totalMembers: {
            current: 1256,
            previous: 1114,
            changePercent: 12.5,
            changeValue: 142
        },
        todaySigned: {
            current: 23,
            previous: 21,
            changePercent: 8.2,
            changeValue: 2
        },
        todayDeducted: {
            current: 45,
            previous: 48,
            changePercent: -5.3,
            changeValue: -3
        },
        todayAmount: {
            current: 12560,
            previous: 10880,
            changePercent: 15.3,
            changeValue: 1680
        }
    };
}

// 更新统计数据显示
function updateStatsDisplay(statsData) {
    // 当前总权益会员数
    updateStatItem('total-members', statsData.totalMembers.current.toLocaleString(), statsData.totalMembers.changePercent, statsData.totalMembers.changeValue);
    
    // 今日已签署会员数
    updateStatItem('today-signed', statsData.todaySigned.current, statsData.todaySigned.changePercent, statsData.todaySigned.changeValue);
    
    // 今日已扣费会员数
    updateStatItem('today-deducted', statsData.todayDeducted.current, statsData.todayDeducted.changePercent, statsData.todayDeducted.changeValue);
    
    // 今日已扣款金额
    updateStatItem('today-amount', '¥' + statsData.todayAmount.current.toLocaleString(), statsData.todayAmount.changePercent, '¥' + Math.abs(statsData.todayAmount.changeValue).toLocaleString());
}

// 更新单个统计项
function updateStatItem(id, value, changePercent, changeValue) {
    // 更新数值
    const valueElement = document.getElementById(id);
    if (valueElement) {
        valueElement.textContent = value;
    }
    
    // 更新变化信息
    const arrowElement = document.getElementById(id + '-arrow');
    const percentElement = document.getElementById(id + '-percent');
    const valueElementChange = document.getElementById(id + '-value');
    
    if (arrowElement && percentElement && valueElementChange) {
        let trend = 'flat';
        let arrow = '—';
        
        if (changePercent > 0) {
            trend = 'up';
            arrow = '↑';
            changeValue = '+' + changeValue;
        } else if (changePercent < 0) {
            trend = 'down';
            arrow = '↓';
        }
        
        arrowElement.textContent = arrow;
        arrowElement.className = 'change-arrow ' + trend;
        
        percentElement.textContent = Math.abs(changePercent) + '%';
        percentElement.className = 'change-percent ' + trend;
        
        valueElementChange.textContent = changeValue;
    }
}

// 显示加载状态
function showLoadingState() {
    document.getElementById('stats-loading').style.display = 'block';
    document.getElementById('stats-grid').style.display = 'none';
    document.getElementById('stats-error').style.display = 'none';
}

// 显示统计数据
function showStatsData() {
    document.getElementById('stats-loading').style.display = 'none';
    document.getElementById('stats-grid').style.display = 'grid';
    document.getElementById('stats-error').style.display = 'none';
}

// 显示错误状态
function showErrorState() {
    document.getElementById('stats-loading').style.display = 'none';
    document.getElementById('stats-grid').style.display = 'none';
    document.getElementById('stats-error').style.display = 'block';
}

// 显示用户详情
function showUserDetail(userId) {
    window.location.href = `user-detail.html?id=${userId}`;
}

// 加载用户详情数据
function loadUserDetail(userId) {
    const userData = {
        '10001': {
            name: '张三',
            phone: '138****1234',
            gender: '男',
            birthDate: '1990-01-15',
            email: 'zhangsan@example.com',
            idCard: '110101********1234',
            idCardAddress: '北京市朝阳区*********',
            idCardValid: '2020-01-01 至 2030-01-01',
            bankCard: '622848********1234',
            bankName: '中国农业银行',
            bankBranch: '北京朝阳支行',
            bindTime: '2024-01-15 14:30:00',
            status: '使用中',
            credit: '¥5,000',
            expireDate: '2024-07-15',
            period: '6期',
            deductionAmount: '¥1,200',
            paymentCount: '6次',
            autoDeductStatus: '已启用'
        },
        '10002': {
            name: '李四',
            phone: '139****5678',
            gender: '女',
            birthDate: '1985-05-20',
            email: 'lisi@example.com',
            idCard: '110102********5678',
            idCardAddress: '上海市浦东新区*********',
            idCardValid: '2019-01-01 至 2029-01-01',
            bankCard: '622848********5678',
            bankName: '中国工商银行',
            bankBranch: '上海浦东支行',
            bindTime: '2023-06-10 10:15:00',
            status: '已过期',
            credit: '¥3,000',
            expireDate: '2024-01-14',
            period: '4期',
            deductionAmount: '¥800',
            paymentCount: '4次',
            autoDeductStatus: '已禁用'
        },
        '10003': {
            name: '王五',
            phone: '137****9012',
            gender: '男',
            birthDate: '1988-03-10',
            email: 'wangwu@example.com',
            idCard: '110103********9012',
            idCardAddress: '广州市天河区*********',
            idCardValid: '2021-01-01 至 2031-01-01',
            bankCard: '622848********9012',
            bankName: '中国建设银行',
            bankBranch: '广州天河支行',
            bindTime: '2023-02-20 16:45:00',
            status: '使用中',
            credit: '¥8,000',
            expireDate: '2024-11-13',
            period: '10期',
            deductionAmount: '¥2,000',
            paymentCount: '10次',
            autoDeductStatus: '已启用'
        },
        '10004': {
            name: '赵六',
            phone: '136****3456',
            gender: '女',
            birthDate: '1992-08-25',
            email: 'zhaoliu@example.com',
            idCard: '110104********3456',
            idCardAddress: '深圳市南山区*********',
            idCardValid: '2022-01-01 至 2032-01-01',
            bankCard: '622848********3456',
            bankName: '中国招商银行',
            bankBranch: '深圳南山支行',
            bindTime: '2023-09-05 11:30:00',
            status: '已过期',
            credit: '¥2,000',
            expireDate: '2023-11-12',
            period: '2期',
            deductionAmount: '¥600',
            paymentCount: '2次',
            autoDeductStatus: '已禁用'
        }
    };
    
    const user = userData[userId];
    if (user) {
        document.getElementById('detail-user-id').textContent = userId;
        document.getElementById('detail-name').textContent = user.name;
        document.getElementById('detail-phone').textContent = user.phone;
        document.getElementById('detail-gender').textContent = user.gender;
        document.getElementById('detail-birthdate').textContent = user.birthDate;
        document.getElementById('detail-email').textContent = user.email;
        document.getElementById('detail-idcard').textContent = user.idCard;
        document.getElementById('detail-idcard-address').textContent = user.idCardAddress;
        document.getElementById('detail-idcard-valid').textContent = user.idCardValid;
        document.getElementById('detail-bankcard').textContent = user.bankCard;
        document.getElementById('detail-bankname').textContent = user.bankName;
        document.getElementById('detail-bankbranch').textContent = user.bankBranch;
        document.getElementById('detail-bindtime').textContent = user.bindTime;
        document.getElementById('detail-status').textContent = user.status;
        document.getElementById('detail-credit').textContent = user.credit;
        document.getElementById('detail-expire').textContent = user.expireDate;
        document.getElementById('detail-deduction-amount').textContent = user.deductionAmount;
        document.getElementById('detail-payment-count').textContent = user.paymentCount;
        
        // 更新自动扣款状态
        const autoDeductStatusElement = document.getElementById('detail-auto-deduct-status');
        if (autoDeductStatusElement) {
            if (user.autoDeductStatus === '已启用') {
                autoDeductStatusElement.innerHTML = '<span class="tag tag-success">已启用</span>';
            } else {
                autoDeductStatusElement.innerHTML = '<span class="tag tag-error">已禁用</span>';
            }
        }
        
        // 根据状态设置颜色
        const statusElement = document.getElementById('detail-status');
        if (user.status === '使用中') {
            statusElement.style.color = '#1890ff';
        } else if (user.status === '已过期') {
            statusElement.style.color = '#ff4d4f';
        }
    }
}

// 关闭自动扣款
function closeAutoDeduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    
    if (confirm('确定要关闭该会员的自动扣款功能吗？关闭后将不会自动从会员银行卡中扣款。')) {
        // 这里可以添加实际的API调用逻辑
        console.log('关闭自动扣款功能，userId:', userId);
        alert('自动扣款功能已成功关闭');
        
        // 更新页面显示
        const autoDeductStatusElement = document.getElementById('detail-auto-deduct-status');
        if (autoDeductStatusElement) {
            autoDeductStatusElement.innerHTML = '<span class="tag tag-error">已禁用</span>';
        }
    }
}

// 编辑备注
function editRemark(userId) {
    const content = document.getElementById(`remark-${userId}`);
    const editDiv = content.nextElementSibling;
    const input = editDiv.querySelector('input');
    
    content.style.display = 'none';
    editDiv.style.display = 'flex';
    input.value = content.textContent;
    input.focus();
}

// 取消备注编辑
function cancelRemark(userId) {
    const content = document.getElementById(`remark-${userId}`);
    const editDiv = content.nextElementSibling;
    
    content.style.display = 'block';
    editDiv.style.display = 'none';
}

// 保存备注
function saveRemark(userId) {
    const content = document.getElementById(`remark-${userId}`);
    const editDiv = content.nextElementSibling;
    const input = editDiv.querySelector('input');
    const newRemark = input.value.trim();
    
    if (!newRemark) {
        alert('备注内容不能为空');
        input.focus();
        return;
    }
    
    if (newRemark.length > 200) {
        alert('备注内容不能超过200个字符');
        input.focus();
        return;
    }
    
    content.textContent = newRemark;
    content.style.display = 'block';
    editDiv.style.display = 'none';
    
    alert('备注已成功保存');
}

// 切换Tab
function switchTab(tabName) {
    const tabItems = document.querySelectorAll('.tab-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabItems.forEach(item => {
        item.classList.remove('active');
    });
    
    tabContents.forEach(content => {
        content.style.display = 'none';
    });
    
    event.target.classList.add('active');
    document.getElementById(tabName).style.display = 'block';
}