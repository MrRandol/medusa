import {Injectable} from "@angular/core";
import { Gallery } from "../models/Gallery";
import { Dimension, Media } from "../models/Media";
import { Row } from "../models/Row";
import { MediaTreeHelperService } from "./mediaTreeHelpers";
import { UiConfig } from "../models/UIConfig";

@Injectable({
    providedIn: 'root'
})
export class HelperService {

  static GenerateMockGallery(val: string) { return val; }

  static generateMockGalley(photosCount: number): Gallery{
    var gallery_data = [];
    for (var i=0; i<photosCount; i++) {
      var x = HelperService.getRandomInt(660, 780)
      var y = HelperService.getRandomInt(430, 520)

      if (HelperService.getRandomBool()) {
        var z = x;
        x = y;
        y = z;
      }
  
      gallery_data.push({
        id: i, 
        fileName: i.toString(), 
        filePath: "https://picsum.photos/" + x + "/" + y + "?" + i,
        width: x,
        height: y
      });
    }

    return {data: gallery_data};
  }

  static getRandomBool(): Boolean {
    return Math.random() < 0.5;
  }

  static getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max +1);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is inclusive and the minimum is inclusive
  }

  static generateRows(gallery: Gallery, containerWidth: number): Row[] {
    if (gallery == null) return [];

    let viewportWidth = containerWidth;
    var config: UiConfig = {
      containerWidth: viewportWidth,
      maxHeight: 210,
      minHeight: 150,
      targetHeight: 180
    }
    var mediaDimensions: Dimension[] = gallery.data.map(m => {return {w: m.width, h: m.height}})

    var optimalPath = MediaTreeHelperService.GetOptimalPath(
      MediaTreeHelperService.GenerateFlexLayoutGraph(config, mediaDimensions)
    );

    var rows: Row[] = [];
    optimalPath.forEach(p => {
      rows.push({
        medias: gallery.data.slice(p.source, p.target + 1),
        height: p.height
      })
    })

    return rows;
  }
}