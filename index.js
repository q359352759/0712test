const { createApp } = Vue

createApp({
    data() {
        return {
            message: 'Hello Vue!',
            list: {
                '😂': "",
                '🤣': "",
                '😅': ""
            },
            range: "",
            savedOffset: "",
            flag: false,
            startContainer: "",
            endContaine: "",
            startOffset: ""
        }
    },
    mounted() {

    },
    methods: {
        copy(event) {
            let selectedContent = [];

            if (window.getSelection) {
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const container = document.createElement('div');
                    container.appendChild(range.cloneContents());
                    const nodes = container.childNodes;
                    for (let i = 0; i < nodes.length; i++) {
                        const node = nodes[i];
                        if (node.nodeType === Node.TEXT_NODE) {
                            // 文本节点
                            selectedContent += node.textContent.trim()
                        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'img') {
                            // 图像节点
                            selectedContent += node.alt
                        }
                    }
                }
            }
            console.log(selectedContent)

            event.preventDefault(); // 阻止默认的复制事件

            // 插入自定义内容到剪贴板
            const customText = '这是自定义的文本内容';
            const clipboardData = event.clipboardData || window.clipboardData;
            clipboardData.setData('text', selectedContent);
            // 获取为文本形式
        },
        getblur() {
            let sel = window.getSelection();
            this.range = sel.getRangeAt(0);
            this.range.deleteContents();
        },
        clickDiv() {
            //记录光标位置
            let selection = getSelection()
            this.range = selection.getRangeAt(0)
            // this.savedOffset = this.range.toString().length;
        },
        compositionstart() {
            this.flag = false
        },
        compositionend() {
            this.flag = true
            console.log('中文输入完成')
            this.替换内容()
        },
        keyup(event) {
            // console.log('keyup', event, this.flag)
            event.preventDefault();
        },
        restoreCursor() {
            const sel = window.getSelection()
            sel.removeAllRanges()
            this.range.setStart(this.startContainer)
            // this.range.setEndAfter(this.endContainer)
            sel.addRange(this.range)
        },
        指定光标位置(){
            // const sel = window.getSelection()
            // sel.removeAllRanges()
            // sel.addRange(this.range)
            


            const selection = window.getSelection()
            let nodes = document.querySelector('#editableDiv').childNodes
            // 创建新的光标对象
            var range = new Range();;
            // 将光标对象的范围界定为新建的表情节点
            console.log(nodes[1])
            // range.selectNodeContents(document.querySelector('#editableDiv'));
            // 定位光标位置在表情节点的最大长度位置
            // range.setStartAfter(nodes[1]);//
            range.setStart(nodes[1].firstChild, 2);
            // 将选区折叠为一个光标
            range.collapse(true);
            // 清除所有光标对象
            selection.removeAllRanges();
            // 添加新的光标对象
            selection.addRange(range);
        },
        getCaretNodeIndex() {
            var selection = window.getSelection();
            if (selection.rangeCount > 0) {
                var range = selection.getRangeAt(0);
                // range.setStart()
                let 列数 = selection.anchorOffset
                let 行数 = 0
                let 节点数 = 0

                console.log(range.startContainer)
                let nodes = document.querySelector('#editableDiv').childNodes
                console.log(nodes)
                // 第一个节点
                if (range.startContainer.parentNode.getAttribute('contenteditable') === 'true') {
                    var container = range.startContainer.parentNode;
                    var index = -1;
                    for (var i = 0; i < container.childNodes.length; i++) {
                        if (container.childNodes[i] === range.startContainer) {
                            节点数 = i;
                            break;
                        }
                    }
                } else {
                    for (var i = 0; i < nodes.length; i++) {
                        let parentNode = range.startContainer.parentNode
                        if (nodes[i] == parentNode) {
                            行数 = i
                            console.log(nodes[i])
                            for (var k = 0; k < nodes[i].childNodes.length; k++) {
                                if (nodes[i].childNodes[k] === range.startContainer) {
                                    节点数 = k;
                                    break;
                                }
                            }
                            break
                        }
                    }
                }
                

                console.log('列数', 列数)
                console.log('行数', 行数)
                console.log('节点数', 节点数)
            }

        },
        handleSelect(event) {
            //记录光标位置
            console.log(this.range, this.range.startOffset)
            var insertedText = event.data; // 获取插入的文本
            // console.log(event, event.data, insertedText == '😀', this.flag)
            // this.savedOffset = this.range.toString().length;
            if (insertedText == '😀') {
                // var modifiedText = insertedText.replace(/a/g, 'b'); // 将插入的文本中的 "a" 替换为 "b"
                // document.execCommand('insertText', false, modifiedText); // 在光标位置插入修改后的文本
            }
            console.log('设置光标位置')
            let selection = getSelection()
            let range = selection.getRangeAt(0)
            this.range = range
            this.startContainer = this.range.startContainer
            this.endContainer = this.range.endContainer
            this.startOffset = this.range.startOffset

            this.getCaretNodeIndex()
            // this.restoreCursor()
            setTimeout(() => {
                // this.替换内容()
            }, 3000);
        },
        替换内容() {
            console.log('替换内容')
            var div = document.getElementById('editableDiv');

            // 获取编辑区域的内容
            var content = div.innerHTML;
            console.log(content)
            // 替换指定的文本
            var pattern = /(?<!<span class="emoji" contenteditable="false">)😀(?!<\/span>)/g;
            console.log('验证', content.match(pattern))
            // if (!content.match(pattern)) {
            //     return
            // }

            const replacedContent = content.replace(pattern, function (match) {
                return `<span class="emoji" contenteditable="false">😅</span>`;
            });
            var div = document.getElementById("editableDiv");
            console.log(replacedContent)
            div.innerHTML = replacedContent


            setTimeout(() => {
                this.restoreCursor()
                // var selection = window.getSelection();
                // var restoredRange = selection.getRangeAt(0);
                // restoredRange.setStart(div.firstChild, this.savedOffset);
                // restoredRange.collapse(true);

                // // 将焦点设置在 div 上
                // div.focus(); 
            }, 100);
        },
        插入表情() {
            var textNode = this.range.startContainer;
            console.log(textNode)
            var rangeStartOffset = this.range.startOffset;


            let div_1 = document.createElement('div')
            div_1.innerHTML = '<span class="emoji" contenteditable="false">😅</span>'
            let span = div_1.childNodes[0]
            this.range.insertNode(span)

            // 恢复光标位置
            var div = document.getElementById('editableDiv');

            // 获取当前选中的范围
            var selection = window.getSelection();
            var range = selection.getRangeAt(0);

            range.setStartAfter(span);
            // range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);

            // 使 <div> 元素获取焦点
            div.focus();

        }
    }
}).mount('#app')