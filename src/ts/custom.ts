(() => {
  const dog = {
		checkDataSave(){
			const dogSaved = JSON.parse(localStorage.getItem('dogSaved'));
			if (dogSaved){
				$('#containerImage').removeClass('no-image');
				$('#nameDog').css('color', dogSaved.color);
				$('#nameDog').css('fontFamily', dogSaved.font);
				$('#imgDog').attr('src', dogSaved.img);
				$('.name span').text(dogSaved.name);
			}
		},
    mountComboRaces() {
      fetch('https://dog.ceo/api/breeds/list/all')
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 'success') {
            let count = 0;

            for (const race in res.message) {
              if (Object.values(res.message)[count].length > 0) {
                Object.values(res.message)[count].map((puppy) => {
                  $('#comboBoxRace').append(
                    `<option value='${puppy}-${race}'>${puppy} ${race}</option>`);
                });
              } else {
                $('#comboBoxRace').append(
                  `<option values='${race}'>${race}</option>`);
              }
              count++;
						}
						this.checkDataSave();
          } else {
            alert('Something goes wrong! Try again!');
          }
        })
        .catch((error) => alert('Something goes wrong! Try again later'));
    },
    callDog() {
      const myDog = $('#comboBoxRace').val().split('-');
			let url;
			
			$('.header .spinner-border').removeClass('d-none');
			$('#containerImage').removeClass('no-image');

      if (myDog.length <= 1) {
        url = `https://dog.ceo/api/breed/${myDog[0]}/images/random`;
      } else {
        url = `https://dog.ceo/api/breed/${myDog[1]}/${myDog[0]}/images/random`;
      }

      fetch(url)
        .then((res) => res.json())
        .then((res) => {
					sessionStorage.setItem('img', res.message);
					if (res.status === 'success') $('#imgDog').attr('src', res.message);					
				})
				.then(() => {
					$('.header .spinner-border').addClass('d-none');
				})
        .catch(() => alert('Sorry! This dog has no image :('));
		},
		callColor(){
			const myColor = $('#comboBoxColor').val();
			const color = {
				'Shocking Pink Crayola': '#FB62F6',
				'State Blue': '#645DD7',
				'Persian Green': '#2A9D8F',
				'Jonquil': '#F9C80E',
				'Tart Orange': '#FF4242',
			};
			$('#nameDog').css('color', color[myColor]);

			sessionStorage.setItem('color', color[myColor]);
		},
		callFont(){
			const myFont = $('#comboBoxFont').val();
			const font = {
				'Architects Daughter' : 'Architects Daughter, cursive',
				'Noto Serif' : 'Noto Serif, serif',
				'Oswald' : 'Oswald, sans-serif',
				'Roboto' : 'Roboto, sans-serif',
				'Ubuntu' : 'Ubuntu, sans-serif',
			};
			$('#nameDog').css('fontFamily', font[myFont]);

			sessionStorage.setItem('font', font[myFont]);
		},
		calcData(){
			const newDate = new Date();
			const day = newDate.getDay() < 10 ? `0${newDate.getDay()}` : newDate.getDay();
			let month = newDate.getMonth() + 1;
			month = month < 10 ? `0${month}` : month;
			const date = `${day}/${month}/${newDate.getFullYear()}`;

			return date;
		},
		calcHour(){
			const newHour = new Date();
			const hour = newHour.getHours() < 10 ? `0${newHour.getHours()}` : newHour.getHours();
			const minutes = newHour.getMinutes() < 10 ? `0${newHour.getMinutes()}` : newHour.getMinutes();
			const time = `${hour}:${minutes}`;
			return time;
		},
		saveDog(){
			const color = sessionStorage.getItem('color');
			const font = sessionStorage.getItem('font');
			const img = sessionStorage.getItem('img');
			const name = sessionStorage.getItem('name');
			const date = `${dog.calcData()} às ${dog.calcHour()}`;

			$('.spinner-border').removeClass('d-none');
			setTimeout(() => {
				if (color && font && img && name){
					localStorage.setItem('dogSaved', JSON.stringify({
						name,
						color,
						font,
						img,
						date,
					}));

					alert('Seu Doguinho foi salvo!');
		
				}else{
					alert('Você precisa escolher a raça, a cor, a fonte e digitar o nome antes de salvar');
				}
				$('.spinner-border').addClass('d-none');
			}, 1000);
		},
		showInputName(_this){
			_this.hide();
			$('.input-name-dog').fadeIn();
			$('.input-name-dog').addClass('d-flex');
		},
		closeDogName(_this){
			$('.text-warning').fadeOut();

			_this.closest('div').removeClass('d-flex');
			_this.closest('div').hide();
			$('.name').fadeIn();
		},
		saveDogName(_this){
			const dogName = $('.input-name-dog input').val();

			if (dogName.length){
				$('.text-warning').fadeOut();
				$('.name span').html( dogName );
				_this.closest('div').removeClass('d-flex');
				_this.closest('div').hide();
				$('.name').fadeIn();
				sessionStorage.setItem('name', dogName);

			}else{
				$('.text-warning').show();
			}
		},
  };

	$('#comboBoxRace').on('change', function(){
		dog.callDog();
	});
	
	$('#comboBoxColor').on('change', function(){
		dog.callColor();
	});
	
	$('#comboBoxFont').on('change', function(){
		dog.callFont();
	});

	$('.name').on('click', function(){
		dog.showInputName($(this));
	});

	$('#nameDog').on('click', '#close', function(){
		dog.closeDogName($(this));
	});

	$('#nameDog').on('click', '#saveName', function(){
		dog.saveDogName($(this));
	});
	
	$('#save').on('click', function(){
		dog.saveDog();
	});

	dog.mountComboRaces();
})();
