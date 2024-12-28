import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as jalaali from 'jalaali-js';

@Injectable()
export class JalaliDateParserFormatter extends NgbDateParserFormatter {

  // Helper method to pad numbers with leading zeros
  private padNumber(value: number | null): string {
    return value !== null ? `0${value}`.slice(-2) : '';
  }

  // Parse the string representation of the date to NgbDateStruct
  parse(value: string): NgbDateStruct | null {
    if (!value) return null;
    const [year, month, day] = value.split('/').map(val => parseInt(val, 10));
    return { year, month, day };
  }

  // Format the NgbDateStruct to a string representation in Jalali format
  format(date: NgbDateStruct | null): string {
    if (!date) return '';
    const jDate = jalaali.toJalaali(date.year, date.month, date.day);
    return `${jDate.jy}/${this.padNumber(jDate.jm)}/${this.padNumber(jDate.jd)}`;
  }
}
