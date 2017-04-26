import $ from 'jquery'
import _ from 'lodash'
import types from './Types/types.js'
const state = {
  flow: {
    title: 'new-flow',
    description: '',
    data: {},
    archives: [{title: '22-12-16 13h22', description: 'Archives automatique'}, {title: '22-12-16 12h35', description: 'Archives automatique'}],
    player: {}
  },
  mouse: {
    show: true,
    top: 0,
    left: 0
  },
  space: 18,
  h: [],
  tmp: [],
  capsule: {
    title: '',
    description: '',
    data: {}
  },
  operator: {
    id: 'o1',
    top: 0,
    left: 0,
    properties: {
      title: 'function 1',
      description: '',
      view: `{{item.title}}`,
      data: {
        function: 'alert(v.op11)',
        entity: '',
        repository: '',
        multiple: false,
        free: false,
        data: {},
        hook: {
          i: '',
          c: '',
          o: ''
        }
      },
      type: null
    }
  },
  types,
  lists: {
    files: ['tags.json', 'tmp.tmp'],
    routes: ['blog_index', 'blog_show'],
    entitys: ['RBPost', 'RBTag'],
    dboperator: ['operator8__db166f9509.json', 'operator2__db4126b46d.json', 'groupDOperation__db4612feab.json'],
    inits: ['paperjs', 'colorpicker', 'vupload', 'summernote'],
    folders: ['dir_upload', 'dir_user', 'dir_client'],
    services: ['tag', 'pdf', 'parse'],
    flows: ['flowDefault', 'new-flow', 'new-flow2'],
    capsules: [
      {title: 'cnfpop11', description: 'Lorem ipsum dolor sit amet.', data: {}},
      {title: 'cnfpop12', description: 'Cupiditate perferendis dolores, quo totam magni sed at, quos, eum obcaecati nobis sit laborum ipsa.', data: {}}
    ],
    roles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_DRAW', 'ROLE_WRITER']
  },
  hydrate: {},
  operatorinc: 0,
  autoconnect: false,
  id: 'flowbuilder'
}

const mutations = {
  SET_MOUSE: (state, config) => {
    state.mouse = config
    state.autoconnect = false
  },
  SET_CAPSULE: (state, capsule) => {
    state.capsule = capsule
  },
  NEW_FLOW: (state) => {
    let data = {
      operators: {},
      links: {},
      operatorTypes: {}
    }
    state.flow = {
      title: 'new-flow',
      archives: {},
      data
    }
    state.operatorinc = 0
    state.hydrate = {}
    let dataCur = $('#' + state.id).flowchart('getData')
    _.forEach(dataCur.links, (item, index) => {
      $('#' + state.id).flowchart('deleteLink', index)
    })
    $('#' + state.id).flowchart('setData', {data})
  },
  OPERATOR_INC: (state) => {
    state.operatorinc++
  },
  SET_OPERATOR_INC: (state, inc) => {
    state.operatorinc = inc
  },
  SET_FLOW: (state) => {
    let flow = state.flow.data = $('#' + state.id).flowchart('getData')
    let l = flow.links
    let items = _.keys(flow.operators)
    let lfrom = _.map(l, 'fromOperator')
    let lto = _.map(l, 'toOperator')
    let linked = _.concat(lfrom, lto)
    let alone = _.difference(items, linked)
    let start = _.difference(lfrom, lto)
    let starts = _.uniq(_.concat(start, alone))
    let last = _.difference(lto, lfrom)
    let h = {}
    let connected = (id, type) => {
      /**
      * TODO : Corriger l'export flat des connections par index de hook output
      **/
      if (type === 'from') {
        // from
        let c = _.filter(state.flow.data.links, {toOperator: id})
        let r = _.map(c, (vmap, kmap) => {
          let cfrom = vmap.fromOperator
          let confrom = vmap.toConnector
          connected(vmap.fromOperator, type)
          state.tmp.push({
            connector: confrom,
            from: cfrom,
            fromConnector: vmap.fromConnector
          })
          let flat = _.clone(state.tmp)
          return flat
        })
        return r
      } else {
        // to
        let c = _.filter(state.flow.data.links, {fromOperator: id})
        // console.log(id, c)
        let r = _.map(c, (vmap, kmap) => {
          let cto = vmap.toOperator
          let conto = vmap.fromConnector
          connected(vmap.toOperator, type)
          state.tmp.push({
            connector: conto,
            to: cto,
            toConnector: vmap.toConnector
          })
          let flat = _.reverse(_.clone(state.tmp))
          return flat
        })

        return r
      }
    }
    _.forEach(linked, (v, k) => {
      state.tmp = []
      let froms = connected(v, 'from')
      state.tmp = []
      let tos = connected(v, 'to')
      let data = {
        froms,
        tos
      }
      h[v] = data
    })
    state.hydrate = {
      starts,
      h,
      lfrom,
      lto,
      linked,
      alone,
      start,
      last,
      l
    }
  },
  SET_PLAYER: (state) => {
    state.flow.player = {
      start: state.hydrate.starts,
      items: state.flow.data.operators
    }
  },
  SET_TOGGLE_AUTOCONNECT: () => {
    state.autoconnect = !state.autoconnect
  },
  SET_OPERATOR: (state, operator) => {
    operator.properties.hydrate = state.hydrate.h[operator.id]
    state.operator = operator
  }
}

