$(document).ready(function() {
        var isStaticTest = true;

        var $page = $('#page'),
            $total = $('#total'),
            $pagDom = $('#test'),
            $pageInput = $('#pageId'),
            $form = $('#formId');

        var page,
            total;

        bindEvent();
        initPagination();

        function initPagination() {
            page = $page.val();
            total = $total.val();
            var opt = {
                items: total,
                itemsOnPage: 10,
                cssStyle: 'pagination',
                prevText: '&laquo;',
                nextText: '&raquo;',
                onPageClick: onPageClick,
                displayedPages: 7,
                currentPage: page,
                // hrefTextPrefix: '#',
                edges: 0,
                onInit: function() {
                    isStartPageHandle.call(this);

                    isEndPageHandle.call(this);
                }
            }

            $pagDom.pagination(opt);
        }

        function onPageClick(pageNumber, event) {
            if (typeof pageNumber === 'number') {
            	$page.val(pageNumber)

                if (isStaticTest) {
                    isStartPageHandle.call(this);
                    isEndPageHandle.call(this);
                } else {
                    $pageInput.val(pageNumber);
                    $form.submit();
                }


            } else if (pageNumber != undefined) {
                console.log('pageNumber is null');
            }
        }

        function isStartPageHandle() {
            if (this.currentPage == 0) {
                $pagDom.children('li:first').addClass('hidden')
            }
        }

        function isEndPageHandle() {
            var isEndPage = this.itemsOnPage * (this.currentPage + 1) >= this.items;
            if (isEndPage)
                $pagDom.children('li:last').addClass('hidden')
        }

        function bindEvent() {
            $page.on('change', initPagination)
            	.on('change', function(){
            		$page.val(page)
            	})
            $total.on('change', initPagination)
        }
    });