ExampleComponent = {
    ext_lang: 'example_code',
    formats: ['format_example'],
    struct_support: true,

    factory: function (sandbox) {
        return new ExampleWindow(sandbox);
    }
};

ExampleWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const keynodes = ['ui_example_text_component', 'ui_example_search_component', 'ui_example_answer_button',
    'ui_example_info_block'];
    const textComponent = '#example-' + sandbox.container + " #text-component";
    const searchComponent = '#example-' + sandbox.container + " #search-component";
    const answerButton = '#example-' + sandbox.container + " #answer-button";
    const keyword = '#example-' + sandbox.container + " #keyword";
    const infoBlock = '#example-' + sandbox.container + " #info"

    $('#' + sandbox.container).prepend('<div id="example-' + sandbox.container + '"></div>');

    $('#example-' + sandbox.container).load('static/components/html/example.html', function () {
        getUIComponentsIdentifiers();

        $(answerButton).click(function (event) {
            event.preventDefault();
		makeFileText();

          });
    });

    this.applyTranslation = function () {
        getUIComponentsIdentifiers();
    };

    function getUIComponentsIdentifiers() {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (identifiers) {
                let textComponentScAddr = keynodes['ui_example_text_component'];
                let textComponentText = identifiers[textComponentScAddr];
                $(textComponent).html(textComponentText);
                $(textComponent).attr('sc_addr', textComponentScAddr);
                let searchComponentScAddr = keynodes['ui_example_search_component'];
                let searchComponentText = identifiers[searchComponentScAddr];
                $(searchComponent).html(searchComponentText);
                $(searchComponent).attr('sc_addr', searchComponentScAddr);
                let answerButtonText = identifiers[keynodes['ui_example_answer_button']];
                $(answerButton).html(answerButtonText);
                let infoBlockText = identifiers[keynodes['ui_example_info_block']];
                $(infoBlock).html(infoBlockText);
            });
        });

	
    }

   function makeFileText() {
	
	var ruName = document.querySelector("#ru_name_of_item");
	var engName = document.querySelector("#eng_name_of_item");
	var protection = document.querySelector("#protection_of_item");
	var weight = document.querySelector("#weight_of_item");
	var price = document.querySelector("#cost_of_item");
	var identificator = document.querySelector("#indentificator_of_item");
	var description = document.querySelector("#description");
	var definition = document.querySelector("#definition");

	let radios1 = document.querySelectorAll('input[name="type"]');	
	let radios2 = document.querySelectorAll('input[name="armor"]');	

	var text =  'concept_skyrim_'+ identificator.value + '\n\n';
	text += '=> nrel_main_idtf: [' + engName.value + '] (* <- lang_en;; *)\n';
	text += '=> nrel_main_idtf: ['+ ruName.value + '] (* <- lang_ru;; *);\n'
	text += '<= nrel_inclusion: concept_skyrim_';
	for (let radio of radios1) {
		if (radio.checked) {
			text+= radio.value + ';\n';
		}
	}
	text += '<= nrel_inclusion: concept_skyrim_';
	for (let radio of radios2) {
		if (radio.checked) {
			text+= radio.value + ';\n';
		}
	}	
	text += '=> nrel_baseline_protection: ' + protection.value + ';\n';
  	text += '=> nrel_weight: [' + weight.value + '];\n';
    	text += '=> nrel_default_cost: [' + price.value + '];\n\n'

	text += '<- rrel_key_sc_element: ...\n';
	text += '(*\n';
	text += '	<- definition;;\n';
	text += '	=> nrel_main_idtf:[Опр.('+ ruName.value +')] (* <- lang_ru;; *);;\n';
	text += '	<= nrel_sc_text_translation: ...\n';
	text += '	(*\n';
	text += '		-> ['+ definition.value +'] (* <- lang_ru;; => nrel_format: format_html;; *);;\n';
	text += '	*);;\n';
	text += '*);;\n\n';

	text += '<- rrel_key_sc_element: ...\n';
	text += '(*\n';
	text += '	<- statement;;\n';
	text += '	=> nrel_main_idtf:[Утв.('+ ruName.value +')] (* <- lang_ru;; *);;\n';
	text += '	<= nrel_sc_text_translation: ...\n';
	text += '	(*\n';
	text += '		-> ['+ description.value +'] (* <- lang_ru;; => nrel_format: format_html;; *);;\n';
	text += '	*);;\n';
	text += '*);;\n';






	text += '<- sc_node_not_relation';


	var file = identificator.value + '.scs';
	download(file, text); 

	}

    this.sandbox.eventApplyTranslation = $.proxy(this.applyTranslation, this);
};

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
};

SCWeb.core.ComponentManager.appendComponentInitialize(ExampleComponent);
