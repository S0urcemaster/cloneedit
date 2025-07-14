# Clone Edit Tag 2

Die Reihenfolge für die Klonupdates wird etwas knifflig : Zuerst werden alle Klone geupdated mit 0 als source . Die ergeben eine Liste die man in dem source field der verbleibenden Klone sucht und diese updated usw  
```clones.find( clone => { clone.source === 0 }).update()```  
oder so ähnlich . Die Funktion update die den Filter auf den Text anwendet "gehört" aber dem Filter . Sie soll sich jedenfalls für einen Klon ändern je nachdem welcher Filter eingestellt ist . Das soll ja individuell für einen Klon möglich sein . Der Typ Filter würde dann außer seinen Daten noch ein Interface bereitstellen : Ein Interface ist eine Methode die für alle bereitstellenden Objekte gleich lautet / deren Inhalt - also die Funktionsdefinition - verschieden sein kann
ZB will ich alle Filter gleich verarbeiten können . Das tue ich über das Feld : name