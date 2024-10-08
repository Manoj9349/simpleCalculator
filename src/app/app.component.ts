import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  input: string = '';
  result: number | null = null;
  errorMessage: string | null = null;

  add(numbers: string): number {
    if (!numbers) return 0;

    let delimiter = /[\n,]/;  // Default delimiter is comma or new line

    if (numbers.startsWith('//')) {
      const delimiterEnd = numbers.indexOf('\n');
      delimiter = new RegExp(this.escapeRegExp(numbers.substring(2, delimiterEnd)));
      numbers = numbers.substring(delimiterEnd + 1);
    }

    const tokens = numbers.split(delimiter);
    const negativeNumbers: number[] = [];

    const sum = tokens.reduce((acc, token) => {
      const num = parseInt(token, 10);
      if (num < 0) {
        negativeNumbers.push(num);
      }
      return acc + num;
    }, 0);

    if (negativeNumbers.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(',')}`);
    }

    return sum;
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  calculate() {
    try {
      this.result = this.add(this.input);
      this.errorMessage = null;
    } catch (error) {
      this.errorMessage = (error as Error).message;
      this.result = null;
    }
  }
}
