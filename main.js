$(document).ready(function () {
    $('.sales_navigation ul li:first-child').addClass('__has-current');
    $('[data-toggle="add-object-modal"]').click(function(){
        var object = "<table style='border-collapse: collapse'><thead><tr><td style='text-align: center;border: 1px solid;padding: 5px'>ЖК</td><td style='border: 1px solid;padding: 5px'>Корпус</td><td style='border: 1px solid;padding: 5px'>Тип квартиры</td><td style='border: 1px solid;padding: 5px'>Полная площадь</td><td style='border: 1px solid;padding: 5px'>Этаж</td><td style='border: 1px solid;padding: 5px'>Ссылка</td></tr></thead><tbody>";
        $('.search_obj .adaptive-table-tbody .adaptive-table-row').each(function(){
            object = object + "<tr><td style='border: 1px solid;padding: 5px'>"+$(this).find('.fav-name').text() + "</td><td style='border: 1px solid;padding: 5px'>" + $(this).find('.fav-korpus').text() + "</td><td style='border: 1px solid;padding: 5px'>" + $(this).find('.fav-room').text() + "</td><td style='border: 1px solid;padding: 5px'>" + $(this).find('.fav-area').text() + "</td><td style='border: 1px solid;padding: 5px'>" + $(this).find('.fav-floor').text() + "</td><td style='border: 1px solid;padding: 5px'><a href='//kvsspb.ru" + $(this).find('.fav-area').find('a').attr('href') + "'>Перейти</a></td></tr>";
        });
        object = object + "</tbody></table>";
        $('[name="form_hidden_55"]').val(object);
    });
    var yaninoMap_p;

    $("body").on("click", ".ar_t,.ar_b", function(e){
        e.preventDefault();

        var ajax_block = $(this).parents(".ajax-list");
        var ajax_data = "";

        if(ajax_block.length > 0){
            if($("#calculate-filter").length > 0){
                ajax_data += $("#calculate-filter").serialize();
            }
            if(ajax_data != ""){
                ajax_data += "&";
            }
            ajax_data += "SORT_FIELD=" + $(this).data("sort-field");
            ajax_data += "&SORT_ORDER=" + $(this).data("sort-order");
            ajax_data += "&AJAX=Y";

            var isSearchPage = $(this).parents('.js-sort-rows').hasClass('search-res');

            // Для сортировки на странице результатов поиска с главной, вешаем отдельную куку

            if (!isSearchPage) {
                document.cookie = 'SORT_FIELD=' + $(this).data("sort-field") + '; path=/; expires=0;';
                document.cookie = 'SORT_ORDER=' + $(this).data("sort-order") + '; path=/; expires=0;';
            } else {
                document.cookie = 'SORT_FIELD_SEARCH=' + $(this).data("sort-field") + '; path=/; expires=0;';
                document.cookie = 'SORT_ORDER_SEARCH=' + $(this).data("sort-order") + '; path=/; expires=0;';
            }
            $.ajax({
                url: "",
                method: 'post',
                data: ajax_data,
                dataType: 'text',
                success: function(answer){
                    ajax_block.html(answer);
                    hideArrows();
                },
                error: function(a, b){
                    console.log(a);
                    console.log(b);
                }
            });
        }

    });

    $("body").on("change", ".js-mobile-sort", function(){
        var ajax_block = $(this).parents(".ajax-list");
        var ajax_data = "";

        if(ajax_block.length > 0){
            ajax_data += "SORT_FIELD=" + $(this).find("option:selected").data("sort-field");
            ajax_data += "&SORT_ORDER=" + $(this).val();
            ajax_data += "&AJAX=Y";
            $.ajax({
                url: "",
                method: 'post',
                data: ajax_data,
                dataType: 'text',
                success: function(answer){
                    ajax_block.html(answer);
                    if($(".js-flat-table-select").length > 0){
                        var $flatTableFilter = $(".js-flat-table-select");
                        var $flatsTableSelectMenu = $("#flats-table-select-menu");
                        $flatTableFilter.selectmenu({
                            change: function(event, ui){
                                if($(".js-mobile-sort").length > 0){
                                    $(".js-mobile-sort").trigger("change");
                                }
                            },
                            create: function(event, ui){
                                $("#flats-table-select + span").wrap('<div class="kvs-select">');
                            }
                        });
                    }
                },
                error: function(a, b){
                    console.log(a);
                    console.log(b);
                }
            });
        }
    });
    
    if($(".spoiler_toggle").length > 0){
        $('.spoiler_toggle').on('click', function () {
            var par = $(this);
            if (par.parent().find('.detail').css('display') == 'none') {
                par.parent().find('.detail').show();
                par.html('<span class="link_hide_text">&nbsp;</span> СВЕРНУТЬ');
            } else {
                par.parent().find('.detail').hide();
                par.html('<span class="link_show_text">&nbsp;</span> УЗНАТЬ БОЛЬШЕ');
            }
        });
    }
    
    if($("#Map").length > 0){
        function Yaninoinit () {
            var yaninoRoute = new ymaps.multiRouter.MultiRoute({
                referencePoints: [
                    "60.067702, 30.334965",
                    "60.069455, 30.373711"
                ],
                params: {
                    results: 1
                }
            }, {
                boundsAutoApply: true
            });
            customizeYaninoPoint();

            function customizeYaninoPoint () {
                yaninoRoute.model.events.once("requestsuccess", function () {
                    var yandexWayPoint = yaninoRoute.getWayPoints().get(1);
                    // Создаем балун у метки второй точки.
                    ymaps.geoObject.addon.balloon.get(yandexWayPoint);
                    yandexWayPoint.options.set({
                        iconLayout: "default#image",
                        iconImageHref: "https://www.kvsspb.ru/images/logo.png",
                        iconImageSize: [40, 36],
                        iconImageOffset: [-44, -18]
                    });
                });
            }

            var yaninoMap = new ymaps.Map("Map", {
                center: [59.950667, 30.574733],
                zoom: 10,
                controls: ["zoomControl"]
            });

            yaninoMap.behaviors.disable('scrollZoom');

            yaninoMap.geoObjects.add(yaninoRoute);


            $(window).on('resize', function() {
                var windowWidth = $(window).width();
                if(windowWidth < 700) {
                    yaninoMap.behaviors.disable('drag');
                } else {
                    yaninoMap.behaviors.enable('drag');
                }
            });
        }
        ymaps.ready(Yaninoinit);
    }

    $(document).on('click', '[data-toggle="popup-open"]', function(){
        $($(this).attr('href')).show();
        yaninoMap_p.setZoom(15);
        return false;
    });
    $(document).on('click', '[data-toggle="popup-close"]', function(){
        $(this).parents('.custom-popup').hide();
        return false;
    });
    $('.js-header-find-apart-button').click(function(){
        $('.filter').addClass('open');
    });
    $('.js-header-find-apart-close').click(function(){
        $('.filter').removeClass('open');
    });
    if($("#map-popup").length > 0){
        function Yaninoinit_p () {
            var yaninoRoute_p = new ymaps.multiRouter.MultiRoute({
                referencePoints: [
                    "60.069455, 30.373711",
                    "60.067702, 30.334965"
                ],
                params: {
                    results: 1
                }
            }, {
                boundsAutoApply: true
            });
            customizeYaninoPoint();

            function customizeYaninoPoint () {
                yaninoRoute_p.model.events.once("requestsuccess", function () {
                    var yandexWayPoint = yaninoRoute_p.getWayPoints().get(0);
                    // Создаем балун у метки второй точки.
                    ymaps.geoObject.addon.balloon.get(yandexWayPoint);
                    yandexWayPoint.options.set({
                        iconLayout: "default#image",
                        iconImageHref: "https://www.kvsspb.ru/images/logo.png",
                        iconImageSize: [40, 36],
                        iconImageOffset: [-44, -18]
                    });
                });
            }

            yaninoMap_p = new ymaps.Map("map-popup", {
                center: [60.069455, 30.373711],
                zoom: 16,
                controls: ["zoomControl"]
            });

            yaninoMap_p.geoObjects.add(yaninoRoute_p);
        }
        if(typeof ymaps !== 'undefined') {
            ymaps.ready(Yaninoinit_p);
        }
    }

    $(function () {
        var screenWidthRefresh = function() {
          return $('body').width();
        };
        $(window).scroll(function () {
            if(screenWidthRefresh() <= 1024) {
                if ($(this).scrollTop() > 100) {
                    $('[href="#top"]').fadeIn();
                } else {
                    $('[href="#top"]').fadeOut();
                }
            }
        });

        $(window).on('resize', function(){
            if(screenWidthRefresh() >= 1024) {
                $('[href="#top"]').css('display', 'block');
            }
        });
    });
    
    function phoneCheck(elem) {
        return elem.val().length != 16 || elem.val()[3] == '_' || elem.val()[4] == '_' || elem.val()[5] == '_' || elem.val()[7] == '_' || elem.val()[8] == '_' || elem.val()[9] == '_' || elem.val()[11] == '_' || elem.val()[12] == '_' || elem.val()[14] == '_' || elem.val()[15] == '_';
    }

    function decOfNum(number, titles) {
        cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    function commafy(val) {
        return String(val).split("").reverse().join("")
            .replace(/(.{3}\B)/g, "$1 ")
            .split("").reverse().join("");
    }

	if($("#slider").length > 0){
		$("#slider").owlCarousel({
			navigation: false, // Show next and prev buttons
			slideSpeed: 3000,
			pagination: true,
			singleItem: true,
			items: 1,
			itemsDesktop: false,
			itemsDesktopSmall: false,
			itemsTablet: false,
			itemsMobile: false,
			autoPlay: true
		});
	}

    $('ul li a[href="/otdel_ipotechnogo_soprovozhdeniya/"]').siblings().css('display', 'none');
    setTimeout(function () {
        $('.reload_box').fadeOut();
    }, 1500);
    $('.main_navigation ul a:contains("Объекты")').css('pointer-events', 'none');
    if (typeof min_dur == 'undefined') {
        min_pay = 0;
        min_dur = 0;
        first_price = 0;
        obj = '';
    }
    var price;
    bank_info = '';

    function popup() {
        $('.popup_link1').click(function () {
            bank_info = $(this).data();
            delete bank_info.magnificPopup;
            $.each(bank_info, function (index, elem) {
                $('#modal_zayavka li span#' + index).text(elem);
                $('input[name="phone"]').inputmask('+7(999)999-99-99');
            });
        });
        $('.popup_link1').magnificPopup({
            type: 'inline',
            preloader: false,
            focus: '#username'
        });
    }

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    var openedPopups = [];
    
    $("body").on("click", ".popup_link", function(e){
        e.preventDefault();

        var popup = $(this).attr("href");

         if(popup){
            // if($(".popup-bg").length == 0){
            //     $("body").append('<div class="popup-bg"></div>');
            // }
            // $(".popup-bg").css("height", $("body").height());

            var exist = false;
            for(var i = 0; i < openedPopups.length; i++){
                if( openedPopups[i] === popup ){
                    exist = true;
                    break;
                }
            }
            if( !exist ){
                openedPopups.push(popup);
            }

            if($(".popup-bg").length == 0){
                $('.popup-wrap').append('<div class="popup-bg"></div>');  
            }

            var body = $('html');
            body.css({'overflow': 'auto'});

            var beforePadding = body.outerWidth();
            body.css({'overflow': 'hidden'});

            var isPadding = body.outerWidth() - beforePadding;
            $('html').css({'padding-right': isPadding});

            var windowHeight = $(window).outerHeight();
            $(popup).parents('.popup-wrap').find('.popup-table-cell').css('height', windowHeight);
            $('body').attr('data-window-height', windowHeight);
            $(popup).parents('.popup-wrap').fadeIn(100);
        }

        if($(this).hasClass("js-is-callback")){
            ga('send', 'pageview',{
                'page': '/popup/callback/open',
                'title': 'Заявка на обратный звонок - открытие'
            });
            //window.yaCounterGlobal.reachGoal('popup_callback_open');
        }
        if($(this).hasClass("js-is-stock")){
            ga('send', 'pageview', {
                'page': '/popup/akcii/open',
                'title': 'Поп-ап Акция - открытие'
            });
        }
        if($(this).hasClass("js-is-profit")){
            ga('send', 'pageview',{
                'page': '/popup/vigoda/open',
                'title': 'Поп-ап Калькулятор выгоды - открытие'
            });
        }
        if($(this).hasClass("js-is-excursion")){
            ga('send', 'pageview', {
                'page': '/popup/yanino_sertolovo_exsurs/open',
                'title': 'Поп-ап Записаться на экскурсию - открытие'
            });
        }
        if($(this).hasClass("js-is-apartment_points")){
            ga('send', 'pageview', {
                'page': '/popup/flat_in_offset/open',
                'title': 'Поп-ап Квартира в зачет - открытие'
            });
        }
        if($(this).hasClass("js-is-loyalty_program")){
            ga('send', 'pageview', {
                'page': '/popup/programma_loyalnosti/open',
                'title': 'Поп-ап Программа лояльности - открытие'
            });
        }
    });

    if( window['BX'] && BX.addCustomEvent ){
        BX.addCustomEvent('onAjaxSuccess', function(){
            $(window).trigger('resize');
            $('html').trigger('BX:onAjaxSuccess');
        })
    }

    $('body').on('click', '.popup-bg', function(){
        $(this).parents('.popup-wrap').find('.popup_close').trigger('click');
    });
    
    $("body").on('click', '.popup_close', function (e) {
        e.preventDefault();
        var wrap = $(this).parents(".white-popup-block");
        $(".js-form-success").hide();
        $(".js-form-content").show();
        wrap.find(".haracteristik").show();
        wrap.find(".success_msg").remove();
         $('html').css({
            'padding-right' : '',
            'overflow': 'auto',
            'overflow-y': 'auto',
            'overflow-x': 'hidden'
            
        });
        wrap.parents('.popup-wrap').hide();
        //wrap.unwrap().unwrap().unwrap();
   
        $(".popup-bg").remove();
        wrap.find(".form-item-error").each(function(){
            $(this).remove();
        })
    });

    $("#spinner2").slider({
        range: true,
        min: 0,
        max: 500,
        values: [0, 500],
        slide: function (event, ui) {
            $("#min2").val(ui.values[0] + 'м²');
            $("#max2").val(ui.values[1] + 'м²');
        },
        stop: function (event, ui) {
            if (ui.values[0] == ui.values[1]) {
                ui.values[0] = ui.values[0] - 1;
            }
            input_change('spinner2');
        }
    });
    $("#min2").val($("#spinner2").slider("values", 0) + 'м²');
    $("#max2").val($("#spinner2").slider("values", 1) + 'м²');

    $("#spinner3").slider({
        range: true,
        min: 0,
        max: 5000000,
        values: [0, 5000000],
        slide: function (event, ui) {
            $("#min3").val(commafy(ui.values[0]) + '₽');
            $("#max3").val(commafy(ui.values[1]) + '₽');
        },
        stop: function (event, ui) {
            if (ui.values[0] == ui.values[1]) {
                ui.values[0] = ui.values[0] - 1;
            }
            input_change('spinner3');
        }
    });
    $("#min3").val(commafy($("#spinner3").slider("values", 0)) + '₽');
    $("#max3").val(commafy($("#spinner3").slider("values", 1)) + '₽');

    // $('.spinner input').change(function () {
    //     if ($(this).attr('id') != 'fl_room_begin' && $(this).attr('id') != 'fl_room_end') {
    //         input_change();
    //     }
    // });

    $(document).on('change', '#arFilter_53_MIN', function() {
        let value = $(this).val();
        let slider = $(this).closest('.box.spinner').find('.spinner-slider');

        value = parseInt(value);
        slider.slider( "values", 0 , value);
    });

    $(document).on('change', '#arFilter_53_MAX', function() {
        let value = $(this).val();
        let slider = $(this).closest('.box.spinner').find('.spinner-slider');

        value = parseInt(value);
        slider.slider( "values", 1 , value);
    });

    $(document).on('change', '#arFilter_46_MIN', function() {
        let value = $(this).val();
        let slider = $(this).closest('.box.spinner').find('.spinner-slider');

        value = parseInt(value);
        slider.slider( "values", 0 , value);
    });

    $(document).on('change', '#arFilter_46_MAX', function() {
        let value = $(this).val();
        let slider = $(this).closest('.box.spinner').find('.spinner-slider');

        value = parseInt(value);
        slider.slider( "values", 1 , value);
    });

    //--------------------------------main-----------------------------

    $(document).on('change', '#arrFilter_53_MIN', function() {
        let value = $(this).val();
        let slider = $(this).closest('.box.spinner').find('.spinner-slider');

        value = parseInt(value);
        slider.slider( "values", 0 , value);
    });

    $(document).on('change', '#arrFilter_53_MAX', function() {
        let value = $(this).val();
        let slider = $(this).closest('.box.spinner').find('.spinner-slider');

        value = parseInt(value);
        slider.slider( "values", 1 , value);
    });

    $(document).on('change', '#arrFilter_46_MIN', function() {
        let value = $(this).val();
        let slider = $(this).closest('.box.spinner').find('.spinner-slider');

        value = parseInt(value);
        slider.slider( "values", 0 , value);
    });

    $(document).on('change', '#arrFilter_46_MAX', function() {
        let value = $(this).val();
        let slider = $(this).closest('.box.spinner').find('.spinner-slider');

        value = parseInt(value);
        slider.slider( "values", 1 , value);
    });

    //Обновление количества элементов в избранном при загрузке страницы
    $.ajax({
        url: "/ajax/favorites.php",
        method: 'post',
        data: {},
        dataType: 'json',
        success: function(answer) {
            if(answer.COUNT > 0){
                $(".main_navigation .favorites .count").text(answer.COUNT);
                $(".main_navigation .favorites a").addClass("act");
                $(".main_navigation .favorites img").attr("src", "/bitrix/images/icons/fav-active.svg");
            }else{
                $(".main_navigation .favorites img").attr("src", "/bitrix/images/icons/fav.svg");
            }
        },
        error: function(a, b){
            console.log(a);
            console.log(b);
        }
    });

    $("body").on("click", ".favorite", function(e){
        e.preventDefault();
        $(this).toggleClass('act');
        var elem = $(this);
        
        $.ajax({
            url: "/ajax/favorites.php",
            method: 'post',
            data: {
                ACTION: "add-delete",
                ID: (elem.data("id") != undefined ? elem.data("id") : 0)
            },
            dataType: 'json',
            success: function(answer) {
                //console.log(answer);
                if(elem.hasClass("ajax")){
                    var ajax_block = elem.parents(".ajax-list");
                    if(ajax_block.length > 0){
                        $.ajax({
                            url: "",
                            method: 'post',
                            data: {
                                AJAX: "Y"
                            },
                            dataType: 'text',
                            success: function(_answer){
                                ajax_block.html(_answer);
                            },
                            error: function(a, b){
                                console.log(a);
                                console.log(b);
                            }
                        });
                    }
                }
                else{
                    if(answer.STATUS == "ADD"){
                        // Add to cart animation
                        $("#cart-animation").show();
                        var addtocartWidth = elem.innerWidth() / 2;
                        var addtocartHeight = elem.innerHeight() / 2;

                        var addtocartLeft = elem.offset().left + addtocartWidth;
                        var addtocartTop = elem.offset().top + addtocartHeight;

                        var buttonAreaWidth = $(".main_navigation .favorites").innerWidth() - 90;
                        var buttonAreaHeight = $(".main_navigation .favorites").innerHeight() - 90;

                        var buttonAreaLeft = $("[title='Избранное']").offset().left + buttonAreaWidth / 2 - $("#cart-animation").innerWidth() / 2;

                        var htmlMargin = $('html').css('margin-top')
                        var htmlMarginTrim = parseInt(htmlMargin);

                        if (htmlMargin !== 0) {
                            var buttonAreaTop = $(".main_navigation .favorites").offset().top + buttonAreaWidth / 2 - htmlMarginTrim - $("#cart-animation").innerHeight() / 2;
                        } else {
                            var buttonAreaTop = $(".main_navigation .favorites").offset().top + buttonAreaWidth / 2 - $("#cart-animation").innerHeight() / 2;

                        }

                        var path = {
                            start: {
                                x: addtocartLeft,
                                y: addtocartTop,
                                angle: 190.012,
                                length: 0.2
                            },
                            end: {
                                x: buttonAreaLeft + 82,
                                y: buttonAreaTop,
                                angle: 90.012,
                                length: 0.30
                            }
                        };

                        $('#cart-animation').animate(
                            {
                                path: new $.path.bezier(path)
                            },
                            1200,
                            function () {
                                $("#cart-animation").fadeOut(500);
                                $(".main_navigation .favorites").toggleClass('act');
                            }
                        );
                    }
                    elem.attr("data-title", answer.TITLE);
                }

                if(answer.COUNT == 0){
                    $(".main_navigation .favorites .count").text("");
                    $(".main_navigation .favorites img").attr("src", "/bitrix/images/icons/fav.svg");
                    $(".main_navigation .favorites a").removeClass("act");
                }
                else if(!$(".main_navigation .favorites a").hasClass("act")){
                    console.log("res = " + answer.COUNT);
                    $(".main_navigation .favorites .count").text(answer.COUNT);
                    $(".main_navigation .favorites img").attr("src", "/bitrix/images/icons/fav-active.svg");
                    $(".main_navigation .favorites a").addClass("act");
                }else{
                    console.log("res = " + answer.COUNT);
                    $(".main_navigation .favorites .count").text(answer.COUNT);
                    $(".main_navigation .favorites img").attr("src", "/bitrix/images/icons/fav-active.svg");
                    $(".main_navigation .favorites a").addClass("act");
                }
            },
            error: function(a, b){
                console.log(a);
                console.log(b);
            }
        });
    });

    $("body").on("click", ".btn_clear_fav", function(e){
        var ajax_block = $(this).parents(".ajax-list");
        $.ajax({
            url: "/ajax/favorites.php",
            method: 'post',
            data: {
                ACTION: "remove-all"
            },
            dataType: 'json',
            success: function(answer) {
                if(answer.COUNT == 0){
                    $(".main_navigation .favorites .count").text("");
                    $(".main_navigation .favorites img").attr("src", "/bitrix/images/icons/fav.svg");
                    $(".main_navigation .favorites a").removeClass("act");
                }
            },
            error: function(a, b){
                console.log(a);
                console.log(b);
            }
        });
        if(ajax_block.length > 0){
            $.ajax({
                url: "",
                method: 'post',
                data: {
                    AJAX: "Y"
                },
                dataType: 'text',
                success: function(_answer){
                    ajax_block.html(_answer);
                },
                error: function(a, b){
                    console.log(a);
                    console.log(b);
                }
            });
        }
    });

    if (menu_tip == 8 || menu_tip == 0) {
        $('.notification').find('.count').text(count_faves);
    }
    $('.feedback input').focus(function () {
        place = $(this).attr('placeholder');
        $(this).attr('placeholder', '');
    });
    $('.feedback input').blur(function () {
        $(this).attr('placeholder', place);
    });

    $('#pushkar-phone').inputmask('+7(999)999-99-99');

    $('#pushkar-phone').on('focus', function () {
        $(this).css('border', '1px solid black');
    });

    $('.send-pushkar').on('click', function (e) {
        e.preventDefault();
        $('#pushkar_report').click();
        var name = $('#pushkar-name').val();
        var phone = $('#pushkar-phone').val();
        var message = $('#pushkar-message').val();
        if (phone) {
            $.ajax({
                type: 'post',//тип запроса: get,post либо head
                url: '/send-pushkar.php',//url адрес файла обработчика
                data: {'name': name, 'phone': phone, 'message': message},//параметры запроса
                response: 'text',
                success: function (data) {
                    $.magnificPopup.close();
                    if (data == 1) {
                        $.magnificPopup.open({
                            items: {
                                src: '#modal_thanks'
                            },
                            type: 'inline'
                        });
                    } else {
                        $.magnificPopup.open({
                            items: {
                                src: '#modal_error'
                            },
                            type: 'inline'
                        });
                    }

                }
            });
        } else {
            $('#pushkar-phone').css('border', '2px solid red');
        }
    });

    $('#tour-phone').inputmask('+7(999)999-99-99');
    $('#tour-phone1').inputmask('+7(999)999-99-99');

    $('#tour-phone').on('focus', function () {
        $(this).css('border', '1px solid black');
    });
    $('#tour-name').on('focus', function () {
        $(this).css('border', '1px solid black');
    });

    $('#send-card').on('click', function (e) {
        e.preventDefault();
        var name = $('#tour-name').val();
        var phone = $('#tour-phone').val();
        var message = $('#tour-message').val();
        var flatId = $('.btn_tour').attr('data-id');
        //var reg = /^([а-яА-ЯёЁ\s]+)$/;
        var reg_phone = /^(\+7)\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/;
        if (reg_phone.test(phone)) {
            $.ajax({
                type: 'post',//тип запроса: get,post либо head
                url: '/send-card.php',//url адрес файла обработчика
                data: {'name': name, 'phone': phone, 'message': message, 'flatId': flatId},//параметры запроса
                response: 'text',
                success: function (data) {
                    $.magnificPopup.close();
                    if (data == 1) {
                        $.magnificPopup.open({
                            items: {
                                src: '#modal_thanks'
                            },
                            type: 'inline'
                        });
                    } else {
                        $.magnificPopup.open({
                            items: {
                                src: '#modal_error'
                            },
                            type: 'inline'
                        });
                    }
                }
            });
        } else {
            if (!reg_phone.test(phone)) {
                $('#tour-phone').css('border', '2px solid red');
            }
        }
    });

    function height() {
        var height = $('.tab_content.selected').innerHeight() + 60;
        $(".tabs_box").css("height", height);
        return false;
    }

    $('.tabs_box .tab').on('click', function (e) {
        var index = $(this).index('.tab'),
            $tab = $('.tab').eq(index),
            $article = $('.tab_content').eq(index);
        if ($tab.hasClass('selected')) {
            $tab.removeClass('selected');
            $article.removeClass('selected');
        } else {
            $tab.addClass('selected').siblings('.tab').removeClass('selected');
            $article.addClass('selected').siblings('.tab_content').removeClass('selected');
        }
        height();
    });
    height();

    $('.js-scroll-mask').on('click', function () {
        $(this).removeClass('__active');
        $(this).parent('.table-wrapper').addClass('__scroll');
    });

    $('.object-info__documents-group-link').on('click', function(){
       $(this).parent().find('.object-info__documents').slideToggle();
    });

    objectFit.polyfill({
        selector: '#tab-4 .gallery-slider__slide img', // this can be any CSS selector
        fittype: 'cover', // either contain, cover, fill or none
        disableCrossDomain: 'true' // either 'true' or 'false' to not parse external CSS files.
    });
    //console.log(1);
});

$(document).ready(function() {
	$('body').on('change', 'input[name="POLICY_AGREEMENT"]', function(){
		if($(this).prop('checked') == false) {
			$(this).parents('form').find('input[type=submit]').prop('disabled',true).css({'opacity':'0.5'});
		} else {
			$(this).parents('form').find('input[type=submit]').prop('disabled',false).css({'opacity':'1'});
		}
	});
    $(document).scroll(function(){
        var header = $('#header').outerHeight(),
        scrolling = $(document).scrollTop();
        if(header < scrolling){
            if( $('div.bg_wrap.wrp > span').hasClass('fixed') == true){
                return false;
            }else{
                $('div.bg_wrap.wrp > span').addClass('fixed');
                var bgPosition = $('.bg_wrap.wrp').offset().left;
    			var beforeBG = $('.bg_wrap.wrp .before').outerWidth(),
    			afterBG = $('.bg_wrap.wrp .after').outerWidth();
    			$('.bg_wrap.wrp .before').css("right", beforeBG - bgPosition + 2);
    			$('.bg_wrap.wrp .after').css("left", afterBG - bgPosition);
            }      
        }else{
            if( $('div.bg_wrap.wrp > span').hasClass('fixed') == true){
                $('div.bg_wrap.wrp > span').removeClass('fixed');
                $('.bg_wrap.wrp .before').css("right", "100%");
                $('.bg_wrap.wrp .after').css("left", "100%");
            }else{
                return false;
            }      
        }
    });
    $(window).resize(function(){
    	if( $('div.bg_wrap.wrp > span').hasClass('fixed') == true){
    		var bgPosition = $('.bg_wrap.wrp').offset().left;
    		if(bgPosition > 0){
    			var beforeBG = $('.bg_wrap.wrp .before').outerWidth(),
    			afterBG = $('.bg_wrap.wrp .after').outerWidth();
    			$('.bg_wrap.wrp .before').css("right", beforeBG - bgPosition + 2);
    			$('.bg_wrap.wrp .after').css("left", afterBG - bgPosition);
    		}else{
    			return false;
    		}
    	}else{
    		return false;
    	}
    });

    $(document).on('click touchend',".cookie_notify__wrapper__close-btn", function (e) {
        $(this).parents('.cookie_notify__modal').slideUp();
        var date = new Date()
        date.setDate(date.getDate() + 365);
        document.cookie="_cookiedisclaimer=1; path=/; expires="+date.toGMTString();
        document.cookie="_cookiedisclaimer=1; path=/; expires="+date.toGMTString();
    });

    $(document).on('click', '.cookie_notify__wrapper__close-btn', function() {
        $('.cookie_notify__modal').hide();
    });

    $(document).on('click', '.show-all-action', function() {
        $('.no-show-action').toggleClass('active');
        if ($('.no-show-action').hasClass('active')) {
            $(this).text('Скрыть');
        } else {
            $(this).text('Показать еще');
        }
        return false;
    });

    var user = detect.parse(navigator.userAgent);
    console.log(
      user.browser.family,
      user.browser.version,
      user.os.name
    )
    if(user.browser.family == 'IE'){
        $(document).find('.footer-ie').attr('style','display: block');
        $(document).on('click', '.footer-ie__cross', function() {
            $(document).find('.footer-ie').attr('style','display: none');
        });
    }

    
});

/*MISPRINT*/
$(document).on("keyup", function(e) {
    if (e.ctrlKey && 13 === e.keyCode){
        getMisprintData();

    }
});
function getMisprintData() {
    var e = myGetSelection();
    if(e == undefined) return 0;

    $(".popup-misprint").html("<span class=\"misprint\">" + e + "</span>");
    $("#FORM20_FIELD_hidden-text").val(e);
    $('[data-target="#modalFORM20"]').trigger('click');
}
function myGetSelection() {
    if ("undefined" != typeof window.getSelection) {
        var selection = window.getSelection();
        if (selection.isCollapsed){
            return;
        }
        var blockSelection = selection.anchorNode.parentElement;
        var blockSelectionText = blockSelection.textContent;
        var resStr =  selection ;
        return resStr;
    }
}

function hideArrows() {
    $(document).find('.sort_min .ar_t').hide();
    let hideActiveArrow = $(document).find('.sort_min:visible .active');
    let activeArrow = $(document).find('.sort_min:visible .active').siblings();
    console.log(activeArrow.hasClass('ar_t'));
    hideActiveArrow.hide();
    activeArrow.show();
    if (activeArrow.hasClass('ar_t')) {
        $(document).find('.sort_min:visible .active').siblings().addClass('fake-arrow-down');
        console.log(11);
    } else {
        $(document).find('.sort_min:visible .active').siblings().addClass('fake-arrow-up');
        console.log(22);
    }
    
    console.log('end');
}

hideArrows();


