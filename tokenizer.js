import {ExternalTokenizer} from "@lezer/lr"
import {directives, commands, extensions, reporters, turtleVars, patchVars, linkVars, constants, unsupported} from "./keywords.js"

export const keyword = new ExternalTokenizer(input =>{
    if (isValidChar(input.peek(0))){
        let peek = 0
        let keyword = ""
        while (!isValidChar(input.peek(peek))){
            input.advance()
        }
        while (isValidChar(input.peek(peek))){
            keyword += String.fromCharCode(input.peek(peek))
            peek ++
        }
        keyword = keyword.toLowerCase()
        if ( keyword in directives){
            input.acceptToken(Directive)
        }
        else if (keyword in commands){
            input.acceptToken(Commands)
        }
        else if (keyword in extensions){
            input.acceptToken(Extensions)
        }
        else if (keyword in reporters){
            input.acceptToken(Reporters)
        }
        else if (keyword in turtleVars){
            input.acceptToken(TurtleVars)
        }
        else if (keyword in patchVars){
            input.acceptToken(PatchVars)
        }
        else if (keyword in linkVars){
            input.acceptToken(LinkVars)
        }
        else if (keyword in constants){
            input.acceptToken(Constants)
        }
        else if (keyword in unsupported){
            input.acceptToken(Unsupported)
        }
    }
    
})


function isValidChar(ch){
    return ch >= 48 && ch <=57 || ch==45 || ch==95 || ch >=65 && ch <=90 || ch>= 97 && ch<=122
}