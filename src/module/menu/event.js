/**
 * 菜单功能所需的事件项
 * @param gridManagerName
 */
import { WRAP_KEY, MENU_KEY } from '@common/constants';
export const getEvent = gridManagerName => {
    const menuTarget = `[${MENU_KEY}="${gridManagerName}"]`;
    return {
        // 打开菜单
        openMenu: {events: 'contextmenu', target: `[${WRAP_KEY}="${gridManagerName}"]`},

        // 关闭菜单
        closeMenu: {events: 'mousedown.closeMenu', target: 'body'},

        // 上一页、下一页、重新加载
        refresh: {events: 'click', target: menuTarget, selector: '[menu-action="refresh-page"]'},

        // 导出、导出已选中
        exportExcel: {events: 'click', target: menuTarget, selector: '[menu-action="export-excel"]'},

        // 打开配置区域
        openConfig: {events: 'click', target: menuTarget, selector: '[menu-action="config-grid"]'}
    };
};

export const eventMap = {};
