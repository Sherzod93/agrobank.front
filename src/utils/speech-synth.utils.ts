
export const speak=(
    textToRead: string,
    language: string,
)=> {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
       console.error('speechSynthesis.speaking');
        return;
    }

    if (textToRead !== '' && synth.onvoiceschanged !== undefined ) {
        const utterThis = new SpeechSynthesisUtterance(textToRead);
        let withUpperCaseLang;

        if (language==='uz') {
            withUpperCaseLang='tr-TR';
        }else if(language==='oz'){
            language='ru-RU';
            withUpperCaseLang = language;
        }else {
            withUpperCaseLang = language+'-'+language.toUpperCase();
        }
        utterThis.pitch = 1;
        utterThis.rate = 1;
        utterThis.lang = withUpperCaseLang;

        synth.speak(utterThis);
    }
};
