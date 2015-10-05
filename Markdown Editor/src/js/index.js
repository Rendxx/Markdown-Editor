$(function () {
    var mdInput = document.getElementById('mdInput');
    var mdPreview = document.getElementById('mdPreview');
    var $mdInput = $(mdInput);
    var $mdInputWrap = $('.md-input');

    mdInput.addEventListener('keyup', function (e) {
        mdPreview.innerHTML = marked(mdInput.value);
    });
    
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0];

    $(window).resize(function () {
        var h = (w.innerHeight || e.clientHeight || g.clientHeight) - 120;
        $mdInputWrap.height(h);
        $mdInput.height(h - 42);
    });
    $(window).resize();
});