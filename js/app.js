/*!
 * jsandbox v0.1.0
 * Autor: Javier Rojas
 * Copyright: copia, estudia, evoluciona este código lo que quieras.
 * Lo he desarrollado como refuerzo para que compruebes de manera rápida los ejemplos de clase pero puedes usarlo como quieras.
 * Si consigues crear algo digno de mención a partir de este código no ovides enviarme una copia.
 *
 * Date: 2023-02-22
 */

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PARÁMETROS GET:																											//
// ¿Qué parámetros GET debemos recibir siempre? //////////////////////////////////////////////////////////////////////////////
//																															//
//	querystring.js genera una variable global QueryString que almacena todos los parámetros GET: 							//
//																															//
//	QueryString.iframe		bit que determina si al cargar se en modo iframe: sin <header>	y un botón para maximizar		//
//								0-> muestra el <header>.																	//
//								1-> oculta el <header> y muestra le botón #go-to-web.										//
//  QueryString.ud			ud almacena el número de la unidad.																//
//  QueryString.ex			ex almacena el número del ejemplo.																//
//  QueryString.mode		mode determina si estamos en modo "demo" o "test".												//
// 						 		QueryString.modee = "demo"; Pensado para mostrar ejemplos de código							//
//  							QueryString.mode = "test"; Pensado para que los alumnos practiquen, 						//
//								es como demo, pero se borran códigos y se muestra el panel de ENUNCIADO						//
//	QueryString.runload		bit que determina si al cargar la página se ejecuta el código.									//
//								0-> no ejecutar al cargar.																	//
//								1-> ejecutar al cargar.																		//
//	QueryString.liveserver	bit que determina si se muestran los cambios en tiempo real.									//
//								0-> no muestra cambios en tiempo real.														//
//								1-> muestra cambios en tiempo real.															//
//	QueryString.view		bit que determina si al cargar se muesrta la vista horizontal o vertical.						//
//								0-> muestra la vista vertical.																//
//								1-> muestra la vista horizontal.															//
//	QueryString.dark		bit que determina si al cargar se muesrta el tema oscuro.										//
//								0-> muestra el tema claro.																	//
//								1-> muestra el tema oscuro.																	//
//								2-> muestra el tema de alto contraste para daltónicos.										//
//  QueryString.panels		mode determina qué paneles se muestran maximizados al cargar. Sus valores son seis bits 0 o 1. 	//
//								0-> mostrar minimizado.																		//
//								1-> mostrar maximizado.																		//
//							La posición del bit determina el panel: HTML,CSS,JS,ENUNCIADO,PANTALLA y CONSOLA, por ejemplo:	//
//								Para mostrar HTML, CSS y la salida de PANTALLA tendrá el valor 110010						//
//									---------------------------------------------------------								//
//									|HTML	|CSS	|JS	|ENUNCIADO	|PANTALLA	|CONSOLA	|								//
//									---------------------------------------------------------								//
//									|	1	|	1	|0	|	0		|	1		|	0		|								//
//									---------------------------------------------------------								//
// Ejemplo de get típico:																									//
//																															//
// http://localhost/jsandbox/index.html?iframe=0&ud=1&ex=1&mode=demo&runload=1&liveserver=1&view=1&dark=1&panels=111010		//
// https://javierrojascomercio.github.io/jsandbox/index.html?iframe=0&ud=1&ex=1&mode=demo&runload=1&liveserver=1&view=1&dark=1&panels=111010
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LA CONSTANTE CONFIG:																										//
// Todos los parámetros enviados por get y almacenados en QueryString se vuelcan a CONFIG ////////////////////////////////////
CONFIG = QueryString; //
// Todos los parámetros de configuración están encapsulados en el objeto CONFIG. Si necesitas algún dato, ESTÁ AQUÍ.		//
//																															//
// Nombres de los paneles para poder añadir eventos y atributos mediante un foreach y no repertir 6 veces el mismo código	//
CONFIG.nombreToggles = [
  "#switch-html",
  "#switch-css",
  "#switch-js",
  "#switch-text",
  "#switch-out",
  "#switch-dev",
]; //
CONFIG.nombrePaneles = [
  "#htmlPanel",
  "#cssPanel",
  "#jsPanel",
  "#textPanel",
  "#outPanel",
  "#devPanel",
];
CONFIG.exerciseMatrix = [];
//																															//
// Configuraciones de estilo para los editores de código																	//
/* CONFIG.EditorTema = "one_dark"; */

