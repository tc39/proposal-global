<figure>
  <figcaption>Well-known Intrinsic Objects</figcaption>
  <table>
    <tbody>
      <tr>
        <th>Intrinsic Name</th>
        <th>Global Name</th>
        <th>ECMAScript Language Association</th>
      </tr>
      <tr>
        <td>%SyntaxErrorPrototype%</td>
        <td><code>SyntaxError.prototype</code></td>
        <td>The initial value of the <code>prototype</code> property of %SyntaxError%</td>
      </tr>
      <tr>
        <td>%System%</td>
        <td><code>System</code></td>
        <td>
          The <code>System</code> object (<a href="#the-system-object">1</a>)
        </td>
      </tr>
      <tr>
        <td>%ThrowTypeError%</td>
        <td></td>
        <td>A function object that unconditionally throws a new instance of %TypeError%</td>
      </tr>
    </tbody>
  </table>
</figure>

# The System Object
The System object is the %System% intrinsic object and the initial value of the `System` property of the global object. The System object is an ordinary object.

The value of the [[Prototype]] internal slot of the System object is the intrinsic object %ObjectPrototype% (<a href="http://tc39.github.io/ecma262/#sec-properties-of-the-object-prototype-object">19.1</a>).

The System object is not a function object. It does not have a [[Construct]] internal method; it is not possible to use the System object as a constructor with the `new` operator. The System object also does not have a [[Call]] internal method; it is not possible to invoke the System object as a function.

## System.global
This is a data property with an initial value of the global object.

This property has the attributes { [[Writable]]: **false**, [[Enumerable]]: **false**, [[Configurable]]: **true** }.
