var counter = 0;
function changeBG(){
    var imgs = [
        "url(https://www.bu.edu/tech/files/2011/11/eng.jpg)",
        "url(http://nh1website.1kbahw8gd.maxcdn-edge.com/images/news/Stock_Images/boston_university_fb.jpg)",
        "url(https://images.unsplash.com/photo-1477238134895-98438ad85c30?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dcd437a3c39849ff2bf9c3f87a7adfd3&auto=format&fit=crop&w=1500&q=80)",
        "url(https://dailyfreepress.com/wp-content/uploads/case_paige.jpg)",
        "url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e23e6404f851a9c272479500cfac3dd5&auto=format&fit=crop&w=1050&q=80)"
      ]
    
    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}
  
  setInterval(changeBG, 2000);


