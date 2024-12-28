import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as jalaali from 'jalaali-js';

@Injectable()
export class JalaliDateAdapter extends NgbDateAdapter<string> {

  // Convert from model (Jalali date) to NgbDateStruct
  fromModel(value: string | null): NgbDateStruct {
    debugger;
    if (!value) return null;

    if (value.match(/\d\d\d\d\-\d\d\-\d\d/g)) {
      const segs = value.split('-')
      return {
        year: parseInt(segs[0]),
        month: parseInt(segs[1]),
        day: parseInt(segs[2]),
      }
    } else {
      let date = new Date(value)
      return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      }
    }
  }

  // Convert from NgbDateStruct to model (Jalali date)
  toModel(date: NgbDateStruct): string {
    debugger;
    if (!date) return null;

    const gDate = jalaali.toGregorian(date.year, date.month, date.day);
    return (
      gDate.gy.toString().padStart(4, '0') +
      '-' +
      gDate.gm.toString().padStart(2, '0') +
      '-' +
      gDate.gd.toString().padStart(2, '0')
    )
  }
}
