let draggie = new Draggabilly('#customBlock');
$("ion-icon[name=settings-outline]").click(() => {
  $("#customBlock").toggle();
});

if (localStorage["myTheme"] != undefined) {
  var obj = JSON.parse(localStorage["myTheme"]);
  if (obj['setBackground'])
    $("body").css({ "background-image": obj['body'] });
  else
    $("body").css({ "background-color": obj['body'] });
  $("span, p, i, b, s, sup, sub, u, li, ion-icon").css({ "color": obj['text'] });
  $("div").css({ "background": obj['div'], "border-color": obj['borderCol'], "border-width": obj['borderWidth'] });
  $("button").css({ "background-color": obj['buttonBack'] });
  //Setting data from object properties to elements in block settings
  $("#backImage").val(obj['body'].slice(4, -1));
  $("#backBody").val(obj['body']);
  $("#colText").val(obj['text']);
  $("#backBlock").val(obj['div']);
  $("#transpVal").val(obj['transparent'] * 100);
  $("#borderCol").val(obj['borderCol']);
  $("#borderWidth").val(obj['borderWidth']);
  $("#backBut").val(obj['buttonBack']);
}
$("#setBut").click(() => {
  var val;
  // console.log($("#checkBack").prop("checked"))
  if ($("#checkBack").prop("checked")) {
    var link = $("#backImage").val().replaceAll("\\", "/");
    val = "url(" + link + ")";
    $("body").css({ "background-image": val, "background-color": "none" });
  } else {
    val = $("#backBody").val();
    $("body").css({ "background-color": val, "background-image": "none" });
  }
  $("span, p, i, b, s, sup, sub, u, li, ion-icon").css({ "color": ($("#backBody").val() == "#000000") ? "#ffffff" : ($("#backBody").val() == "#ffffff") ? "#000000" : $("#colText").val() });
  var aRgbHex = $("#backBlock").val().slice(1).match(/.{1,2}/g);
  var aRgb = [
    parseInt(aRgbHex[0], 16),
    parseInt(aRgbHex[1], 16),
    parseInt(aRgbHex[2], 16)
  ];
  // console.log(aRgb, $('#transpVal').val()/100)
  $("div").css({ "background-color": "rgba(" + aRgb + "," + $('#transpVal').val() / 100 + ")" });
  $("div").css({ "border-color": $("#borderCol").val() });
  $("div").css({ "border-width": $("#borderWidth").val() });
  $("button, [type=button]").css({ "background-color": $("#backBut").val(), "color": ($("#backBut").val() == "#000000") ? "#ffffff" : ($("#backBut").val() == "#ffffff") ? "#000000" : $("#colText").val() })
  var obj = {
    "body": val,
    "text": $("#colText").val(),
    "div": "rgba(" + aRgb + "," + $('#transpVal').val() / 100 + ")",
    "borderCol": $("#borderCol").val(),
    "borderWidth": $("#borderWidth").val(),
    "transparent": $('#transpVal').val() / 100,
    "buttonBack": $("#backBut").val(),
    "setBackground": $("#checkBack").prop("checked")
  }
  localStorage["myTheme"] = JSON.stringify(obj);
});