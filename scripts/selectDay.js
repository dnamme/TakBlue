function selectDay(evt, method) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("daytab");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("daylinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(method).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  
// https://www.w3schools.com/howto/howto_js_tabs.asp
// https://stackoverflow.com/questions/51906907/how-to-set-an-active-css-tab-menu