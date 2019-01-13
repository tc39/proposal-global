# Naming Constraints

Recently there has been some concern around the naming of the “globalThis” proposal. I would like to address some of the concerns and make transparent the restrictions that the committee had while choosing a name. Hopefully this will help clarify how we got to where we are, and help people think of viable alternatives.

We don’t have the option of doing nothing. In strict mode code (all Modules, and `class`, and anything in `'use strict'` code), the only reliable cross-environment way to get the global is eval via `Function`. This is unavailable in a CSP context - like Chrome apps.

One thing that is important to note, is that this name is not something JavaScript developers should be seeing every day - in fact it should be used rarely, if at all. Environment-specific references to the global will almost certainly remain in use to denote browser-only or node-only APIs - this proposal provides a way for polyfills/shims, build tools, and portable code to have a reliable non-eval means to access the global.


The constraints listed here use the word “must” to indicate an absolute restriction, and the word “should” indicates a restriction that ideally should be respected, but is not necessarily a blocker for achieving consensus. I’ll use the phrase “the global” to describe the object this proposal is providing access to - known in the spec as “the global _this_ value”.

## Constraints:
  1. **Must** be a global identifier, so that it's accessible without previously having access to the global itself.

      #### Names ruled out by this restriction:
      - Symbol.global (or any other symbol)
      - anything that isn't a valid identifier

 1. **Must** be a global identifier, so that it can be "deniable" per compartment - meaning, that two conceptual "compartments" in the same realm must be able to be provided two different objects for the global. This means it can't be stored on any object that's accessible via syntax (ie, undeniable) - so it can't be a property on `Object`, or `Function`, or `Error`, etc. This also means that the name can't meaningfully be "realm"-related, nor can it imply that it's some kind of "ultimate top thing".

     #### Names ruled out by this restriction:
     - `rootRealm`
     - `currentRealm`
     - `shadowRealm`
     - `topGlobal`
     - `rootGlobal`
     - `globalRoot`

 1. **Must** not be related to religion - it wouldn't be appropriate to venture into that arena, and we would not want to risk disrespecting anyone’s spiritual beliefs.

     #### Names ruled out by this restriction:
     - `godObject`
     - `globalGod`

  1. **Must** make sense in non-browser environments, like `node` or Moddable or other non-browser engines

     #### Names ruled out by this restriction:
     - `browser`
     - `browserContext`

  1. <a name=”web-compat”></a> **Must** be web compatible: it turns out that basically anything used for "environment detection" is something that will break sites on the web.

     #### Names ruled out by this restriction:
     - `global` (used in node; broke flickr.com, among others)
     - `self` (used in browsers; also includes `self.instance`)
     - `window` (used in browsers)
     - `top` (used in browsers)
     - `root` (used in node)
     - `GLOBAL` (used in node)

  1. <a name=”related-specs”></a> Names **must** not conflict with related specifications, such as [HTML](https://github.com/tc39/proposal-global#html-and-the-windowproxy).

     #### Names ruled out by this restriction:
     - `globalObject`
     - `globalObj`

  1. **Must** not conflict with the mental model around distinctly defined concepts

     1. Names that imply a reified "scope" object: the object this proposal provides is not the global scope - it doesn't contain properties for global `let`, `const`, or `class` values - only global `function` declarations and global `var`s. It was widely agreed that a name that implied "scope" would cause a large amount of confusion due to these inconsistencies.

        #### Names ruled out by this restriction:
        - `globalScope`
        - `globalContext`
        - `context`
        - `browserContext`
        - `currentGlobalScope`
        - `globalEnv`

     1. Names that imply that a "reference" is a concrete thing in the language, since the language does not have references. Note that there are [future](https://github.com/sebmarkbage/ecmascript-asset-references) [proposals](https://github.com/tc39/proposal-weakrefs) that may add this concept to the language.

        #### Names ruled out by this restriction:
        - `globalRef`
        - `globalReference`

1. **Should** make sense in relation to how naming is used in the JavaScript community so far. In other words, if a name already has a colloquial meaning that does not make sense for the global, it should not be used. The reason for this restriction is that it would lead to added confusion in the language. This rules out the following:

     1. Names that don't connote "global" - colloquially the object this proposal provides is more or less the "global object", despite the constraint above. The general consensus, and my personal opinion, is that the name should contain the word "global" so that its meaning is clear.

        #### Names ruled out by this restriction:
        - `system`
        - `universe`
        - `globe`
        - `shell`
        - `container`

    1.  Names that start with a capital - by overwhelming community convention, names that start with a capital letter (also called “PascalCase”) are typically used only for constructor functions, or for namespaces (like `Math`, `Reflect`, `JSON`, etc) - objects that group related values under one containing object. Since the global is not a function, and is not a container for related objects following a theme, some on the committee felt that these names would not be appropriate.

        #### Names ruled out by this restriction:
        - `Global`
        - `GlobalObject`
        - `Globals`

    1. Names that already have a conflicting meaning in the JS community. Note that this also drastically increases the likelihood of [web compatibility](#web-compat) issues.

        #### Names ruled out by this restriction:
        - `store`
        - `globalStore`
        - `globalMap`
        - `globalExports`
        - `globalEnv`
        - `common`
        - `shared`


 These are the names that have been suggested (by both committee members and the community) that "survive" all of these constraints, with some notes inline:
   - `globalThis`
   - `globals`
   - `globalInstance`
   - `globalValue`
   - `theGlobal`: there's no precedent for using a definite article in a name (and it would make things more difficult for non-native-English speakers, many of whom are members of TC39)
   - `globalVars`: this isn’t accurate because it includes function declarations and can include properties added without using `var`.
   - `__global__`: There exists the pattern of using `__` in other places, most notably `__proto__` - but this was a legacy pattern, and one that the committee did not want to repeat. Node.js uses the double underscore for `__dirname` and `__filename` in CommonJS modules, but this pattern will no longer be used in ES Modules. Python uses the double underscore for built-ins that need to avoid conflicts with userland, such as `__init__`.

### How we came to `globalThis`:

Given that `global` ended up failing due to web compatibility issues, browsers were hesitant to ship another identifier that might break sites - so the next step was to gather usage data. Doing so presents a cost to browsers, and so I was requested to prune the list down to 3 or 4 options - a short list. While I’d hoped to gather as much data as possible, as the proposal champion, I had to make a choice: so I chose these names, with these reasons:
- `global`: as a control, and to provide appropriate scale for the other names
- `globals`: my personal favorite, since my first choice was unavailable
- `globalThis`: while this is not a name in common usage, it matches the spec’s existing terminology, and accurately describes the global.
- `globalObject`: despite the [constraint](#related-specs) noted above, this name seemed closest to common usage in the community, and I wanted to either decisively rule it out, or attempt to persuade the committee that the collision with the HTML spec might be worth it.

The results confirmed that `global` was out, and that of the remaining three names, `globals` had significantly more usage than the other two (albeit, much less than `global`), and `globalThis` had less usage than `globalObject`. I presented these findings to the committee with a recommendation to go with `globalThis`, and the recommendation received consensus: [notes part 1](https://github.com/rwaldron/tc39-notes/blob/c2aaad7ef4a348b7ab019cca9f19b07f7484478a/es9/2018-07/july-24.md#new-name-for-global) / [notes part 2](https://github.com/rwaldron/tc39-notes/blob/c2aaad7ef4a348b7ab019cca9f19b07f7484478a/es9/2018-07/july-25.md#revisit-global-name). Within a month, V8 had announced its [intent to ship](https://groups.google.com/a/chromium.org/d/msg/blink-dev/6fxzDrO-9Oc/Pm4cGt8qBAAJ).

### What we, as a committee, could have done better:

We should have communicated better and clearer with the community, as otherwise we would not be having a naming discussion so late in the process. Without a doubt, this document should have been written sooner. Although this has been implemented by a browser engine already, that doesn’t mean things are set in stone. If a viable alternative arises, there is certainly wiggle room.

During the November 2018 meeting, some user feedback was received claiming that `globalThis` was a confusing name due to the overall confusion around `this` in JavaScript, and due to Modules not having a top-level `this` value. While some members of the committee were concerned about this claim, the overall consensus was to proceed with `globalThis`.

All feedback is welcomed. In particular, if you have a suggestion that meets the above constraints, please [file an issue](https://github.com/tc39/proposal-global/issues/new) - and if you think that any part of this document can be clarified, please [file an issue](https://github.com/tc39/proposal-global/issues/new) or [create a pull request](https://github.com/tc39/proposal-global/compare)!
