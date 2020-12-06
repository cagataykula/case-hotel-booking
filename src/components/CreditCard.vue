<template>
	<div class="flip-card" :class="{ flip: flip }">
		<div class="flip-card-inner">
			<div class="card-front">
				<div class="card-top">
					<div class="card-provider">
						<img src="../assets/card-providers/mastercard.png" alt="" />
					</div>
				</div>
				<div class="card-number card-font">
					<span :style="{ color: fontColor }" :class="{'card-text-placeholder': !formattedCardNumber && cardNumberPlaceholder}">
						{{ formattedCardNumber || cardNumberPlaceholder }}
					</span>
				</div>
				<div class="card-bottom">
					<div class="card-holder card-font">
						<span :style="{ color: fontColor }" :class="{'card-text-placeholder': !cardHolder && cardHolderPlaceholder}">
							{{ cardHolder || cardHolderPlaceholder }}
						</span>
					</div>
					<div class="card-expire card-font">
						<span class="card-expire-tip">VALID THRU</span>
						<span class="card-expire-dates" :style="{ color: fontColor }" :class="{'card-text-placeholder': (!expireMonth && expireMonthPlaceholder) || (!expireYear && expireYearPlaceholder)}">
							<template v-if="expireMonth || expireMonthPlaceholder">{{ expireMonth || expireMonthPlaceholder }}</template>
							<span
								v-if="expireMonth && expireYear || expireMonthPlaceholder && expireYearPlaceholder"
								class="card-expire-divider"
							>/</span>
							<template>{{ expireYear || expireMonthPlaceholder }}</template>
						</span>
					</div>
				</div>
			</div>
			<div class="card-back">
				<div class="card-cvv card-font text-dark" :class="{'card-text-placeholder': !cvv && cvvPlaceholder}">{{ cvv || cvvPlaceholder }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		cardHolder: {
			type: String,
			required: true
		},
		cardNumber: {
			type: String,
			required: true
		},
		expireMonth: {
			type: String,
			required: true
		},
		expireYear: {
			type: String,
			required: true
		},
		cvv: {
			type: String,
			required: true
		},
		cardHolderPlaceholder: {
			type: String,
			false: true,
			default: 'JOHN DOE'
		},
		cardNumberPlaceholder: {
			type: String,
			required: false,
			default: '1234 1234 1234 1234'
		},
		expireMonthPlaceholder: {
			type: String,
			required: false,
			default: 'MM'
		},
		expireYearPlaceholder: {
			type: String,
			required: false,
			default: 'YY'
		},
		cvvPlaceholder: {
			type: String,
			required: false,
			default: '000'
		},
		fontColor: {
			type: String,
			required: false,
			default: '#eee'
		},
		width: {
			type: Number,
			required: false,
			default: 320
		},
		flip: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	computed: {
		fontClass: function() {
			return {
				placeholder: !this.formattedCardNumber
			}
		},
		formattedCardNumber: function() {
			const value = this.cardNumber.replace(/ /g, '').match(/.{1,4}/g)
			return value ? value.join(' ').substring(0, 19) : this.cardNumber
		}
	},
	methods: {}
}
</script>

<style lang="scss" scoped>
@font-face {
	font-family: 'CreditCardFont';
	src: url('../assets/card-font.ttf') format('truetype');
	font-weight: bold;
	font-style: normal;
}

.fontShadow {
	-webkit-box-shadow: 0px 15px 54px -24px rgba(0, 0, 0, 1);
	-moz-box-shadow: 0px 15px 54px -24px rgba(0, 0, 0, 1);
	box-shadow: 0px 15px 54px -24px rgba(0, 0, 0, 1);
	z-index: 2;
	text-transform: uppercase;
}

.placeholder {
	opacity: 0.3;
}

.noselect {
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Old versions of Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.flip-card {
	background-color: transparent;
	width: 324px;
	height: 204px;
	perspective: 1000px;
	&:hover,
	&.flip {
		.flip-card-inner {
			transform: rotateY(-180deg);
		}
	}
}
.flip-card-inner {
	position: relative;
	width: 100%;
	height: 100%;
	text-align: center;
	transition: transform 0.6s;
	transform-style: preserve-3d;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	border-radius: 10px;
}
.card-front {
	position: absolute;
	width: 100%;
	height: 100%;
	-webkit-backface-visibility: hidden !important;
	backface-visibility: hidden;
	background-image: url('../assets/card-front.png');
	background-size: cover;
	color: black;
	border-radius: 10px;
	padding: 10px;

	.card-provider {
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		img {
			width: 80px;
		}
	}
	.card-number {
		margin-top: 40px;
		padding-top: 40px;
		padding: 10px;
		font-size: 19px;
		white-space: nowrap;
		text-align: left;
		position: absolute;
	}
	.card-bottom {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		.card-holder {
			margin-top: 90px;
			font-size: 19px;
			justify-content: flex-start;
			padding-left: 20px;
			position: absolute;
		}
		.card-expire {
			position: absolute;
			left: 200px;
			top: 150px;
			.card-expire-tip {
				font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
				font-size: 8px;
				line-height: 7px;
				text-align: center;
				white-space: break-spaces;
				width: 20px;
				height: 30px;
				display: inline-block;
				margin-right: 7px;
			}
			.card-expire-dates {
				font-size: 13px;
				.card-expire-divider {
					font-size: 18px !important;
				}
			}
		}
	}
}
.card-back {
	position: absolute;
	width: 100%;
	height: 100%;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	background-image: url('../assets/card-back.png');
	background-size: cover;
	color: white;
	transform: rotateY(-180deg);
	border-radius: 10px;
	padding: 20px;
	.card-cvv {
		margin-top: 65px;
		margin-left: 30px;
	}
}

.card-font {
	font-family: CreditCardFont;
	-webkit-box-shadow: 0px 15px 54px -24px rgba(0, 0, 0, 1);
	-moz-box-shadow: 0px 15px 54px -24px rgba(0, 0, 0, 1);
	box-shadow: 0px 15px 54px -24px rgba(0, 0, 0, 1);
	text-transform: uppercase;
}

.card-text-placeholder {
	opacity: 0.3;
}

@media (max-width: 320px) {
	.flip-card {
		transform: scale(0.8);
	}
}
</style>
