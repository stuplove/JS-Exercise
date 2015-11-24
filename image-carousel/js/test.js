(function() {
    var $img = $('#img'),
        $btnGroup = $('button'),
        $carousel = $('#carousel'),
        filePathBase = './img/';

    init();

    function init() {
        carousel = initCarousel($carousel);
        carousel.start();
        bindEvent();
    }

    function initCarousel($carousel) {
        $carousel.append('<div style="font-size: 30px; color: red; text-align: center">' +
            '<div id="start" type="button" class="btn btn-danger">start carousel</div>' +
            '<span id="status"></span>' +
            '<div id="stop" type="button" class="btn btn-danger">stop carousel</div>' +
            '</div>');


        var $stop = $('#stop'),
            $start = $('#start'),
            $status = $('#status');

        var rtn = {
            isPaly: false,
            start: function() {
                $status.text(' Start ');
                var count = 0;
                if (!rtn.isPaly) {
                    rtn.isPaly = true;
                    rtn.obj = setInterval(function() {

                        $img.attr('src', filePathBase + 'img' + (count++ % 5 + 1) + '.jpeg');
                    }, 500)
                }
            },
            stop: function() {
                rtn.isPaly = false;
                $status.text(' Stop ');
                clearInterval(rtn.obj);
            }
        };

        $stop.on('click', rtn.stop);
        $start.on('click', rtn.start);

        return rtn;
    }

    function bindEvent() {
        $btnGroup.on('click', selectImgItem)
    }

    function selectImgItem() {
        $btn = $(this);
        var fileName = 'img' + $btn.text() + '.jpeg'
        $img.attr('src', filePathBase + fileName);
    }

}())
