 import { speak } from './speech-synth.utils';

export const getSelectedText = (language:string)=>{

    document.documentElement.addEventListener('mouseup', function (){
        speechSynthesis.cancel();
        const selectedText = window.getSelection();
        if(selectedText) {
            const selection = selectedText.toString();
            if (selection.length > 0) {
                speak(selection,language);
            }
        }
    }, false);
};