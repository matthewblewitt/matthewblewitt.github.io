// Temporary Navigation
$("h2").each(function(index, value) {
    if ($(this).children("a").attr("href") != undefined) {
        $("#main_navigation").append("<li><a href='" + $(this).children("a").attr("href") + "'>" + $(this).children("a").attr("href") + "</li>");
    }
});

// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

//Mobile navigation
$(function() {
    $('#main_navigation').slicknav({
        prependTo: '#mobileNav'
    });
});

// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

//Append each HTML sippet within <pre></pre>
$('.html-snippet').each(function() {
    var thisText = $(this).html();
    $(this).append('<pre>' + $.trim(thisText) + '</pre><div class="reveal-html">Show HTML</div>');

});

//Show/Hide snippets
$('.reveal-html').bind("click", function() {
    $(this).toggleClass("show").prev("pre").toggle(200);
});

//Fix the pre formatting
$('pre').each(function() {
    $(this).text($(this).html());
});

// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

//Simple accordion
(function($) {

    var allPanels = $('.accordion > dd').hide();

    $('.accordion > dt > a').click(function() {
        allPanels.slideUp(200);
        $(this).parent().next().slideDown(200);
        return false;
    });

    $('.tooltip').tooltipster();


})(jQuery);

// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

//Smooth scroll effect
$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        $('.active-pattern').removeClass('active-pattern');
        var thisLink = $(this).attr("href");
        var targetSection = $("a[href='" + thisLink + "']").not($(this));
        $('a[href="' + thisLink + '""]').closest('.pattern').addClass('active-pattern');
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // $('a[href=]').parent('h2').addClass("active");
                });
                return false;
            }
        }
    });
});