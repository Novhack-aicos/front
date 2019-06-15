<script >
export let state;

import {fade} from 'svelte-transitions';
import ZayavkaAdd from './ZayavkaAdd.svelte';

import { db } from './firebase';
import { collectionData } from 'rxfire/firestore';
import { startWith } from 'rxjs/operators';

export let uid;

// Query requires an index, see screenshot below

const query = db.collection('zayavki').where('uid', '==', uid).orderBy('created','desc');

const zayavki = collectionData(query, 'id').pipe(startWith([]));

function add(event) {
    db.collection('zayavki').add({
        uid:uid,
        message:event.detail.message,
        address:event.detail.address,
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

</script>

{#if state == 'zayavka'}
    <div transition:fade>
        <table>
            {#each $zayavki as zayavka}
                <tr>

                    <td>{zayavka.message}</td>
                    <td>{zayavka.status}</td>
                    <td>{zayavka.created}</td>
                </tr>
            {/each}
        </table>

        <a on:click={ () => state = 'zayavka/add' }  class="btn-fix-bottom btn-floating btn-large waves-effect waves-light red add-btn" href="#1"><i class="material-icons">add</i></a>
     </div>
{:else if state == 'zayavka/add'}
    <div transition:fade>
        <ZayavkaAdd  on:zayvkaAdd={add} bind:state></ZayavkaAdd>
     </div>
{/if}