function setEditorTheme(value) {
  switch (value) {
    case "0":
      CONFIG.EditorTema = "light";
      break;
    case "1":
      CONFIG.EditorTema = "one_dark";
      break;
    case "2":
      CONFIG.EditorTema = "contraste";
      break;
  }
}
setEditorTheme(QueryString.dark);
// en la ruta: js/tools/ace están todos los temas disponibles con el nombre theme-<nombre>.js								//
if (!CONFIG.EditorColorFondo) {
  CONFIG.dark === "0"
    ? (CONFIG.EditorColorFondo = "#FFF")
    : (CONFIG.EditorColorFondo = "#202020");
}

//																															//

// CONFIG también deberá almacenar las Cookies 	cuando se implementen														//

// Antes que nada comprobamos que QueryString esté bien formado, mostramos el tutorial con parámetros por defecto.			//
// También estaría bien comrpobar que:																						//
//	-no se introduce un número de unidad o ejemplo inexistente o que el modo... 											//
//	-o cualquier otra variable tienen valores correctos.																	//
// pero esto solo producirá errores 404 al no poder acceder al recurso, por lo que son asumibles.							//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (
  QueryString.iframe === undefined ||
  QueryString.iframe == "" ||
  QueryString.ud === undefined ||
  QueryString.ud == "" ||
  QueryString.ex === undefined ||
  QueryString.ex == "" ||
  QueryString.mode === undefined ||
  QueryString.mode == "" ||
  QueryString.runload === undefined ||
  QueryString.runload == "" ||
  QueryString.liveserver === undefined ||
  QueryString.liveserver == "" ||
  QueryString.view === undefined ||
  QueryString.view == "" ||
  QueryString.dark === undefined ||
  QueryString.dark == "" ||
  QueryString.panels === undefined ||
  QueryString.panels == "" ||
  QueryString.panels.length != 6
) {
  CONFIG.iframe = "0";
  CONFIG.ud = "0";
  CONFIG.ex = "0";
  CONFIG.mode = "demo";
  CONFIG.runload = "0";
  CONFIG.liveserver = "1";
  CONFIG.view = "1";
  CONFIG.dark = "1";
  CONFIG.panels = ["1", "1", "1", "1", "1", "1"];
  CONFIG.panelsCode = ["1", "1", "1"];
  CONFIG.numPanelsCode = 3;
  CONFIG.panelsOut = ["1", "1", "1"];
  CONFIG.numPanelsOut = 3;
  CONFIG.url = window.location.href;
  CONFIG.textoIframe =
    "<iframe width='100%' height='500px'\n src='" +
    CONFIG.url +
    "'\n" +
    " frameborder='0' \n allowfullscreen='allowfullscreen'>\n</iframe>";
} else {
  CONFIG.panels = QueryString.panels.split("");
  CONFIG.panelsCode = CONFIG.panels.slice(0, 3);
  CONFIG.numPanelsCode = CONFIG.panelsCode.filter((x) => x == "1").length;
  CONFIG.panelsOut = CONFIG.panels.slice(3, 6);
  CONFIG.numPanelsOut = CONFIG.panelsOut.filter((x) => x == "1").length;
  CONFIG.url = window.location.href;
  CONFIG.textoIframe =
    "<iframe width='100%' height='500px'\n src='" +
    CONFIG.url.replace("iframe=0&", "iframe=1&") +
    "'\n" +
    " frameborder='0' \n allowfullscreen='allowfullscreen'>\n</iframe>";
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INICIALIZACIÓN DE TODOS LOS PANELES A PARTIR DE :																		//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//		- CONFIG almacena los parámetros GET y todas las configuraciones.													//
// 		- LOS ARCHIVOS menu.json, doc.html style.css script.js, documentation.txt y exercise.txt							//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Estas variables almacenan en todo momento lo que se ha escrito en cada panel.											//
// Al cargar la página se rellenan a partir de archivos de la ruta "examples/ud-/ex-", 										//
// donde - es el número de ud y de ex, que se reciben como parámetos GET y quedan almacenados en CONFIG						//
//  - editorHTML se rellena con "doc.html"																					//
//  - editorCSS se rellena con "style.css"																					//
//  - editorJS se rellena con "script.js"																					//
//	- editorTXT se rellena con "documentation.txt"																			//
//	- editorEXERCISE se rellena con "exercise.txt"																			//
//  - editorDEV se rellena a partir de las salidas de consola capturadas por "js/tools/console.js"							//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var editorHTML;
var editorCSS;
var editorJS;
var editorTEXT;
var editorDEV;
var editorEXERCISE;
var textoConsola = "Mensajes de CONSOLA:\n>\n";
var tabindex = 9; // contador para los tabindex de la página
var cookie = { html: "", css: "", js: "", config: {} };

$(document).ready(function () {
  // Inicializamos las variables globales del iframe con el resultado el código.
  $(".grid").height($(window).height());
  const contents = $("iframe").contents();
  const body = contents.find("body");
  const head = contents.find("head");
  //Añadimos fontawesome para los ejercicios que lo usan:
  head.html(
    '<link rel="stylesheet" href="plugins/fontawesome/font-awesome.min.css">'
  );
  const styleTag = $("<style></style>").appendTo(head);

  // Cargamos los archivos desde la ruta indicada por los parámetros GET.
  // La varialbe QueryString almacena los parámetros que se hayan recibido mediante GET.

  // Pedimos el archivo 'examples/menu.json' que almacena el número y la descripción de cada ejemplo.
  $(() => {
    $.ajax({
      url: "examples/menu.json",
      type: "GET",
      async: true,
      success: (respuesta) => {
        // Rellemanos el menú
        respuesta["menu"].ud.forEach((unidad) => {
          let unidadTxt = "UD " + unidad.numero + ". " + unidad.titulo;
          $("#menu").append("<li><h4>" + unidadTxt + "</h4></li>");
          let ejercicios = [];
          unidad.ejemplos.ej.forEach((ejemplo) => {
            let ejercicioActual = "";
            if (unidad.numero == CONFIG.ud && ejemplo.numero == CONFIG.ex)
              ejercicioActual = "class= 'actual'";

            let enlaceEjemplo =
              "<li >" +
              "<a tabindex = '" +
              tabindex +
              "' href='index.html?" +
              "iframe=" +
              CONFIG.iframe +
              "&" +
              "ud=" +
              unidad.numero +
              "&" +
              "ex=" +
              ejemplo.numero +
              "&" +
              "mode=" +
              CONFIG.mode +
              "&" +
              "runload=" +
              CONFIG.runload +
              "&" +
              "liveserver=" +
              CONFIG.liveserver +
              "&" +
              "view=" +
              CONFIG.view +
              "&" +
              "dark=" +
              CONFIG.dark +
              "&" +
              "panels=" +
              CONFIG.panels.join("") +
              "' " +
              ejercicioActual +
              " ><i class='fa fa-chevron-right' aria-hidden='true'></i>" +
              "EJ" +
              ejemplo.numero +
              ": " +
              ejemplo.info +
              "</a></li>";

            $("#menu").append(enlaceEjemplo);
            tabindex++;

            ejercicios.push(ejemplo.numero);
          });
          CONFIG.exerciseMatrix.push(ejercicios);
        });
        // Rellemanos el info-panel
        // Recogemos el info del ejemplo concreto
        let infoTxt;
        let info;
        //Si es el tutorial se muesta el título literal
        if (CONFIG.ud == "0") {
          info = "<p id='info'>TUTORIAL </p>";
          //Si es cualquier otro ejemplo se muestran sus datos obtenidos del archivo 'examples/menu.json'.
        } else {
          infoTxt = "UD" + CONFIG.ud + " EJ" + CONFIG.ex + "</p><p> ";
          infoTxt +=
            respuesta["menu"].ud[parseInt(CONFIG.ud) - 1].ejemplos.ej[
              parseInt(CONFIG.ex) - 1
            ].info;
          info = "<p id ='info'>" + infoTxt + "</p>";
        }

        $("#info-panel").append(info);
      },
    });
  });

  // Rellenamos los paneles a partir de archivos de la ruta "examples/ud-/ex-", donde - es el número de ud y de ex

  async function initEditors() {
    editorHTML = await initEditorAsync(
      "#html",
      "examples/ud" + CONFIG.ud + "/ex" + CONFIG.ex + "/doc.html",
      "html",
      false,
      true,
      false,
      true,
      CONFIG.ud,
      CONFIG.ex
    );
    editorCSS = await initEditorAsync(
      "#css",
      "examples/ud" + CONFIG.ud + "/ex" + CONFIG.ex + "/style.css",
      "css",
      false,
      true,
      false,
      false,
      CONFIG.ud,
      CONFIG.ex
    );
    editorJS = await initEditorAsync(
      "#js",
      "examples/ud" + CONFIG.ud + "/ex" + CONFIG.ex + "/script.js",
      "javascript",
      false,
      true,
      false,
      false,
      CONFIG.ud,
      CONFIG.ex
    );
    editorTEXT = await initEditorAsync(
      "#text",
      "examples/ud" + CONFIG.ud + "/ex" + CONFIG.ex + "/documentation.txt",
      "text",
      true,
      false,
      true,
      false,
      CONFIG.ud,
      CONFIG.ex
    );
    editorEXERCISE = await initEditorAsync(
      "#exercisePanel",
      "examples/ud" + CONFIG.ud + "/ex" + CONFIG.ex + "/exercise.txt",
      "text",
      true,
      false,
      true,
      false,
      CONFIG.ud,
      CONFIG.ex
    );
    editorDEV = await initEditorAsync(
      "#dev",
      "examples/ud" + CONFIG.ud + "/ex" + CONFIG.ex + "/exercise.txt",
      "text",
      true,
      true,
      true,
      false,
      CONFIG.ud,
      CONFIG.ex
    );
    /* saveCookies(); */

    // Resto del código que depende de los editores
  }

  async function initEditorAsync(
    id,
    url,
    mode,
    isReadOnly,
    isLineNumbers,
    isBlockScrolling,
    isHeight
  ) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        type: "GET",
        async: true,
        success: (respuesta) => {
          if (
            localStorage.getItem(
              "jsandbox-" + mode + CONFIG.ud + "-" + CONFIG.ex
            ) != null
          ) {
            $(id).text(
              localStorage.getItem(
                "jsandbox-" + mode + CONFIG.ud + "-" + CONFIG.ex
              )
            );
          } else {
            $(id).text(respuesta);
          }

          const varRef = ace.edit(id.slice(1));
          varRef.setTheme("ace/theme/" + CONFIG.EditorTema);
          varRef.getSession().setMode("ace/mode/" + mode);
          varRef.session.setUseWrapMode(true);
          varRef.container.style.background = CONFIG.EditorColorFondo;
          varRef.setShowFoldWidgets(false);
          varRef.setShowPrintMargin(false);
          if (mode == "html" || "css" || "javascript") {
            varRef.session.on("change", function (delta) {
              update();
            });
          }
          if (isReadOnly) varRef.setReadOnly(true);
          if (isBlockScrolling) varRef.$blockScrolling = Infinity;
          if (isLineNumbers)
            varRef.renderer.setOption("showLineNumbers", false);
          if (isHeight) varRef.container.style.height;
          resolve(varRef);
        },
        error: (error) => reject(error),
      });
    });
  }

  initEditors();

  // Rellemanos el editor dev de ACE. Representa la consola, no es editable ni muestra números de línea.
  //  No se inicializa cargando un archivo, como los anteriores, sino que lo hace
  //  a partir de las salidas de consola capturadas por "js/tools/console.js".
  // Inicializamos el editor js de ACE.
  /* editorDEV = ace.edit("dev");
  editorDEV.setTheme("ace/theme/" + CONFIG.EditorTema);
  editorDEV.getSession().setMode("ace/mode/text");
  editorDEV.container.style.background = CONFIG.EditorColorFondo;
  editorDEV.setShowFoldWidgets(false);
  editorDEV.setShowPrintMargin(false);
  editorDEV.setReadOnly(true);
  editorDEV.renderer.setOption("showLineNumbers", false);
  editorDEV.$blockScrolling = Infinity; */

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // ASIGNACIÓN DE TODOS LOS EVENTOS:																						//
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Aplicamos el HTML, el CSS y el JS al iframe cuando el usuario pulsa RUN.
  $("#run").click(function () {
    body.html(editorHTML.getValue());
    styleTag.text(editorCSS.getValue());
    // Se incluye jquery también para que funcionen los ejemplos que lo usan.
    let scriptjQueryTagBody = $(
      '<script src="js/tools/jquery-3.6.0.min.js">'
    ).appendTo(body);
    let scriptTagBody = $("<script>").appendTo(body);
    /* let consoleScript = $('<script src="js/tools/console2.js">').appendTo(head); */

    // Si hay un error lo capturamos para mostrarlo también en la consola.

    //--------------------------------------------------------------------------------------------------//
    // * BUG REPORTADO: solo muestra console.log al cargar el documento. No se actualiza con RUN.		//
    // * No muestra los errores. Por ahora con eso es suficiente para el usuario objetivo.				//
    // * Si estás leyendo esto puedes empezar por intentar arreglarlo, a mi no me apetece ahora mismo.	//
    //--------------------------------------------------------------------------------------------------//

    /*     textoConsola = textoConsola + "nuevo" + "\n";
    editorDEV.setValue(textoConsola); */
    //console.log("try {\n" + editorJS.getValue() + " \n} catch(err) { \n console.log(err);\n}");
    scriptTagBody.text(
      "try {\n" +
        editorJS.getValue() +
        " \n} catch(err) { \n console.error(err);\n}"
    );

    //--------------------------------------------------------------------------------------------------//
  });

  // Visualización dinámica de cambios. Aplicamos el HTML, el CSS cuando pulsamos una tecla en el div html y css.
  $("#html, #css, #js").keyup(function () {
    // Si está activada la opción de liveserver en la configuración:
    if (CONFIG.liveserver == "1") {
      var $this = $(this);
      if ($this.attr("id") === "html") {
        body.html(editorHTML.getValue());
        let scriptTagBody = $("<script>").appendTo(body);
        scriptTagBody.text(editorJS.getValue());
      }
      if ($this.attr("id") === "css") {
        styleTag.text(editorCSS.getValue());
      }
      // con js no lo hacemos porque se inudaría la consola de mensajes de error con cada keyup,
      // con js el usuario debe pulsar RUN.
    }
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // ASIGNACIÓN DE TODOS EVENTOS CLIC EN LOS BOTONES:																						//
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $("#exercise").click(function () {
    alert("modo ejercicio aún por desarrollar");

    $(".exercise-container").show();
    $(".config-container").hide();

    $("#modal_container").addClass("show");
    $("#modal_container").css("zIndex", 999);
    $("#closeExercise").focus();
  });

  $("#back").click(function () {
    var currentUd = parseInt(CONFIG.ud);
    var currentEx = parseInt(CONFIG.ex);
    if (currentEx > 1) {
      currentEx--;
    } else {
      if (currentUd > 1) {
        currentUd--;
        currentEx = CONFIG.exerciseMatrix[currentUd].length;
      } else {
        currentUd = CONFIG.exerciseMatrix.length;
        currentEx = CONFIG.exerciseMatrix[currentUd - 1].length;
      }
    }
    window.location.href = `index.html?iframe=${
      CONFIG.iframe
    }&ud=${currentUd}&ex=${currentEx}&mode=${CONFIG.mode}&runload=${
      CONFIG.runload
    }&liveserver=${CONFIG.liveserver}&view=${CONFIG.view}&dark=${
      CONFIG.dark
    }&panels=${CONFIG.panels.join("")}`;
  });

  $("#next").click(function () {
    var currentUd = parseInt(CONFIG.ud);
    var currentEx = parseInt(CONFIG.ex);

    if (CONFIG.exerciseMatrix[currentUd - 1].length === currentEx) {
      if (CONFIG.exerciseMatrix.length === currentUd) {
        currentUd = 1;
        currentEx = 1;
      } else {
        currentUd++;
        currentEx = 1;
      }
    } else {
      currentEx++;
    }

    window.location.href = `index.html?iframe=${
      CONFIG.iframe
    }&ud=${currentUd}&ex=${currentEx}&mode=${CONFIG.mode}&runload=${
      CONFIG.runload
    }&liveserver=${CONFIG.liveserver}&view=${CONFIG.view}&dark=${
      CONFIG.dark
    }&panels=${CONFIG.panels.join("")}`;
  });

  $("#config").click(function () {
    $(".exercise-container").hide();
    $(".config-container").show();

    $("#modal_container").addClass("show");
    $("#modal_container").css("zIndex", 999);
    $("#close").focus();
  });

  function cerrarModal() {
    $("#modal_container").removeClass("show");
    $("#modal_container").css("zIndex", -999);
    $("#run").focus();
  }

  $("#close").click(function () {
    cerrarModal();
  });

  $("#closeExercise").click(function () {
    cerrarModal();
  });

  $(".modal-close").click(function (e) {
    if (e.target !== this) {
      return;
    } else {
      cerrarModal();
    }
  });

  $("#reset").click(function () {
    resetExercise();
  });
  $("#reset-all").click(function () {
    resetAllExercises();
  });

  $("#runload").click(function () {
    let url = CONFIG.url;
    if (CONFIG.runload == "0") {
      url = url.replace("runload=0&", "runload=1&");
    } else {
      url = url.replace("runload=1&", "runload=0&");
    }
    window.location.href = url;
  });

  $("#liveserver").click(function () {
    let url = CONFIG.url;
    if (CONFIG.liveserver == "0") {
      url = url.replace("liveserver=0&", "liveserver=1&");
    } else {
      url = url.replace("liveserver=1&", "liveserver=0&");
    }
    window.location.href = url;
  });

  $("#test").click(function () {
    alert(
      "Falta de implementar, primero hay que hacer modal de preview del ejericicio y no cargar css ni el js"
    );

    let url = CONFIG.url;
    if (CONFIG.mode == "demo") {
      url = url.replace("mode=demo&", "mode=test&");
    } else {
      url = url.replace("mode=test&", "mode=demo&");
    }
    window.location.href = url;
  });

  $("#dark").click(function () {
    let url = CONFIG.url;
    if (CONFIG.dark == "0") {
      url = url.replace("dark=0&", "dark=1&");
    }

    if (CONFIG.dark == "1") {
      url = url.replace("dark=1&", "dark=0&");
    }

    if (CONFIG.dark == "2") {
      url = url.replace("dark=2&", "dark=1&");
    }
    window.location.href = url;
  });

  $("#colorblind").click(function () {
    let url = CONFIG.url;
    if (CONFIG.dark == "0" || CONFIG.dark == "1") {
      url = url.replace("dark=0&", "dark=2&");
      url = url.replace("dark=1&", "dark=2&");
    }

    if (CONFIG.dark == "2") {
      /* url = url.replace("dark=0&", "dark=1&"); */
      url = url.replace("dark=2&", "dark=1&");
    }
    window.location.href = url;
  });

  /* $("#view").click(function () {
    alert(
      "Falta de implementar, primero hay que hacer todos los estilos horizontales"
    );

    let url = CONFIG.url;
    if (CONFIG.view == "0") {
      url = url.replace("view=0&", "view=1&");
    } else {
      url = url.replace("view=1&", "view=0&");
    }
    window.location.href = url;
  }); */

  $("#iframe").click(function () {
    var $bridge = $("<input>");
    $("body").append($bridge);

    $bridge.val(editorIFRAME.getValue()).select();
    document.execCommand("copy");
    $bridge.remove();

    $("#text-copy-iframe").text("¡Copiado!");
    setTimeout(function () {
      $("#text-copy-iframe").text(
        "Clic en el botón para copiar el código html para incrustar el iframe"
      );
    }, 500);
  });

  $("#go-to-web").click(function () {
    CONFIG.url = CONFIG.url.replace("iframe=1&", "iframe=0&");
    window.open(CONFIG.url);
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // ASIGNACIÓN DE TODOS LOS TECLADO:																						//
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  $(document).bind("keydown", function (e) {
    // con ESC se cierra todo y nos colocamos en RUN
    if (e.which == 27) {
      $("#run").focus();
      $("#close").click();
    }

    const events = {
      112: $("#switch-text"),
      113: $("#switch-html"),
      114: $("#switch-css"),
      115: $("#switch-js"),
      116: $("#run"),
      117: $("#switch-dev"),
    };

    if (e.which in events) {
      events[e.which].click();
      e.preventDefault();
      e.stopPropagation();
    }
  });

  $(".button, .float-button").keypress(function (event) {
    if (event.which == 13) {
      event.target.click();
    }
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // FUNCIONES PARA REDIMENSIONAR LOS PANELES:																			//
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // La función setHeightPanelsOnLoad cambia el alto de los paneles en función de cuantos hay visibles.					//
  //	-Si hay un panel activo, se le da la clase panelL(100% de altura) 													//
  //		y se ocultan los otros dos con la clase panel0(0px de altura)													//
  //	-Si hay dos paneles activos, se les da la clase panelM (50% de altura) y se oculta el otro.							//
  //	-Si hay tres paneles activos, se les da la clase panelS (33% de altura) para que quepan todos.						//
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function setHeightPanelsOnLoad() {
    for (let index = 0; index < CONFIG.nombrePaneles.length; index++) {
      const panel = $(CONFIG.nombrePaneles[index]);
      const isPanelVisible = CONFIG.panels[index] === "1";

      panel.removeClass("panelL panelM panelS panel0");

      if (isPanelVisible) {
        const panelesPorLado =
          index < 3 ? CONFIG.numPanelsCode : CONFIG.numPanelsOut;
        const height = "height: calc((100% - 72px) - 48px);";

        switch (panelesPorLado) {
          case 1:
            panel.addClass("panelL").css("height", height);
            break;
          case 2:
            panel.addClass("panelM").css("height", height);
            break;
          case 3:
            panel.addClass("panelS").css("height", height);
            break;
        }
      } else {
        panel.addClass("panel0").css("height", "height: 0px;");
      }
    }

    ajustaAltoIframe();
  }

  // setHeightPanels() se debe llamar siempre que se quiera actualizar el tamaño de los paneles
  function setHeightPanels() {
    setHeightPanelsOnLoad();
    // En Ace Editor es nesario reescalar los editores para que se adapten al nuevo tamaño de su div.
    // Si no se hace cambia su tamaño pero no el tamaño de lo que muestra, por lo que corta líneas de código.
    [editorHTML, editorCSS, editorJS, editorTEXT, editorDEV].forEach((editor) =>
      editor.resize()
    );
  }

  // Mostrar y ocultar los paneles en función de los toggler.

  // Evento clic en el toggler de cada panel
  CONFIG.nombrePaneles.forEach((_, index) => {
    $(CONFIG.nombreToggles[index]).click(function () {
      if (index < 3) {
        CONFIG.panelsCode[index] = CONFIG.panelsCode[index] === "1" ? "0" : "1";
        CONFIG.numPanelsCode += CONFIG.panelsCode[index] === "1" ? 1 : -1;
        CONFIG.panels[index] = CONFIG.panelsCode[index];
      } else {
        let numPanelOut = index - 3;
        CONFIG.panelsOut[numPanelOut] =
          CONFIG.panelsOut[numPanelOut] === "1" ? "0" : "1";
        CONFIG.numPanelsOut += CONFIG.panelsOut[numPanelOut] === "1" ? 1 : -1;
        CONFIG.panels[index] = CONFIG.panelsOut[numPanelOut];
      }
      setHeightPanels();
    });
  });

  setHeightPanelsOnLoad();

  function toggleButton(id, configValue, disabledText, enabledText) {
    const button = $(`#${id}`);
    const text = $(`#text-${id}`);

    if (configValue === "0") {
      button.addClass("button-disable");
      text.text(disabledText);
    } else {
      button.removeClass("button-disable");
      text.text(enabledText);
    }
  }

  function toggleDarkMode(configDark) {
    const darkButton = $("#dark");
    const colorBlindButton = $("#colorblind");

    if (configDark === "0") {
      darkButton.addClass("button-disable");
      colorBlindButton.addClass("button-disable");
      $("#text-dark").text("Activa Modo oscuro");
      $("#text-colorblind").text("Activa Modo alto contraste");
    } else if (configDark === "1") {
      darkButton.addClass("button-enable");
      colorBlindButton.addClass("button-disable");
      $("#text-dark").text("Desactiva Modo oscuro");
      $("#text-colorblind").text("Activa Modo alto contraste");
    } else if (configDark === "2") {
      darkButton.addClass("button-disable");
      colorBlindButton.addClass("button-enable");
      $("#text-dark").text("Activa Modo oscuro");
      $("#text-colorblind").text("Desactiva Modo alto contraste");
    }
  }

  toggleButton(
    "runload",
    CONFIG.runload,
    "Activa ejecutar el código al cargar la página",
    "Desactiva ejecutar el código al cargar la página"
  );

  toggleButton(
    "liveserver",
    CONFIG.liveserver,
    "Activa Live Server",
    "Desactiva Live Server"
  );

  toggleButton(
    "test",
    CONFIG.mode,
    "Activa Modo ejericicio",
    "Desactiva Modo ejericicio"
  );

  toggleButton(
    "view",
    CONFIG.view,
    "Activa Vista vertical",
    "Desactiva Vista vertical"
  );

  if (CONFIG.runload == "1") {
    setTimeout(function () {
      $("#run").trigger("click");
    }, 1000);
  }

  toggleDarkMode(CONFIG.dark);

  var editorIFRAME;
  $("#iframecode").text(CONFIG.textoIframe);
  // Inicializamos el editor html de ACE.
  editorIFRAME = ace.edit("iframecode");
  editorIFRAME.setTheme("ace/theme/" + CONFIG.EditorTema);
  editorIFRAME.getSession().setMode("ace/mode/html");
  editorIFRAME.container.style.background = CONFIG.EditorColorFondo;
  editorIFRAME.setShowFoldWidgets(false);
  editorIFRAME.setShowPrintMargin(false);
  editorIFRAME.container.style.height;

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //	CONFIG.iframe		bit que determina si al cargar se en modo iframe: sin <header>	y un botón para maximizar		//
  //							0-> muestra el <header>.																	//
  //							1-> oculta el <header> y muestra le botón #go-to-web.										//
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function ajustaAltoIframe() {
    if (CONFIG.iframe == "1") {
      $(".panelL").css({ height: "calc(((100%)) - 66px" });
      $(".panelM").css({ height: "calc(((100%) / 2) - 33px" });
      $(".panelS").css({ height: "calc(((100%) / 3) - 22px" });
    }
  }

  ajustaAltoIframe();

  const isIframe = CONFIG.iframe === "1";
  $("#go-to-web").toggle(isIframe);
  $("header").toggle(!isIframe);
  $(".container").css("margin-top", isIframe ? "0px" : "52px");

  $("#run").focus();

  /* setTimeout(function () {
    alert(
      "POR HACER:____________________________________________\n" +
        "-Proyecto: documentar lo que hay hecho, y cómo está hecho \n " +
        "-Que funcione bien la consola con el botón RUN, ahora funciona solo al cargar y con eventos \n " +
        "-Todas las demás funciones de botones de opciones (probar todos) \n " +
        "  *Botón Reiniciar el ejericicio (borra las Cookies que almacenan el HTML, CSS y JS) \n " +
        "  *Botón Descarga el ejercicio \n " +
        "       -Que descargue el contenido de  HTML, CSS y JS, no de los archivos \n " +
        "       -Que descargue las imágenes \n " +
        "  *Botón imprimir \n " +
        "  *Botón y modo ejercicio \n " +
        "  *Modo oscuro(ya está hecho), claro y alto contraste \n " +
        "  *Modo vertical(ya está hecho) y horizontal \n " +
        "-Botones de anterior y siguiente ejericicio en el menú \n " +
        "-Cookies que almacenen el estado actual de HTML, CSS y JS y botón de reiniciar ejercicio de opciones que borra estas cookies \n" +
        "  *Almacenar las Cookies en la variable CONFIG \n" +
        "  *Almacenar la posición de los separadores de los paneles en Cookies para que al hacer F5 no se muevan " +
        "-Todo el modo ejercicio \n " +
        "-REFACTORIZAR EL CÓDIGO HTML, CSS y JS para que quede bien legible y organizado\n "
    );
  }, 2000); */

  function update() {
    localStorage.setItem(
      "jsandbox-html" + CONFIG.ud + "-" + CONFIG.ex,
      editorHTML.getValue()
    );

    localStorage.setItem(
      "jsandbox-css" + CONFIG.ud + "-" + CONFIG.ex,
      editorCSS.getValue()
    );

    localStorage.setItem(
      "jsandbox-javascript" + CONFIG.ud + "-" + CONFIG.ex,
      editorJS.getValue()
    );
  }
  async function resetExercise() {
    localStorage.removeItem("jsandbox-html" + CONFIG.ud + "-" + CONFIG.ex);
    localStorage.removeItem("jsandbox-css" + CONFIG.ud + "-" + CONFIG.ex);
    localStorage.removeItem(
      "jsandbox-javascript" + CONFIG.ud + "-" + CONFIG.ex
    );
    location.reload();
  }

  function resetAllExercises() {
    localStorage.clear();
    location.reload();
  }
});
