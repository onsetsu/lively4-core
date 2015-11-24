export function activate() {
  console.log("using Inspector");
  $("body").on("click", handleInspect);
}

export function deactivate() {
  console.log("deactivate Inspector");
  $("body").off("click", handleInspect);
}

function handleInspect(e) {
  if (e.ctrlKey || e.metaKey) {
    onMagnify(e);
  } else {
    if (window.that) {
      $(window.that).removeClass("red-border");
    }
  }
}

var objectEditor = null;

function onMagnify(e) {
  var grabTarget = e.target;
  var that = window.that;
  var $that = $(that);
  if (that && $that.hasClass("red-border") && (grabTarget === that || $.contains(that, grabTarget))) {
    parent = $that.parent();
    if (!parent.is("html")) {
      grabTarget = parent.get(0);
    }
  }
  if (grabTarget !== that || !$that.hasClass("red-border")) {
    $that.removeClass("red-border")
    $(grabTarget).addClass("red-border");
  }
  window.that = grabTarget;
  console.log("Current element:", grabTarget, "with id:", $(grabTarget).attr("id"));
  
  // remove previous object editor
  if (objectEditor !== null) {
    $(objectEditor).remove();
  }
  
  // open object editor for new target
  var editor = document.createElement('lively-object-editor');
  editor.target = window.that;
  objectEditor = document.createElement('lively-window');
  objectEditor.title = window.that.tagName;
  $(objectEditor).append(editor);
  
  $('body').append(objectEditor);
  objectEditor.centerInWindow();
}
