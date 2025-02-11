
<!-- ------------------------ Openening Times with Google Date API precisly --------------------------- -->
<!-- apiKey= AIzaSyA1JNH_2wzLhiJE70-kf2dWA_tAaKYij18 -->

<?php
function getOpeningHours() {
    // Define the path to the cache file
    $cacheFile = __DIR__ . '/holiday_cache.json';
    $cacheDuration = 90 * 24 * 60 * 60; // Cache duration: 90 days

    // Check if the cache file exists and is still valid
    if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < $cacheDuration) {
        // Load holidays from the cache
        $holidays = json_decode(file_get_contents($cacheFile), true);
    } else {
        // Fetch holidays from the Google Calendar API
        $holidays = fetchHolidaysFromGoogleCalendar();

        // If fetching was successful, cache the data
        if ($holidays !== null) {
            file_put_contents($cacheFile, json_encode($holidays));
        } else {
            // If API call fails and cache exists, use the cached data
            if (file_exists($cacheFile)) {
                $holidays = json_decode(file_get_contents($cacheFile), true);
            } else {
                // If no cache is available, define a fallback
                $holidays = [];
            }
        }
    }

    // Retrieve opening hours from dynamic labels
    $weekdayHours = [
        'Monday' => label('footer.Mo 08:00–12:00 und 13:00–17:00'),
        'Tuesday' => label('footer.Di 08:00–12:00 und 13:00–17:00'),
        'Wednesday' => label('footer.Mi 08:00–12:00 und 13:00–17:00'),
        'Thursday' => label('footer.Do 08:00–12:00 und 13:00–17:00'),
        'Friday' => label('footer.Fr 08:00–16:30'),
    ];

    $today = new DateTime('now', new DateTimeZone('Europe/Zurich'));
    $dayName = $today->format('l');
    $date = $today->format('Y-m-d');

    // Check if today is a holiday
    if (isset($holidays[$date])) {
        return 'Feiertag (' . $holidays[$date] . ')';
    }

    // Check if today is a weekend
    if ($dayName === 'Saturday' || $dayName === 'Sunday') {
        return 'Wochenende';
    }

    // Return the opening hours for today
    return $weekdayHours[$dayName] ?? 'Geschlossen';
}

function fetchHolidaysFromGoogleCalendar() {
    $calendarId = 'de.swiss#holiday@group.v.calendar.google.com';
    $apiKey = 'AIzaSyA1JNH_2wzLhiJE70-kf2dWA_tAaKYij18';
    $year = date('Y');
    $url = "https://www.googleapis.com/calendar/v3/calendars/$calendarId/events?key=$apiKey&timeMin=$year-01-01T00:00:00Z&timeMax=$year-12-31T23:59:59Z";

    $response = @file_get_contents($url);
    if ($response === FALSE) {
        return null; // API call failed
    }

    $data = json_decode($response, true);
    $holidays = [];

    foreach ($data['items'] as $event) {
        if (isset($event['start']['date'])) {
            $date = $event['start']['date'];
            $holidays[$date] = $event['summary'];
        }
    }

    return $holidays;
}
?>




<!-- ------------------------ Openening Times with Google API precisly second --------------------------- -->
<!-- apiKey= AIzaSyA1JNH_2wzLhiJE70-kf2dWA_tAaKYij18 -->

