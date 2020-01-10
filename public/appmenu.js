exports.appMenuTemplate = [
    {
        label: '文件',
        submenu: [
            {
                role: 'close', 
                label: '退出'
            }
        ]
    },
    {
        label: '编辑',
        submenu: [
            {
                role: 'undo', 
                label: '撤销'
            },
            {
                role: 'redo',
                label: '反撤销'
            },
            {
                type: 'separator'
            },
            {
                role: 'cut', 
                label: '剪切'
            },
            {
                role: 'copy', 
                label: '复制'

            },
            {
                role: 'paste', 
                label: '粘贴'
            },
            {
                role: 'pasteandmatchstyle'
            },
            {
                role: 'delete', 
                label: '删除'
            },
            {
                role: 'selectall', 
                label: '全选'
            }
        ]
    },
    {
        label: '查看',
        submenu: [
            {
                role: 'reload', 
                label: '重新加载'
            },
            {
                role: 'toggledevtools', 
                label: '开发者模式'
            },
            {
                type: 'separator'
            },
            {
                role: 'resetzoom', 
                label: '恢复大小'
            },
            {
                role: 'zoomin', 
                label: '放大'
            },
            {
                role: 'zoomout', 
                label: '缩小'
            },
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen', 
                label: '全屏'
            }
        ]
    },
    {
        role: 'help',
        label: '帮助',
        submenu: [
            {
                label: '主页',
                click() { require('electron').shell.openExternal('http://www.github.com/jiandandaoxingfu'); }
            }
        ]
    }
];