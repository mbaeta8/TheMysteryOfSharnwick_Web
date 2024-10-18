class StickyNavigation {
	
	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.tabContainerHeight = 70;
		let self = this;
		$('.et-hero-tab').click(function() { 
			self.onTabClick(event, $(this)); 
		});
		$(window).scroll(() => { this.onScroll(); });
		$(window).resize(() => { this.onResize(); });
	}
	
	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}
	
	onScroll() {
		this.checkTabContainerPosition();
    this.findCurrentTabSelector();
	}
	
	onResize() {
		if(this.currentId) {
			this.setSliderCss();
		}
	}
	
	checkTabContainerPosition() {
		let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
		if($(window).scrollTop() > offset) {
			$('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
		} 
		else {
			$('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
		}
	}
	
	findCurrentTabSelector(element) {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		$('.et-hero-tab').each(function() {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.tabContainerHeight;
			let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
			if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});
		if(this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}
	
	setSliderCss() {
		let width = 0;
		let left = 0;
		if(this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		$('.et-hero-tab-slider').css('width', width);
		$('.et-hero-tab-slider').css('left', left);
	}
	
}

new StickyNavigation();


const personajes = {
    Eldric: {
        title: "Eldric, el Tejedor de Sombras",
        image: "../img/brujo.JPG",
        description: "Eldric es un brujo anciano y enigmatico, con una larga barba gris y ojos que brillan con un tenue resplandor purpura. Viste tunicas oscuras adornadas con runas arcanas y un amuleto que parece absorber la luz a su alrededor. Su poder proviene de un antiguo pacto con entidades del Reino de las Sombras, lo que le permite invocar criaturas sombrias y lanzar hechizos oscuros que debilitan a sus enemigos. Eldric no solo es un maestro de la magia oscura, sino tambien un astuto estratega que utiliza maldiciones y ilusiones para manipular el campo de batalla a su favor. Sin embargo, su conexion con las fuerzas oscuras le ha dejado una marca, y lucha constantemente contra el riesgo de perderse en la corrupcion.",
        habilidad: "Invocar espectros, maldiciones debilitantes, ilusiones que confunden a los enemigos, y hechizos de drenaje de vida.",
        fortalezas: "Maestro de la magia oscura, inflige poderosas maldiciones, manipula el campo de batalla con criaturas sombrias e ilusiones, drena energia vital de los enemigos para curarse y conjura escudos magicos para defensa flexible.",
        debilidades: "Fragilidad fisica, vulnerable a ataques cuerpo a cuerpo, uso excesivo de magia oscura puede causar corrupcion interna, dependencia de la magia y vulnerable a luz y magia sagrada que anulan sus defensas."
    },
    Thane: {
        title: "Thane, el Campesino Resuelto",
        image: "../img/Campesino.JPG",
        description: "Descripcion completa del Personaje 2.",
        habilidad: "Habilidad del Personaje 2.",
        fortalezas: "Lista de fortalezas del Personaje 2.",
        debilidades: "Lista de debilidades del Personaje 2."
	},
	Noble: {
        title: "Lord Aldric de Valsyre",
        image: "../img/Noble.JPG",
        description: "Lord Aldric de Valsyre es un noble espadachín de porte imponente, con cabello oscuro y barba bien cuidada. Sus ojos grises reflejan una fría determinación, fruto de la tragedia que marcó su vida. Viste con armaduras ligeras y elegantes, diseñadas tanto para la batalla como para la corte, y lleva una espada de acero refinado con empuñadura dorada, símbolo de su linaje. Hábil en combate y tácticas militares, Aldric inspira a sus aliados con su carisma y astucia. Sin embargo, su sed de venganza lo impulsa, y lucha contra el peligro de dejar que su deseo de justicia lo consuma por completo.",
        habilidad: "Estocada Precisa, Llamada a las Armas, Parada Magistral y Estratega Astuto",
        fortalezas: "Carismático líder, hábil espadachín y estratega resiliente.",
        debilidades: "Vulnerable a magia, deseo de venganza que nublada su juicio."
	}
};


function showCharacterInfo(personajeId) {
    const popup = document.getElementById("characterPopup");
    const personaje = personajes[personajeId];

    document.getElementById("popupTitle").textContent = personaje.title;
    document.getElementById("popupImage").src = personaje.image;
    document.getElementById("popupImage").style.display = "block"; 
    document.getElementById("popupDescription").textContent = personaje.description;
    document.getElementById("popupHabilidad").innerHTML = "<strong>Habilidad:</strong> " + personaje.habilidad;
    document.getElementById("popupFortalezas").innerHTML = "<strong>Fortalezas:</strong> " + personaje.fortalezas;
    document.getElementById("popupDebilidades").innerHTML = "<strong>Debilidades:</strong> " + personaje.debilidades;

    popup.style.display = "flex";
}

function closePopup() {
    const popup = document.getElementById("characterPopup");

    popup.style.display = "none";
}