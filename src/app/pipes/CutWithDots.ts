import {Pipe, PipeTransform} from "@angular/core";

@Pipe({ name: 'cutWithDots' })
export class CutWithDots implements PipeTransform {
  transform(text: string, extension: string = '...') {
    return text.length >= 100 ? text.substring(0, 100) + extension : text;
  }
}
