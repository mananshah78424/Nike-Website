$(document).ready(function () {
  $('.shoecategory').click(function () {
    var category = $(this).attr('id');
    if (category == 'All') {
      $('.shoeitem').addClass('hide');
      setTimeout(function () {
        $('.shoeitem').removeClass('hide');
      }, 300);
    } else {
      $('.shoeitem').addClass('hide');
      setTimeout(function () {
        $('.' + category).removeClass('hide');
      }, 300);
    }
  })

  $('.buttonsize').click(function () {
    var shoe_size = $(this).attr('id');

    if (shoe_size === "reset") {
      $('.shoeitem').addClass('hide');
      setTimeout(function () {
        $('.shoeitem').removeClass('hide');
      }, 300);
    } else {
      $('.shoeitem').addClass('hide');
      setTimeout(function () {
        $('.' + shoe_size).removeClass('hide');
      }, 300);
    }


  })

  $('.genderselect').click(function () {
    if (this.previous) {
      this.checked = false;
      $('.shoeitem').addClass('hide');
      setTimeout(function () {
        $('.shoeitem').removeClass('hide');
      }, 300);

    }
    this.previous = this.checked;
    var selected = $(this).attr('id');
    $('.shoeitem').addClass('hide');
    setTimeout(function () {
      $('.' + selected).removeClass('hide');
    }, 300);
  });

  $("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    console.log(value);
    $("#myList*").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)

    });
  });

  $('.lacecategory').click(function () {
    var category = $(this).attr('id');

    $('.shoeitem').addClass('hide');
    setTimeout(function () {
      $('.' + category).removeClass('hide');
    }, 300);

  });












});
