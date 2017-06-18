
/*目的：从store中的state中派生出  一些 一些 状态 ，并不是所有状态


getters函数
*** getter接受state作为其第一个参数，
state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
// 上述为state对象

getters: {
    doneTodos: state => {
        return state.todos.filter(todo => todo.done)
    }
}


***也可以接受其他 getters 作为第二个参数
getters: {  
    doneTodosCount: (state, getters) => {
        return getters.doneTodos.length
    }
}
*/


/* 对外暴露

// Getters 会暴露为 store.getters 对象：可以理解为在外通过

store.getters.doneTodos就调用了getters下面的doneTodos属性。。
getters下面有无数个属性，比如doneTodos属性也是其中之一。

*****在任何组件中使用访问它：
this.$store.getters.doneTodosCount 函数（两个参数函数）
this.$store.getters.doneTodos函数（一个参数函数）

可以换另一种高级的写法来访问：叫做mapGetter辅助函数
******将 store 中的 getters 映射到（******局部计算属性*****）

import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  **********   使用对象展开运算符将 getters 混入 computed 对象中

  []内部的东西应该是Getters模块中的一个方法
访问state状态的方法

    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}

*/
export default {

    changeState (state) { // 将state作为第一个参数，返回state对象{}下面的属性
        return !state.loadingShow;
    },
}