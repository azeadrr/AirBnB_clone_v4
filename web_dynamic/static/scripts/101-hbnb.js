$(document).ready(function () {
    let idAmenitieSelect = {};
    let city_ids = {};
    let state_id = {};
    $('.amenities .popover input').change(function (e) { 
        let amenity_id = $(this).attr('data-id');
        let amenity_name = $(this).attr('data-name');
        if ($(this).is(':checked')) {
            idAmenitieSelect[amenity_name] = amenity_id;
        } else {
            delete idAmenitieSelect[amenity_name];
        }
        let selectName = Object.keys(idAmenitieSelect);
        checkedData(selectName, '.amenities h4');
    });
    $.get("http://0.0.0.0:5001/api/v1/status/",
        function (inpt, Status) {
            if (inpt.status === 'OK' && Status === 'success')
                $('div#api_status').addClass('available');
            else
                $('div#api_status').removeClass('available');
        }
    );
    $.ajax({
        type: "POST",
        url: "http://0.0.0.0:5001/api/v1/places_search/",
        data: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' },
        success: function (resp) {
            for (const place of resp) {
                const artag = [
                    '<article>',
                        '<div class="title_box">',
                        `<h2>${place.name}</h2>`,
                        `<div class="price_by_night">$${place.price_by_night}</div>`,
                        '</div>',
                        '<div class="information">',
                        `<div class="max_guest">${place.max_guest}</div>`,
                        `<div class="number_rooms">${place.number_rooms}</div>`,
                        `<div class="number_bathrooms">${place.number_bathrooms}</div>`,
                        '</div>',
                        '<div class="description">',
                        `${place.description}`,
                        '</div>',
                    '</article>'
                ];
                $('SECTION.places').append(artag.join(''));
            }
        },
        error: function (e) {
            console.log(e)
        }
    });
    $('.filters button').click(function () { 
        $('article').remove();
        $.ajax({
            type: "POST",
            url: "http://0.0.0.0:5001/api/v1/places_search/",
            data: JSON.stringify({ 'amenities': Object.values(idAmenitieSelect),
                                   'states': Object.values(state_id),
                                   'cities': Object.values(city_id) }),
            headers: { 'Content-Type': 'application/json' },
            success: function (resp) {
                for (const place of resp) {
                    const artag = [
                        '<article>',
                            '<div class="title_box">',
                            `<h2>${place.name}</h2>`,
                            `<div class="price_by_night">$${place.price_by_night}</div>`,
                            '</div>',
                            '<div class="information">',
                            `<div class="max_guest">${place.max_guest}</div>`,
                            `<div class="number_rooms">${place.number_rooms}</div>`,
                            `<div class="number_bathrooms">${place.number_bathrooms}</div>`,
                            '</div>',
                            '<div class="description">',
                            `${place.description}`,
                            '</div>',
                        '</article>'
                    ];
                    $('SECTION.places').append(artag.join(''));
                }
            }
        });
        
    });
    $('div.locations div.popover > ul > li h2 input').change(function (e) { 
        let state_id = $(this).attr('data-id');
        let state_name = $(this).attr('data-name');
        if ($(this).prop('checked'))
            state_id[state_name] = state_id;
        else
            delete state_id[state_name];
        let selected = Object.keys(state_id).concat(...Object.keys(city_id));
        checkedData(selected, '.locations h4');
    });
    $('div.locations div.popover > ul > li ul li input').change(function (e) { 
        let city_id = $(this).attr('data-id');
        let city_name = $(this).attr('data-name');
        if ($(this).prop('checked'))
            city_ids[city_name] = city_id;
        else
            delete city_ids[city_name];
        let selected = Object.keys(state_id).concat(...Object.keys(city_ids));
        checkedData(selected, '.locations h4');
    });
});
function checkedData(list, selector){
        if (list.length < 3) {
            for (let i = 0; i < 3 && i < list.length; i++) {
                $(selector).text(list.join(', '));
            }
        } else if (list.length == 3) {
            $(selector).text(list.concat(' ...'));
        }
}