const getters = {
  operator: state => state.operator,
  capsule: state => state.capsule,
  operators: state => _.orderBy(state.flow.data.operators, ['properties.title']),
  opdata: state => state.operator.properties.data,
  types: state => state.types,
  flow: state => state.flow,
  lists: state => state.lists,
  mouse: state => state.mouse,
  operatorinc: state => state.operatorinc,
  hydrate: state => state.hydrate,
  autoconnect: state => state.autoconnect,
  id: state => state.id
}

const actions = {
  setCapsule ({state, commit}, kroad) {
    let title = _.kebabCase('c ' + state.flow.title + ' ' + state.operator.properties.id + ' ' + kroad)
    let dataCapsule = {
      title,
      description: '',
      data: state.operator.properties.hydrate.tos[kroad]
    }
    /**
    * TODO : Set data capsule config
    **/
    /**
    * TODO : System de crud capsule
    **/
    /* eslint-disable  */
    commit('SET_CAPSULE', dataCapsule)
  },
  autoconnectToggle ({state, commit}) {
    commit('SET_TOGGLE_AUTOCONNECT')
  },
  reqPw ({state, commit}, e) {
    /* eslint-disable  */
    if (!state.operator.properties.lock) {
      let pw = prompt('Mot de passe ?')
      if (pw !== 'aze') {
        state.operator.properties.lock = true
        alert('erreur de mot de passe')
      }
    }
    $('#' + state.operator.properties.id).attr('data-lock', state.operator.properties.lock)
  },
  setPosition ({state}, config) {
    let opSeleted = state.flow.data.operators[config.id]
    opSeleted.top = config.top
    opSeleted.left = config.left
  },
  alignOperators ({state, commit, dispatch}) {
    /**
    * TODO : Améliorer la position des tos pour les aligner depuis le parent et le nombre d'ouput direct
    **/
    let height = state.space * 2
    let width = $('.flowchart-operator').first().outerWidth()
    let top = height
    let left = state.space * 2
    _.forEach(state.hydrate.starts, (id, kid) => {
      left = state.space
      state.flow.data.operators[id]['top'] = top
      state.flow.data.operators[id]['left'] = left

      if (state.hydrate.h[id] !== undefined && state.hydrate.h[id]['tos'] !== undefined) {
        // HookOutput
        _.forEach(state.hydrate.h[id]['tos'], (roads, kroad) => {
          // tos du output
          _.forEach(roads, (to, kto) => {
            left += width + state.space
            state.flow.data.operators[to.to]['top'] = top
            state.flow.data.operators[to.to]['left'] = left
          })
        })
        top += $('.flowchart-operator#' + id).height() + state.space
      } else {
        top += $('.flowchart-operator#' + id).height() + state.space
      }
    })
    $('#' + state.id).flowchart('setData', state.flow.data)
  },
  mouseToggle ({ state, commit }, e) {
    commit('SET_MOUSE', {
      position: {
        top: e.pageY,
        left: e.pageX
      },
      show: !state.mouse.show
    })
  },
  mouseHide ({ state, commit }, e) {
    commit('SET_MOUSE', {
      position: {
        top: e.pageY,
        left: e.pageX
      },
      show: false
    })
  },
  focusPlayer ({ state }) {
    $('#flow-player-' + state.flow.title).focus()
  },
  newFlow ({ state, commit }) {
    /* eslint-disable */
    if (confirm('new')) {
      commit('NEW_FLOW')
      commit('SET_FLOW')
    }
  },
  saveFlow ({ state, commit }) {
    commit('SET_FLOW')
    commit('SET_PLAYER')
    let data = $('#' + state.id).flowchart('getData')
    let dataSend = JSON.stringify({
      meta: state.flow,
      flow: data
    })
    window.store.dispatch('getService', {
      id: 'flow.save',
      name: 'flow.save',
      cache: true,
      dataSend: {
        dataSend,
        operatorinc: state.operatorinc
      },
      callback: (json) => {
      }
    })
  },
  saveOperatorDB ({ state, commit }) {
    let dataOperator = JSON.stringify(state.operator)
    window.store.dispatch('getService', {
      id: 'flow.saveOperator',
      name: 'flow.saveOperator',
      cache: true,
      dataSend: {
        dataOperator
      }
    })
  },
  loadFlow ({state, commit, rootState}) {
    window.store.dispatch('getService', {
      id: 'service.id',
      name: 'flow.load',
      cache: true,
      dataSend: {
        meta: state.flow
      },
      callback: (json) => {
        $('#' + state.id).flowchart('setData', json.flow)
        let operatorsId = _.keys(json.flow.operators)
        let operatorFirst = operatorsId[0]
        $('#' + state.id).flowchart('selectOperator', operatorFirst)
        commit('SET_OPERATOR_INC', json.flow.operatorinc)
      }
    })
  },
  setOperator ({state, commit}, operator) {
    commit('SET_OPERATOR', operator)
  },
  selectOperator ({state, commit}, id) {
    $('#' + state.id).flowchart('selectOperator', id)
  },
  selectLink ({state, commit}, id) {
    $('#' + state.id).flowchart('selectLink', id)
  },
  deleteLink ({state, commit, dispatch}, id) {
    dispatch('selectLink', id)
    dispatch('deleteSelected')
  },
  deleteOperator ({state, commit, dispatch}, id) {
    dispatch('selectOperator', id)
    dispatch('deleteSelected')
  },
  saveOperator ({state, commit}) {
    let pos = $('#' + state.id).flowchart('getOperatorData', state.operator.id)
    let operatorData = {
      top: pos.top,
      left: pos.left,
      properties: state.operator.properties
    }
    $('#' + state.id).flowchart('setOperatorData', state.operator.id, operatorData)
  },
  saveCapsule ({state, commit}, ktos) {
    /**
    * TODO : Enregistrer un jeu de configuration a executer
    **/
    let capsuleTitle = prompt('Nom de la capsule', 'capsule-' + state.operator.properties.title + '-' + ktos)
    alert('ici un editeur de capsule en modal pour editer un jeu de valeur predefini pour ce process')
  },
  importOperator ({state, commit}, operator) {
    /**
    * TODO : Importer Operator locker depuis une liste d'operator preconfigurer
    **/
  },
  setLinks ({state, commit}, config, operator2) {
    $('#' + state.id).flowchart('addLink', {
      fromOperator: operator1,
      fromConnector: 'o' + operator1 + '0',
      toOperator: operator2,
      toConnector: 'i' + operator1 + '0'
    })
  },
  createOperator ({state, commit, dispatch}) {
    let opSeleted = $('#' + state.id).flowchart('getOperatorData', state.operator.id)
    let opSrc = state.operator
    if (state.operator.properties.type === null) {
      state.operator.properties.type = state.types.list
    }

    let pos = {
      top: (opSeleted.top) ? opSeleted.top + state.space : state.space,
      left: (opSeleted.left) ? opSeleted.left + state.space : state.space
    }

    let width = $('.flowchart-operator').first().outerWidth()
    pos.left = (state.autoconnect) ? width + opSeleted.left + state.space : pos.left
    pos.top = (state.autoconnect) ? opSeleted.top : pos.top

    commit('OPERATOR_INC')
    let inc = state.operatorinc
    let id = 'op' + inc
    let loopHook = {
      i: 1,
      o: 1
    }
    let item = {
      top: pos.top,
      left: pos.left,
      properties: {
        id: id,
        title: 'Operator ' + inc,
        description: '-',
        lock: false,
        helper: '-',
        inputs: {},
        outputs: {},
        type: state.operator.properties.type,
        data: state.operator.properties.type.data,
        hydrate: {},
        hook: {
          i: '',
          c: '',
          o: ''
        },
        view: `{{item.title}}`
      }
    }

    for(var ii = 0; ii < loopHook.i; ii++) {
      item.properties.inputs['i' + id + ii] = {label: 'i' + id + ii}
    }

    for(var io = 0; io < loopHook.o; io++) {
      item.properties.outputs['o' + id + io] = {label: 'o' + id + io}
    }

    $('#' + state.id).flowchart('createOperator', id, item)
    $('#' + state.id).flowchart('selectOperator', id)
    
    if (state.autoconnect) {
      /**
      * TODO : Ameliorer la pertinance du system d'auto-connexon (vérigier si le les hook sont deja liés ...)
      **/
      let fromOut = _.last(_.keys(opSrc.properties.outputs))
      let toIn = _.first(_.keys(item.properties.inputs))

      $('#' + state.id).flowchart('addLink', {
        fromOperator: opSrc.properties.id,
        fromConnector: fromOut,
        toOperator: id,
        toConnector: toIn
      })
      //dispatch('setLinks', opSrc.properties.id, id)
    }
  },
  deleteSelected ({state, commit}) {
    /* eslint-disable  */
    if (confirm('delete')) {
      $('#' + state.id).flowchart('deleteSelected')
      let linkId = $('#' + state.id).flowchart('getSelectedLinkId')
      if (linkId !== null) {
        $('#' + state.id).flowchart('deleteLink', linkId)
      }
    }
  },
  changeType ({state, dispatch}) {
    if (confirm('changer le type ?')) {
      state.operator.properties.data = {}
      state.operator.properties.data = state.operator.properties.type.data
      dispatch('saveOperator')
    }
  },
  addHook ({state, dispatch}, type) {
    let ks = _.keys(state.operator.properties[type])
    let hookId = type[0] + state.operator.id + ks.length
    state.operator.properties[type][hookId] = {
      label: hookId
    }
    dispatch('setOperator', state.operator)
    dispatch('saveOperator')
  },
  deleteHook ({state, dispatch}, config) {
    /* eslint-disable  */
    if (confirm('Delete ?')) {
      state.operator.properties[config.type] = _.omit(state.operator.properties[config.type], config.hookId)
      dispatch('setOperator', state.operator)
      dispatch('saveOperator')
    }
  },
  restoreArchive ({state}, archive) {
    /**
    * TODO : Restorer une archive system
    **/
    if (confirm ('Restaurer l\'archive ?')){
      console.log('restore archive', archive)
    }
  },
  deleteArchive ({state}, archive) {
    /**
    * TODO : Supprimer une archive
    **/
    if (confirm ('Supprimer définitivement l\'archive ?')){
      console.log('delete archive', archive)
    }
  },
  init ({state, commit}) {
    $(document).ready(($) => {
      $('#' + state.id).flowchart({
        data: state.flow.data,
        defaultLinkColor : '#323232',
        defaultSelectedLinkColor: '#3C73CE',
        linkWidth : 6,
        linkVerticalDecal: 2,
        distanceFromArrow: -1,
        grid: state.space, 
        onOperatorSelect(operatorId) {
          let operator = state.flow.data.operators[operatorId]
          operator['id'] = operatorId
          commit('SET_OPERATOR', operator)
          $('#tab-flow-operators').trigger('click')
          if (!$('#tab-op, #tab-hook, #tab-properties, #tab-opdebug').hasClass('active')) {
            let idTabLink = '#tab-set' + _.upperFirst(operator.properties.type.name)
            $(idTabLink).trigger('click')
          }
          
          return true
        },
        onOperatorMoved (operatorId, position) {
          return true
        },
        onOperatorCreate (operatorId, operatorData, fullElement) {
          $(fullElement.operator[0]).attr('id', operatorData.properties.id)
          $(fullElement.operator[0]).attr('data-lock', operatorData.properties.lock)
          $(fullElement.operator[0]).addClass('type-'+operatorData.properties.type.name)
          return true
        },
        onAfterChange () {
          commit('SET_FLOW')
          return true
        }
      })
    })
  }
}

export const flowModule = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
