<template>
    <div id="app">
        <!-- <div id="nav">
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link>
            </div>
        <router-view/>-->

        <h4>{{this.$store.state.age}}</h4>

        <button @click="add">同步 点击按钮增加10岁</button>

        <button @click="minus">异步 减的操作</button>

        <p>
            我的年龄是
            <span id="tmp"></span>
        </p>
    </div>
</template>

<script>

let obj = {
    a: 10
}

export default {
    name: "app",
    mounted() {
        setTimeout(() => {
            console.log(this.$store.state);
            console.log(this.$store);
        });

        this.$nextTick(function() {
            document.getElementById("tmp").innerHTML = obj.a;

            this.setData();
        });

        
    },
    methods: {
        add() {
            this.$store.commit("syncAdd", 10);
        },
        minus() {
            this.$store.dispatch("asyncMinus", 10);
        },
        setData () {
            Object.defineProperties(obj, {
                'a': {
                    get () {
                        return document.getElementById('tmp').innerHTML;
                    },
                    set (val) {
                        document.getElementById('tmp').innerHTML = val;
                    }
                }
            })

            setTimeout(function () {
                obj.a = 20;
            }, 3000)
        }
    }
};
</script>
