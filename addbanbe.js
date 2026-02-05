// ==UserScript==
// @name         Auto Add Friend
// @namespace    https://github.com/languyenmanhtran
// @version      1.0
// @description  Tự động kết bạn/hủy lời mời trên Facebook
// @author       LaNguyenManhTran
// @match        https://www.facebook.com/*
// @match        https://m.facebook.com/*
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTIxLjU5IDcuMzQ1Yy0xLjA5NC0xLjA5NC0yLjgzNS0xLjcwNS00LjU3Ni0xLjcwNUwxMiAxMy4yODVsLTUuMDE1LTUuMDE1Yy0xLjA5NC0xLjA5NC0yLjgzNS0xLjcwNS00LjU3Ni0xLjcwNWMtMS43NDEgMC0zLjQ4Mi42NTQtNC41NzYgMS43MDVjLTEuMDk0IDEuMDk0LTEuNzA1IDIuODM1LTEuNzA1IDQuNTc2YzAgMS43NDEuNjUxIDMuNDgyIDEuNzA1IDQuNTc2bDUuMDE1IDUuMDE1VjkuMzQ1Yy0xLjA5NC0xLjA5NC0yLjgzNS0xLjcwNS00LjU3Ni0xLjcwNWMtMS43NDEgMC0zLjQ4Mi42NTQtNC41NzYgMS43MDZjLTEuMDk0IDEuMDk0LTEuNzA1IDIuODM1LTEuNzA1IDQuNTc2YzAgMS43NDEuNjUxIDMuNDgyIDEuNzA1IDQuNTc2bDUuMDE1IDUuMDE1Yy0xLjA5NCAxLjA5NC0xLjcwNSAyLjgzNS0xLjcwNSA0LjU3NmMwIDEuNzQxLjY1MSAzLjQ4MiAxLjcwNSA0LjU3NmMxLjA5NCAxLjA5NCAyLjgzNSAxLjcwNSA0LjU3NiAxLjcwNWYtLjAwMWgxLjMxN2MxLjc0MSAwIDMuNDgyLS42NTEgNC41NzYtMS43MDVjMS4wOTQtMS4wOTQgMS43MDUtMi44MzUgMS43MDUtNC41NzZ2LS4wMDFjMS4wOTQtMS4wOTQgMS43MDUtMi44MzUgMS43MDUtNC41NzZ2LTEuMzE3YzAtMS43NDEtLjY1MS0zLjQ4Mi0xLjcwNS00LjU3NmgtLjAwMWMtMS4wOTQtMS4wOTQtMi44MzUtMS43MDUtNC41NzYtMS43MDVoLS4wMDFjLTEuNzQxIDAtMy40ODIuNjUxLTQuNTc2IDEuNzA1eiIvPjwvc3ZnPg==
// @logo         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDAgMTUwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiMyMDkwRkYiIHN0cm9rZS13aWR0aD0iMyI+PHJlY3QgeD0iNSIgeT0iNSIgaGVpZ2h0PSIxNDAiIHdpZHRrPSIyOTAiIHJ4PSIxMCIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTE1MCA3MGM1MCAwIDkwIDQwIDkwIDkwcy00MCA5MC05MCA5MC05MC00MC05MC05MCA0MC05MCA5MC05MHptMCAtNTBzLTUwIDAtODAgMjVzMzAgMjUgODAgMjVzODAtMjAgODAtMjVzMzAtMjUgODAtMjV6IiBmaWxsPSIjRkZGRkZGIi8+PC9zdmc+
// @grant        none
// @run-at       document-end
// ==/UserScript==

/**
 * AUTO ADD FRIEND - PHIÊN BẢN MENU TRÒN
 * Dán vào F12 Console rồi chạy thôi!
 *
 * Bản quyền: LaNguyenManhTran
 * https://github.com/languyenmanhtran
 * Channel: https://t.me/languyenmanhtrancode
 * Group: https://t.me/+hPIW044oQLs2MDE1
 */

