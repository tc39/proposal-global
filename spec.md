# Other Properties of the Global Object

## global
The initial value of `globalThis` is the well-known intrinsic object %GlobalThisValue%.

This property has the attributes { [[Writable]]: **true**, [[Enumerable]]: **false**, [[Configurable]]: **true** }.

# Well-Known Intrinsic Objects
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
        <td>%GeneratorPrototype%</td>
        <td></td>
        <td>The initial value of the `prototype` property of %Generator%</td>
      </tr>
      <tr>
        <td>%GlobalThisValue%</td>
        <td><code>globalThis</code></td>
        <td>The initial value of the `globalThis` property of the global object</td>
      </tr>
      <tr>
        <td>%Int8Array%</td>
        <td><code>Int8Array</code></td>
        <td>The `Int8Array` constructor (<emu-xref href="#sec-typedarray-objects"></emu-xref>)</td>
      </tr>
    </tbody>
  </table>
</figure>

# SetRealmGlobalObject ( `realmRec`, `globalObj`, `thisValue` )

The abstract operation SetRealmGlobalObject with arguments `realmRec`, `globalObj`, and `thisValue` performs the following steps:
  1. Let `intrinsics` be `realmRec`.[[Intrinsics]].
  1. If `globalObj` is **undefined**, then
    1. Let `globalObj` be ObjectCreate(`intrinsics`.[[%ObjectPrototype%]]).
  1. Assert: Type(`globalObj`) is Object.
  1. If `thisValue` is **undefined**, let `thisValue` be `globalObj`.
  1. Set `intrinsics`.[[%GlobalThisValue%]] to `thisValue`.
  1. Set `realmRec`.[[GlobalObject]] to `globalObj`.
  1. Let `newGlobalEnv` be NewGlobalEnvironment(`globalObj`, `thisValue`).
  1. Set `realmRec`.[[GlobalEnv]] to `newGlobalEnv`.
  1. Return `realmRec`.
