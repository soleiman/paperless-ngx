import { DatePipe } from '@angular/common'
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core'
import { SETTINGS_KEYS } from '../data/ui-settings'
import { SettingsService } from '../services/settings.service'
import * as moment from 'jalali-moment'

const FORMAT_TO_ISO_FORMAT = {
  longDate: 'y-MM-dd',
  mediumDate: 'y-MM-dd',
  shortDate: 'y-MM-dd',
}

const INTERVALS = {
  year: {
    label: $localize`%s year ago`,
    labelPlural: $localize`%s years ago`,
    interval: 31536000,
  },
  month: {
    label: $localize`%s month ago`,
    labelPlural: $localize`%s months ago`,
    interval: 2592000,
  },
  week: {
    label: $localize`%s week ago`,
    labelPlural: $localize`%s weeks ago`,
    interval: 604800,
  },
  day: {
    label: $localize`%s day ago`,
    labelPlural: $localize`%s days ago`,
    interval: 86400,
  },
  hour: {
    label: $localize`%s hour ago`,
    labelPlural: $localize`%s hours ago`,
    interval: 3600,
  },
  minute: {
    label: $localize`%s minute ago`,
    labelPlural: $localize`%s minutes ago`,
    interval: 60,
  },
}

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  private defaultLocale: string

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private datePipe: DatePipe,
    private settings: SettingsService
  ) {
    this.defaultLocale = locale
  }

  transform(
    value: any,
    format?: string,
    timezone?: string,
    locale?: string
  ): string | null {
    let l =
      locale ||
      this.settings.get(SETTINGS_KEYS.DATE_LOCALE) ||
      this.defaultLocale
    let f = format || this.settings.get(SETTINGS_KEYS.DATE_FORMAT)
    if (format === 'relative') {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000)
      if (seconds < 60) return $localize`Just now`
      let counter
      for (const i in INTERVALS) {
        counter = Math.floor(seconds / INTERVALS[i].interval)
        if (counter > 0) {
          const label =
            counter > 1 ? INTERVALS[i].labelPlural : INTERVALS[i].label
          return label.replace('%s', counter.toString())
        }
      }
    }

    if (l === 'fa' || l === 'fa-IR' || l === 'fa-ir') {
      // Convert Gregorian date to Shamsi date
      return moment(value).locale('fa').format(this.jalaliMapFormat(f));
    }
    if (l == 'iso-8601') {
      return this.datePipe.transform(value, FORMAT_TO_ISO_FORMAT[f], timezone)
    } else {
      return this.datePipe.transform(
        value,
        format || this.settings.get(SETTINGS_KEYS.DATE_FORMAT),
        timezone,
        l
      )
    }
  }

  private jalaliMapFormat(format: string): string {
    return format
      .replace(/y/g, 'jYYYY')
      .replace(/Y/g, 'YYYY')
      .replace(/M/g, 'jMM')
      .replace(/d/g, 'jDD')
  }
}
