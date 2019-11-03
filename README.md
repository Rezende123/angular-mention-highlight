# Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8. Is a input highlight by names brought from the bank for the api, besides that the text is salved with highlights.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. 
The project need api [NodeJs](https://github.com/Rezende123/server-mention-highlight) for get the names and post/put the text with highlights.

## Metods

* *monitoringInput ()*: It is called every time the user types, checks if there are any tags to be added in the historySelected list, which stores the names to be highlighted by testing so that repeated names are not inserted;

* *seachTagsHighlight ()*: Searches the words for highlight checking and to be deleted;

* *refreshHighlight ()*: Search and highlight the reserved words, stored in the variable historySelected;

* *buildQuery ()*: Constructs the string that will be used as an expression for word search;

* *verifyWords ()*: Checks if any reserved word has been broken;

* *deleteWord ()*: Cuts the broken value of the string, which is the current value of the input, and returns the cursor to this place;

* *search ()*: Activated after typing "@", it searches for bank items from the 3rd letter entered and these values ​​will be entered in the mention possibilities (the items of the mention)

* *ModelItem ()*: It modifies the value of the mention to be inserted in the input;

* *saveText ()*: Saves the current text of the input and the value of the list of highlights in the database;

* *selectFavorite ()*: Captures the chosen value from the list of favorites in the input and inserts in the list of names to be highlighted (historySelected);
setInText (): Inserts the value at the current cursor position;

* *saveObject ()*: Constructs a list of objects that hold _id and the name of items that have already been pulled from the database;

* *ShowItem ()*: Gives a console showing the id of the item that was clicked;

* *download ()*: It pulls the texts inserted in the bank and creates a dropdown on top of that;

* *insertText ()*: It takes the value of the selected text, inserts in the text and captures the new reserved words, so that they are inserted in the vector of the values ​​to be highlighted;
 
* *initializeText ()*: Where it is checked if there is any content saved for that input, if it is confirmed the input will already be opened with the saved value;

* *insertDatabase ()*: Inserts the value of the input into the database;

* *insertTextInInput ()*: Inserts the desired text into the input;

* *verifyPostOrPutData ()*: Check if there is already a value in the database and depending on it it will insert or update this value;

