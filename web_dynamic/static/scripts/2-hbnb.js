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
$.get("http://0.0.0.0:5001/api/v1/status/", function (inpt) {
            if (inpt.status === 'OK')
                $('div#api_status').addClass('available');
            else
                $('div#api_status').removeClass('available');
        }
    );
});
