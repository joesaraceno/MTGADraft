<template>
	<div
		class="card"
		:data-arena-id="card.id"
		:data-cmc="card.cmc"
		@click="$emit('click')"
		@dblclick="$emit('dblclick')"
		:key="`card-${card.uniqueID}`"
		@contextmenu="toggleZoom"
		@mouseleave="disableZoom"
	>
		<card-image :card="card" :language="language" :lazyLoad="lazyLoad"></card-image>
		<slot></slot>
	</div>
</template>

<script>
import CardImage from "./CardImage.vue";
export default {
	name: "Card",
	components: { CardImage },
	props: {
		card: { type: Object, required: true },
		language: { type: String, default: "en" },
		lazyLoad: { type: Boolean, default: false },
	},
	methods: {
		toggleZoom: function (e) {
			e.currentTarget.classList.toggle("zoomedin");
			e.preventDefault();
		},
		disableZoom: function (e) {
			e.currentTarget.classList.remove("zoomedin");
			e.preventDefault();
		},
	},
};
</script>

<style scoped>
.card {
	display: inline-block;
	position: relative;
	text-align: center;
	transition: transform 0.2s ease;
}

.fade-enter-active.card,
.fade-leave-active.card {
	transition: transform 0.25s ease, opacity 0.5s;
}

.card.zoomedin {
	transform: scale(1.75) !important;
	z-index: 2;
	image-rendering: optimizeQuality;
}
</style>
