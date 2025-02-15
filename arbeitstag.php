
<?php
function getOpeningStatus() {
    // Load vacation days from label and convert to an array

    $vacationDaysInput = "    1. Januar 2025

2. Januar 2025

17.4.2025

18.04.2025

21. April 2025

28. April 2025

1. Mai 2025

28. Mai 2025

29. Mai 2025

9. Juni 2025

1. August 2025, 15. September 2025, 24. Dezember 2025, 25. Dezember 2025

26. Dezember 2025

31.12.2025";
 
    // $vacationDaysInput = label('footer.Liste-Urlaubstage');
    $vacationDays = [];

    // German month names mapped to numbers
    $germanMonths = [
        'Januar' => '01', 'Februar' => '02', 'März' => '03', 'April' => '04',
        'Mai' => '05', 'Juni' => '06', 'Juli' => '07', 'August' => '08',
        'September' => '09', 'Oktober' => '10', 'November' => '11', 'Dezember' => '12'
    ];

    // Split by line breaks and commas
    foreach (preg_split('/[\r\n,]+/', $vacationDaysInput) as $dateString) {
        $dateString = trim($dateString);

        // Match German month format (e.g., "1. Januar 2025")
        if (preg_match('/(\d{1,2})\.\s*([A-Za-zäöüÄÖÜ]+)\s*(\d{4})/', $dateString, $matches)) {
            $day = str_pad($matches[1], 2, '0', STR_PAD_LEFT);
            $month = $germanMonths[$matches[2]] ?? null;
            $year = $matches[3];

            if ($month) {
                $vacationDays[] = "$year-$month-$day";
            }
        }
        // Match numeric format (e.g., "01.01.2025" or "1.1.2025")
        elseif (preg_match('/(\d{1,2})\.(\d{1,2})\.(\d{4})/', $dateString, $matches)) {
            $vacationDays[] = sprintf('%04d-%02d-%02d', $matches[3], $matches[2], $matches[1]);
        }
    }
    print_r( $vacationDays);

    // Dynamically generate opening hours from label()
    $times = implode("\n", array(
        label('footer.Mo 08:00–12:00 und 13:00–17:00'),
        label('footer.Di 08:00–12:00 und 13:00–17:00'),
        label('footer.Mi 08:00–12:00 und 13:00–17:00'),
        label('footer.Do 08:00–12:00 und 13:00–17:00'),
        label('footer.Fr 08:00–16:30'),
    ));

    // Split times dynamically into array
    $lines = explode("\n", $times);
    $weekdayHours = [];
    $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    foreach ($lines as $index => $line) {
        if (preg_match_all('/(\d{2}:\d{2})/', $line, $matches)) {
            $weekdayHours[$days[$index]] = $matches[0];
        }
    }

    // Get current date and time
    $now = new DateTime('now', new DateTimeZone('Europe/Zurich'));
    $currentDay = $now->format('l'); // Full day name (e.g., Monday)
    $currentDate = $now->format('Y-m-d');
    $currentTime = $now->format('H:i');

    // Check if today is a vacation, holiday, or weekend
    if (in_array($currentDate, $vacationDays) || in_array($currentDay, ['Saturday', 'Sunday'])) {
        return 'Heute geschlossen';
    }

    // Determine opening status based on time
    if (isset($weekdayHours[$currentDay])) {
        $hours = $weekdayHours[$currentDay];

        if ($currentTime >= $hours[0] && $currentTime < $hours[1]) {
            return "Geöffnet bis " . $hours[1] . " und " . $hours[2] . " bis " . $hours[3];
        } elseif ($currentTime >= $hours[2] && $currentTime < $hours[3]) {
            return "Geöffnet bis " . $hours[3];
        } else {
            return 'Geschlossen';
        }
    }

    return 'Geschlossen';
}
?>

<!-- Display Opening Status -->
<li class="opening-hours">
    <?php echo getOpeningStatus(); ?>
</li>
