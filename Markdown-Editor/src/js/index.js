$(function () {
    var mdInput = document.getElementById('mdInput');
    var mdPreview = document.getElementById('mdPreview');
    var mdlink = document.getElementById('mdLink');
    var $mdInput = $(mdInput);
    var $mdLinkBtn = $('#mdConfirm');
    var $mdLinkWrap = $('.md-link');
    var $mdInputWrap = $('.md-input');

    marked.setOptions({
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });

    // md input
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

    // md link
    $mdLinkWrap.tip({
        content: "Copy remote Markdown file path here",
        orientation: "right",
        css: {
            "width": "220px",
            "font-family": "Calibri"
        }
    });

    $mdLinkBtn.click(function () {
        $.ajax({
            url: mdlink.value,
            timeout: 5000,
            success: function (data) {
                try {
                    mdPreview.innerHTML = marked(data);
                } catch (e) {

                }
            }            
        });
    });

    // init
    mdlink.value = "https://raw.githubusercontent.com/Rendxx/Markdown-Editor/master/README.md";
    $mdLinkBtn.click();
});