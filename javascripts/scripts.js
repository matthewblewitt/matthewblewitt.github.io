// Setup Navigation
var links = new Array();
$("h2").each(function(index, value) {
    if ($(this).children("a").attr("href") != undefined) {
        var elementLink = $(this).children("a").attr("href").replace('#', '');
        // $("#main_navigation").append("<li><a href='" + $(this).children("a").attr("href") + "'>" + elementLink + "</li>");
        links.push(elementLink)
    }
});


var mainNav = '';
$(".section-element").each(function(index, value) {
    var sectionID = $(this).attr('id');
    //get all child elements
    mainNav += '<li>' + sectionID + '<ul class="sub-nav">';
    $(this).children('section').each(function(index, value) {
        var elementLink = $(this).children('h2').children("a").attr("href");

        mainNav += '<li><a href="' + elementLink + '">' + elementLink.replace('#', '') + '</a></li>';
    });
    mainNav += '</ul></li>';
});

$("#main_navigation").append(mainNav); //append to header
// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .


$('.nav li').bind("click", function() {
    var thisSubNav = $(this).children(".sub-nav");
    thisSubNav.toggle(300);
    $(".sub-nav").not(thisSubNav).hide(300);
});


// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

//search the links and return match array
function getWords(letters) {
    //create new array of elements that match
    if (letters.length >= 1) {
        var matchArray = new Array();
        for (var i = 0; i < links.length; i++) {
            //check if string begins with letters
            if (links[i].match("^" + $.trim(letters))) {
                matchArray.push(links[i]);
            }

        }
        return matchArray;
    }
}

//Keyword search 
$('input').on('input', function(e) {
    $("#searchList").html(" ");
    var matchArray = getWords($(this).val(), links);
    var outputList = '<ul>';
    for (var i = 0; i < matchArray.length; i++) {

        $("#searchList").append('<li><a href="#' + matchArray[i] + '">' + matchArray[i] + '</a></li>');
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
    $('a[href*=#]:not([href=#])').bind("click", function() {
        var offsetTop = 0;

        $('.active-pattern').removeClass('active-pattern');
        var thisLink = $(this).attr("href");
        var targetSection = $("a[href='" + thisLink + "']").not($(this));
        $('a[href="' + thisLink + '""]').closest('.pattern').addClass('active-pattern');
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                if ($(window).width() < 960) {
                    offsetTop = 200;
                }
                $('html,body').animate({
                    scrollTop: target.offset().top - offsetTop
                }, 500, function() {
                    $('.slicknav_nav').hide(200).addClass('slicknav_hidden');
                    $('.slicknav_open').removeClass('slicknav_open').addClass('slicknav_collapsed');
                    // $('a[href=]').parent('h2').addClass("active");
                });
                return false;
            }
        }
    });
});