class Pokemon {
	id;
	name;
	main_type;
	types;
	image;
	abilities;
	_height;
	_weight;

	get main_typeColor() {
		const type = this.main_type;
		let color = '';

		switch (type) {
			case 'normal':
				color = '#bbbcae';
				break;
			case 'grass':
				color = '#8cd851';
				break;
			case 'fire':
				color = '#fb5643';
				break;
			case 'water':
				color = '#56acf9';
				break;
			case 'fighting':
				color = '#a95342';
				break;
            case 'flying':
				color = '#77a2fe';
				break;
            case 'poison':
				color = '#a4599a';
				break;
            case 'ground':
				color = '#f0cf5c';
				break;
            case 'rock':
				color = '#cebc72';
				break;
            case 'bug':
				color = '#c2d11e';
				break;
            case 'ghost':
				color = '#7c76d8';
				break;
            case 'electric':
				color = '#fce945';
				break;
            case 'psychic':
				color = '#fe65b8';
				break;
            case 'ice':
				color = '#95f1fe';
				break;
            case 'dragon':
				color = '#8773ff';
				break;
            case 'dark':
				color = '#8b6854';
				break;
            case 'steel':
				color = '#c4c2da';
				break;
            case 'fairy':
				color = '#f9aeff';
				break;
		}

        return color;
	}

	get weight() {
		return `${this._weight / 10} Kg`;
	}

	get height() {
		return `${((this._height * 10) / 100).toFixed(1)} m`;
	}
}
