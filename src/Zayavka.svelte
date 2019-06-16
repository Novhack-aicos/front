<script >
export let state;

import {fade} from 'svelte-transitions';
import ZayavkaAdd from './ZayavkaAdd.svelte';

import { db } from './firebase';
import { collectionData } from 'rxfire/firestore';
import { startWith } from 'rxjs/operators';

export let uid;
export let user;


// Query requires an index, see screenshot below

const query = db.collection('zayavki').where('uid', '==', uid).orderBy('created','desc');

const zayavki = collectionData(query, 'id').pipe(startWith([]));

function add(event) {

    db.collection('zayavki').add({
        uid:uid,
        message:event.detail.message,
        address:event.detail.address,
        category:event.detail.category,
        organization:event.detail.organization,
        phone:event.detail.phone,
        status: 'new',
        created: Date.now()
    });
}

function updateStatus(event) {
    const { id, newStatus } = event.detail;
    db.collection('zayavki').doc(id).update({ complete: newStatus });
}

function removeItem(event) {
    const { id } = event.detail;
    db.collection('zayavki').doc(id).delete();
}
function convertTime(timestamp) {
	var date = new Date(timestamp);
	// Hours part from the timestamp
	var hours = date.getHours();
	// Minutes part from the timestamp
	var minutes = "0" + date.getMinutes();
	// Seconds part from the timestamp
	var seconds = "0" + date.getSeconds();

	// Will display time in 10:30:23 format
	return  hours + ':' + minutes.substr(-2)+' '+date.getDay()+'.'+date.getMonth()+'.'+date.getFullYear();
}
function shortenStr(str,count=100) {
    if (str.length>count) {
        str= str.replace(/^(.{100}[^\s]*).*/, "$1...");
    }

    return str;
}

</script>

{#if state == 'zayavka'}
    <div transition:fade>
          <ul class="collection">
            {#each $zayavki as zayavka}

                <li class="collection-item avatar">
                  <img src={ user.photoURL } alt="" class="circle">
                  <div class="row">
                        <div class="col s8">{user.displayName}</div>
                        <div class="col s4 date "><span class="">{convertTime(zayavka.created)}</span></div>
                  </div>
                  <div class="row"><div class="col">{shortenStr(zayavka.message)}</div></div>
                  {#if zayavka.organization}
                    <div class="row info"><div class="col"><i class="material-icons">info</i><span>Ваша заявка была назначина {zayavka.organization}, ей был присвоен идентификтор  {zayavka.id}. Время ответа на заявку 5 дней. </span></div></div>
                  {/if}
                  <div class="row address"><div class="col"><i class="material-icons">location_on</i><span>{zayavka.address}</span></div></div>

                </li>
            {/each}
        </ul>

        <a on:click={ () => state = 'zayavka/add' }  class="btn-fix-bottom btn-floating btn-large waves-effect waves-light red add-btn" href="#1"><i class="material-icons">add</i></a>
     </div>
{:else if state == 'zayavka/add'}
    <div transition:fade>
        <ZayavkaAdd  on:zayvkaAdd={add} bind:state></ZayavkaAdd>
     </div>
{/if}
<style>
.collection, .row{
    margin: 0;
}
.collection, .row, .col{
    padding: 0!important;
}
.address{
    font-size: 14px;
    color: #81909a;
}

.date {
    font-size: 14px;
    color: #81909a;
    text-align: right;
}
</style>