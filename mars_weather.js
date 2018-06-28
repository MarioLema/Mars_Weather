let state = {
	sol: '--',
	month: '--',
	maxC: '--',
	minC: '--',
	opacity: '--',
	sunset: '--',
	sunrise: '--',
};

const view = {
	selectors: {	
	sol: document.querySelector('.sol'),
	month: document.querySelector('.season'),
	temperature: document.querySelector('.temperature'),
	opacity: document.querySelector('.atmo'),
	sunTime: document.querySelector('.sunTime')
	},

	updateView: function(){
		this.selectors.sol.innerText = `SOL: ${state.sol}`;
		this.selectors.month.innerText = `MONTH: ${state.month}`;
		this.selectors.temperature.innerText = `MIN \xB0C: ${state.minC}\nMAX \xB0C: ${state.maxC}`;
		this.selectors.opacity.innerText = `OPACITY: ${state.opacity}`;
		this.selectors.sunTime.innerText = `SUNRISE: ${state.sunrise}\nSUNSET: ${state.sunset}`;
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
	}
};

document.addEventListener('DOMContentLoaded', function(){
	processor.APIcall();
	view.updateView();
})





