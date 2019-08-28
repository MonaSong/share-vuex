
/* eslint-disable */ 

// 发布订阅模式

let Vue;

const _forEach = (obj, callback) => {
    Object.keys(obj).forEach(key => {
        callback(key, obj[key]);
    })
}


class ModuleConnection {
    constructor(options) {
        this.register([], options);
    }

    register(path, rootModule) {
        let newModule = {
            _raw: rootModule,
            _children: {},
            state: rootModule.state
        }

        if(path.length === 0) {
            this.root = newModule;
        } else { // [a]
            path.slice(0, -1).reduce ((root, current) => {
                return this.root._children[current];
            }, this.root);

            this.root._children[path[path.length - 1]] = newModule;
        }

        if(rootModule.modules){
            _forEach(rootModule.modules, (moduleName, module) => {
                this.register(path.concat(moduleName), module)
            })
        }
    }
}

class Store {
    constructor (options) {
        // this._s = options.state;
        this._s = new Vue({
            data () {
                return { state: options.state }  // 把对象变成了可监控的对象
            }
        });

        let getters = options.getters || {};
        this.getters = {};

        // 把getters属性定义到 this.getters中，并根据状态的变化，重新执行此函数
        _forEach(getters, (getterName, value) => {
            Object.defineProperty(this.getters, getterName, {
                get: () => {
                return value(this.state);
                }
            });
        });

        let mutations = options.mutations || {};
        this.mutations = {};
        _forEach(mutations, (mutationName, value) => {
            // 先把用户传过来的mutation放到store上
            this.mutations[mutationName] = (payload) => {
                value.call(this, this.state, payload);
            }
        })

        let actions = options.actions || {};
        this.actions = {};
        _forEach(actions, (actionName, value) => {
            this.actions[actionName] = (payload) => {
                value.call(this, this, payload);
            }
        })

        // vuex 模块化
        // 收集模块
        this.modules = new ModuleConnection(options);
    }

    commit = (type, payload) =>{
        this.mutations[type](payload);
    }

    dispatch = (type, payload) => {
        this.actions[type](payload);
    }

    get state () {
        return this._s.state;
    }
}

// vue的组件渲染 先渲染父组件 再渲染子组件  深度优先
// install 默认会被调用
const install = (_Vue) => {
  Vue = _Vue;

  // 需要给每个组建都注册一个this.$store的属性
  Vue.mixin({
    beforeCreate() { // 生命周期  组建创建之前

      // 需要判断是父组件还是子组件，如果是子组件，应该把父组件的store增加给子组件
      if(this.$options && this.$options.store){
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent  && this.$parent.$store;
      }
    },
  })
}

export default {
  install,
  Store
}
