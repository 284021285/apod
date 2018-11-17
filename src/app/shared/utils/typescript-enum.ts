/**
 *  @name TypescriptEnum
 *  @desc Various utility functions for working with Typescript's "enum" stucture.
 *
 *  USAGE EXAMPLES:
 *  - TypescriptEnum(target).includes(value)
 *  - TypescriptEnum(target).type()
 *  - TypescriptEnum(target).values()
 *
 *
 **/
 export function TypescriptEnum( targetEnum: object ) {
   return {
     hasKey:    (targetKey: string) : boolean => enumHasKey(targetKey, targetEnum),
     hasValue:  (targetValue: EnumValue) : boolean => enumHasValue(targetValue, targetEnum),
     values:    () : EnumValue[] => enumValues(targetEnum),
     keys:      () : string[] => enumKeys(targetEnum),
     type:      () : EnumType => enumType(targetEnum),
   }
 }



/**   Possible types of the "enum" structure    **/
export enum EnumType {
  Numeric = 'numeric',
  String = 'string',
  Mixed = 'mixed'
}

/**   Possible value of an enum key  **/
export type EnumValue = string|number


/**   Get type of the enum  **/
function enumType( targetEnum: any ) : EnumType {
  let values = <(string|number)[]>Object.values( targetEnum );

  // Check whether enum's type is "string".
  if( values.every(
    (val:EnumValue) => typeof val === 'string' && targetEnum[val] === undefined
  )) return EnumType.String;

  // Check whether enum's type is "numeric".
  else if( values.every(
    val => targetEnum[val] !== undefined && targetEnum[val] !== val
  )) return EnumType.Numeric;

  // If enum type is not "numeric", nor "string"
  else return EnumType.Mixed;
}



/**   Get an array of enum values   **/
function enumValues( targetEnum: any ) : (string|number)[] {
  let type = enumType(targetEnum);
  let values = <(string|number)[]>Object.values(targetEnum);

  // Enum type is "String"
  if( type === EnumType.String )
    values = values.filter( val => typeof val === 'string' )

  // Enum type is "Numeric"
  else if( type === EnumType.Numeric )
    values = values.filter( val => typeof val === 'number' )

  // Enum type is "Mixed"
  else if( type === EnumType.Mixed )
    values = values.filter( val => typeof targetEnum[val] !== 'number' )

  return values;
}


/**   Get an array of enum keys   **/
function enumKeys( targetEnum: any ) : string[] {
  return Object
    .keys(targetEnum) // Get list of object keys
    .filter( key => isNaN(+key) ); // Remove numerical indexes
}



/**   Check whether a certain value exists in an enum    **/
function enumHasValue( targetValue: string|number, targetEnum: any ) : boolean {
  return enumValues(targetEnum).includes(targetValue);
}


/**   Check whether a certain key exists in an enum    **/
function enumHasKey( targetKey:string, targetEnum: any ) : boolean {
  return enumKeys(targetEnum).includes(targetKey);
}
