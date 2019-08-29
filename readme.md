### Store 

* `Store`
* `state observe`
* `commit`
* `dispatch`
* `get state`


### ModuleConnection 

* `this.modules = new ModuleConnection`

> 收集模块

### installModule

> 将子模块的 getters中与父模块中 getters key一样的收集为 this.getters = [fn, fn], actions, mutations以此类推


