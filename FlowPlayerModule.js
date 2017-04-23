import { ls } from '../Core/localstorage.js'
import loaderDefault from './Loaders/Default.js'
import loaderList from './Loaders/List.js'
import loaderDboperator from './Loaders/Dboperator.js'
import loaderEntity from './Loaders/Entity.js'
import loaderFile from './Loaders/File.js'
import loaderFolder from './Loaders/Folder.js'
import loaderFree from './Loaders/Free.js'
import loaderFunction from './Loaders/Function.js'
import loaderInit from './Loaders/Init.js'
import loaderJson from './Loaders/Json.js'
import loaderRoute from './Loaders/Route.js'
import loaderService from './Loaders/Service.js'
const state = {
  flow: {
    title: 'flowDefault'
  },
  loaders: {
    default: loaderDefault,
    list: loaderList,
    entity: loaderEntity,
    file: loaderFile,
    folder: loaderFolder,
    free: loaderFree,
    function: loaderFunction,
    dboperator: loaderDboperator,
    init: loaderInit,
    json: loaderJson,
    route: loaderRoute,
    service: loaderService
  },
  data: {
    vars: {
      op11: 'toto from flow',
      op12: {
        objet1: {name: 'toto'},
        objet2: {name: 'lorem'},
        objet3: {name: 'impsum'}
      },
      op13: false,
      op14: [42, 123, 4131]
    }
  },
  suggest: {},
  dialog: false,
  interval: {},
  focus: -1,
  itemFocus: {},
  req: {
    input: '',
    reg: '',
    list: {}
  }
}

const mutations = {
  SET_VALUE: (state, value) => {
    state.req.input = value
  },
  SET_SUGGEST: (state, list) => {
    state.suggest = list
  },
  SET_INIT: (state) => {
    /* eslint-disable  */
    alert('set init')
  },
  SET_DIALOG: (state, bool) => {
    if (!bool) {
      clearTimeout(state.interval)
      state.interval = setTimeout(() => { state.dialog = false }, 500)
    } else {
      clearTimeout(state.interval)
      state.dialog = bool
    }
  },
  SET_OPERATOR: (state, operator) => {
    state.operator = ls.set('flowModule.operator', operator)
  },
  SET_FLOW: (state, flow) => {
    state.flow.data = flow
    state.req.list = flow.start
  },
  CLEAR_REQ: (state) => {
    state.req.input = ''
  },
  SET_REQ: (state) => {
    /* eslint-disable  */
    if (state.req.input.length > 0) {
      let reg = ''
      let regexp = '[a-zA-Z0-9\\.\.\\s\_\-]{0,}'
      for (let i = 0; i < state.req.input.length; i++) reg = reg + state.req.input[i] + '{1}(' + regexp + ')'
      state.req.reg = reg
      let list = _.filter(state.suggest, (item) => {
        let r = item.properties.title.match(new RegExp(reg, 'i'))
        return _.isArray(r)
      })
      _.orderBy(list, ['properties.title'])
      state.req.list = list
    } else {
      state.req.list = state.suggest
    }
  },
  SET_FOCUS: (state, focus) => {
    let ks = _.keys(state.req.list)
    let max = ks.length
    if (focus < 0) {
      focus = 0
    } else if (focus >= max) {
      focus = max-1
    }
    state.focus = focus
    state.itemFocus = state.req.list[focus]
  }
}

const getters = {
  flow: state => state.flow,
  dialog: state => state.dialog,
  data: state => state.flow.data.vars,
  req: state => state.req,
  focus: state => state.focus,
  itemFocus: state => state.itemFocus,
  item: (state, id) => state.flow.items[id],
  suggest: state => state.suggest
}

const actions = {
  reqReq ({state, commit}) {
    commit('SET_REQ')
    commit('SET_FOCUS', 0)
  },
  setSuggest ({state, commit}) {
    commit('SET_SUGGEST', 0)
  },
  loadFlow ({state, commit, rootState}, id) {
    // RB Service : flow.load
    window.store.dispatch('getService', {
      id: 'service.id',
      name: 'flowplayer.load',
      cache: true,
      dataSend: {
        id
      },
      callback: (json) => {
        let list = _.filter(json.flow.items, (item, kitem) => {
          return _.includes(json.flow.start, kitem)
        })
        _.orderBy(list, ['properties.title'])
        commit('SET_SUGGEST', list)
        commit('SET_FLOW', json.flow)
        commit('SET_DIALOG', true)
        commit('SET_REQ')
      }
    })
  },
  setDialog: ({ state, commit }, bool) => {
    commit('SET_DIALOG', bool)
  },
  closeDialog: ({ state, commit }, bool) => {
    commit('SET_DIALOG', false)
  },
  prevItem: ({state, commit}, item) => {
    console.log('prev')
  },
  nextItem: ({state, commit}, item) => {
    console.log('next')
  },
  execItem: ({state, commit}, item) => {
    console.log('exec')
  },
  initItem: ({state, commit, dispatch}, item) => {
    commit('SET_DIALOG', false)

    let evalInput = /^[:]{1}/.test(state.req.input)
    let evalNum = /^[0-9]{1,}/.test(state.req.input)

    if (evalNum) {
      dispatch('setModal', 'codebarre : ' + state.req.input)
    } else if (item === undefined || evalInput) {
      if (evalInput) {
        let str = state.req.input.substring(1)
        commit('SET_VALUE', str)
      }
      state.loaders.default.load({state, commit, dispatch}, item)
    } else {
      let loader = state.loaders[item.properties.type.name]
      loader.load({state, commit}, item)
    }
    commit('SET_VALUE', '')
  },
  navFocus ({state, commit, rootState}, inc) {
    let focusIndex = state.focus + inc
    commit('SET_FOCUS', focusIndex)
  },
  clearReq ({commit}) {
    commit('CLEAR_REQ')
  },
  setModal ({state}, content) {
    $('#modal-player-flowDefault .modal-body').html(content)
    $('#modal-player-flowDefault').modal()
  }
}

export const flowPlayerModule = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
