<template>
  <div style="min-height: 50vh">
    <table class="table table-sm mb-0">
      <tbody>
        <tr>
          <td>
            <div class="col-12 pr-1">
              <label for="opdatamultiple">{{'label.multiple' | trans}}</label>
              <input id="opdatamultiple" type="checkbox" v-model="operator.properties.multiple" :disabled="operator.properties.lock" @change="toggleCreateHook">
            </div>
          </td>
          <td>
           <div class="col-12 pr-1">
            <label for="outputbydata">{{'label.outputbydata' | trans}}</label>
            <input id="outputbydata" type="checkbox" v-model="operator.properties.outputbydata" :disabled="operator.properties.lock" @change="toggleCreateHook">
          </div>
         </td>
        </tr>
      </tbody>
    </table>
    <div class="btn-group" style="position:absolute; right: 1.4rem; margin-top: .5rem;" v-if="!operator.properties.lock">
      <a data-close-others="true" data-hover="dropdown" data-toggle="dropdown" href="#" class="btn btn-sm btn-link dropdown-togggle">
        <i class="fa fa-cog"></i>
      </a>
      <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right dropdown-menu-dark">
       <a href="#" @click="contentExplode" class="dropdown-item"> {{"action.explode"|trans}} </a>
       <a href="#" @click="contentImplode" class="dropdown-item"> {{"action.implode"|trans}} </a>
       <a href="#" @click="contentReg('mail')" class="dropdown-item"> {{"action.find_mail"|trans}} </a>
       <a href="#" @click="contentReg('url')" class="dropdown-item"> {{"action.find_url"|trans}} </a>
       <a href="#" @click="contentReg('ip')" class="dropdown-item"> {{"action.find_ip"|trans}} </a>
       <a href="#" @click="contentReg('function')" class="dropdown-item"> {{"action.find_function"|trans}} </a>
       <a href="#" @click="contentReg('img')" class="dropdown-item"> {{"action.find_img"|trans}} </a>
     </div>
   </div>
   <!-- END DROPDOWN HOVER  -->
   <textarea class="form-control mt-1 mb-1 " style="font-size: .6rem; font-weight: normal;" rows="5" v-model="content"></textarea>
   <table class="table table-sm">
     <tbody>
       <tr v-for="(data, kdata, ndata) in operator.properties.data.list ">
         <td style="width: 32px"><span class="text-muted">{{kdata + 1}}.</span></td>
         <td  style="width: calc(100% - 64px)">{{data}}</td>
         <td  style="width: 32px"><a href="#" class="" @click.prevent="delData(data)" v-if="!operator.properties.lock"><i class="fa fa-remove text-danger"></i></a></td>
       </tr>
     </tbody>
   </table>
 </div>
</template>
<script>
  import _ from 'lodash'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'FlowSettingList',
    components: {},
    data () {
      return {
        content: `lorem ipsum
toto@toto.fr
lorem@go.com
http://123.268.13.203
513.68.213.251
251.88.18.3
http://google.fr
http://google.fr?q=fezkmcez
<a href="lemonde.fr?like=aze&o=dzadfzgregr">lien</a>
/imaze.png
/css/style.css
/dist/app.js`
      }
    },
    computed: {
      ...mapGetters('flowModule', ['operator', 'types', 'opdata'])
    },
    methods: {
      ...mapActions(['addUi']),
      ...mapActions('flowModule', ['setOperator', 'saveOperator', 'addHook', 'deleteHook']),
      concatData (dataConcat) {
        let data = []
        if (this.operator.properties.data.list !== undefined) {
          let dataMerge = _.concat(this.operator.properties.data.list, dataConcat)
          data = _.sortedUniq(dataMerge)
        } else {
          data = dataConcat
        }
        this.operator.properties.data.list = _.compact(data)
        this.toggleCreateHook()
        this.setOperator(this.operator)
      },
      contentExplode () {
        let content = _.trim(this.content)
        let list = content.split('\n')
        this.concatData(list)
        this.content = ''
      },
      contentImplode () {
        if (this.operator.properties.data.list !== undefined) {
          this.content = this.operator.properties.data.list.join('\n')
        }
        this.operator.properties.data.list = []
        this.toggleCreateHook()
        this.setOperator(this.operator)
      },
      contentReg (reg) {
        /* eslint-disable  */
        let regs = {
          url: '(http|ftp|https)://(([A-Za-z]{3,9})://)?([-;:&=\+\$,\w]+@{1})?(([-A-Za-z0-9]+\.)+[A-Za-z]{2,3})(:\d+)?((/[-\+~%/\.\w]+)?/?([&?][-\+=&;%@\.\w]+)?(#[\w]+)?)?',
          ip: '((http|ftp|https)://(([A-Za-z]{3,9})://)?){0,}(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){4}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)',
          mail: '([a-zA-Z0-9.\-]{1,}@{1}[a-zA-Z0-9]{1,}.{1}[a-zA-Z]{2,3})?',
          function: '(function [a-zA-Z0-9]{1,}[($a-zA-Z0-9=,/"\'/s\) ]{0,})?',
          img: '(jpg|png|gif|bmp)'
        }
        /**
        * TODO : Corriger la regExp de mail (ne plus avoir les valeurs vides)
        **/

        /**
        * TODO : creer une reg pour filtrer par extensions de fichiers
        **/
        let regFilter = new RegExp(regs[reg], 'ig')
        let contentFilter = this.content.match(regFilter)
        this.concatData(_.compact(contentFilter))

      },
      delData (kdata) {
        this.operator.properties.data.list = _.without(this.operator.properties.data.list, kdata)
        this.toggleCreateHook()
        this.saveOperator()
      },
      toggleCreateHook (e) {
        let outdata = this.operator.properties.outputbydata
        let multiple = this.operator.properties.multiple
        if (outdata && !multiple) {
          console.log('create list')
          this.operator.properties.outputs = {}
          let outputs = {}
          _.forEach(this.operator.properties.data.list, (d, k) => {
            let outputId = 'o' + this.operator.properties.id + k
            outputs[outputId] = {
              label: outputId + ' : ' + d
            }
          })
          this.operator.properties.outputs = outputs
        } else {
          let outputId = 'o' + this.operator.properties.id + '0'
          this.operator.properties.outputs = {}
          this.operator.properties.outputs[outputId] = {
            label: outputId
          }
        }
        this.saveOperator(this.operator)
      }
    }
  }
</script>
<style lang="less">
  table.table-sm {
    tbody tr td{
      padding: .3rem !important;
    }
  }
  .dropdown-menu-sm{
    .dropdown-item{
      font-size: .5rem !!important;
      padding:  .3rem 1rem !important;
    }
  }
  .list-group-data{
  }

  .list-group-sm{
    .form-control{
      font-size: .7rem;
      padding: .3rem;
    }
    .input-group-addon{
      padding-left: .3rem;
      padding-right: .3rem;
    }
  }

</style>