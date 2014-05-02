// Setup Navigation
var links = new Array();
$("h2").each(function(index, value) {
    if ($(this).children("a").attr("href") != undefined) {
        var elementLink = $(this).children("a").attr("href").replace('#', '');
        links.push(elementLink)
    }
});

var mainNav = '';
$(".section-element").each(function(index, value) {
    var sectionID = $(this).attr('id');
    //get all child elements
    mainNav += '<li>' + sectionID + '<ul class="sub-nav">';
    $(this).children('section').each(function(index, value) {
        var elementLink = $(this).find('h2 > a').attr("href");
        mainNav += '<li><a href="' + elementLink + '">' + elementLink.replace('#', '') + '</a></li>';
    });
    mainNav += '</ul></li>';
});

$("#main_navigation").append(mainNav); //append to header

// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

var $navLi = $('.nav--side li');
$navLi.bind("click", function() {
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
var $searchLinks = $('#searchLinks');
$searchLinks.on('input', function(e) {
    $("#searchList li").detach(); //clear the previous list
    var matchArray = getWords($(this).val(), links); //get array of matches
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
var $revealHTML = $('.reveal-html');
$revealHTML.bind("click", function() {
    $(this).toggleClass("show").prev("pre").toggle(200);
});

//Fix the pre formatting
$('pre').each(function() {
    $(this).text($(this).html());
});

// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

//Accordion
function accordion(name){
    $(name + ' > .accordion__content').hide(); //Hide all accordion content

    $(name + ' > .accordion__header a').click(function(){

        var $this = $(this);
        var $target = $this.closest('.accordion__header').next(); //Target the accordion__content of clicked link

        if (!$target.hasClass('active')) { //If target not active
            $(name + ' .accordion__content').removeClass('active').slideUp(); //Hide everything
            $(name + ' .accordion__header').removeClass('active');
            $target.addClass('active').slideDown(); //Showcontent & accordion
            $this.closest('.accordion__header').addClass('active');
        } else { //else hide all
            $target.removeClass('active').slideUp();
            $this.closest('.accordion__header').removeClass('active');
        }

        return false;

    });
}

// Responsive Tabs

var Tabs = {

    init: function () {
        this.bindUIfunctions();
        this.pageLoadCorrectTab();
    },

    bindUIfunctions: function () {

        // Delegation
        $(document)
            .on("click", ".tabs__nav a[href^='#']:not('.active')", function (event) {
                Tabs.changeTab(this.hash);
                event.preventDefault();
            })
            .on("click", ".tabs__nav a.active", function (event) {
                Tabs.toggleMobileMenu(event, this);
                event.preventDefault();
            });

    },

    changeTab: function (hash) {

        var anchor = $("[href=" + hash + "]");
        var div = $(hash);

        // activate correct anchor (visually)
        anchor.addClass("active").parent().siblings().find("a").removeClass("active");

        // activate correct div (visually)
        div.addClass("active").siblings().removeClass("active");

        // update URL, no history addition
        // You'd have this active in a real situation, but it causes issues in an <iframe> (like here on CodePen) in Firefox. So commenting out.
        // window.history.replaceState("", "", hash);

        // Close menu, in case mobile
        anchor.closest("ul").removeClass("open");

    },

    // If the page has a hash on load, go to that tab
    pageLoadCorrectTab: function () {
        this.changeTab(document.location.hash);
    },

    toggleMobileMenu: function (event, el) {
        $(el).closest("ul").toggleClass("open");
    }

}

Tabs.init();

//Tooltip 

(function($) {

    accordion(".accordion");

    $('.tooltip').tooltipster();

})(jQuery);

// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

//Smooth scroll effect
$(function() {
    $('.slicknav_nav a[href*=#]:not([href=#])').bind("click", function() {
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
