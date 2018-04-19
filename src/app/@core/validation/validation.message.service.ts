import { Injectable } from '@angular/core';
import { ValidationMessages } from '../const/validation.messages.const'

/**
 * Deliver common validation messages app wide
 * @class ValidationMessages
 */
@Injectable()
export class ValidationMessageService {

  public required(name: string): string {
    return ValidationMessages.required
      .replace(/{{name}}/g, this.capitalizeFirstLetter(name));
  }

  public minLength(name: string, minLength: number): string {
    return ValidationMessages.minlength
      .replace(/{{name}}/g, this.capitalizeFirstLetter(name))
      .replace(/{{minlength}}/g, minLength.toString());
  }

  public maxLength(name: string, maxLength: number): string {
    return ValidationMessages.minlength
      .replace(/{{name}}/g, this.capitalizeFirstLetter(name))
      .replace(/{{maxlength}}/g, maxLength.toString());
  }

  private capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
