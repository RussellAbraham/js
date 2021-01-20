# Enumerability

#in = in	
#for = for..in	
#prop = obj.hasOwnProperty,
#enum = obj.propertyIsEnumerable,	
#key = Object.keys,	
#name = Object.getOwnPropertyNames,	
#descriptor = Object.getOwnPropertyDescriptors,	
#own = Reflect.ownKeys()

                               $in    $for    $enum    $names  $ctor  $own
-----------------------------------------------------------------------------------------------
| Enumerable	              | true | true  |	true  |	true  |	true	true	true	true  |
-----------------------------------------------------------------------------------------------
| Nonenumerable	              | true | false |	true  |	false |	false	true	true	true  |
-----------------------------------------------------------------------------------------------
| Symbols keys	              | true | false |	true  |	true  |	false	false	true	true  |
-----------------------------------------------------------------------------------------------
| Inherited Enumerable	      | true | true  |	false |	false |	false	false	false	false |
-----------------------------------------------------------------------------------------------
| Inherited Nonenumerable	  | true | false |	false |	false |	false	false	false	false |
-----------------------------------------------------------------------------------------------
| Inherited Symbols keys	  | true | false |	false |	false |	false	false	false	false |
-----------------------------------------------------------------------------------------------

