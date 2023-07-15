import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParsePaginationIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.limit) {
      value.limit = parseInt(value.limit);
      if (isNaN(value.limit) || value.limit < 1) {
        value.limit = 10;
      }
    }

    if (value.offset) {
      value.offset = parseInt(value.offset);
      if (isNaN(value.offset) || value.offset < 0) {
        value.offset = 0;
      }
    }

    return value;
  }
}
