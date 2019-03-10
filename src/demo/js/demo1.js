// 表格唯一标识
const gridManagerName = 'test';

// 博文类型
const TYPE_MAP = {
    '1': 'HTML/CSS',
    '2': 'nodeJS',
    '3': 'javaScript',
    '4': '前端鸡汤',
    '5': 'PM Coffee',
    '6': '前端框架',
    '7': '前端相关'
};
// 公开方法列表
const GM_PUBLISH_METHOD_MAP = {
    init: {
        key: 'init',
        relyInit: false,
        title: '初始化',
        code: `demo1.initGM(document.querySelector('table'));`
    },
    get: {
        key: 'get',
        relyInit: true,  // 是否依赖init方法
        title: '获取表格的实时配置信息',
        code: `GridManager.get('${gridManagerName}');`
    },
    version: {
        key: 'version',
        relyInit: false,
        title: '获取当前GridManager的版本号',
        code: `GridManager.version;`
    },
    getLocalStorage: {
        key: 'getLocalStorage',
        relyInit: true,
        title: '获取表格用户记忆',
        code: `GridManager.getLocalStorage('${gridManagerName}');`
    },
    resetLayout: {
        key: 'resetLayout',
        relyInit: true,
        title: '重置表格布局',
        code: `GridManager.resetLayout('${gridManagerName}', '800px', '500px');`
    },
    clear: {
        key: 'clear',
        relyInit: true,
        title: '清除表格记忆数据',
        code: `GridManager.clear('${gridManagerName}');`
    },
    getRowData: {
        key: 'getRowData',
        relyInit: true,
        title: '获取指定tr所使用的数据',
        code: `GridManager.getRowData('${gridManagerName}', 'pic');`
    },
    updateRowData: {
        key: 'updateRowData',
        relyInit: true,
        title: '更新指定行所使用的数据',
        code: `GridManager.updateRowData('${gridManagerName}', 'id', {id: 92, title: 'ccc'});`
    },
    setSort: {
        key: 'setSort',
        relyInit: true,
        title: '手动设置排序',
        code: `GridManager.setSort('${gridManagerName}', {name: 'ASC'});`
    },
    setConfigVisible: {
        key: 'setConfigVisible',
        relyInit: true,
        title: '设置表头配置区域可视状态',
        code: `GridManager.setConfigVisible('${gridManagerName}', true);`
    },
    showTh: {
        key: 'showTh',
        relyInit: true,
        title: '设置列为可视状态',
        code: `GridManager.showTh('${gridManagerName}', 'pic');`
    },
    hideTh: {
        key: 'hideTh',
        relyInit: true,
        title: '设置列为隐藏状态',
        code: `GridManager.hideTh('${gridManagerName}', 'pic');`
    },
    exportGridToXls: {
        key: 'exportGridToXls',
        relyInit: true,
        title: '导出指定表格',
        code: `GridManager.exportGridToXls('${gridManagerName}', 'demo中使用的导出');`
    },
    setQuery: {
        key: 'setQuery',
        relyInit: true,
        title: '更改在生成组件时所配置的参数query',
        code: `GridManager.setQuery('${gridManagerName}', {'userName':'baukh','sex':'男'});`
    },
    setAjaxData: {
        key: 'setAjaxData',
        relyInit: true,
        title: '用于再次配置ajax_data数据',
        code: `GridManager.setAjaxData('${gridManagerName}', {data: [], totals: 0});`
    },
    refreshGrid: {
        key: 'refreshGrid',
        relyInit: true,
        title: '刷新表格',
        code: `GridManager.refreshGrid('${gridManagerName}');`
    },
    getCheckedTr: {
        key: 'getCheckedTr',
        relyInit: true,
        title: '获取当前选中的行',
        code: `GridManager.getCheckedTr('${gridManagerName}');`
    },
    getCheckedData: {
        key: 'getCheckedData',
        relyInit: true,
        title: '获取选中行的渲染数据',
        code: `GridManager.getCheckedData('${gridManagerName}');`
    },
    setCheckedData: {
        key: 'setCheckedData',
        relyInit: true,
        title: '设置选中的数据',
        code: `GridManager.setCheckedData('${gridManagerName}', []);`
    },
    cleanData: {
        key: 'cleanData',
        relyInit: true,
        title: '清除指定表格数据',
        code: `GridManager.cleanData('${gridManagerName}');`
    },
    destroy: {
        key: 'destroy',
        relyInit: true,
        title: '消毁指定的GridManager实例',
        code: `GridManager.destroy('${gridManagerName}');`
    },
};
const demo1 = {
    /**
     * 初始化搜索区域
     */
    initSearch: function() {
        // 渲染下拉框
        var typeSelect = document.querySelector('.search-area select[name="type"]');

        for(let key in TYPE_MAP){
            const option = document.createElement('option');
            option.value = key;
            option.innerText = TYPE_MAP[key];
            typeSelect.appendChild(option);
        }

        // 绑定搜索事件
        document.querySelector('.search-action').addEventListener('click', function () {
            var _query = {
                title: document.querySelector('[name="title"]').value,
                type: document.querySelector('[name="type"]').value,
                content: document.querySelector('[name="content"]').value
            };
            table.GM('setQuery', _query, function(){
                console.log('setQuery执行成功');
            });
        });

        // 绑定重置
        document.querySelector('.reset-action').addEventListener('click', function () {
            document.querySelector('[name="title"]').value = '';
            document.querySelector('[name="type"]').value = '-1';
            document.querySelector('[name="content"]').value = '';
        });
    },

    /**
     * 初始化方法区域
     */
    initFN: () => {
        const fnSelect = document.querySelector('.fn-select');
        const fnRun = document.querySelector('.fn-run');
        const fnCode = document.querySelector('.fn-code');
        const fnRunInfo = document.querySelector('.fn-run-info');

        // 渲染选择区域, instantiated: 是否已经实例化
        const renderSelect = (instantiated) => {
            let liStr = '<option value="-1">请选择方法</option>';
            for (let key in GM_PUBLISH_METHOD_MAP) {
                let fn = GM_PUBLISH_METHOD_MAP[key];
                let disabled = !instantiated && fn.relyInit  ? 'disabled' : '';
                liStr = `${liStr}<option value="${key}" ${disabled} title="${fn.title}">${key}</option>`;
            }
            fnSelect.innerHTML = liStr;
        };
        renderSelect(true);

        // bind input change event
        fnSelect.addEventListener('change', function() {
            fnCode.value = GM_PUBLISH_METHOD_MAP[this.value].code;
            fnRun.setAttribute('now-fun', this.value);
        });

        // bind run event
        fnRun.addEventListener('click', function() {
            if (!fnCode.value) {
                fnRunInfo.innerHTML = '请通过选择方法生成所需要执行的代码';
                return;
            }
            fnRunInfo.innerHTML = '';
            try {
                const log = eval(fnCode.value);
                const nowFn = fnRun.getAttribute('now-fun');
                console.group(nowFn);
                console.log(fnCode.value);
                console.log(log);
                console.groupEnd();
                if (nowFn === 'init') {
                    renderSelect(true);
                }
                if (nowFn === 'destroy') {
                    renderSelect(false);
                }
                // 重置
                fnCode.value = '';
                fnRun.setAttribute('now-fun', '');
                fnSelect.value = '-1';

                fnRunInfo.innerHTML = `<span class="success-info">
                    <a href="http://gridmanager.lovejavascript.com/api/index.html#${nowFn}" target="_blank">${nowFn}</a>
                    执行成功, 请打开控制台查看具体信息
                </span>`;
            } catch (e) {
                fnRunInfo.innerHTML = `<span class="error-info">
                    <a href="http://gridmanager.lovejavascript.com/api/index.html#${nowFn}" target="_blank">${nowFn}</a>
                    执行失败, 请打开控制台查看具体信息
                </span>`;
                console.error('执行错误: ', e);
            }
        });
    },

    /**
     * 初始化表格
     */
    initGM: function() {
        table.GM({
            gridManagerName: 'test',
            width: '100%',
            height: '100%',
            // useNoTotalsMode: true,
            supportAjaxPage:true,
            // isCombSorting: true,
            // mergeSort: true,
            isIconFollowText: true,
            // useRadio: true,
            disableCache: false,
            ajax_data: function () {
                return 'https://www.lovejavascript.com/blogManager/getBlogList';
            },
            // ,firstLoading: false // 初始渲染时是否加载数据
            ajax_type: 'POST',

            // 选择事件执行前事件
            checkedBefore: function(checkedList){
                console.log('checkedBefore==', checkedList);
            }

            // 选择事件执行后事件
            ,checkedAfter: function(checkedList){
                console.log('checkedAfter==', checkedList);
            }

            // 全选事件执行前事件
            ,checkedAllBefore: function(checkedList){
                console.log('checkedAllBefore==', checkedList);
            }

            // 全选事件执行后事件
            ,checkedAllAfter: function(checkedList){
                console.log('checkedAllAfter==', checkedList);
            }

            // 执行排序前事件
            ,sortingBefore: function(query){
                console.log('sortingBefore', query);
            }

            // 排行排序后事件
            ,sortingAfter: function(query){
                console.log('sortingAfter', query);
            }

            // AJAX请求前事件函数
            ,ajax_beforeSend: function(promise){
                console.log('ajax_beforeSend');
            }
            // AJAX成功事件函数
            ,ajax_success: function(response){
                console.log('ajax_success');
            }

            // AJAX失败事件函数
            ,ajax_error: function(error){
                console.log('ajax_error');
            }

            // AJAX结束事件函数
            ,ajax_complete: function(complete){
                console.log('ajax_complete');
            }

            ,columnData: [
                {
                    key: 'pic',
                    remind: 'the pic',
                    width: '110px',
                    align: 'center',
                    text: '缩略图',
                    // 使用函数返回 dom node
                    template: function(pic, row) {
                        var picNode = document.createElement('a');
                        picNode.setAttribute('href', `https://www.lovejavascript.com/#!zone/blog/content.html?id=${row.id}`);
                        picNode.setAttribute('title', row.title);
                        picNode.setAttribute('target', '_blank');
                        picNode.title = `点击阅读[${row.title}]`;
                        picNode.style.display = 'block';
                        picNode.style.height = '58.5px';

                        var imgNode = document.createElement('img');
                        imgNode.style.width = '90px';
                        imgNode.style.margin = '0 auto';
                        imgNode.alt = row.title;
                        imgNode.src = `https://www.lovejavascript.com/${pic}`;

                        picNode.appendChild(imgNode);
                        return picNode;
                    }
                },{
                    key: 'title',
                    remind: 'the title',
                    align: 'left',
                    text: '标题',
                    sorting: '',
                    // 使用函数返回 dom node
                    template: function(title, row) {
                        var titleNode = document.createElement('a');
                        titleNode.setAttribute('href', `https://www.lovejavascript.com/#!zone/blog/content.html?id=${row.id}`);
                        titleNode.setAttribute('title', title);
                        titleNode.setAttribute('target', '_blank');
                        titleNode.innerText = title;
                        titleNode.title = `点击阅读[${row.title}]`;
                        titleNode.classList.add('plugin-action');
                        return titleNode;
                    }
                },{
                    key: 'type',
                    remind: 'the type',
                    text: '博文分类',
                    align: 'center',
                    width: '150px',
                    sorting: '',
                    // 表头筛选条件, 该值由用户操作后会将选中的值以{key: value}的形式覆盖至query参数内。非必设项
                    filter: {
                        // 筛选条件列表, 数组对象。格式: [{value: '1', text: 'HTML/CSS'}],在使用filter时该参数为必设项。
                        option: [
                            {value: '1', text: 'HTML/CSS'},
                            {value: '2', text: 'nodeJS'},
                            {value: '3', text: 'javaScript'},
                            {value: '4', text: '前端鸡汤'},
                            {value: '5', text: 'PM Coffee'},
                            {value: '6', text: '前端框架'},
                            {value: '7', text: '前端相关'}
                        ],
                        // 筛选选中项，字符串, 默认为''。 非必设项，选中的过滤条件将会覆盖query
                        selected: '3',
                        // 否为多选, 布尔值, 默认为false。非必设项
                        isMultiple: true
                    },
                    template: function(type, row){
                        return TYPE_MAP[type];
                    }
                },{
                    key: 'info',
                    remind: 'the info',
                    width: '100px',
                    text: '简介'
                },{
                    key: 'username',
                    remind: 'the username',
                    align: 'center',
                    width: '100px',
                    text: '作者',
                    template: function(username){
                        return `<a class="plugin-action" href="https://github.com/baukh789" target="_blank" title="去看看${username}的github">${username}</a>`;
                    }
                },{
                    key: 'createDate',
                    width: '130px',
                    text: '创建时间',
                    sorting: 'DESC',
                    // 使用函数返回 htmlString
                    template: function(createDate, row){
                        return new Date(createDate).toLocaleDateString();
                    }
                },{
                    key: 'lastDate',
                    width: '130px',
                    text: '最后修改时间',
                    sorting: '',
                    // 使用函数返回 htmlString
                    template: function(lastDate, row){
                        return new Date(lastDate).toLocaleDateString();
                    }
                },{
                    key: 'action',
                    remind: 'the action',
                    width: '100px',
                    align: 'center',
                    disableCustomize: true,
                    text: '<span style="color: red">操作</span>',
                    // 直接返回 htmlString
                    template:  function(undefined, row){
                        return `<span class="plugin-action" title="${row.title}" onclick="demo1.delectRowData(this.title)">删除</span>`;
                    }
                }
            ]
            // 排序后事件
            ,sortingAfter: function (data) {
                console.log('sortAfter', data);
            }
        }, function(query){
            // 渲染完成后的回调函数
            console.log('渲染完成后的回调函数:', query);
        })
    },

    /**
     * 删除功能
     */
    delectRowData: function(title) {
        // 执行删除操作
        if(window.confirm('确认要删除['+title+']?')){
            window.alert('当然这只是个示例,并不会真实删除,要不然每天我每天就光填demo数据了.');
        }
    }
};

// GridManager 渲染
var table = document.querySelector('table');
demo1.initSearch(table);
demo1.initGM(table);
demo1.initFN();
