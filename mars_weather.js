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

const view = {
	selectors: {	
	sol: document.querySelector('.sol'),
	month: document.querySelector('.season'),
	temperature: document.querySelector('.temperature'),
	opacity: document.querySelector('.atmo'),
	sunTime: document.querySelector('.sunTime'),
	meteors: document.querySelectorAll('.meteor'),
	rover: document.querySelectorAll('.wheel'),
	planet: document.getElementById('marsPlanetBig'),
	container: document.getElementById('container'),
	header: document.getElementById('header'),
	root: document.getElementById('root'),
	},
	updateView: function(){
		this.selectors.sol.innerText = `SOL: ${state.sol}`;
		this.selectors.month.innerText = `MONTH: ${state.month}`;
		this.selectors.temperature.innerText = `MIN \xB0C: ${state.minC}\nMAX \xB0C: ${state.maxC}`;
		this.selectors.opacity.innerText = `OPACITY: ${state.opacity}`;
		this.selectors.sunTime.innerText = `SUNRISE: ${state.sunrise}\nSUNSET: ${state.sunset}`;
	},
	headerAnimation: function(){
		this.selectors.planet.classList.add('rotatePlanet');
		this.selectors.rover.forEach( wheel => wheel.classList.add('rotateWheels'));
		this.selectors.meteors.forEach( meteor => meteor.classList.add('meteorShower'));
	},
	showCard: function(){
		this.selectors.header.classList.remove('headerUp');
		this.selectors.root.classList.remove('rootDown');
		this.selectors.header.classList.add('headerDown');
		this.selectors.root.classList.add('rootUp');

	},
	showHeader: function(){
		this.selectors.header.classList.remove('headerDown');
		this.selectors.root.classList.remove('rootUp');
		this.selectors.header.classList.add('headerUp');
		this.selectors.root.classList.add('rootDown');
	}
};





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