package org.randol.medusa.medusabackend.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public record Media (String id, String name, String path, LocalDateTime dateTaken, int width, int height) {

    public static List<Media> getByYear(int year) {
        var rnd = new Random();

        int min = 3;
        int max = 30;
        var mediasCount = rnd.nextInt(min, max);
        var mediasMock = new ArrayList<Media>();

        int x = 1024;
        int y = 768;
        int w;
        int h;

        Boolean portrait;

        for (var i=1; i<=mediasCount; i++) {
            portrait = rnd.nextBoolean();
            w = portrait ? x : y;
            h = portrait ? y : x;
            mediasMock.add(new Media(
                String.valueOf(i),
                "media-" + String.valueOf(i),
                "https://picsum.photos/" + w + "/" + h + "?" + String.valueOf(i),
                LocalDateTime.of(
                    year, 
                    rnd.nextInt(1, 12), 
                    rnd.nextInt(1, 28),
                    rnd.nextInt(0, 23),
                    rnd.nextInt(0, 59)
                ),
                w,
                h
            ));
        }
        return mediasMock;
    }


}