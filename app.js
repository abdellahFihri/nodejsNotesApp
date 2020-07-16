// const add=require('./utils.js');
const yargs=require('yargs')//parses into process.argv to make it more useful
const {removeNote,addNote,listNotes,getNotes} = require('./notes.js');
const validator=require('validator'); //validates forms and inputs
const chalk=require('chalk');//to color the console cmd
const { argv } = require('process');//args from console so we can console log them

const cl=console.log
//Customise yags version
yargs.version('1.1.0')

// add, remove, read list
//Create add command
yargs.command({
    command:'add',
    describe:'Add a new note',
    builder:{
      title:{//all settings requiring the title property
describe:'Note title',
demandOption:true,//will make sure to require title property in the cmd args
type:'string' //force the type of the title to be a srting
      },
      body:{
          
              describe:'Note body',
              demandOption:true,
              type:'string'
          
      },
    },
    handler(argv){
        // console.log('Title: '+argv.title,argv._)
        // console.log('Body: '+argv.body,argv._[0])
        addNote(argv.title,argv.body)
    }
})
//Create remove command
yargs.command({
    command:'remove',
    describe:'Remove a note',
    builder:{
        title:{
            describe:'Title to delete',
            demandOption:true,
            type:'sting'
        }
    },
    handler(argv){
        console.log('Title: '+argv.title)
        removeNote(argv.title)

    }
})
//Create list command

yargs.command({
    command:'list',
    describe:'list a note',
    handler(){
        console.log(chalk.green('Your notes are: '))
       listNotes()
    }
})
//Create read command
yargs.command({
    command:'read',
    describe:'read a note',
    builder:{
        title:{
            describe:'Read content from a note',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        // console.log('Reading a note',argv)
        getNotes(argv.title)
        
    }

})


// // console.log(firstName);
// console.log(add(5,5))
// writeFile('note2.txt','THis file was generated using nodeJs')
// console.log(validator.isEmail('abdellahfihri@gmail.com'));
// console.log(validator.isURL(''));
// writeFile('calc.pdf','function calc(a=5,b=3){return a+b}; console.log(calc(10,20))');
// console.log(chalk.green.bold.inverse('This is a green text'))

// console.log(process.argv)//arguments vector
// console.log(yargs.argv) //like node app.js add --title="some file title"

yargs.parse()