/**
 * Để kết bạn đề xuất mở link sau - kết bạn
 * https://m.facebook.com/friends/?target_pivot_link=suggestions
 * Để huỷ lời mời kết bạn đã gửi vào link sau - hủy lời mời đã gửi
 * https://m.facebook.com/friends/center/requests/outgoing/
 * Để xác nhận hoặc xoá lời mời kết bạn đến bản thân vào link sau xác nhận & xoá
 * https://m.facebook.com/friends/requests/
 */


let config = {
    targetCount: 50,
    interval: 3,
    mode: 'add',
    isRunning: false,
    successCount: 0,
    stopRequested: false
};

const style = `
    #af-fab {
        position: fixed;
        top: 150px;
        right: 10px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: white;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        cursor: grab;
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: box-shadow 0.3s ease, transform 0.2s ease;
        user-select: none;
    }
    #af-fab:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }
    #af-fab:active {
        cursor: grabbing;
    }
    #af-fab.dragging {
        transform: scale(1.15);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
        cursor: grabbing;
        opacity: 0.9;
    }
    #af-fab.hidden {
        display: none !important;
    }
    #af-fab svg {
        width: 28px;
        height: 28px;
        filter: drop-shadow(0 2px 3px rgba(0,0,0,0.2));
        animation: af-pulse 2s infinite;
    }
    @keyframes af-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    #af-menu {
        position: fixed;
        top: 70px;
        right: 10px;
        left: auto;
        width: 280px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 999998;
        display: none;
        font-family: Arial, sans-serif;
        overflow: hidden;
        border: 1px solid #ddd;
        padding: 16px;
    }
    
    #af-menu.show {
        display: block;
        animation: af-menu-open 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    #af-menu.hide {
        display: block;
        animation: af-menu-close 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes af-menu-open {
        from { opacity: 0; transform: translateX(40px) scale(0.95); }
        to { opacity: 1; transform: translateX(0) scale(1); }
    }
    
    @keyframes af-menu-close {
        from { opacity: 1; transform: translateX(0) scale(1); }
        to { opacity: 0; transform: translateX(40px) scale(0.95); }
    }
    
    .af-header {
        text-align: center;
        padding: 12px 15px 10px 15px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        margin: -16px -16px 15px -16px;
        border-radius: 12px 12px 0 0;
        color: white;
    }
    
    .af-header h1 {
        font-size: 18px;
        margin: 0 0 8px 0;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
    
    .af-header h1 .icon {
        font-size: 20px;
    }
    
    .af-author {
        font-size: 12px;
        margin: 0 0 6px 0;
        opacity: 0.95;
    }
    
    .af-author .name {
        font-weight: 600;
    }
    
    .af-contact {
        font-size: 11px;
        margin: 0 0 4px 0;
        opacity: 0.9;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        flex-wrap: wrap;
    }
    
    .af-contact .label {
        opacity: 0.8;
    }
    
    .af-contact .value {
        font-weight: 500;
    }
    
    .af-update {
        font-size: 10px;
        margin-top: 6px;
        opacity: 0.8;
        font-style: italic;
    }
    
    .af-divider {
        border: 0;
        border-top: 1px solid #eee;
        margin: 0 0 15px 0;
    }
    
    .af-content {
        padding: 0 20px 20px 20px;
    }
    
    .af-input-group {
        margin-bottom: 12px;
    }
    
    .af-input-group label {
        display: block;
        font-weight: bold;
        font-size: 13px;
        color: #333;
        margin-bottom: 5px;
    }
    
    .af-toggle-group {
        display: none;
    }
    
    .af-input-group select,
    .af-input-group input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
        font-size: 14px;
        outline: none;
        box-sizing: border-box;
        transition: border-color 0.2s;
    }
    
    .af-input-group select:focus,
    .af-input-group input:focus {
        border-color: #667eea;
        background-color: #fff;
    }
    
    .af-button-row {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
    }
    
    .af-btn {
        flex: 1;
        border: none;
        border-radius: 8px;
        padding: 12px;
        font-weight: bold;
        color: white;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
    }
    
    .af-btn-start {
        background-color: #28a745;
    }
    .af-btn-start:hover {
        background-color: #218838;
        transform: translateY(-1px);
    }
    
    .af-btn-stop {
        background-color: #dc3545;
    }
    .af-btn-stop:hover {
        background-color: #c82333;
        transform: translateY(-1px);
    }
    
    .af-btn-collapse {
        background-color: #3b82f6;
        width: 100%;
        margin-bottom: 15px;
    }
    .af-btn-collapse:hover {
        background-color: #2563eb;
        transform: translateY(-1px);
    }
    
    .af-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none !important;
    }
    
    .af-found {
        outline: 3px solid #667eea !important;
        outline-offset: 2px !important;
        animation: af-found-pulse 0.5s ease;
    }
    
    .af-clicked {
        outline: 3px solid #28a745 !important;
        outline-offset: 2px !important;
        background-color: rgba(40, 167, 69, 0.2) !important;
        opacity: 0.5 !important;
    }
    
    @keyframes af-found-pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
    
    .af-toast {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 12px 24px;
        border-radius: 30px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000000;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .af-toast.show {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
    
    .af-toast .checkmark {
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
    }
    
    @keyframes af-counter-pop {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); color: #667eea; }
        100% { transform: scale(1); }
    }
    
    .af-counter-anim {
        animation: af-counter-pop 0.3s ease;
    }
    
    .af-status-section {
        text-align: center;
    }
    
    .af-status-ready {
        color: #155724;
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 8px;
    }
    
    .af-status-running {
        color: #28a745;
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 8px;
    }
    
    .af-instructions {
        font-size: 11px;
        color: #666;
        line-height: 1.4;
        border-top: 1px solid #eee;
        padding-top: 10px;
    }
    
    .af-progress-section {
        margin: 12px 0;
    }
    
    .af-progress-bar {
        height: 8px;
        background: #e0e0e0;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 5px;
    }
    
    .af-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #667eea, #764ba2);
        border-radius: 4px;
        transition: width 0.3s ease;
    }
    
    .af-progress-text {
        font-size: 12px;
        color: #666;
        display: flex;
        justify-content: space-between;
    }
`;

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getName(label) {
    if (!label) return 'Unknown';
    const prefixEN = "Send a friend request to ";
    if (label.includes(prefixEN)) {
        return label.replace(prefixEN, '').trim();
    }
    const prefixVI = "Gửi lời mời kết bạn đến ";
    if (label.includes(prefixVI)) {
        return label.replace(prefixVI, '').trim();
    }
    return label;
}

