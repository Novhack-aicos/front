<script >
export let state;

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

let phone='';
let address='';
let message='';

function zayvkaAdd() {

    dispatch('zayvkaAdd', {
        phone: phone,
        address: address,
        message: message
    });
    state = 'zayavka'
}

let active='';
</script>
<div class="container">
      <div class="row">
        <form class="col s12">
          <div class="">
            <div class="input-field col s12">
              <input on:focus={ () => active = 'phone' }  id="phone" type="text" class="validate" bind:value={phone}>
              <label class="{active.indexOf('phone') >=0 || phone.length >0  ? 'active' : '' }" for="phone">Ваш телефон для связи</label>
            </div>
           </div>
           <div class="">
            <div class="input-field col s12">
              <input  on:focus={ () => active = 'address'  } id="address" type="text" class="validate" bind:value={address}>
              <label class="{active.indexOf('address') >=0 || address.length >0  ? 'active' : '' }" for="address">Адрес обьекта*</label>
            </div>
          </div>
          <div class="">
              <div class="input-field col s12">
                <textarea  on:focus={ () => active = 'message' } id="textarea1" class="materialize-textarea" bind:value={message}></textarea>
                <label class="{active.indexOf('message') >=0 || message.length >0  ? 'active' : '' }"  for="textarea1">Сообшение*</label>
              </div>
           </div>
        </form>
      </div>
</div>
<a on:click={zayvkaAdd} class="btn-fix-bottom btn-floating btn-large waves-effect waves-light green add-btn" href="#1"><i class="material-icons">save</i></a>