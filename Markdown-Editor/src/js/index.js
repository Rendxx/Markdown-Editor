﻿$(function () {
    var mdInput = document.getElementById('mdInput');
    var mdPreview = document.getElementById('mdPreview');
    var mdlink = document.getElementById('mdLink');
    var $mdInput = $(mdInput);
    var $mdLinkBtn = $('#mdConfirm');
    var $mdLinkWrap = $('.md-link');
    var $mdInputWrap = $('.md-input');

    var cookieKey = "mdCache";

    marked.setOptions({
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });

    // md input
    mdInput.addEventListener('keyup', function (e) {
        $$.cookie.set(cookieKey, mdInput.value);
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

    var recover = $$.cookie.get(cookieKey);
    if (recover != null) {
        $$.info.check2("Do you want to load previous content?", "Recovery", false, "rgba(0, 0, 0, 0.6)"
            , function () {
                mdInput.value = recover;
                mdPreview.innerHTML = marked(recover);
            }
            , function () {
                $$.cookie.del(cookieKey);
            });
    }
});