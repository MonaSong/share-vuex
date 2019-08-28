import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex)
/* eslint-disable */

export default new Vuex.Store({
    modules: {
        ma: {
            state: {
                name: 'zhangsan'
            }
        },
        a: {
            state: {
                x: 1,
            },
            mutations: { 
                syncAdd (state, payload) {
                    console.log('module-a-syncAdd payload', payload);
                    state.age += payload;
                },
                syncMinus (state, payload) {
                    state.age -= payload;
                }
            }
        }
    },
    state: {
        age: 10
    },
    actions: {
        asyncMinus ({ commit, dispatch}, payload) {
            setTimeout(()=>{
                commit('syncMinus', payload)
            })
        }
    },
    getters: {
        myAge(state) {
            return state.age += 10;
        }
    },
    mutations: {
        syncAdd (state, payload) {
            console.log('syncAdd payload', payload);
            state.age += payload;
        },
        syncMinus (state, payload) {
            state.age -= payload;
        }
    }
})
