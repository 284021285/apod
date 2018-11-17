/**   Custom error thrower.   **/
export class CustomError {
  constructor( public name: string ){

  }

  /**   Throw an error with a provided message    **/
  throw( msg: string ) : void {
    throw `[${this.name}] ${msg}`;
  }
}
