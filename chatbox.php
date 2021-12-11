<?php
    
    echo "<!DOCTYPE HTML><html><head><title>Fetch Youtube first result</title></head><body><form method='post' action='chatbox.php' accept-charset='utf-8'>Search string: <input type='text' name='searchString' /><input type='submit' name='submit' value='Search' /></form></body></html>";
    
    $yt_search = $_POST['inputArea'];
    $yt_source = file_get_contents('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q='.urlencode($yt_search).'&key=AIzaSyCSsAISuKAW4zQV_thXw-GnH_JHiBmZ4Tw');
    
    $yt_decode = json_decode($yt_source, true);
    if ($yt_decode['pageInfo']['totalResults'] > 0) {
        $yt_videoid = trim($yt_decode['items'][0]['id']['videoId']);
        $response = "https://www.youtube.com/watch?v=" . $yt_videoid;
        echo "<iframe src = '" . $response . "' width = '0' height = '0' ></iframe>";
    }
    
    if ($yt_search == "null")
    {
        
    }
    
?>