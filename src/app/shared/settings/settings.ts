import { AbstractControl } from "@angular/forms";
import { Options } from "ngx-chips/core/providers/options-provider";
import { TagModel } from "ngx-chips/core/tag-model";
import { of } from "rxjs/internal/observable/of";

export class Settings {
  public static TagsSettings(): Options {
    return {
      tagInput: {
        placeholder: 'Введіть хеш-тег та натисніть ENTER',
        errorMessages: { 'startsWithAt@': 'Хеш-тег повинен починатись із символу \'#\'' },
        maxItems: 10,
        modelAsStrings: true,
        secondaryPlaceholder: 'Введіть хеш-тег та натисніть ENTER',
        onAdding: (tag: TagModel) => { return of('#' + tag.split('#').join('')); },
        allowDupes: false,
        inputClass: "tags-input form-control",
        validators: [(validator: AbstractControl) => {
          const re = /^#[^ !@#$%^&*(),.?":{}|<>]*$/g;
          if (('#' + validator.value).match(re) == null || validator.value == '') {
            return {
              'wrongValue': true
            };
          }
          return null;
        }]
      },
      dropdown: {
        appendToBody: false
      }
    }
  }
}
