import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TagCheckService {
  private tagTest = /(?:^|\s)(@[a-zA-Z0-9]+)/;

  testString(value: string): boolean {
    return this.tagTest.test(value);
  }

  getMatcherIndex(value: string): number {
    if (value) {
      const index = value.match(this.tagTest)?.index;
      const length = value.match(this.tagTest)?.length;

      if (index && length && length > 1) {
        return index + 1;
      } else {
        return index ?? -1;
      }
    } else {
      return -1;
    }
  }

  replaceTextWithValue(text: string, value: string): string {
    const match = text.match(this.tagTest);
    // compiler wants match and index to be defined here but the compiler complains about the typings
    if (match?.index !== null && match?.index !== undefined) {

      if (text.length < value.length) {
        return `${value}`;
      }

      return `${text.substring(0, match.index)} ${value} ${text.substring(match.index + match[0].length, text.length)}`;
    } else {
      return text;
    }
  }
}
