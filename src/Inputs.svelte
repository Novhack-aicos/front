<script >
export let id='';
export let name='';
export let placeholder='';
export let label='';
export let classes='input-field col s12';

let active=false;
</script>

<div class={classes}>
  <input on:focus={ () => active = true }  id="{id}" type="text" class="validate">
  <label class="{active.indexOf('phone') >=0  ? 'active' : '' }" for={name}>{label}</label>
</div>