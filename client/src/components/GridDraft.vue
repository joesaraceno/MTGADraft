<template>
	<div class="card-grid">
		<div style="grid-area: empty"></div>

		<div
			v-for="idx in [0, 1, 2]"
			:key="'pick-col-' + idx"
			:class="'clickable pick-col pick-col-' + idx"
			:style="'grid-area: pick-col-' + idx"
		>
			<transition name="fade">
				<i
					class="fas fa-chevron-circle-down fa-3x"
					v-show="picking && isValidChoice(idx)"
					@click="$emit('pick', idx)"
				></i>
			</transition>
		</div>
		<div
			v-for="idx in [0, 1, 2]"
			:key="'pick-row-' + idx"
			:class="'clickable pick-row pick-row-' + idx"
			:style="'grid-area: pick-row-' + idx"
		>
			<transition name="fade">
				<i
					class="fas fa-chevron-circle-right fa-3x"
					v-show="picking && isValidChoice(3 + idx)"
					@click="$emit('pick', 3 + idx)"
				></i>
			</transition>
		</div>
		<div v-for="(c, idx) in state.booster" :key="idx" class="card-slot" :style="'grid-area: card-slot-' + idx">
			<transition name="fade" mode="out-in">
				<div v-if="c" :key="'card-container-' + c.uniqueID">
					<card :card="c"></card>
				</div>
				<div v-else :key="'empty-' + idx">
					<i class="fas fa-times-circle fa-4x" style="color: rgba(255, 255, 255, 0.1)"></i>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import Card from "./Card.vue";
export default {
	components: { Card },
	props: { state: { type: Object, required: true }, picking: { type: Boolean, required: true } },
	methods: {
		isValidChoice: function(choice) {
			let validCards = 0;
			for (let i = 0; i < 3; ++i) {
				//                     Column           Row
				let idx = choice < 3 ? 3 * i + choice : 3 * (choice - 3) + i;
				if (this.state.booster[idx]) ++validCards;
			}
			return validCards > 0;
		},
	},
};
</script>

<style>
.card-grid {
	display: grid;

	grid-template-areas:
		"empty      pick-col-0  pick-col-1  pick-col-2"
		"pick-row-0 card-slot-0 card-slot-1 card-slot-2"
		"pick-row-1 card-slot-3 card-slot-4 card-slot-5"
		"pick-row-2 card-slot-6 card-slot-7 card-slot-8";

	align-items: center;
	justify-items: center;
	justify-content: center;
	grid-template-columns: 3em 300px 300px 300px;
	grid-template-rows: 4em 300px 300px 300px;
}

.pick-col-0:hover ~ .card-slot:nth-child(3n-4) > .card,
.pick-col-1:hover ~ .card-slot:nth-child(3n-3) > .card,
.pick-col-2:hover ~ .card-slot:nth-child(3n-2) > .card,
.pick-row-0:hover ~ .card-slot:nth-child(n + 7):nth-child(-n + 10) > .card,
.pick-row-1:hover ~ .card-slot:nth-child(n + 11):nth-child(-n + 13) > .card,
.pick-row-2:hover ~ .card-slot:nth-child(n + 14):nth-child(-n + 17) > .card {
	-webkit-box-shadow: 0px 0px 20px 1px rgba(0, 115, 2, 1);
	-moz-box-shadow: 0px 0px 20px 1px rgba(0, 115, 2, 1);
	box-shadow: 0px 0px 20px 1px rgba(0, 115, 2, 1);
}
</style>
