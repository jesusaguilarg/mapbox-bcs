(function () {

	async function fetchData() {
		const response = await fetch("http://localhost:8080/municipios");
		const data = await response.json();
		return data;
	}

	const randColor = function() {
		const letters = '0123456789ABCDEF'
		return `#${Array.from(Array(6).keys(), a => letters[Math.floor(Math.random() * letters.length)]).join('')}`
	}

	const init = async function () {
		mapboxgl.accessToken = "pk.eyJ1Ijoic3Bha3dvcmQiLCJhIjoiY2thaDkzazdvMGRzZDJxb2U5aWc3Nzd2YSJ9.qD-PMnRbe_FOh_aAKKSXww"; //key mapbpx

		const map = new mapboxgl.Map({
			container: "map", 
			style: "mapbox://styles/mapbox/streets-v11", 
			center: [-110.413863, 24.096134], 
			zoom: 6, 
		});

		const {geoData} = await fetchData();

		console.log(geoData);
		let i = 1
		geoData.forEach(data => {
			let color = randColor()
			data.files.forEach(file => {
				let id = `${data.name}${i}`
				map.on("load", () => {
					map.addSource(id, {
						type: "geojson",
						data: file
					})

					map.addLayer({
						id: id,
						type: 'fill',
						source: id,
						paint: {
							"fill-color": color,
						},
					})
				})
				i++
			})
		})

		var el = document.createElement('div');
		el.className = 'marker'



		var marker = new mapboxgl.Marker(el)
		.setLngLat([-110.3670000, 24.5000000])
		.setPopup(new mapboxgl.Popup({ offset: 10 }) // add popups
		.setHTML('<h3>' + 'Descripcion' + '</h3><p>' + 'Hola' + '</p>'))
	  	.addTo(map);

		

		
	};
	init();
})();
