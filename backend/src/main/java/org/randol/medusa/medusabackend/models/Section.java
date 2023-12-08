package org.randol.medusa.medusabackend.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Comparator;
import java.util.concurrent.ThreadLocalRandom;

public record Section (Integer year, List<Media> medias) {
    
    public static List<Section> getAllSections() {
        int minSections = 2 ;
        int maxSections = 6;
        var sectionsCount = ThreadLocalRandom.current().nextInt(minSections, maxSections);
        var sectionsMock = new ArrayList<Section>();

        for (var i=1; i<=sectionsCount; i++) {
            var year = ThreadLocalRandom.current().nextInt(2000, 2023);
            sectionsMock.add(new Section(
                year,
                Media.getByYear(year)
            ));
        }

        //comaparing first name and then last name
        Comparator<Section> compareByYear = Comparator.comparing(Section::year);
        return sectionsMock.stream().sorted(compareByYear).toList();
    }

    
}