function getCancelName(label) {
    if (!label) return 'Unknown';
    const prefixEN = "Cancel friend request sent to ";
    if (label.includes(prefixEN)) {
        return label.replace(prefixEN, '').trim();
    }
    const prefixVN = "Hủy lời mời kết bạn đã gửi cho ";
    if (label.includes(prefixVN)) {
        return label.replace(prefixVN, '').trim();
    }
    return label;
}

function getConfirmName(label) {
    if (!label) return 'Unknown';
    // Confirm English: "Confirm Minh Quân's friend request" -> "Minh Quân"
    const matchEN = label.match(/Confirm\s+(.+?)(?:'s)?\s+friend request/);
    if (matchEN) return matchEN[1].trim();
    
    // Confirm Vietnamese: "Xác nhận lời mời kết bạn của Minh Quân" -> "Minh Quân"
    const prefixVN = "Xác nhận lời mời kết bạn của ";
    if (label.includes(prefixVN)) {
        return label.replace(prefixVN, '').trim();
    }
    
    // Remove English: "Remove Minh Quân's friend request" -> "Minh Quân"
    const matchRemoveEN = label.match(/Remove\s+(.+?)(?:'s)?\s+friend request/);
    if (matchRemoveEN) return matchRemoveEN[1].trim();
    
    // Remove/Gỡ Vietnamese: "Gỡ lời mời kết bạn của Minh Quân" -> "Minh Quân"
    const prefixRemoveVN = "Gỡ lời mời kết bạn của ";
    if (label.includes(prefixRemoveVN)) {
        return label.replace(prefixRemoveVN, '').trim();
    }
    
    // Xóa Vietnamese: "Xóa lời mời kết bạn của Minh Quân" -> "Minh Quân"
    const prefixXoaVN = "Xóa lời mời kết bạn của ";
    if (label.includes(prefixXoaVN)) {
        return label.replace(prefixXoaVN, '').trim();
    }
    
    return label;
}

function checkConfirmSuccess(name) {
    // Kiểm tra xem nút Confirm còn tồn tại không (nghĩa là chưa xử lý)
    const confirmBtnEN = document.querySelector(`[aria-label*="Confirm"][aria-label*="${name}"]`);
    const confirmBtnVN = document.querySelector(`[aria-label*="Xác nhận"][aria-label*="${name}"]`);
    if (!confirmBtnEN && !confirmBtnVN) return { success: true };
    return { success: false };
}

function checkDeleteSuccess(name) {
    // Kiểm tra xem nút Delete còn tồn tại không
    const deleteBtnEN = document.querySelector(`[aria-label*="Remove"][aria-label*="${name}"]`);
    const deleteBtnVN = document.querySelector(`[aria-label*="Gỡ"][aria-label*="${name}"]`);
    const xoaBtnVN = document.querySelector(`[aria-label*="Xóa"][aria-label*="${name}"]`);
    if (!deleteBtnEN && !deleteBtnVN && !xoaBtnVN) return { success: true };
    return { success: false };
}

async function checkConfirmRequest(name) {
    await sleep(1000);
    for (let i = 1; i <= 6; i++) {
        const result = checkConfirmSuccess(name);
        if (result.success) return result;
        if (i < 6) await sleep(500);
    }
    return { success: false };
}

async function checkDeleteRequest(name) {
    await sleep(1000);
    for (let i = 1; i <= 6; i++) {
        const result = checkDeleteSuccess(name);
        if (result.success) return result;
        if (i < 6) await sleep(500);
    }
    return { success: false };
}

function checkSuccess(name) {
    const cancelBtnEN = document.querySelector(`[aria-label*="Cancel friend request sent to ${name}"]`);
    if (cancelBtnEN) return { success: true, method: 'Cancel (EN)' };
    const cancelBtnVN = document.querySelector(`[aria-label*="Hủy lời mời kết bạn đã gửi cho ${name}"]`);
    if (cancelBtnVN) return { success: true, method: 'Hủy (VN)' };
    const allContainers = document.querySelectorAll('[class*="bg-s"]');
    for (const container of allContainers) {
        const text = container.textContent || '';
        if (text.includes('Request sent')) return { success: true, method: 'Request sent (EN)' };
        if (text.includes('Đã gửi lời mời')) return { success: true, method: 'Đã gửi (VN)' };
    }
    return { success: false, method: null };
}

function checkCancelSuccess(name) {
    const confirmBtnEN = document.querySelector(`[aria-label*="Confirm"]`);
    const confirmBtnVN = document.querySelector(`[aria-label*="Xác nhận"]`);
    if (confirmBtnEN || confirmBtnVN) return { success: true };
    return { success: false };
}

async function checkRequestSent(name) {
    await sleep(1000);
    for (let i = 1; i <= 6; i++) {
        const result = checkSuccess(name);
        if (result.success) return result;
        if (i < 6) await sleep(500);
    }
    return { success: false, method: 'Timeout' };
}

async function checkCancelRequest(name) {
    await sleep(1000);
    for (let i = 1; i <= 6; i++) {
        const result = checkCancelSuccess(name);
        if (result.success) return result;
        if (i < 6) await sleep(500);
    }
    return { success: false };
}

function createUI() {
    const styleEl = document.createElement('style');
    styleEl.textContent = style;
    document.head.appendChild(styleEl);
    
    const fab = document.createElement('div');
    fab.id = 'af-fab';
    fab.setAttribute('role', 'button');
    fab.setAttribute('tabindex', '0');
    fab.setAttribute('aria-label', 'Mở menu Auto Add Friend');
    fab.setAttribute('aria-hidden', 'false');
    fab.innerHTML = `
        <svg viewBox="0 0 24 24" width="28" height="28">
            <path fill="#ff4757" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    `;
    document.body.appendChild(fab);
    
    let isDragging = false;
    let wasDragged = false;
    let startX, startY;
    let currentX = 10, currentY = 150;
    
    fab.addEventListener('mousedown', startDrag);
    fab.addEventListener('touchstart', startDrag, { passive: false });
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
    
    function startDrag(e) {
        if (e.target.closest('.af-close-btn') || e.target.closest('button') || e.target.closest('select') || e.target.closest('input')) return;
        
        isDragging = true;
        wasDragged = false;
        fab.classList.add('dragging');
        
        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX - currentX;
            startY = e.touches[0].clientY - currentY;
        } else {
            startX = e.clientX - currentX;
            startY = e.clientY - currentY;
        }
    }
    
    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        let clientX, clientY;
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        const dist = Math.abs(clientX - (startX + currentX)) + Math.abs(clientY - (startY + currentY));
        if (dist > 5) {
            wasDragged = true;
        }
        
        currentX = clientX - startX;
        currentY = clientY - startY;
        
        const maxX = window.innerWidth - 60;
        const maxY = window.innerHeight - 60;
        currentX = Math.max(0, Math.min(currentX, maxX));
        currentY = Math.max(0, Math.min(currentY, maxY));
        
        fab.style.right = 'auto';
        fab.style.left = currentX + 'px';
        fab.style.top = currentY + 'px';
    }
    
    function stopDrag() {
        if (isDragging) {
            isDragging = false;
            fab.classList.remove('dragging');
        }
    }
    
    fab.addEventListener('click', (e) => {
        if (!wasDragged) {
            openMenu();
        }
        wasDragged = false;
    });
    
    const menu = document.createElement('div');
    menu.id = 'af-menu';
    menu.setAttribute('role', 'dialog');
    menu.setAttribute('aria-label', 'Menu Auto Add Friend');
    menu.setAttribute('aria-modal', 'true');
    menu.innerHTML = `
        <div class="af-header">
            <h1><span class="icon">👥</span> Auto Add Friend</h1>
            <p class="af-author">Developer: <span class="name">LaNguyenManhTran</span></p>
            <p class="af-contact">
                <span class="label">📱</span> <span class="value">0823141207</span>
                <span style="margin: 0 8px;">|</span>
                <span class="label">✈️</span> <span class="value">@languyenmanhtran</span>
            </p>
            <p class="af-update">Update: 30/01/2026</p>
        </div>
        
        <hr class="af-divider">
        
        <div class="af-content">
            <div class="af-input-group">
                <label>Chức năng:</label>
                <select id="af-mode">
                    <option value="add">Thêm bạn bè</option>
                    <option value="cancel">Hủy lời mời đã gửi</option>
                    <option value="confirm">Xác nhận lời mời</option>
                    <option value="delete">Xóa lời mời</option>
                </select>
            </div>
            
            <div class="af-input-group">
                <label>Số lượng thao tác:</label>
                <input type="number" id="af-target" value="50" min="1" max="500">
            </div>
            
            <div class="af-input-group">
                <label>Khoảng cách (ms):</label>
                <input type="number" id="af-interval" value="500" min="100">
            </div>
            
            <div class="af-button-row">
                <button class="af-btn af-btn-start" id="af-start-btn">Bắt đầu</button>
                <button class="af-btn af-btn-stop" id="af-stop-btn" style="display:none;">Dừng</button>
            </div>
            
            <button class="af-btn af-btn-collapse" id="af-close-btn">Thu gọn</button>
            
            <div class="af-status-section">
                <p class="af-status-ready" id="af-status">Trạng thái: Sẵn sàng</p>
                
                <div class="af-progress-section" id="af-progress-section" style="display:none;">
                    <div class="af-progress-bar">
                        <div class="af-progress-fill" id="af-progress-fill" style="width: 0%"></div>
                    </div>
                    <div class="af-progress-text">
                        <span id="af-current">0 / 50</span>
                        <span id="af-percent">0%</span>
                    </div>
                </div>
                
                <p class="af-instructions" id="af-instructions">
                    → Chế độ <b>Thêm bạn bè</b>: Dùng Tại Gợi ý<br>
                    → Chế độ <b>Hủy lời mời</b>: Dùng tại Lời mời đã gửi
                </p>
            </div>
        </div>
    `;
    document.body.appendChild(menu);
    
    document.getElementById('af-close-btn').addEventListener('click', closeMenu);
    document.getElementById('af-start-btn').addEventListener('click', startAF);
    document.getElementById('af-stop-btn').addEventListener('click', stopAF);
    document.getElementById('af-mode').addEventListener('change', (e) => {
        config.mode = e.target.value;
        updateInstructions();
    });
}

function openMenu() {
    const fab = document.getElementById('af-fab');
    const menu = document.getElementById('af-menu');
    
    menu.style.left = 'auto';
    menu.style.top = '70px';
    menu.style.right = '10px';
    
    menu.classList.remove('hide');
    fab.classList.add('hidden');
    menu.classList.add('show');
}

function closeMenu() {
    const fab = document.getElementById('af-fab');
    const menu = document.getElementById('af-menu');
    
    menu.classList.remove('show');
    menu.classList.add('hide');
    
    setTimeout(() => {
        menu.classList.remove('hide');
        fab.classList.remove('hidden');
    }, 250);
}

function updateStatus(status, running = false) {
    const statusEl = document.getElementById('af-status');
    const progressSection = document.getElementById('af-progress-section');
    
    if (running) {
        statusEl.className = 'af-status-running';
        progressSection.style.display = 'block';
    } else {
        statusEl.className = 'af-status-ready';
        progressSection.style.display = 'none';
    }
    statusEl.textContent = status;
}

function updateProgress() {
    const current = document.getElementById('af-current');
    const percent = document.getElementById('af-percent');
    const fill = document.getElementById('af-progress-fill');
    
    if (config.isRunning) {
        const p = Math.round((config.successCount / config.targetCount) * 100);
        current.textContent = `${config.successCount} / ${config.targetCount}`;
        percent.textContent = `${p}%`;
        fill.style.width = `${p}%`;
    }
}

function updateInstructions() {
    const instructions = document.getElementById('af-instructions');
    if (config.mode === 'cancel') {
        instructions.innerHTML = '→ Chế độ <b>Hủy lời mời đã gửi</b>: Dùng tại Lời mời đã gửi<br>Nhấn "Dừng" để kết thúc quá trình.';
    } else if (config.mode === 'confirm') {
        instructions.innerHTML = '→ Chế độ <b>Xác nhận lời mời</b>: Dùng tại Lời mời kết bạn<br>Nhấn "Dừng" để kết thúc quá trình.';
    } else if (config.mode === 'delete') {
        instructions.innerHTML = '→ Chế độ <b>Xóa lời mời</b>: Dùng tại Lời mời kết bạn<br>Nhấn "Dừng" để kết thúc quá trình.';
    } else {
        instructions.innerHTML = '→ Chế độ <b>Thêm bạn bè</b>: Dùng Tại Gợi ý<br>→ Chế độ <b>Hủy lời mời đã gửi</b>: Dùng tại Lời mời đã gửi';
    }
}

function showToast(name, mode) {
    const oldToast = document.querySelector('.af-toast');
    if (oldToast) oldToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'af-toast';
    let message = '';
    if (mode === 'add') {
        message = `Đã kết bạn: ${name}`;
    } else if (mode === 'cancel') {
        message = `Đã hủy: ${name}`;
    } else if (mode === 'confirm') {
        message = `Đã xác nhận: ${name}`;
    } else if (mode === 'delete') {
        message = `Đã xóa: ${name}`;
    }
    toast.innerHTML = `
        <span class="checkmark">✓</span>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 2000);
}

function animateCounter() {
    const currentEl = document.getElementById('af-current');
    currentEl.classList.remove('af-counter-anim');
    void currentEl.offsetWidth;
    currentEl.classList.add('af-counter-anim');
}

async function addFriends() {
    config.stopRequested = false;
    config.successCount = 0;
    
    const startBtn = document.getElementById('af-start-btn');
    const stopBtn = document.getElementById('af-stop-btn');
    const targetInput = document.getElementById('af-target');
    const intervalInput = document.getElementById('af-interval');
    
    config.targetCount = parseInt(targetInput.value) || 50;
    const intervalMs = parseInt(intervalInput.value) || 3000;
    
    startBtn.disabled = true;
    stopBtn.style.display = 'flex';
    targetInput.disabled = true;
    intervalInput.disabled = true;
    
    const modeText = {
        'add': 'Thêm bạn',
        'cancel': 'Hủy lời mời đã gửi',
        'confirm': 'Xác nhận lời mời',
        'delete': 'Xóa lời mời'
    };
    updateStatus(`Đang chạy: ${modeText[config.mode] || config.mode}...`, true);
    updateProgress();
    
    if (config.mode === 'add') {
        while (config.successCount < config.targetCount && !config.stopRequested) {
            const buttonsEN = document.querySelectorAll('div[role="button"][aria-label*="Send a friend request to"]');
            const buttonsVN = document.querySelectorAll('div[role="button"][aria-label*="Gửi lời mời kết bạn đến"]');
            const buttons = [...buttonsEN, ...buttonsVN];
            
            if (buttons.length === 0) {
                window.scrollBy(0, 800);
                await sleep(1000);
                continue;
            }
            
            for (const btn of buttons) {
                if (config.stopRequested || config.successCount >= config.targetCount) break;
                if (btn.hasAttribute('data-sent')) continue;
                
                const label = btn.getAttribute('aria-label') || '';
                const isFriendEN = label.includes('Friend') && !label.includes('Send') && !label.includes('Gửi');
                const isFriendVN = label.includes('bạn') && !label.includes('Gửi') && !label.includes('mời');
                if (isFriendEN || isFriendVN) continue;
                
                const name = getName(label);
                btn.setAttribute('data-sent', 'true');
                
                btn.classList.add('af-found');
                
                btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                await sleep(random(200, 400));
                
                btn.classList.remove('af-found');
                btn.classList.add('af-clicked');
                
                btn.click();
                
                await checkRequestSent(name);
                config.successCount++;
                showToast(name, 'add');
                animateCounter();
                updateProgress();
                
                await sleep(intervalMs + random(-500, 500));
            }
            
            window.scrollBy(0, random(500, 1000));
            await sleep(1000);
        }
    } else if (config.mode === 'cancel') {
        while (config.successCount < config.targetCount && !config.stopRequested) {
            const containersEN = document.querySelectorAll('[aria-label*="Cancel friend request sent to"]');
            const containersVN = document.querySelectorAll('[aria-label*="Hủy lời mời kết bạn đã gửi cho"]');
            const containers = [...containersEN, ...containersVN];

            if (containers.length === 0) {
                window.scrollBy(0, 800);
                await sleep(1000);
                continue;
            }

            for (const container of containers) {
                if (config.stopRequested || config.successCount >= config.targetCount) break;
                if (container.hasAttribute('data-cancelled')) continue;

                const btn = container.querySelector(
                    'div[role="button"][aria-label="Cancel"], ' +
                    'div[role="button"][aria-label="Hủy"]'
                );
                if (!btn) continue;

                const label = container.getAttribute('aria-label') || '';
                const name = getCancelName(label);

                container.setAttribute('data-cancelled', 'true');

                btn.classList.add('af-found');

                btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                await sleep(random(200, 400));

                btn.classList.remove('af-found');
                btn.classList.add('af-clicked');

                btn.click();

                await sleep(intervalMs + random(-500, 500));
                config.successCount++;
                showToast(name, 'cancel');
                animateCounter();
                updateProgress();
            }

            window.scrollBy(0, random(500, 1000));
            await sleep(1000);
        }
    } else if (config.mode === 'confirm') {
        // Chế độ Xác nhận lời mời kết bạn
        while (config.successCount < config.targetCount && !config.stopRequested) {
            const confirmBtnsEN = document.querySelectorAll('[aria-label*="Confirm"][aria-label*="friend request"]');
            const confirmBtnsVN = document.querySelectorAll('[aria-label*="Xác nhận lời mời kết bạn của"]');
            const buttons = [...confirmBtnsEN, ...confirmBtnsVN];

            if (buttons.length === 0) {
                window.scrollBy(0, 800);
                await sleep(1000);
                continue;
            }

            for (const btn of buttons) {
                if (config.stopRequested || config.successCount >= config.targetCount) break;
                if (btn.hasAttribute('data-confirmed')) continue;

                const label = btn.getAttribute('aria-label') || '';
                const name = getConfirmName(label);
                
                btn.setAttribute('data-confirmed', 'true');

                btn.classList.add('af-found');

                btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                await sleep(random(200, 400));

                btn.classList.remove('af-found');
                btn.classList.add('af-clicked');

                btn.click();

                await checkConfirmRequest(name);
                config.successCount++;
                showToast(name, 'confirm');
                animateCounter();
                updateProgress();

                await sleep(intervalMs + random(-500, 500));
            }

            window.scrollBy(0, random(500, 1000));
            await sleep(1000);
        }
    } else if (config.mode === 'delete') {
        // Chế độ Xóa lời mời kết bạn
        while (config.successCount < config.targetCount && !config.stopRequested) {
            const deleteBtnsEN = document.querySelectorAll('[aria-label*="Remove"][aria-label*="friend request"]');
            const deleteBtnsVN = document.querySelectorAll('[aria-label*="Gỡ lời mời kết bạn của"], [aria-label*="Xóa lời mời kết bạn của"]');
            const buttons = [...deleteBtnsEN, ...deleteBtnsVN];

            if (buttons.length === 0) {
                window.scrollBy(0, 800);
                await sleep(1000);
                continue;
            }

            for (const btn of buttons) {
                if (config.stopRequested || config.successCount >= config.targetCount) break;
                if (btn.hasAttribute('data-deleted')) continue;

                const label = btn.getAttribute('aria-label') || '';
                const name = getConfirmName(label);
                
                btn.setAttribute('data-deleted', 'true');

                btn.classList.add('af-found');

                btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                await sleep(random(200, 400));

                btn.classList.remove('af-found');
                btn.classList.add('af-clicked');

                btn.click();

                await checkDeleteRequest(name);
                config.successCount++;
                showToast(name, 'delete');
                animateCounter();
                updateProgress();

                await sleep(intervalMs + random(-500, 500));
            }

            window.scrollBy(0, random(500, 1000));
            await sleep(1000);
        }
    }
    
    config.isRunning = false;
    startBtn.disabled = false;
    stopBtn.style.display = 'none';
    targetInput.disabled = false;
    intervalInput.disabled = false;
    
    const modeActionText = {
        'add': 'kết bạn',
        'cancel': 'hủy lời mời đã gửi',
        'confirm': 'xác nhận',
        'delete': 'xóa'
    };
    const actionText = modeActionText[config.mode] || config.mode;
    
    if (config.stopRequested) {
        updateStatus(`🛑 Đã dừng! Đã ${actionText} được ${config.successCount} người.`);
    } else {
        updateStatus(`✅ Hoàn thành! Đã ${actionText} được ${config.successCount} người.`);
    }
    
    setTimeout(closeMenu, 2000);
}

function startAF() {
    config.isRunning = true;
    config.stopRequested = false;
    addFriends();
}

function stopAF() {
    config.stopRequested = true;
}

if (window.autoAddFriendLoaded) {
    console.log('⚠️ Script đã được load, không chạy lại!');
} else {
    window.autoAddFriendLoaded = true;
    if (!document.getElementById('af-fab')) {
        createUI();
        console.log('✅ Menu tròn đã sẵn sàng! Click nút tròn để mở menu.');
    }
}
