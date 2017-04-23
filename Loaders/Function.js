export default {
  load ({state, commit, dispatch}, item) {
    /* eslint-disable  */
    // commit('SET_INIT')
    // alert('DEFAULT ACTION')
    let v = state.data.vars
    let alone = true
    console.log('load function')
    // commit('SET_SUGGEST', )
    if (alone) {
        eval(item.properties.data.function)
    } else {
        dispatch('nextItem')
    }
    /**
    * TODO : INIT Flow Road function
    **/
  }
}
