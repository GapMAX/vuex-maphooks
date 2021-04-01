# VUEX-HOOKS

## Usage

参照vuex mapState 等函数用法,或直接调用相关hooks会有代码提示.

## api

1. mapStateToComputed(namespace, options) -- overload --> mapStateToComputed(options)

2. mapMutationsToMethods(namespace, options) -- overload --> mapMutationsToMethods(options)
 
3. mapGettersToComputed(namespace, options) -- overload --> mapGettersToComputed(options)

4. mapActionsToMethods(namespace, options) -- overload --> mapActionsToMethods(options)

## examples

```
// use namespace
const {
  rename
} = mapStateToComputed("a/", {
  rename : "name"
});

or

const {
  name
} = mapStateToComputed("a/", ["name"]);

// no namespace

const {
  reCount
} = mapStateToComputed({
  reCount : "count"
});

const {
  count
} = mapStateToComputed(["count"]);
```