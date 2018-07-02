//==================STATE HOLDER==================
let state = {
	sol: '--',
	month: '--',
	maxC: '--',
	minC: '--',
	opacity: '--',
	sunset: '--',
	sunrise: '--',
	cardShown: false
};
//==================DOM UPDATE==================
const view = {
	//DOM SELECTORS
	selectors: {	
	sol: document.querySelector('.sol'),
	month: document.querySelector('.season'),
	min: document.querySelector('.min'),
	max: document.querySelector('.max'),
	opacity: document.querySelector('.atmo'),
	sunrise: document.querySelector('.sunrise'),
	sunset: document.querySelector('.sunset'),
	meteors: document.querySelectorAll('.meteor'),
	container: document.getElementById('container'),
	header: document.getElementById('header'),
	root: document.getElementById('root'),
	},
	//UPDATES DOM AFTER API CALL
	updateView: function(){
		this.selectors.sol.innerText = state.sol;
		this.selectors.month.innerText = state.month;
		this.selectors.min.innerText = state.minC;
		this.selectors.max.innerText = state.maxC;
		this.selectors.opacity.innerText = state.opacity;
		this.selectors.sunrise.innerText = state.sunrise;
		this.selectors.sunset.innerText = state.sunset;
	},
	//STARTS ANIMATIONS FOR THE HEADER CARD
	headerAnimation: function(){
		this.selectors.meteors.forEach( meteor => meteor.classList.add('meteorShower'));
	},
	//STARTS ANIMATION HEADER BEHIND ROOT
	showCard: function(){
		this.selectors.header.classList.remove('headerUp');
		this.selectors.root.classList.remove('rootDown');
		this.selectors.header.classList.add('headerDown');
		this.selectors.root.classList.add('rootUp');

	},
	//STARTS ANIMATION ROOT BEHIND HEADER
	showHeader: function(){
		this.selectors.header.classList.remove('headerDown');
		this.selectors.root.classList.remove('rootUp');
		this.selectors.header.classList.add('headerUp');
		this.selectors.root.classList.add('rootDown');
	}
};




//==============MANAGES API CALL AND CARD POSITIONS============
const processor = {
	APIcall: function(){
		fetch('https://api.maas2.jiinxt.com/')
  			.then(function(response) {
  				if(response.ok){
  					return response.json();
  				};
  			})
  			.then(function(data) {
  				state = {
  				sol: String(data.sol),
				month: data.season.split(' ')[1],
				maxC: `${data.max_temp}\xB0`,
				minC: `${data.min_temp}\xB0`,
				opacity: data.atmo_opacity,
				sunset: data.sunset,
				sunrise: data.sunrise,
  			};
  			view.updateView();
  			});
	},
	toggleCards: function(){
		if(state.cardShown){
			view.showHeader();
			state.cardShown = false
		}else{
			view.showCard();
			state.cardShown = true;
		}
	}
};


//===========DOCUMENT LISTENERS AND FUNCTION CALLS==================
document.addEventListener('DOMContentLoaded', function(){
	processor.APIcall();
	view.updateView();
	view.selectors.container.addEventListener('click', function(){
		processor.toggleCards();
	});
	view.selectors.header.addEventListener('mouseenter', function(){
		if(!state.cardShown){
			view.headerAnimation();		
		}
	});
});