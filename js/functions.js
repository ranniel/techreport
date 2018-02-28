(function($){
    "use strict"; // Start of use strict
    /* ---------------------------------------------
     MENU REPONSIIVE
     --------------------------------------------- */
    function smartblog_init_menu_reposive(){
          var kt_is_mobile = (Modernizr.touch) ? true : false;
          if(kt_is_mobile === true){
            $(document).on('click', '.smartblog-nav .menu-item-has-children >.toggle-submenu', function(e){
              var licurrent = $(this).closest('li');
              var liItem = $('.smartblog-nav .menu-item-has-children');
              if ( !licurrent.hasClass('show-submenu') ) {
                liItem.removeClass('show-submenu');
                licurrent.parents().each(function (){
                    if($(this).hasClass('menu-item-has-children')){
                     $(this).addClass('show-submenu');   
                    }
                      if($(this).hasClass('main-menu')){
                          return false;
                      }
                })
                licurrent.addClass('show-submenu');
                // Close all child submenu if parent submenu is closed
                if ( !licurrent.hasClass('show-submenu') ) {
                  licurrent.find('li').removeClass('show-submenu');
                }
                  return false;
                  e.preventDefault();
              }else{
                  licurrent.removeClass('show-submenu');
                  // var href = $this.attr('href');
                  // if ( $.trim( href ) == '' || $.trim( href ) == '#' ) {
                  //     licurrent.toggleClass('show-submenu');
                  // }
                  // else{
                  //     window.location = href;
                  // }
              }
              // Close all child submenu if parent submenu is closed
              if ( !licurrent.hasClass('show-submenu') ) {
                  //licurrent.find('li').removeClass('show-submenu');
              }
              e.stopPropagation();
          });
        $(document).on('click', function(e){
              var target = $( e.target );
              if ( !target.closest('.show-submenu').length || !target.closest('.smartblog-nav').length ) {
                  $('.show-submenu').removeClass('show-submenu');
              }
          }); 
          // On Desktop
          }else{
              $(document).on('mousemove','.smartblog-nav .menu-item-has-children',function(){
                  $(this).addClass('show-submenu');
                  if( $(this).closest('.smartblog-nav').hasClass('main-menu')){
                      $('body').addClass('is-show-menu');
                  }
              })

              $(document).on('mouseout','.smartblog-nav .menu-item-has-children',function(){
                  $(this).removeClass('show-submenu');
                  $('body').removeClass('is-show-menu');
              })
          }
     }

    function smartblog_get_scrollbar_width() {
        var $inner = jQuery('<div style="width: 100%; height:200px;">test</div>'),
            $outer = jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
            inner = $inner[0],
            outer = $outer[0];
        jQuery('body').append(outer);
        var width1 = inner.offsetWidth;
        $outer.css('overflow', 'scroll');
        var width2 = outer.clientWidth;
        $outer.remove();
        return (width1 - width2);
    }


    function smartblog_innit_carousel(){
        $(".owl-carousel").each(function(index, el) {
            var config = $(this).data();
            config.navText = ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'];
            var animateOut = $(this).data('animateout');
            var animateIn  = $(this).data('animatein');
            var slidespeed = $(this).data('slidespeed');
            if(typeof animateOut != 'undefined' ){
                config.animateOut = animateOut;
            }
            if(typeof animateIn != 'undefined' ){
                config.animateIn = animateIn;
            }
            if(typeof (slidespeed) != 'undefined' ){
                config.smartSpeed = slidespeed;
            }

            if( $('body').hasClass('rtl')){
                config.rtl = true;
            }


            var owl = $(this);
            owl.on('initialized.owl.carousel',function(event){
                var total_active = owl.find('.owl-item.active').length;
                var i            = 0;
                owl.find('.owl-item').removeClass('item-first item-last');
                setTimeout(function(){
                    owl.find('.owl-item.active').each(function () {
                        i++;
                        if (i == 1) {
                            $(this).addClass('item-first');
                        }
                        if (i == total_active) {
                            $(this).addClass('item-last');
                        }
                    });

                }, 100);
            })
            owl.on('refreshed.owl.carousel',function(event){
                var total_active = owl.find('.owl-item.active').length;
                var i            = 0;
                owl.find('.owl-item').removeClass('item-first item-last');
                setTimeout(function(){
                    owl.find('.owl-item.active').each(function () {
                        i++;
                        if (i == 1) {
                            $(this).addClass('item-first');
                        }
                        if (i == total_active) {
                            $(this).addClass('item-last');
                        }
                    });

                }, 100);
            })
            owl.on('change.owl.carousel',function(event){
                var total_active = owl.find('.owl-item.active').length;
                var i            = 0;
                owl.find('.owl-item').removeClass('item-first item-last');
                setTimeout(function(){
                    owl.find('.owl-item.active').each(function () {
                        i++;
                        if (i == 1) {
                            $(this).addClass('item-first');
                        }
                        if (i == total_active) {
                            $(this).addClass('item-last');
                        }
                    });

                }, 100);

            })
            owl.owlCarousel(config);

        });
    }
    function smartblog_back_to_top() {
        var h = $(window).scrollTop();

        if (h > 100) {
            $('.backtotop').addClass('show');
        }
        else {
            $('.backtotop').removeClass('show');
        }
    };
    //EQUAL ELEM
    function better_equal_elems() {
        setTimeout(function(){
            $('.equal-container').each(function () {
                var $this = $(this);
                if ($this.find('.equal-elem').length) {
                    $this.find('.equal-elem').css({
                        'height': 'auto'
                    });
                    var elem_height = 0;
                    $this.find('.equal-elem').each(function () {
                        var this_elem_h = $(this).height();
                        if (elem_height < this_elem_h) {
                            elem_height = this_elem_h;
                        }
                    });
                    $this.find('.equal-elem').height(elem_height);
                }
            });
        }, 3000);
    }

    /* ---------------------------------------------
     Scripts initialization
     --------------------------------------------- */
    $(window).load(function() {
      better_equal_elems();
    });
    /* ---------------------------------------------
     Scripts resize
     --------------------------------------------- */
    $(window).on("resize", function() {
        smartblog_init_menu_reposive();
        better_equal_elems()
    });
    /* ---------------------------------------------
     Scripts scroll
     --------------------------------------------- */
    $(window).scroll(function(){
        smartblog_back_to_top();
    });

    /* ---------------------------------------------
     Scripts ready
     --------------------------------------------- */
    $(document).ready(function() {
        smartblog_init_menu_reposive();
        smartblog_innit_carousel();
        better_equal_elems();

        var window_size = jQuery('body').innerWidth();
        window_size += smartblog_get_scrollbar_width();
        if( window_size > 991 ){
            if( $('.header-sticky').length > 0 ){
                $('.header-sticky').sticky({topSpacing:0});
            }
        }
        //BACK TO TOP
        $('a.backtotop,a.back_to_top').on('click', function () {
            $('html, body').animate({scrollTop: 0}, 800);
            return false;
        });

        /* Block search */
        $(document).on('click','.header-form-search',function () {
            $('#block-search-popup').addClass('open');
            $('body').addClass('open-block-serach');
            return false;
        });
        $(document).on('click','.close-block-serach',function () {
            $('#block-search-popup').removeClass('open');
            $('body').removeClass('open-block-serach');
            return false;
        });

        $(document).on('click','.togole-mainmenu',function () {
            $(this).closest('.nav-wrapper').find('.smart-mainmenu').toggle();
        })

        if ( $('.post').length ) { $('.post').fitVids(); }

    });

    // Reinit some important things after ajax
    $(document).ajaxComplete(function (event, xhr, settings) {
        
    });

    $(window).bind("load", function() {

    });

})(jQuery); // End of use strict
