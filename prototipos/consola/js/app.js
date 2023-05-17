	/*!
		* jsandbox v0.0.1
		* Autor: Javier Rojas
		* Copyright: copia, estudia, evoluciona este código lo que quieras. 
		* Lo he desarrollado como refuerzo para que compruebes de manera rápida los ejemplos de clase pero puedes usarlo como quieras.
		* Si consigues crear algo digno de mención a partir de este código no ovides enviarme una copia.
		* 
		*
		* Date: 2022-04-14
		*/

		//num_panels almacena el número de paneles. Se usa para determinar el alto en función de si son uno dos o tres
		//-Si hay un panel activo, se le da la clase panelL y se ocultan dos otros dos.
		//-Si hay dos paneles activos, se les da la clase panelM y se oculta el otro.
		//-Si los tres paneles están activos, se les da la clase panelS para que quepan todos. 
		var num_panels = 2;

		//Estas variables almacenan en todo momento lo que es ha escrito en cada panel.
		var editorHTML;
		var editorCSS;
		var editorJS;


		$(document).ready(function () {

			//Inicializamos las variables globales del iframe con el resultado el código.
			$('.grid').height($(window).height());
			const contents = $('iframe').contents();
			const body = contents.find('body');
			const styleTag = $('<style></style>').appendTo(contents.find('head'));

			//Cargamos los archivos desde la ruta indicada por los parámetros GET.
			//La varialbe QueryString almacena los parámetros que se hayan recibido mediante GET.

			$(() => {
				$.ajax({
					url: 'examples/ud' + QueryString.ud + '/ex' + QueryString.ex + '/info.txt',
					type: 'GET',
					async: true,
					success: (respuesta) => {
						//Rellemanos el editor html de ACE.
						$("#info").text(respuesta);
					}
				});
			});

			$(() => {
				$.ajax({
					url: 'examples/ud' + QueryString.ud + '/ex' + QueryString.ex + '/doc.html',
					type: 'GET',
					async: true,
					success: (respuesta) => {
						//Rellemanos el editor html de ACE.
						$("#html").text(respuesta);
						//Inicializamos el editor html de ACE.
						editorHTML = ace.edit("html");
						editorHTML.setTheme("ace/theme/chaos");
						editorHTML.getSession().setMode("ace/mode/html");
						editorHTML.setShowFoldWidgets(false);
						editorHTML.container.style.height
					}
				});
			});

			$(() => {
				$.ajax({
					url: 'examples/ud' + QueryString.ud + '/ex' + QueryString.ex + '/style.css',
					type: 'GET',
					async: true,
					success: (respuesta) => {
						//Rellemanos el editor css de ACE.
						$("#css").text(respuesta);
						//Inicializamos el editor css de ACE.
						editorCSS = ace.edit("css");
						editorCSS.setTheme("ace/theme/chaos");
						editorCSS.getSession().setMode("ace/mode/css");
						editorCSS.setShowFoldWidgets(false);
					}
				});
			});

			$(() => {
				$.ajax({
					url: 'examples/ud' + QueryString.ud + '/ex' + QueryString.ex + '/script.js',
					type: 'GET',
					async: true,
					success: (respuesta) => {
						//Rellemanos el editor js de ACE.
						$("#js").text(respuesta);
						//Inicializamos el editor js de ACE.
						editorJS = ace.edit("js");
						editorJS.setTheme("ace/theme/chaos");
						editorJS.getSession().setMode("ace/mode/javascript");
						editorJS.setShowFoldWidgets(false);
					}
				});
			});

			//Visualización dinámica de cambios. Aplicamos el HTML, el CSS cuando pulsamos una tecla en el div html y css.
			$('#html, #css, #js').keyup(function () {
				var $this = $(this);

				if ($this.attr('id') === 'html') {
					body.html(editorHTML.getValue());
					let scriptTagBody = $('<script>').appendTo(body);
					scriptTagBody.text(editorJS.getValue());					
				}
				if ($this.attr('id') === 'css') {
					styleTag.text(editorCSS.getValue());
				}
				//con js no lo hacemos porque se inudaría la consola de mensajes de error, con js el usuario debe pulsar RUN.
			});

			//También aplicamos el HTML, el CSS y el JS al iframe cuando el usuario pulsa RUN.
			$("#run").click(function () {
				body.html(editorHTML.getValue());
				styleTag.text(editorCSS.getValue());
				let scriptTagBody = $('<script>').appendTo(body);
				scriptTagBody.text(editorJS.getValue());
			});

			//Función que cambia el alto de los paneles en función de cuantos hay visibles.
			//-Si hay un panel activo, se le da la clase panelL y se ocultan dos otros dos.
			//-Si hay dos paneles activos, se les da la clase panelM y se oculta el otro.
			//-Si los tres paneles están activos, se les da la clase panelS para que quepan todos. 
			function setHeightPanels() {
				switch (num_panels) {

					case 1:
						$("#htmlPanel").removeClass("panelS");
						$("#htmlPanel").removeClass("panelM");
						$("#cssPanel").removeClass("panelS");
						$("#cssPanel").removeClass("panelM");
						$("#jsPanel").removeClass("panelS");
						$("#jsPanel").removeClass("panelM");
						$("#htmlPanel").addClass("panelL");
						$("#cssPanel").addClass("panelL");
						$("#jsPanel").addClass("panelL");
						break;

					case 2:
						$("#htmlPanel").removeClass("panelS");
						$("#htmlPanel").removeClass("panelL");
						$("#cssPanel").removeClass("panelS");
						$("#cssPanel").removeClass("panelL");
						$("#jsPanel").removeClass("panelS");
						$("#jsPanel").removeClass("panelL");
						$("#htmlPanel").addClass("panelM");
						$("#cssPanel").addClass("panelM");
						$("#jsPanel").addClass("panelM");
						break;

					case 3:
						$("#htmlPanel").removeClass("panelL");
						$("#htmlPanel").removeClass("panelM");
						$("#cssPanel").removeClass("panelL");
						$("#cssPanel").removeClass("panelM");
						$("#jsPanel").removeClass("panelL");
						$("#jsPanel").removeClass("panelM");
						$("#htmlPanel").addClass("panelS");
						$("#cssPanel").addClass("panelS");
						$("#jsPanel").addClass("panelS");
						break;
				}
				// Reescalamos los editores para que se adapten al nuevo tamaño de su div.
				editorHTML.resize();
				editorCSS.resize();
				editorJS.resize();
			};

			// Mostrar y ocultar los paneles.
			$("#switch-html").click(function () {
				$("#htmlPanel").toggle();
				if ($('#switch-html').is(':checked')) {
					$(".title-html").removeClass("title-disable");
					$(".title-html").addClass("title-enable");
					num_panels++;
				} else {
					$(".title-html").removeClass("title-enable");
					$(".title-html").addClass("title-disable");
					num_panels--;
				}
				setHeightPanels();
			});

			$("#switch-css").click(function () {
				$("#cssPanel").toggle();
				if ($('#switch-css').is(':checked')) {
					$(".title-css").removeClass("title-disable");
					$(".title-css").addClass("title-enable");
					num_panels++;
				} else {
					$(".title-css").removeClass("title-enable");
					$(".title-css").addClass("title-disable");
					num_panels--;
				}
				setHeightPanels();
			});

			$("#switch-js").click(function () {
				$("#jsPanel").toggle();
				if ($('#switch-js').is(':checked')) {
					$(".title-js").removeClass("title-disable");
					$(".title-js").addClass("title-enable");
					num_panels++;
				} else {
					$(".title-js").removeClass("title-enable");
					$(".title-js").addClass("title-disable");
					num_panels--;
				}
				setHeightPanels();
			});

			//Ocultamos el panel JS o CSS en función del modo (puede ser css o js)
			//La varialbe QueryString almacena los parámetros que se hayan recibido mediante GET.
			if (QueryString.mode == 'css') {
				$("#switch-js").prop("checked", false);
				$(".title-js").removeClass("title-enable");
				$(".title-js").addClass("title-disable");
				$("#jsPanel").toggle();
			}

			if (QueryString.mode == 'js') {
				$("#switch-css").prop("checked", false);
				$(".title-css").removeClass("title-enable");
				$(".title-css").addClass("title-disable");
				$("#cssPanel").toggle();
			}

		});