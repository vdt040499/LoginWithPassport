// $(document).ready(function(){
//     $('.navbar-nav').on('click','li',
//         function(){
//             $('.navbar-nav.active').removeClass('active');
//             $(this).addClass('active');
//         }
//     )
// });

$('#navbarNav li a').click(function() {
    $(this).closest("li").addClass('active').siblings().removeClass('active');
    return(false);   // no default behavior from clicking on the link
});