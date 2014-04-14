$("h2").each(function(index, value) {
    if ($(this).children("a").attr("href") != undefined) {
        $("#main_navigation").append("<li><a href='" + $(this).children("a").attr("href") + "'>" + $(this).children("a").attr("href") + "</li>");
    }
});

$(function() {
    $('#main_navigation').slicknav({
        prependTo: '#mobileNav'
    });
});