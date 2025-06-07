/**
 * Admin Demo
 * 
 * @since 3.30
 * 
 */

(function ($) {
    // ready
    $(function () {

        console.log('ctc admin demo');

        var url = window.location.href;
        var post_title = (typeof document.title !== "undefined") ? document.title : '';
        // is_mobile yes/no,  desktop > 1024 
        var is_mobile = (typeof screen.width !== "undefined" && screen.width > 1024) ? "no" : "yes";

        var demo_var = (window.ht_ctc_admin_demo_var) ? window.ht_ctc_admin_demo_var : {};
        console.log(demo_var);

        var demo_style = '2';

        
        var admin_demo = {};

        try {
            document.dispatchEvent(
                new CustomEvent("ht_ctc_demo_messages", { detail: { admin_demo, ctc_demo_messages } })
            );
        } catch (e) {
            console.log('ht_ctc_demo_messages error' + e);
        }


        /**
         * ctc_demo_messages
         * @param {*} m 
         * @used at number blank, url target _self, etc..
         */
        function ctc_demo_messages(m = '') {
                
            var demo_notice_timeoutId;

            console.log('ctc_demo_messages: ' + m);
            console.log(m);

            clearTimeout(demo_notice_timeoutId);

            $('.ctc_ad_links').hide();
            $('.ctc_demo_messages').html(m);

            // ctc_demo_messages
            $('.ctc_demo_messages').hide().fadeIn(500);

            demo_notice_timeoutId = setTimeout(() => {
                $('.ctc_demo_messages').hide(120);
                    $('.ctc_ad_links').show(120);
            }, 9000);
        }

        /**
         * Initializes and manages the display of various styles and settings for the Click to Chat plugin.
         * 
         * This function handles the following:
         * - Click events for demo styles.
         * - Navigation and URL structure for WhatsApp links.
         * - Main page updates including call to action and position updates.
         * - Animation and notification badge settings.
         * - Customization of styles.
         * - Greetings page settings and interactions.
         * - Display and hiding of demo sections.
         * 
         * @function display_styles
         */

        function display_styles() {

            // var style = $('.chat_select_style').val();
            // $('.ctc_demo_style_' + style + '').show();

            /**
             * pages: ..all ctc page..
             * 
             * click event..
             */
            $('.ctc_demo_style').on('click', function() {
                console.log('click: navigation part..');

                if (!$('.ht_ctc_chat_greetings_box').length) {
                    console.log('no greetings dialog');
                    // link
                    ht_ctc_link();
                }
            });

            // on click
            function ht_ctc_link() {
                console.log('ht_ctc_link()');

                // number
                // maybe need to update as like HT_CTC_Formatting: wa_number. (currently updating from intl_onchange)
                var number = ht_ctc_admin_demo_var.number;

                console.log(number);

                // prefilled message
                var pre_filled = ht_ctc_admin_demo_var.pre_filled;

                // before safari 13.. replaceAll not supports..
                try {
                    var site = (demo_var.site) ? demo_var.site : '';
                    console.log(pre_filled);
                    pre_filled = pre_filled.replaceAll('%', '%25');
                    pre_filled = pre_filled.replaceAll('{site}', site);
                    pre_filled = pre_filled.replaceAll('{url}', url);
                    pre_filled = pre_filled.replaceAll('{title}', post_title);
                    pre_filled = pre_filled.replace(/\[url]/gi, url);
                    console.log(pre_filled);
                    // pre_filled = encodeURIComponent(pre_filled);
                    pre_filled = encodeURIComponent(decodeURI(pre_filled));
                    console.log(pre_filled);
                } catch (e) { }


                // url structure
                // navigation

                // 1.base_url
                var base_url = 'https://wa.me/' + number + '?text=' + pre_filled;

                // 2.url_target - _blank, _self or if popup type just add a name - here popup only
                var url_target = (demo_var.url_target_d) ? demo_var.url_target_d : '_blank';
                var url_structure_d = (demo_var.url_structure_d) ? demo_var.url_structure_d : '';
                var url_structure_m = (demo_var.url_structure_m) ? demo_var.url_structure_m : '';

                if (is_mobile == 'yes') {
                    console.log('-- mobile --');
                    // mobile
                    if ('wa_colon' == url_structure_m) {
                        console.log('-- url struture: whatsapp:// --');
                        // whatsapp://.. is selected.
                        base_url = 'whatsapp://send?phone=' + number + '&text=' + pre_filled;
                        // for whatsapp://.. url open target is _self.
                        url_target = '_self';
                    }
                    // mobile: own url
                    if (demo_var.custom_url_m && '' !== demo_var.custom_url_m) {
                        console.log('custom link');
                        base_url = demo_var.custom_url_m;
                    }

                } else {
                    // desktop
                    console.log('-- desktop --');
                    if ('web' == url_structure_d) {
                        console.log('-- url struture: web whatsapp --');
                        // web whatsapp is enabled/selected.
                        base_url = 'https://web.whatsapp.com/send' + '?phone=' + number + '&text=' + pre_filled;
                    }

                    // desktop: own url
                    if (demo_var.custom_url_d && '' !== demo_var.custom_url_d) {
                        console.log('custom link');
                        base_url = demo_var.custom_url_d;
                    }
                }

                // 3.specs - specs - if popup then add 'pop_window_features' else 'noopener'
                var pop_window_features = 'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=788,height=514,left=100,top=100';
                var specs = ('popup' == url_target) ? pop_window_features : 'noopener';
                console.log('-- specs: ' + specs + ' --');

                // navigation or display message
                if ('' == number) {
                    // no demo: if number is empty
                    console.log(demo_var.m1);
                    ctc_demo_messages(demo_var.m1);
                    // default_position();
                } else if ('_self' == url_target) {
                    // no demo: if url target is _self
                    console.log(demo_var.m2);
                    ctc_demo_messages(demo_var.m2);
                    // default_position();
                } else {
                    window.open(base_url, url_target, specs);
                }

            }

            /**
             * page: main
             *  call to action
             *  styles
             */
            if ($('body').hasClass('toplevel_page_click-to-chat')) {
                // console.log('toplevel_page_click-to-chat');

                var collapse = '';


                
                // on change - style..
                $('.select_style_item').on('click', function () {
                
                    // styles
                    demo_style = $('.select_style_desktop').val();
                    // demo_style = $(this).attr('data-style');
                    console.log(demo_style);
                    
                    main_page_update();
                });

                // on change - mobile style..
                $('.m_select_style_item').on('click', function () {
                    // console.log('change');

                    // styles
                    demo_style = $('.select_style_mobile').val();
                    console.log(demo_style);
                    
                    main_page_update();
                });

                // on change, input (some filed to update on change only and some on input, ..)
                $('.ctc_ad_main_page_on_change_input').on('change input paste', function () {
                    // console.log('input change');
                    main_page_update();
                });

                $('.ctc_ad_main_page_on_change_input_update_var').on('change input paste', function () {
                    console.log('input change: ctc_ad_main_page_on_change_input_update_var');
                    // main_page_update();
                    console.log($(this).val());

                    demo_var[$(this).attr('data-var')] = $(this).val();
                    console.log(demo_var[$(this).attr('data-var')]);

                    main_page_update();
                });


                // number
                // here this event works. but in general admin-demo.js have to load early then admin.js ..
                document.addEventListener("ht_ctc_admin_event_valid_number", function (e) {
                    console.log('addEventListener: ht_ctc_admin_event_valid_number');
                    console.log(e.detail);
                    console.log(e);

                    main_page_update();
                });
                

                function main_page_update() {

                    // call to action
                    var cta = $('.call_to_action').val();
                    // change call to action values
                    // console.log(cta);
                    $('.ctc_demo_style .ctc_cta').text(cta);

                    

                    // hide all styles
                    $('.ctc_demo_style').hide();
                    // display that style
                    $('.ctc_demo_style_' + demo_style + '').show();

                    
                    if ('close' !== collapse) {
                        // on change - collapse sidebar collapsiable fields
                        try {
                            $('.ht-ctc-admin-sidebar .collapsible').collapsible('close');
                            collapse = 'close';
                        } catch (e) { }
                    }

                    // on click .ht-ctc-admin-sidebar .collapsible - hide demo.
                    $('.ht-ctc-admin-sidebar .collapsible').on('click', function () {
                        console.log('collapsible clicked');
                        $('.ctc_demo_style').hide();
                        hide_bottom_right_descriptions();
                        collapse = 'open';
                    });
                    
                    
                    // description at bottom right.
                    hide_bottom_right_descriptions();
                    $('.ctc_ad_links').show();
                }

                // position on chanage .ctc_demo_position
                $('.ctc_demo_position').on('change input paste', function () {
                    console.log('ctc_demo_position');
                    var position = $(this).val();
                    console.log(position);
                    position_update();
                });
                
                // try catch..
                // $(.ht-ctc-admin-sidebar .collapsible).collapsible({
                //     onOpenEnd() {
                //         console.log(e + ' open');
                //         ctc_setItem('col_' + e, 'open');
                //     },
                //     onCloseEnd() {
                //         console.log(e + ' close');
                //         ctc_setItem('col_' + e, 'close');
                //     }
                // });

                /**
                 * position update. on change.
                 */
                function position_update() {

                    console.log('position_update');

                    var top_bottom = $('.ctc_demo_position').val();
                    console.log(top_bottom);
                    var top_bottom_unset = ('top' == top_bottom) ? 'bottom' : 'top';
                    console.log(top_bottom_unset);

                    var left_right = $('.position_right_left').val();
                    console.log(left_right);
                    var left_right_unset = ('left' == left_right) ? 'right' : 'left';
                    console.log(left_right_unset);

                    var regex = /^\d+$/;
                    var left_right_value = $('.position_right_left_value').val();

                    // if blank add 20px
                    if ('' == left_right_value) {
                        left_right_value = '0px';
                    } else if (regex.test(left_right_value)) {
                        // if is init then add suffix px
                        console.log('integer..');
                        left_right_value = left_right_value + 'px';
                    }
                    console.log(left_right_value);

                    var bottom_top_value = $('.position_bottom_top_value').val();

                    if ('' == bottom_top_value) {
                        bottom_top_value = '0px';
                    } else if (regex.test(bottom_top_value)) {
                        // if is int then add suffix px
                        console.log('integer..');
                        bottom_top_value = bottom_top_value + 'px';
                    }
                    console.log(bottom_top_value);

                    var position_css = {
                        [top_bottom]: bottom_top_value,
                        [left_right]: left_right_value,
                        [top_bottom_unset]: 'unset',
                        [left_right_unset]: 'unset',
                    };

                    $('.ctc_demo_load').css(position_css);

                    update_call_to_action_order();

                    main_page_update();
                    hide_bottom_right_descriptions();

                    // when position is updated. remove menu links at demo. (to not over write the position))  
                    $('.ctc_menu_at_demo .ctc_ad_page_link').remove();

                    /**
                     * this is for show and hide demo links at bottom right. when position is updated this not working properly.
                     */
                    // $('.ctc_ad_links').show();
                    // $('.ctc_ad_hide_demo').show();
                    // showHideDemo();


                }

                /**
                 * call to action position..
                 */
                function update_call_to_action_order() {
                    console.log('update_call_to_action_order()');

                    var left_right = $('.position_right_left').val();
                    console.log(left_right);

                    // if left then order 1 else 0

                    // s2
                    if ('left' == left_right) {
                        $('.ctc_s_2 .ctc_cta').css('order', '1');
                        $('.ctc_s_3 .ctc_cta').css('order', '1');
                        $('.ctc_s_3_1 .ctc_cta').css('order', '1');
                        $('.ctc_s_7 .ctc_cta').css('order', '1');

                        // s5
                        $('.ctc_s_5 .s5_content ').css('order', '1');
                        // remove class name right and add left
                        $('.ctc_s_5 .s5_content ').removeClass('right').addClass('left');

                        // s7_1
                        $('.ctc_s_7_1 .ctc_cta').css({ 'order': '1', 'padding-left': '0px', 'padding-right': '21px' });

                    } else {
                        $('.ctc_s_2 .ctc_cta').css('order', '0');
                        $('.ctc_s_3 .ctc_cta').css('order', '0');
                        $('.ctc_s_3_1 .ctc_cta').css('order', '0');
                        $('.ctc_s_7 .ctc_cta').css('order', '0');

                        // s5
                        $('.ctc_s_5 .s5_content').css('order', '0');
                        // remove class name left and add right
                        $('.ctc_s_5 .s5_content ').removeClass('left').addClass('right');

                        $('.ctc_s_7_1 .ctc_cta').css({ 'order':'0', 'padding-left': '21px', 'padding-right': '0px' });
                    }

                }


            }


            /**
             * page: other settings
             *  animations
             *  notification badge
             */
            if ($('body').hasClass('click-to-chat_page_click-to-chat-other-settings')) {
                // console.log('click-to-chat_page_click-to-chat-other-settings');

                
                $('.ctc_ad_page_link').remove();
                $('.ctc_ad_links').css('margin', '0 50px').show();

                // display style by default.
                $('.ctc_demo_style').show();

                var an_class = '';
                var select_an_type = $('.select_an_type').val();

                $('.select_an_type').on("change", function (e) {
                    main_animation();
                });

                // animate demo - link clicked.
                $('.ctc_an_demo_btn').on("click", function (e) {
                    $('.ctc_demo_style').removeClass(an_class);
                    setTimeout(() => {
                        main_animation();
                    }, 100);
                });

                function main_animation() {
                    $('.ctc_demo_style').removeClass(an_class);
                    var val = $('.select_an_type').val();
                    an_class = 'ht_ctc_an_' + val;
                    $('.ctc_demo_style').addClass(an_class);

                    var get_an_delay = $('#an_delay').val();
                    var get_an_itr = $('#an_itr').val();


                    var an_delay = (get_an_delay) ? get_an_delay + 's' : '0';
                    var an_itr = (get_an_itr) ? get_an_itr : '1';


                    var an_css = {
                        'animation-delay': an_delay,
                        'animation-iteration-count': an_itr,
                    }
                    $('.ctc_demo_style.ht_ctc_animation').css(an_css);

                    // animated demo button
                    if ('no-animation' == val) {
                        $('.ctc_an_demo_btn').hide();
                    } else {
                        $('.ctc_an_demo_btn').show();
                    }

                }

                // entry effects
                var ee = '';
                var select_an_type = $('.select_an_type').val();

                $('.show_effect').on("change", function (e) {
                    entry_effects();
                });

                // entry effect demo - link clicked.
                $('.ctc_ee_demo_btn').on("click", function (e) {
                    $('.ctc_demo_style').removeClass(ee);
                    setTimeout(() => {
                        entry_effects();
                    }, 100);
                });

                function entry_effects() {
                    $('.ctc_demo_style').removeClass(an_class);
                    $('.ctc_demo_style').removeClass(ee);

                    var an_css = {
                        'animation-delay': 'unset',
                        'animation-iteration-count': 'unset',
                    }
                    $('.ctc_demo_style.ht_ctc_animation').css(an_css);

                    $('.ctc_demo_style').hide();
                    var val = $('.show_effect').val();

                    if ('From Center' == val) {
                        ee = 'ht_ctc_an_entry_center';
                        $('.ctc_demo_style').addClass(ee);
                        $('.ctc_demo_style').show();
                    } else if ('From Corner' == val) {
                        setTimeout(() => {
                            $('.ctc_demo_style').show(180);
                        }, 100);
                    }

                    // entry effect demo button
                    if ('no-show-effects' == val) {
                        $('.ctc_demo_style').show();
                        $('.ctc_ee_demo_btn').hide();
                    } else {
                        $('.ctc_ee_demo_btn').show();
                    }
                }


                // notification badge
                var is_nb = '';
                if ($('.notification_badge').is(':checked')) {
                    is_nb = 'yes';

                    var time = $('.field_notification_time').val();
                    console.log(time);
                    time = (time && '' != time) ? time : 0;
                    setTimeout(() => {
                        n_b();
                        n_b_position();
                    }, time * 1000);
                }

                $('.notification_badge').on("change", function (e) {
                    n_b();
                    n_b_position();
                    n_b_border();
                });

                $('.notification_border_color_field .wp-picker-container').on("click", function (e) {
                    console.log('notification_border_color_field');
                    n_b_border();
                });

                function n_b() {
                    console.log('on change n_b');
                    // display notification badge
                    if ($('.notification_badge').is(':checked')) {
                        is_nb = 'yes';
                        $('.ctc_ad_notification').show();

                        var bg_color = $('.field_notification_bg_color').val();
                        console.log(bg_color);
                        $('.ctc_ad_badge').css('background-color', bg_color);

                        var text_color = $('.field_notification_text_color').val();
                        // console.log(text_color);
                        $('.ctc_ad_badge').css('color', text_color);
                    } else {
                        is_nb = 'no';
                        $('.ctc_ad_notification').hide();
                    }
                }

                function n_b_border() {
                    var border_color = $('.field_notification_border_color').val();
                    // console.log(border_color);
                    if ('' !== border_color) {
                        border = '2px solid ' + border_color;
                    } else {
                        border = 'none';
                    }
                    $('.ctc_ad_badge').css('border', border);
                }

                // notification badge position specific to each style
                function n_b_position() {
                    console.log('n_b_position');
                    if (document.querySelector('.ctc_nb')) {
                        console.log('overwrite top, right');
                        // get parent of badge and then get top, right with in that element. (to avoid conflict with other styles if added using shortcode or so...)
                        var main = $('.ctc_ad_badge').closest('.ctc_demo_style');

                        $('.ctc_ad_badge').css({
                            // overwrite top, right. if undefined or false then use default(as it can't overwrite at broswer).
                            "top": $(main).find('.ctc_nb').attr('data-nb_top'),
                            "right": $(main).find('.ctc_nb').attr('data-nb_right')
                        });
                    }
                }


                // notification_bg_color   field_notification_bg_color
                // mousemove, change, input, keyup
                $(document).on('change, input, keyup', '.field_notification_bg_color, .field_notification_text_color, .field_notification_border_color', function () {
                    console.log('color value changed..');
                    n_b();
                });

                // on change color picker: handle by color picker on change

                // notification count
                $('.field_notification_count').on('input', function () {
                    var count = $(this).val();
                    $('.ctc_ad_badge').text(count);
                });

                // time delay
                var timeoutId;
                $('.field_notification_time').on('change', function () {
                    $('.ctc_ad_notification').hide();
                    clearTimeout(timeoutId);
                    var time = $(this).val();
                    time = (time && '' != time) ? time : 0;
                    timeoutId = setTimeout(() => {
                        if ('yes' == is_nb) {
                            console.log(time);
                            $('.ctc_ad_notification').show();
                        }
                    }, time * 1000);
                });

            }
            // #end other settings

            /**
             * page: customize styles
             */
            if ($('body').hasClass('click-to-chat_page_click-to-chat-customize-styles')) {
                console.log('customize styles');

                $('.ctc_ad_page_link').remove();
                $('.ctc_ad_links').css('margin', '0 50px');

                // display style based on editing area (work super. expect one issue - if directly clicked on color picker the style is not changing/displaying. fix: wp-picker-container click event added below)
                $('.ht_ctc_customize_style').on('click', function () {
                    // console.log('customize_style clicked');
                    // get data-style='1' from clicked element
                    var style = $(this).attr('data-style');
                    // console.log(style);
                    $('.ctc_demo_style_' + style + '').show();
                    $('.ctc_demo_style').not('.ctc_demo_style_' + style + '').hide();
                    $('.ctc_ad_links').show();
                });

                // click on wp-picker-container - find closest ht_ctc_customize_style and display that style
                $('.wp-picker-container').on('click', function () {
                    var x = $(this).closest('.ht_ctc_customize_style');
                    var style = $(x).attr('data-style');
                    if (style) {
                        $('.ctc_demo_style_' + style + '').show();
                        $('.ctc_demo_style').not('.ctc_demo_style_' + style + '').hide();
                    }
                });


                // on hover..

                // // s7_1:hover
                // $('.ctc_s_7_1').hover(function () {
                //     console.log('hover');
                // }, function () {
                //     console.log('hover out');
                // });

                // s3_1:hover
                $('.ctc_s_3_1').hover(function () {
                    console.log('hover');
                    console.log($('#s3_1_bg_color_hover').val());
                    $('.ctc_s_3_1 .ht_ctc_padding').css('background-color', $('#s3_1_bg_color_hover').val());
                    // s3_box_shadow_hover
                    if (!$('#s3_box_shadow').is(':checked') && $('#s3_box_shadow_hover').is(':checked')) {
                        console.log('hover only checked');
                        $('.ctc_s_3_1 .ht_ctc_padding').css('box-shadow', '0px 0px 11px rgba(0,0,0,.5)');
                    }
                }, function () {
                    console.log('hover out');
                    console.log($('#s3_1_bg_color').val());
                    $('.ctc_s_3_1 .ht_ctc_padding').css('background-color', $('#s3_1_bg_color').val());

                    if (!$('#s3_box_shadow').is(':checked') && $('#s3_box_shadow_hover').is(':checked')) {
                        console.log('hover only checked');
                        $('.ctc_s_3_1 .ht_ctc_padding').css('box-shadow', 'unset');
                    }
                });

                // s3_1: shadow (not ok at admin demo. so commented)
                $('#s3_box_shadow').on('change', function (e) {
                    console.log('s3_box_shadow');
                    if ($('#s3_box_shadow').is(':checked')) {
                        console.log('checked');
                        // $(".s3_box_shadow_hover").hide(400);
                        $('.ctc_s_3_1 .ht_ctc_padding').css('box-shadow', '0px 0px 11px rgba(0,0,0,.5)');
                    } else {
                        console.log('unchecked');
                        $('.ctc_s_3_1 .ht_ctc_padding').css('box-shadow', 'unset');
                        // $(".s3_box_shadow_hover").show(500);
                    }
                });

                // s4: image position
                $('.s4_img_position').on('change', function (e) {
                    console.log('s4_image_position');
                    // if slelected left
                    var s4_img_position = $(this).val();
                    console.log(s4_img_position);
                    if ('left' == s4_img_position) {
                        $('.ctc_s_4 .s4_img').css('margin', '0 8px 0 -12px');
                        $('.ctc_s_4 .s4_img').css('order', '0');
                    } else if ('right' == s4_img_position) {
                        $('.ctc_s_4 .s4_img').css('margin', '0 -12px 0 8px');
                        $('.ctc_s_4 .s4_img').css('order', '1');
                    }
                });


                // s6:hover
               
                $('.ctc_s_6').hover(function () {
                    console.log('hover');
                    console.log($('#s6_txt_color_on_hover').val());
                    console.log($('#s6_txt_decoration_on_hover').val());

                    $('.ctc_s_6').css({
                        'color': $('#s6_txt_color_on_hover').val(),
                        'text-decoration': $('#s6_txt_decoration_on_hover').find(":selected").val()
                    });
                }, function () {
                    console.log('hover out');
                    $('.ctc_s_6').css({
                        'color': $('#s6_txt_color').val(),
                        'text-decoration': $('#s6_txt_decoration').find(":selected").val()
                    });
                });


                // s7:hover
                $('.ctc_s_7').hover(function () {
                    console.log('hover');
                    console.log($('#s7_icon_color_hover').val());
                    console.log($('#s7_bgcolor_hover').val());

                    $('.ctc_s_7 svg path').css('fill', $('#s7_icon_color_hover').val());
                    $('.ctc_s_7 .ctc_s_7_icon_padding').css('background-color', $('#s7_border_color_hover').val());
                }, function () {
                    console.log('hover out');
                    $('.ctc_s_7 svg path').css('fill', $('#s7_icon_color').val());
                    $('.ctc_s_7 .ctc_s_7_icon_padding').css('background-color', $('#s7_border_color').val());
                });


                // s7_1:hover
                $('.ctc_s_7_1').hover(function () {
                    console.log('hover');
                    console.log($('#s7_1_icon_color_hover').val());
                    console.log($('#s7_1_bgcolor_hover').val());

                    // 
                    $('.ctc_s_7_1 svg path').css('fill', $('#s7_1_icon_color_hover').val());
                    $('.ctc_s_7_1 .ctc_s_7_1_cta').css('color', $('#s7_1_icon_color_hover').val());
                    $('.ctc_s_7_1').css('background-color', $('#s7_1_bgcolor_hover').val());
                    $('.ctc_s_7_1 .ctc_s_7_icon_padding').css('background-color', $('#s7_1_bgcolor_hover').val());
                }, function () {
                    console.log('hover out');
                    console.log($('#s7_1_icon_color').val());
                    console.log($('#s7_1_bgcolor').val());
                    $('.ctc_s_7_1 svg path').css('fill', $('#s7_1_icon_color').val());
                    $('.ctc_s_7_1 .ctc_s_7_1_cta').css('color', $('#s7_1_icon_color').val());
                    $('.ctc_s_7_1').css('background-color', $('#s7_1_bgcolor').val());
                    $('.ctc_s_7_1 .ctc_s_7_icon_padding').css('background-color', $('#s7_1_bgcolor').val());
                });



                // s8:hover
                $('.ctc_s_8').hover(function () {
                    console.log('hover');
                    console.log($('#s8_bg_color_on_hover').val());
                    console.log($('#s8_txt_color').val());

                    $('.ctc_s_8 .s_8').css({
                        "background-color": $('#s8_bg_color_on_hover').val(),
                    });
                    $('.ctc_s_8 .s8_span').css('color', $('#s8_txt_color_on_hover').val());
                    $('.ctc_s_8 svg path').css('fill', $('#s8_icon_color_on_hover').val());
                }, function () {
                    console.log('hover out');
                    console.log($('#s8_bg_color').val());
                    console.log($('#s8_txt_color_on_hover').val());

                    $('.ctc_s_8 .s_8').css({
                        "background-color": $('#s8_bg_color').val(),
                    });
                    $('.ctc_s_8 .s8_span').css('color', $('#s8_txt_color').val());
                    $('.ctc_s_8 svg path').css('fill', $('#s8_icon_color').val());
                });



                /**
                 * on chnage, 
                 */
                $(".ctc_oninput").on("change paste keyup", function (e) {
                    console.log('on change');

                    // check if element have data-update attribute
                    var update_type = $(this).attr('data-update-type'); // height, ..
                    console.log(update_type);

                    hide_bottom_right_descriptions();

                    var update_value = $(this).val(); // the value to update
                    console.log(update_value);

                    var update_class = $(this).attr('data-update-selector'); // the element to update
                    console.log(update_class);

                    if (update_type && update_class) {
                        console.log('update');
                        
                        if ('text' == update_type) {
                            // if update type is text
                            console.log('update text');
                            $(update_class).text(update_value);
                        } else if ('cta' == update_type) {
                            // call to action
                            console.log('update cta');

                            // parent with class name: ctc_demo_style 
                            var update_class_parent = $(update_class).closest('.ctc_demo_style');
                            console.log(update_class_parent);

                            if ('show' == update_value) {
                                // if update_value is show
                                console.log('show');
                                $(update_class).show();
                                $(update_class).removeClass('ht-ctc-cta-hover');
                                $(update_class_parent).removeAttr('title');
                            } else if ('hide' == update_value) {
                                // hide
                                console.log('hide');
                                $(update_class).hide();
                                $(update_class).removeClass('ht-ctc-cta-hover');
                                $(update_class_parent).attr('title', 'Call to action');
                            } else if ('hover' == update_value) {
                                // hover: add class: ht-ctc-cta-hover
                                console.log('hover');
                                $(update_class).hide();
                                $(update_class).addClass('ht-ctc-cta-hover');
                                $(update_class_parent).removeAttr('title');
                            }
                        } else {
                            $(update_class).css(update_type, update_value);

                            // if data-update-type-2
                            var update_type_2 = $(this).attr('data-update-type-2'); // height, ..
                            console.log(update_type_2);

                            if (update_type_2) {
                                console.log('update 2');
                                $(update_class).css(update_type_2, update_value);
                            }
                        }

                    }

                });

            }
            // #end customize styles



            /**
             * Gretings page
             */
            if ($('body').hasClass('click-to-chat_page_click-to-chat-greetings')) {

                console.log('click-to-chat_page_click-to-chat-greetings');

                // display style by default.
                $('.ctc_demo_style').show();

                // if tinyMCE is not defined then return.
                if (typeof tinyMCE === 'undefined') {
                    console.log('tinyMCE is not defined');
                    return;
                }

                // get selected greeting dialog
                var greetings_template = $('.pr_greetings_template select').find(":selected").val();
                console.log('greetings_template: ' + greetings_template);

                // if not 'no' then display that greetings
                if ('no' == greetings_template) {
                    $('.ctc_demo_greetings').hide();
                } else {
                    display_greetings();
                }



                // initial update.. to avoid displaying code blocks at greetings content.
                update_greetings_content();

                // setintervie .. to call_update_greetings_content() every 200ms if tinyMCE.get('header_content').getContent()
                var intervalId_limit = 0;
                var intervalId = setInterval(() => {
                    console.log('intervalId_limit: ' + intervalId_limit);
                    if (tinyMCE.get('header_content').getContent() || intervalId_limit > 20 ) {
                        update_greetings_content();
                        clearInterval(intervalId);
                    }
                    intervalId_limit++;
                }, 200);


                console.log('-------------------------------------------');
                console.log(tinyMCE);
                console.log(tinyMCE.activeEditor);
                console.log(tinyMCE.get('main_content').getContent());
                console.log(tinyMCE.get('opt_in').getContent());
                console.log(tinyMCE.activeEditor.getContent());
                console.log(tinyMCE.activeEditor.getContent());

                // // if any of tinyMCE editor is changed then update the content.
                // tinyMCE.activeEditor.on('change', function (e) {
                //     console.log('change');
                //     console.log(e);
                //     console.log(tinyMCE.activeEditor.getContent());
                // });

                try {
                    for (var i = 0; i < tinyMCE.editors.length; i++) {
                        var editor = tinyMCE.editors[i];
                        console.log(editor.id);

                        // on change
                        editor.on('change paste keyup', function (e) {
                            console.log('tinyMCE editor on change');
                            update_greetings_content();
                        });
                    }
                } catch (e) {
                    console.log('cache: mightbe no tinyMCE editor');
                }

               /**
                 * Update content in the greetings demo 
                 *
                 * HEADER SECTION:
                 * - Parent: .ctc_g_heading
                 * - Content: .ctc_g_header_content
                 * - Image: .ctc_g_header_content_image
                 *
                 * MAIN CONTENT SECTION:
                 * - Parent: .ctc_g_content
                 * - Message Box: .ctc_g_message_box
                 *
                 * BOTTOM CONTENT SECTION:
                 * - Parent: .ctc_g_bottom
                 *
                 * OPT-IN SECTION:
                 * - Parent: .ctc_opt_in
                 * - Label: .ctc_opt_in label
                 */
                function update_greetings_content() {

                    console.log('update_greetings_content');

                    try {
                        var header_content = tinyMCE.get('header_content').getContent();
                        console.log('header_content: ' + header_content);
                        var header_content_image = $('.greetings_header_image img').attr('src');
                        console.log('header_content_image: ' + header_content_image);
                        var main_content = tinyMCE.get('main_content').getContent();
                        console.log('main_content: ' + main_content);
                        var bottom_content = tinyMCE.get('bottom_content').getContent();
                        console.log('bottom_content: ' + bottom_content);
                        // var opt_in = tinyMCE.get('opt_in').getContent();
                        // console.log('opt_in: ' + opt_in);

                        // g1
                        // $('.ctc_g_header_content').html(header_content);
                        // $('.ctc_g_message_box').html(main_content);
                        // $('.ctc_g_bottom').html(bottom_content);
                        // $('.ctc_opt_in label').html(opt_in);


                        // Show/hide header section
                        if (header_content || header_content_image) {
                            console.log('header_content or header_content_image is set');
                            console.log('header_content: ' + header_content);
                            console.log('header_content_image: ' + header_content_image);

                            $('.ctc_g_heading').show();

                            if (header_content_image) {
                                console.log('header_content_image is set');
                                $('.ctc_g_header_content_image').attr('src', header_content_image).show();
                            } else {
                                console.log('header_content_image is not set');
                                $('.ctc_g_header_content_image').hide();
                            }

                            if (header_content) {
                                console.log('header_content is set');
                                $('.ctc_g_header_content').html(header_content).show();
                            } else {
                                console.log('header_content is not set');
                                $('.ctc_g_header_content').hide();
                            }
                            // $('.ctc_g_heading').show().find('.ctc_g_header_content').html(header_content);
                        } else {
                            console.log('no header_content, no header_content_image');
                            $('.ctc_g_heading').hide();
                        }

                        // $('.ctc_g_message_box').html(main_content);
                        if (main_content) {
                            $('.ctc_g_content').show();
                            $('.ctc_g_message_box').html(main_content).show();
                        } else {
                            $('.ctc_g_message_box').hide();
                            $('.ctc_g_content').hide();
                        }
                        // $('.ctc_g_bottom').html(bottom_content);
                        if (bottom_content) {
                            $('.ctc_g_bottom').html(bottom_content).show();
                        } else {
                            $('.ctc_g_bottom').hide();
                        }
                        // $('.ctc_opt_in label').html(opt_in);
                        // if (opt_in) {
                        //     $('.ctc_opt_in').show();
                        //     $('.ctc_opt_in label').html(opt_in);
                        // } else {
                        //     $('.ctc_opt_in').hide();
                        // }
                        
                    } catch (e) {
                        console.log('cache: no tinyMCE editor');
                    }
                }

                // greetings header image
                function greetings_header_image() {

                    console.log('greetings_header_image');

                    $('.ctc_remove_image_wp').on('click', function () {
                        console.log('remove image');
                        const headerImageContainer = $('.greetings_header_image');
                        if (headerImageContainer.is(':visible')) {
                            // Hide the container without removing its content
                            headerImageContainer.css('display', 'none');
                            console.log('Header image container hidden');
                            //  .greetings_header_image img src to blank
                            $('.greetings_header_image img').attr('src', '');
                            update_greetings_content();
                        } else {
                            console.log('Header image container is already hidden');
                        }
                        console.log('headerImageContainer: ', headerImageContainer);
                    });

                    // custom event listner 'ht_ctc_event_greetings_header_image' .. call header_image_badge
                    document.addEventListener("ht_ctc_event_greetings_header_image", function (e) {
                        console.log('ht_ctc_event_greetings_header_image');
                        console.log(e.detail);
                        console.log(e);
                        header_image_badge(e.detail);
                    });


                    // Optional: Function to handle additional actions like adding a badge
                    function header_image_badge(imageUrl) {
                        console.log('header_image_badge(): ' + imageUrl);
                        
                        const headerImageContainer = $('.greetings_header_image');
                        console.log(headerImageContainer);
                        
                        // Add the image to a container as a badge or decorative element
                        // headerImageContainer.html(`<img src="${imageUrl}" alt="Header Image" style="max-width: 100%; height: 100%; border-radius:50%;">`).show();

                        // add src to the image tag inside the container
                        $('.greetings_header_image img').attr('src', imageUrl);
                        update_greetings_content();
                        // Show the container
                        headerImageContainer.show();


                        console.log('Image added to header container:', imageUrl);
                    }

                    // Greetings call to action update
                    $('input[name="ht_ctc_greetings_options[call_to_action]"]').on('input', function() {
                        console.log('input change');
                        console.log($(this).val());
                        // Get the updated value from the input field
                        var cta = $(this).val();    
                        // Update the button text inside '.ctc_demo_style .ctc_cta'
                        $('.ctc_demo_style .ctc_g_sentbutton .ctc_cta').text(cta);
                    });

                }
                greetings_header_image();

                /**
                * display greetings based on size selection by onchage function
                * display_greetings_size dinamically by the selected s, m, l
                * 
                */
                function changeGreetingsSize() {
                    console.log('changeGreetingsSize');
                    var gSize = $('.pr_g_size select').val();
                    console.log('gSize: ', gSize);
                    let minWidth = '330px'; // Ensure a default value

                    if (gSize == 's') {
                        minWidth = '300px';
                    } else if (gSize == 'm') {
                        minWidth = '330px';
                    } else if (gSize == 'l') {
                        minWidth = '360px';
                    }

                    $('.ht_ctc_chat_greetings_box').css({ 'min-width': minWidth }).show();
                    console.log('greetings size changed:', gSize);
                    console.log('min-width:', minWidth);
                }

                // on change - greetings size
                $('.pr_g_size select').on('change', changeGreetingsSize);
                

                function display_greetings() {
                    console.log('display_greetings');
                    
                    greetings_template = $('.pr_greetings_template select').find(":selected").val();
                    console.log(greetings_template);

                    // hide all greetings
                    $('.ctc_demo_greetings').hide();

                    var g_class = 'ctc_demo_greetings_' + greetings_template;
                    console.log('g_class: ' + g_class);
                    $('.ctc_cta_stick').remove();

                    // if g_class exists then display that greetings
                    if ($('.' + g_class).length) {
                    // display that greetings
                        $('.' + g_class).show();
                    }
                }

                // on change - greetings template
                $('.pr_greetings_template select').on('change', function () {
                    console.log('greetings dialog on change');
                    // greetings_template = $(this).val();
                    // console.log(greetings_template);
                    display_greetings();
                });


                $('.ctc_ad_page_link').remove();
                $('.ctc_ad_links').css('margin', '0 50px').show();


                function greetings_close() {
                    console.log('Greetings closed:');
                    $('.ht_ctc_chat_greetings_box').hide('slow');
                }
    
                function greetings_close_500() {
                    setTimeout(() => {
                        greetings_close('chat_clicked');
                    }, 500);
                }
                
                function greetings_open() {
                    console.log('Greetings opened:');
                    $('.ht_ctc_chat_greetings_box').show('slow'); 
                }
                
                // Check if the greetings box exists
                if ($('.ht_ctc_chat_greetings_box').length) {
                
                    // Toggle the greetings dialog
                    $(document).on('click', '.ht_ctc_chat_style ', function () {
                        const greetingsBox = $('.ht_ctc_chat_greetings_box');
                        if (greetingsBox.is(':visible')) {
                            greetings_close();
                        } else {
                            greetings_open();
                        }
                    });   

                    // Close button - greetings dialog
                    $(document).on('click', '.ctc_greetings_close_btn', function () {
                        greetings_close(); 
                    });
                }

                function demo_online_badge() {
                    if ($('.g_header_online_status').is(':checked')) {
                        console.log('g_header_online_status checked');
                        $('.for_greetings_header_image_badge').addClass('g_header_badge_online').show();
                    } else {
                        console.log('g_header_online_status unchecked');
                        $('.for_greetings_header_image_badge').removeClass('g_header_badge_online').hide();
                    }
                }
                demo_online_badge();

                // Bind the function to the checkbox change event
                $(document).on('change', '.g_header_online_status', function () {
                    demo_online_badge();
                });

                $(document).on('click', '.ht_ctc_chat_greetings_box_link', function (e) {
                    console.log('ht_ctc_chat_greetings_box_link');
                    e.preventDefault();

                    ht_ctc_link();
                    greetings_close_500();
                    /*
                     / workout that if user clicks optin once it want to save in db(local storage) and dont show again and again.. 
                     / once optin settings are changed the optin details in local storage need to reset..
                    */

                    //  if (document.querySelector('#ctc_opt')) {
    
                    //     if ($('#ctc_opt').is(':checked')) {
                    //         console.log('optin - checkbox checked');
                    //         ht_ctc_link();
                    //         // close greetings dialog
                    //         greetings_open();
                    //     } else {
                    //         console.log('animate option checkbox');
                    //         $('.ctc_opt_in').show().fadeOut('1').fadeIn('1');
                    //     }
                    // } else {
                    //     ht_ctc_link();
                    //     greetings_close_500();
                    // }
                    // document.dispatchEvent(
                    //     new CustomEvent("ht_ctc_event_greetings")
                    // );

                });

                
                // Automatically handle opt-in when checkbox is clicked
    
                $(document).on('change', '#ctc_opt', function () {
    
                    if ($(this).is(':checked')) {
    
                        console.log('Checkbox checked - automatic opt-in');
    
                        ht_ctc_link();
    
                        greetings_close();
    
                    }
    
                });
    

            }
            // #end greetings page

            /**
             * no live demo
             */
            var no_demo_timeoutId;
            $(".ctc_no_demo").on("change paste keyup", function() {
                console.log('no live demo for this...');
                hide_bottom_right_descriptions();
                clearTimeout(no_demo_timeoutId);

                // Show notice and auto-hide after 5 seconds
                $('.ctc_no_demo_notice').hide().fadeIn(500);
                no_demo_timeoutId = setTimeout(() => {
                    $('.ctc_no_demo_notice').hide(120);
                    $('.ctc_ad_links').show(120);
                }, 5000);
            });


            

            // ctc_demo_messages
            function ctc_demo_messages(m = '') {
                
                var demo_notice_timeoutId;

                console.log('ctc_demo_messages...');
                console.log(m);

                clearTimeout(demo_notice_timeoutId);

                $('.ctc_ad_links').hide();
                $('.ctc_demo_messages').html(m);

                // ctc_demo_messages
                $('.ctc_demo_messages').hide().fadeIn(500);

                demo_notice_timeoutId = setTimeout(() => {
                    $('.ctc_demo_messages').hide(120);
                        $('.ctc_ad_links').show(120);
                }, 9000);
            }

            /**
             * hide notifications at bottom right. to avoid duplicate notifications.
             *  use to hide other notifications before display one.
             */
            function hide_bottom_right_descriptions() {
                $('.ctc_demo_messages').hide();
                $('.ctc_ad_links').hide();
                $('.ctc_no_demo_notice').hide();
            }

            // function default_position() {
            //     console.log('default_position');
            //     // default position
            //     $('.ctc_demo_load').css({
            //         "top": "unset",
            //         "left": "unset",
            //         "bottom": "50px",
            //         "right": "50px"
            //     });
            // }

            // cta hover effects
            $(".ctc_demo_style").hover(function () {
                // $('.ctc_demo_style .ht-ctc-cta-hover').show(120);
                $(this).find('.ht-ctc-cta-hover').show(120);
            }, function () {
                $('.ctc_demo_style .ht-ctc-cta-hover').hide(100);
                // $(this).find('.ht-ctc-cta-hover').hide(100);
            });

            function showHideDemo() {
                const showDemoButton = $('.ctc_ad_show_demo');
                const hideDemoButton = $('.ctc_ad_hide_demo');
                const demoLoadSection = $('.ctc_demo_load');
                const pageLinks = $('.ctc_ad_page_link');

                // Show Demo functionality
                showDemoButton.on('click', function () {
                    console.log('Show demo');
                    demoLoadSection.show();
                    showDemoButton.hide();
                    hideDemoButton.show();
                    pageLinks.show();
                });

                // Hide Demo functionality
                hideDemoButton.on('click', function () {
                    console.log('Hide demo');
                    demoLoadSection.hide();
                    hideDemoButton.hide();
                    showDemoButton.show();
                    pageLinks.hide();
                });
            }
            showHideDemo();


        }
        display_styles();



    });
})(jQuery);