
import * as jalaliMoment from 'jalali-moment';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
export class JalaliDateUtils {
  /**
   * تبدیل تاریخ میلادی به تاریخ شمسی
   * @param date تاریخ به صورت Date یا ISO
   */
  static toJalali(date: Date | string): string {
    const jm = jalaliMoment(date, 'YYYY-MM-DD');
    return jm.format('jYYYY/jMM/jDD');
  }

  /**
   * تبدیل تاریخ شمسی به میلادی
   * @param jalaliDate تاریخ شمسی به صورت رشته
   */
  static toGregorian(jalaliDate: string): Date {
    const jm = jalaliMoment(jalaliDate, 'jYYYY/jMM/jDD');
    return jm.toDate();
  }

  /**
   * فرمت کردن تاریخ شمسی به صورت سفارشی
   * @param date تاریخ شمسی
   * @param format فرمت موردنظر (پیش‌فرض: jYYYY/jMM/jDD)
   */
  static formatJalali(date: Date | string, format: string = 'jYYYY/jMM/jDD'): string {
    return jalaliMoment(date).format(format);
  }

  /**
   * محاسبه فاصله زمانی به شمسی
   * @param date تاریخ هدف
   */
  static fromNow(date: Date | string): string {
    return jalaliMoment(date).fromNow();
  }
}


/**
 * JalaliDateAdapter for converting between NgbDateStruct and Jalali Date string.
 */
export class JalaliDateAdapter extends NgbDateAdapter<string> {
  fromModel(value: string | null): NgbDateStruct | null {
    if (!value) {
      return null;
    }
    const jm = jalaliMoment(value, 'jYYYY/jMM/jDD');
    return {
      year: jm.jYear(),
      month: jm.jMonth() + 1,
      day: jm.jDate(),
    };
  }

  toModel(date: NgbDateStruct | null): string | null {
    if (!date) {
      return null;
    }
    return jalaliMoment(`${date.year}/${date.month}/${date.day}`, 'jYYYY/jMM/jDD').format('jYYYY/jMM/jDD');
  }
}

/**
 * JalaliDateParserFormatter for formatting and parsing Jalali Date.
 */
export class JalaliDateParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct | null {
    if (!value) {
      return null;
    }
    const jm = jalaliMoment(value, 'jYYYY/jMM/jDD');
    return {
      year: jm.jYear(),
      month: jm.jMonth() + 1,
      day: jm.jDate(),
    };
  }

  format(date: NgbDateStruct | null): string {
    if (!date) {
      return '';
    }
    return jalaliMoment(`${date.year}/${date.month}/${date.day}`, 'jYYYY/jMM/jDD').format('jYYYY/jMM/jDD');
  }
}
