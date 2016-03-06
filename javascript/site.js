//= require_tree .
//= stub plugins


$(function() {
    /*============================================
    Hook up Scrollspy
    ==============================================*/
    // $('body').scrollspy({ target: '#main-navbar' });


    /*============================================
    Resize Functions
    ==============================================*/
    $(window)
        .resize(onResize);
    var prevWidth = -1;
    onResize();

    function onResize() {
        $('.hero')
            .height($(window)
                .height());
        $('.message-box')
            .css({
                'marginTop': $(window)
                    .height() * 0.4
            });

        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        var isMobile = width < 768;
        var prevIsMobile = prevWidth > 768;
        if (prevWidth == -1) prevIsMobile = !isMobile;

        if (isMobile && !prevIsMobile) {
            console.log('Switching to Mobile');
            smoothScroll.init({
                offset: 65,
                scrollOnLoad: false
            });
        } else if (!isMobile && prevIsMobile) {
            console.log('Switching out of  Mobile');
            smoothScroll.init({
                offset: 78,
                scrollOnLoad: false
            });
        }

        prevWidth = width;
    }

    $(window)
        .scroll(setNavScrolled);

    setNavScrolled();

    function setNavScrolled() {
        //Handle navbar
        if ($(window)
            .scrollTop() === 0) {
            $('#main-navbar')
                .removeClass('scrolled');
        } else {
            $('#main-navbar')
                .addClass('scrolled');
        }
    }


    var portfolioItems = $('#my-work .item a');
    var portfolioItemsData = [{
        title: 'St. Catherine of Siena Academy',
        description: "A video about the educational and spiritual benefits of this women's Catholic high school. Footage captured by Highway Media Inc."
    }, {
        title: 'Plymouth Rocks! City Promo',
        description: "30-second commercial about Plymouth, MI. Footage and guitar animation provided by Highway Media Inc."
    }, {
        title: 'OLGC Tithing',
        description: "A video for Our Lady of Good Counsel Catholic Church about the importance of tithing. Footage captured by Highway Media Inc."
    }, {
        title: 'KIDSGala Promo Video',
        description: 'A video about the non-profit KIDSgala, which "provides a celebration of life to children who have or are battling a life altering event...." Footage captured by VideoMagic Productions.'
    }, {
        title: 'Roemer Wedding Video',
        description: "Wedding recap film. Footage captured by VideoMagic Productions."
    }, {
        title: 'Bronik Wedding Video',
        description: "Wedding recap film. Footage captured by VideoMagic Productions."
    }];

    for (var i = 0; i < portfolioItemsData.length; i++) {
        portfolioItems.eq(i)
            .magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                closeBtnInside: true,
                mainClass: 'my-mfp-slide-bottom',
                fixedContentPos: true,
                fixedBgPos: true,
                iframe: {
                    markup: magnificPopupContent(portfolioItemsData[i].title, portfolioItemsData[i].description)
                }
            });
    }

    // Make sure close button works
    $(document)
        .on('click', '.mfp-close-custom', function() {
            portfolioItems.magnificPopup('close');
        });

    // HTML markup of popup, `mfp-close` will be replaced by the close button
    function magnificPopupContent(title, description) {
        return '<div class="mfp-iframe-scaler" style="overflow: initial;">' +
            '<button class="mfp-close-custom"><i class="glyphicon glyphicon-remove"></i></button>' +
            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
            '<h3>' + title + '</h5>' +
            "<p>" + description + "</p>" +
            '</div>';
    }

    var timelineBlocks = $('.cd-timeline-block'),
        offset = 0.8;

    //hide timeline blocks which are outside the viewport
    hideBlocks(timelineBlocks, offset);

    //on scolling, show/animate timeline blocks when enter the viewport
    $(window)
        .on('scroll', function() {
            (!window.requestAnimationFrame) ? setTimeout(function() {
                showBlocks(timelineBlocks, offset);
            }, 100): window.requestAnimationFrame(function() {
                showBlocks(timelineBlocks, offset);
            });
        });

    function hideBlocks(blocks, offset) {
        blocks.each(function() {
            ($(this)
                .offset()
                .top > $(window)
                .scrollTop() + $(window)
                .height() * offset) && $(this)
                .find('.cd-timeline-img, .cd-timeline-content')
                .addClass('is-hidden');
        });
    }

    function showBlocks(blocks, offset) {
        blocks.each(function() {
            ($(this)
                .offset()
                .top <= $(window)
                .scrollTop() + $(window)
                .height() * offset && $(this)
                .find('.cd-timeline-img')
                .hasClass('is-hidden')) && $(this)
                .find('.cd-timeline-img, .cd-timeline-content')
                .removeClass('is-hidden')
                .addClass('bounce-in');
        });
    }

    //Make sure navbar closes when link is clicked
    $(document)
        .on('click', '.navbar-collapse.in', function(e) {
            if ($(e.target)
                .is('a') && ($(e.target)
                    .attr('class') != 'dropdown-toggle')) {
                $(this)
                    .collapse('hide');
            }
        });

    $('#contact-form')
        .on('submit', function(event) {
            var name = $('#contact-name')
                .val(),
                email = $('#contact-email')
                .val(),
                message = $('#contact-message')
                .val(),
                gotcha = $('#contact-gotcha')
                .val();



            var blank = [];

            if (name === undefined || name === '') blank.push("name");
            if (email === undefined || email === '') blank.push("email address");
            if (message === undefined || message === '') blank.push("message");


            if (blank.length > 0) {
                var errorMsg = "Looks like you forgot to enter your ";

                if (blank.length === 3) {
                    errorMsg += blank[0] + ", " + blank[1] + ", and " + blank[2] + ".";
                } else {
                    errorMsg += blank.join(" and ") + ".";
                }

                swal({
                    title: "Oops...",
                    text: errorMsg,
                    type: "error",
                    confirmButtonText: "OK",
                    allowOutsideClick: true
                });
            } else {
                var url = '//formspree.io/',
                    e = "pnjwxyjsqnqqnx%lrfnq%htr";
                // e = "qnqqnxur%lrfnq%htr";

                url += caesarShift(e, -5)
                    .replace('%', '@')
                    .replace('%', '.');

                $.ajax({
                    url: url,
                    data: {
                        Name: name,
                        Email: email,
                        Message: message,
                        _subject: 'New Contact Request from ' + name,
                        _gotcha: gotcha
                    },
                    type: 'POST',
                    dataType: "json",
                    success: function(result) {
                        swal({
                            title: "Thanks!",
                            text: "Your message has been sent. I'll get back to your as soon as I can!",
                            type: "success",
                            confirmButtonText: "OK",
                            allowOutsideClick: true
                        });
                    }
                });
            }

            event.preventDefault();
            event.stopPropagation();
            return false;
        });

    var speed = 250,
        easing = mina.easeinout;

    [].slice.call(document.querySelectorAll('.item.animation-test > a'))
        .forEach(function(el) {
            var s = Snap(el.querySelector('svg')),
                path = s.select('path'),
                pathConfig = {
                    from: path.attr('d'),
                    to: el.getAttribute('data-path-hover')
                };

            el.addEventListener('mouseenter', function() {
                path.animate({
                    'path': pathConfig.to
                }, speed, easing);
            });

            el.addEventListener('mouseleave', function() {
                path.animate({
                    'path': pathConfig.from
                }, speed, easing);
            });
        });
});


/* Returns the result of having each alphabetic letter of the given text string shifted forward
 * by the given amount, with wraparound. Case is preserved, and non-letters are unchanged.
 * Examples:
 *   caesarShift("abz",  0) = "abz"
 *   caesarShift("abz",  1) = "bca"
 *   caesarShift("abz", 25) = "zay"
 *   caesarShift("THe 123 !@#$", 13) = "GUr 123 !@#$"
 */
function caesarShift(text, shift) {
    var result = "";
    for (var i = 0; i < text.length; i++) {
        var c = text.charCodeAt(i);
        if (c >= 65 && c <= 90)
            result += String.fromCharCode((c - 65 + shift) % 26 + 65); // Uppercase
        else if (c >= 97 && c <= 122)
            result += String.fromCharCode((c - 97 + shift) % 26 + 97); // Lowercase
        else
            result += text.charAt(i); // Copy
    }
    return result;
}
