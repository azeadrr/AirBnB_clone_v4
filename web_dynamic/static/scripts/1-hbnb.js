$(document).ready(function () {
    let idsOfAmenitiesSelected = {};
    $('.amenities .popover input').change(function (e) { 
        let amenity_id = $(this).attr('data-id');
        let amenity_name = $(this).attr('data-name');
        if ($(this).is(':checked')) {
            idsOfAmenitiesSelected[amenity_name] = amenity_id;
        } else {
            delete idsOfAmenitiesSelected[amenity_name];
        }
        let selectName = Object.keys(idsOfAmenitiesSelected);
        if (selectName.length < 3) {
            for (let i = 0; i < 3 && i < selectName.length; i++) {
                $('.amenities').text(selectName.join(', '));
            }
        } else if (selectName.length == 3) {
            $('.amenities').text(selectName.concat(' ...'));
        }
        
    });
});
