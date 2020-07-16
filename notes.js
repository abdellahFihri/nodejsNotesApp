const fs=require('fs');
const chalk=require('chalk')

const saveNotes=notes=>{
    const dataJSON=JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
    }
    

const getNotes=(title)=>{
   
const readNote=loadNotes().find(note=>note.title===title);
if(!readNote){
    console.log(chalk.red.inverse(`Note ${title} not found`))
}else{
console.log(chalk.blue(readNote.title))
console.log(chalk.grey(readNote.body))
}
}
     


const loadNotes=()=>{
    try{

        const dataBuffer=fs.readFileSync('notes.json');
        dataJSON=dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
      return[]
    }
}

const listNotes=()=> loadNotes().forEach(note => console.log(chalk.blue(note.title)));


const addNote=(title,body)=>{
    const notes=loadNotes()
    // const duplicateNotes=notes.filter(note=>note.title===title)//runs for each note in the array and will continue even if it finds a match
    const duplicateNote=notes.find(note=>note.title===title) //will stop when it finds a match  performance friendly
// returns the matching 
    if(!duplicateNote){//if duplicateNote is undefined

        notes.push({
            title:title,
            body:body
        })
        
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added'))
    }else{
        console.log(chalk.red.inverse('Note title taken'))
    }
}

const removeNote=title=>{
    console.log('Note to delete ',title)
    const notes=loadNotes()
    const newNotes=notes.filter(note=>note.title!==title)
    newNotes.length===notes.length?
    console.log(chalk.red.bold.inverse('No not found')):
    console.log(chalk.green.bold.inverse('Note succesfuly deleted'))
    saveNotes(newNotes)
}



module.exports={
    getNotes:getNotes,
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes
}

