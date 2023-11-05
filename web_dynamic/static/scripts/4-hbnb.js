$(document).ready(function () {
    let idAmenitieSelect = {};
    $('.amenities .popover input').change(function (e) { 
        let amenity_id = $(this).attr('data-id');
        let amenity_name = $(this).attr('data-name');
        if ($(this).is(':checked')) {
            idAmenitieSelect[amenity_name] = amenity_id;
        } else {
            delete idAmenitieSelect[amenity_name];
        }
        let selectName = Object.keys(idAmenitieSelect);
        if (selectName.length < 3) {
            for (let i = 0; i < 3 && i < selectName.length; i++) {
                $('.amenities').text(selectName.join(', '));
            }
        } else if (selectName.length == 3) {
            $('.amenities').text(selectName.concat(' ...'));
        }
        
    });
});
 $.get("http://0.0.0.0:5001/api/v1/status/", function (inpt, Status) {
            if (inpt.status === 'OK' && Status === 'Success')
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
            $('section.places').append(artag.join(''));
        }
    },
    error: function (e) {
        console.log(e)
    }
});
$('.filters_button').click(function () { 
    $('article').remove();
    $.ajax({
        type: "POST",
        url: "http://0.0.0.0:5001/api/v1/places_search/",
        data: JSON.stringify({ 'amenities': Object.values(idAmenitieSelect) }),
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
