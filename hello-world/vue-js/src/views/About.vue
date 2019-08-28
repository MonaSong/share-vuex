<template>
  <div class="about">
    <h1>This is an about page</h1>

    <span id="aa"></span>
  </div>
</template>

<script>

    let obj = {
        aa: '1213',
    }

    export default {
        data () {
            return {}
        },
        created () {
            this.$nextTick(function () {
        
                document.getElementById('aa').innerHTML = obj.aa;

                this.setData();
            })
        },
        methods: {
            df () {
                Object.defineProperties(obj, {
                    aa: {
                        get: () => {
                            return document.getElementById('aa').innerHTML;
                        },
                        set: (val) => {
                            document.getElementById('aa').innerHTML = val;
                        }
                    }
                })
            },
            setData () {
                this.df();

                setTimeout(() => {
                    obj.aa = 11111111111111
                }, 3000)
            }
        }
    }
</script>
