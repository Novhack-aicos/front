<script >
export let state;

import Map from './Map.svelte';
import debounce from 'debounce';
import { createEventDispatcher } from 'svelte';

let phone='';
let address='';
let message='';
let test = '';
const dispatch = createEventDispatcher();
const getResponse = debounce(getOrg, 300);


function zayvkaAdd() {

    dispatch('zayvkaAdd', {
        phone: phone,
        address: address,
        message: message
    });
    state = 'zayavka'
}

function getOrg() {
    let url = 'http://185.137.233.228:5000/intents';
    //let url = 'http://10.1.38.246:5000/intents';
    let request={
          "context": [
              message
          ],
          address: address
        };
    return fetch(url,{
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(request)
    })
    .then(res => res.json());

}
let response=false;
$: {
    response = getResponse(message,address);
}
let active='';
</script>
<div class="container">
    <div class="row">
        <div class="col s12">
            {#await response}
                <h6>Поиск...</h6>
            {:then response}
                {#if response}
                <div class="as">категория: {response.category}</div><div class="as">организация: {response.organization}</div>
                {/if}
            {/await}
        </div>
    </div>
      <div class="row">
        <form class="col s12">
          <div class="">
            <div class="input-field">
              <input on:focus={ () => active = 'phone' }  id="phone" type="text" class="validate" bind:value={phone}>
              <label class="{active.indexOf('phone') >=0 || phone.length >0  ? 'active' : '' }" for="phone">Ваш телефон для связи</label>
            </div>
           </div>
           <div class="">
             <div class="input-field">
               <textarea on:focus={ () => active = 'message' } id="textarea1" class="materialize-textarea" bind:value={message}></textarea>
               <label class="{active.indexOf('message') >=0 || message.length >0  ? 'active' : '' }"  for="textarea1">Сообшение*</label>
             </div>
          </div>
           <div class="">
            <div class="input-field ">
              <input  on:focus={ () => active = 'address'  } id="address" type="text" class="validate" bind:value={address}>
              <label class="{active.indexOf('address') >=0 || address.length >0  ? 'active' : '' }" for="address">Адрес обьекта*</label>
              <div class="map">
                <Map bind:address></Map>
              </div>
            </div>
          </div>

        </form>
      </div>
</div>
<a on:click={zayvkaAdd} class="btn-fix-bottom btn-floating btn-large waves-effect waves-light green add-btn" href="#1"><i class="material-icons">save</i></a>

<style >
.map {
    width: 100%;
    height: 400px;
}
</style>