<?php
function getOpeningStatus() {
    // Define cache files
    $holidayCacheFile = __DIR__ . '/holiday_cache.json';
    $vacationCacheFile = __DIR__ . '/vacation_cache.json';
    $cacheDuration = 90 * 24 * 60 * 60; // 90 days later fetches Data from API (maximum 4 times per year)

    // Load holidays (Google Calendar API)
    if (file_exists($holidayCacheFile) && (time() - filemtime($holidayCacheFile)) < $cacheDuration) {
        $holidays = json_decode(file_get_contents($holidayCacheFile), true);
    } else {
        $holidays = fetchHolidaysFromGoogleCalendar();
        if ($holidays !== null) {
            file_put_contents($holidayCacheFile, json_encode($holidays));
        } else {
            $holidays = file_exists($holidayCacheFile) ? json_decode(file_get_contents($holidayCacheFile), true) : [];
        }
    }

    // Load vacation days from cache
    $vacationDays = file_exists($vacationCacheFile) ? json_decode(file_get_contents($vacationCacheFile), true) : [];

    // Define opening hours dynamically from labels
    $weekdayHours = [
        'Monday'    => ['08:00', '12:00', '13:00', '17:00'],
        'Tuesday'   => ['08:00', '12:00', '13:00', '17:00'],
        'Wednesday' => ['08:00', '12:00', '13:00', '17:00'],
        'Thursday'  => ['08:00', '12:00', '13:00', '17:00'],
        'Friday'    => ['08:00', '12:00', '13:00', '16:30'], // Closes earlier on Friday
    ];

    // Get today's date and time
    $now = new DateTime('now', new DateTimeZone('Europe/Zurich'));
    $currentDay = $now->format('l'); // Full day name (e.g., Monday)
    $currentDate = $now->format('Y-m-d');
    $currentTime = $now->format('H:i');

    // Check if today is a holiday
    if (isset($holidays[$currentDate]) || $currentDay === 'Saturday' || $currentDay === 'Sunday') {
        return 'Heute geschlossen';
    }

    // Check if today is a vacation day
    if (in_array($currentDate, $vacationDays)) {
        $nextOpenDate = new DateTime(end($vacationDays));
        $nextOpenDate->modify('+1 day');
        return 'Wieder geöffnet ab ' . $nextOpenDate->format('d.m.Y');
    }

    // Determine opening status based on time
    if (isset($weekdayHours[$currentDay])) {
        $hours = $weekdayHours[$currentDay];

        if ($currentTime >= $hours[0] && $currentTime < $hours[1]) {
            return "Geöffnet bis 12:00 und 13:00–" . $hours[3];
        } elseif ($currentTime >= $hours[1] && $currentTime < $hours[2]) {
            return "Geöffnet " .$hours[2]." bis " . $hours[3];
        } elseif ($currentTime >= $hours[2] && $currentTime < $hours[3]) {
            return "Geöffnet bis " . $hours[3];
        } else {
            return 'Geschlossen';
            // return "Geöffnet ".$hours[0]." - " . $hours[1] .$hours[2]." - " . $hours[3];
        }
    }
    // If all blocks above are false, then it returns:
    return 'Geschlossen';
}

// Function to fetch holidays from Google Calendar API
function fetchHolidaysFromGoogleCalendar() {
    $calendarId = 'de.swiss#holiday@group.v.calendar.google.com';
    $apiKey = 'AIzaSyA1JNH_2wzLhiJE70-kf2dWA_tAaKYij18';
    $year = date('Y');
    $url = "https://www.googleapis.com/calendar/v3/calendars/$calendarId/events?key=$apiKey&timeMin=$year-01-01T00:00:00Z&timeMax=$year-12-31T23:59:59Z";

    $response = @file_get_contents($url);
    if ($response === FALSE) {
        return null; // API call failed
    }

    $data = json_decode($response, true);
    $holidays = [];

    foreach ($data['items'] as $event) {
        if (isset($event['start']['date'])) {
            $date = $event['start']['date'];
            $holidays[$date] = $event['summary'];
        }
    }

    return $holidays;
}

?>

<li class="opening-hours">
    <?php echo getOpeningStatus(); ?>
</li>



<!-- Example usage with vacation days:
 When a user submits, then saved like $vacationDays = "2025-07-15, 2025-07-16", -->

<?php
// File to store user-defined vacation days
$vacationCacheFile = __DIR__ . '/vacation_cache.json';

// Function to save new vacation days
function saveVacationDays($newDates) {
    global $vacationCacheFile;

    // Read existing vacation days
    if (file_exists($vacationCacheFile)) {
        $vacationDays = json_decode(file_get_contents($vacationCacheFile), true);
        if (!is_array($vacationDays)) {
            $vacationDays = [];
        }
    } else {
        $vacationDays = [];
    }

    // Merge and remove duplicates
    $vacationDays = array_unique(array_merge($vacationDays, $newDates));

    // Save back to file
    file_put_contents($vacationCacheFile, json_encode($vacationDays, JSON_PRETTY_PRINT));
}

// Handling user input (e.g., from a form submission)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['vacation_dates'])) {
    $userInput = explode(',', $_POST['vacation_dates']); // Assuming input is comma-separated
    $cleanedDates = [];

    foreach ($userInput as $date) {
        $trimmedDate = trim($date);
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $trimmedDate)) { // Validate YYYY-MM-DD format
            $cleanedDates[] = $trimmedDate;
        }
    }

    if (!empty($cleanedDates)) {
        saveVacationDays($cleanedDates);
        echo "Vacation days saved successfully!";
    } else {
        echo "Invalid date format!";
    }
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="POST" action="save_vacation.php">
        <label>Enter vacation days (YYYY-MM-DD, comma-separated):</label>
        <input type="text" name="vacation_dates">
        <button type="submit">Save</button>
    </form>
    
</body>
</html>

