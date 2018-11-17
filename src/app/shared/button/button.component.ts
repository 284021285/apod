import { Component, Input, HostBinding } from '@angular/core';
import { ButtonType, ButtonSize } from './button';
import { TypescriptEnum, CustomError} from '../utils';

@Component({
  selector: 'apod-button',
  templateUrl: './button.component.pug',
  styleUrls: ['./button.component.styl']
})
export class ButtonComponent {
  private error: CustomError = new CustomError('ButtonComponent');

  @Input() @HostBinding('attr.size')
    size: ButtonSize = ButtonSize.MD;

  @Input() @HostBinding('attr.type')
    type: ButtonType = ButtonType.Contained;

  /**   Validate size property    **/
  validateSize() : void {
    const buttonSizeEnum = TypescriptEnum(ButtonSize);
    const expectedValues = `"${buttonSizeEnum.values().join('"|"')}"`;

    if( !buttonSizeEnum.hasValue(this.size) )
      this.error.throw( `Unexpected button size. Expected: ${expectedValues}` );
  }


  /**   Validate type property    **/
  validateType() : void {
    const buttonTypeEnum = TypescriptEnum(ButtonType);
    const expectedValues = `"${buttonTypeEnum.values().join('"|"')}"`;

    if( !buttonTypeEnum.hasValue(this.type) )
      this.error.throw( `Unexpected button type. Expected: "${expectedValues}"` );
  }


  /** Validate component properties **/
  validate() : void {
    this.validateSize();
    this.validateType();
  }


  /**   Component initialization hook   **/
  ngOnInit() : void {
    this.validate();
  }

  /**   Component change hook   **/
  ngOnChange() : void {
    this.validate();
  }
}
