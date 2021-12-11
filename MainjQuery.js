$(document).ready(function() {
    $(".create_meeting").mouseenter(function() {
        $(".image1, .create_meeting").animate({
            width: "300px",
            height: "300px"
        });
        $(this).css("margin-right", "40px");
    });
    
    $(".create_meeting").mouseleave(function() {
        $(".image1, .create_meeting").animate({
            width: "250px",
            height: "250px"
        });
        $(this).css("margin-right", "70px");
    });
    
    $(".join_meeting").mouseenter(function() {
        $(".image2, .join_meeting").animate({
            width: "300px",
            height: "300px"
        });
        $(".create_meeting").css("margin-right", "40px");
    });
    
    $(".join_meeting").mouseleave(function() {
        $(".image2, .join_meeting").animate({
            width: "250px",
            height: "250px"
        });
        $(".create_meeting").css("margin-right", "70px");
    });
});