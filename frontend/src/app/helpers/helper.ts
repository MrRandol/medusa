import {Injectable} from "@angular/core";
import { Gallery } from "../models/Gallery";
import { Dimension, Media } from "../models/Media";
import { Row } from "../models/Row";
import { MediaTreeHelperService } from "./mediaTreeHelpers";
import { sectionConfig } from "../models/UIConfig";

@Injectable({
    providedIn: 'root'
})
export class HelperService {

  /* BEGIN MOCK DATA FOR DEVELOPMENT PURPOSES */
  static generateMockSection(photosCount: number): Media[]{
    var medias = [];
    for (var i=0; i<photosCount; i++) {
      var x = HelperService.getRandomInt(660, 780)
      var y = HelperService.getRandomInt(430, 520)

      if (HelperService.getRandomBool()) {
        var z = x;
        x = y;
        y = z;
      }
  
      medias.push({
        id: i, 
        fileName: i.toString(), 
        filePath: "https://picsum.photos/" + x + "/" + y + "?" + i,
        width: x,
        height: y
      });
    }

    return medias
  }

  generateMediaMock(fakeId: number): Media {
    return {
      id: fakeId, 
      fileName: "This is a test",
      filePath: "https://picsum.photos/1920/1080",
      width: 1920,
      height: 1080
    }
  }

  private static getRandomBool(): Boolean {
    return Math.random() < 0.5;
  }

  private static getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max +1);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is inclusive and the minimum is inclusive
  }
  /* END MOCK DATA FOR DEVELOPMENT PURPOSES */

  static generateSectionRows(medias: Media[], containerWidth: number): Row[] {
    if (medias == null || medias.length ===0 ) return [];

    let viewportWidth = containerWidth;
    var config: sectionConfig = {
      containerWidth: viewportWidth,
      maxHeight: 230,
      minHeight: 170,
      targetHeight: 200
    }
    var mediaDimensions: Dimension[] = medias.map(m => {return {w: m.width, h: m.height}})

    var optimalPath = MediaTreeHelperService.GetOptimalPath(
      MediaTreeHelperService.GenerateFlexLayoutGraph(config, mediaDimensions)
    );

    var rows: Row[] = [];
    optimalPath.forEach(p => {
      rows.push({
        medias: medias.slice(p.source, p.target + 1),
        height: p.height
      })
    })

    return rows;
  }
}