import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { ProfileProvider } from '../../providers/ProfileProvider';
import { HighlightTag } from 'angular-text-input-highlight';
import { InputTextProvider } from '../../providers/InputTextProvider';

@Component({
  selector: 'app-mention',
  templateUrl: './mention.component.html',
  styleUrls: ['./mention.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MentionComponent implements OnInit {
  static wordName: string = '';
  
  public profiles = [];
  public favoriteProfiles;
  public Perfil;
  public verifyDel = [];

  tags: HighlightTag[] = [];
  items: string[] = [];
  historySelected: string[] = [];
  tagClicked: HighlightTag;
  inputText: string = '';
  textDatabase;

  constructor(
    public profileProvider: ProfileProvider,
    public inputTextDatabase: InputTextProvider
  ) { }



  ngOnInit(): void {
    this.profileProvider.FindForLetter("B")
      .then((res) => {
        this.favoriteProfiles = res;
        this.saveObject(this.favoriteProfiles);
      });
    this.inputTextDatabase.getText()
      .then((res) => {
        this.initializeText(res)
      });   
  }

  initializeText(textComponets){
    if(textComponets.length != 0){
      let index = this.historySelected.length;
      let listDataBase = this.profiles = textComponets[0].listForHighlight;
      this.insertTextInInput(textComponets[0].text_input);
      for (let i = 0; listDataBase[i]; i++) this.historySelected[index + i] = MentionComponent.wordName = listDataBase[i].nome;
      this.saveObject(this.historySelected);
      this.seachTagsHighlight();
    }
  }

  //Verifica se novos itens foram inseridos e atualiza as palavras buscadas pelo highlight
  monitoringInput() {
    const newWord = MentionComponent.wordName;
    if (newWord != '') {
      this.updateHistory(newWord);
      this.seachTagsHighlight();
    }
  }

  updateHistory(newWord){
    if (this.historySelected.indexOf(newWord) < 0) {
      this.historySelected.push(newWord);
    }
  }

  //Busca palavras reservadas e verifica se deve fazer um recorte
  seachTagsHighlight() {
    let mentions = this.refreshHighlight();
    //Verifica se o vetor de nomes está sendo alterado
    this.verifyWords(mentions);
  }

  //Marca as palavras reservadas 
  refreshHighlight() {
    const strQuery = this.buildQuery(this.historySelected);
    this.tags = [];
    const matchMentions = eval(strQuery);
    let mention;
    let mentions = [];
    //console.log(strQuery);
    //console.log(matchMentions);
    while ((mention = matchMentions.exec(this.inputText))) {

      mentions.push(mention);

      this.tags.push({
        indices: {
          start: mention.index,
          end: mention.index + mention[1].length
        },
        data: mention[1]
      });
    }
    return mentions
  }

  buildQuery(list) {
    let str = list[0];
    for (let i = 1; list[i]; i++) {
      str += '|' + list[i];
    }
    return '/(' + str + '+) ?/g';
  }

  //Verifica se alguma palavra reservada foi alterada
  //Se o teste for verdadeiro, recorta o restante da palavra
  verifyWords(verifyWords: any) {
    if (verifyWords.length < this.verifyDel.length) {
      for (let i = 0; this.verifyDel[i]; i++) {
        if ((!verifyWords[i]) || (verifyWords[i].index != this.verifyDel[i].index)) {
          this.deleteWord(this.verifyDel[i]);
          verifyWords = this.refreshHighlight();
          break;
        }
      }
    }
    this.verifyDel = verifyWords;
  }

  deleteWord(wordDel: any) {
    //Corta a string do input retirando a palavra
    let start = wordDel.index;
    let end = wordDel.index + (wordDel[0].length - 1);
    let el = document.getElementById("input");
    this.insertTextInInput((this.inputText.substring(0, start) + this.inputText.substring(end, this.inputText.length)));
    el.focus();
    (<HTMLTextAreaElement>el).setSelectionRange(start, start);
  }

  addDarkClass(elm: HTMLElement) {
    if (elm.classList.contains('bg-blue')) {
      elm.classList.add('bg-blue-dark');
    } else if (elm.classList.contains('bg-pink')) {
      elm.classList.add('bg-pink-dark');
    }
  }

  removeDarkClass(elm: HTMLElement) {
    elm.classList.remove('bg-blue-dark');
    elm.classList.remove('bg-pink-dark');
  }

  //Menção
  //Onde se monitora o evento iniciado por @
  search(e: any) {
    //Ele pega o código da tabela ascii e separa as teclas que dão erro
    var tecla = e.key;

    if ((tecla != 20) && (tecla != 38) && (tecla != 40)) {
      if (e.length == 1) this.items = null;
      //Para diminuir o numero de requisições
      if (e.length >= 2) {
        let names: string[] = [];
        this.profileProvider.FindForLetter(e)
          .then((res) => {

            for (let i = 0; res[i]; i++) names[i] = res[i].nome;

            this.items = names;
            this.Perfil = res;
            this.saveObject(this.Perfil);
            //console.log(this.Perfil);
          });
        return 
      }
    }


  }

  ModelItem(name) {
    MentionComponent.wordName = name.name;
    return name.name + " ";
  }

  saveText() {
    let selectedObjects = [];
    let index;
    for(let i = 0; this.historySelected[i]; i++) {
      //Usando a função map só buscamos o campo _id do objeto 
      index = this.profiles.map(function(e) { return e.nome; }).indexOf(this.historySelected[i]);
      if (index >= 0) {
        selectedObjects.push(this.profiles[index]);
      }
    }
    let id_input = "input";
    let saveDataBase = {
      "id_input": id_input,
      "text_input": this.inputText,
      "listForHighlight": selectedObjects
    }
    this.insertDatabase(saveDataBase)
  }

  selectFavorite(index) {
    //console.log(this.favoriteProfiles[index]);
    let el = document.getElementById("input");
    let name = this.favoriteProfiles[index].nome;
    MentionComponent.wordName = name;

    this.setInText(name, el);

    document.getElementById("input").focus();
    this.monitoringInput();
  }

  setInText(name, el) {
    let start = el.selectionStart;
    let end = el.selectionEnd
    this.insertTextInInput((this.inputText.substring(0, start) + (" " + name + " ") + this.inputText.substring(end, this.inputText.length)));
    //el.setRangeText(" " + name + " ");//Metodo não é suportado no Microsofit Edge
    //this.inputText = (<HTMLTextAreaElement>el).value
    //Ele pega o tamanho do nome, a posição em que estava o cursor e o numero de espaçamentos para definir a nova posição do cursor
    let position = name.length + start + 2; 
    el.focus();
    el.setSelectionRange(position, position);
  }

  saveObject(profileArray = []){
    //console.log(profileArray);
    for(let i = 0; profileArray[i]; i++) {
      //Usando a função map só buscamos o campo _id do objeto 
      if (this.profiles.map(function(e) { return e._id; }).indexOf(profileArray[i]._id) < 0) {
        this.profiles.push(profileArray[i]);
      }
    }
  }

  showItem(name){
    let index = this.profiles.map(function(e) { return e.nome; }).indexOf(name);
    console.log(this.profiles[index])
  }

  insertText(index){
    let objectList = this.textDatabase[index].listForHighlight;
    this.insertTextInInput(this.textDatabase[index].text_input);

    for(let i = 0; objectList[i]; i++){
      this.updateHistory(objectList[i].nome);
      MentionComponent.wordName = objectList[i].nome;
    }
    this. monitoringInput();
  }

  insertDatabase(value){
    this.inputTextDatabase.getText()
      .then((res) => {
        this.verifyPostOrPutData(res, value);
      });    
  }

  insertTextInInput(text){
    let el = document.getElementById("input");
    this.inputText = (<HTMLTextAreaElement>el).value = text;
  }
  
  verifyPostOrPutData(currentData, newValue){
    if(currentData.length == 0){
      this.inputTextDatabase.postText(newValue);
    } else {
      this.inputTextDatabase.putText(newValue, newValue.id_input);
    }
  }
}
