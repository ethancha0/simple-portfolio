import TextType from "./animations/TextType";
import DecryptAscii from "./animations/DecryptAscii";
import IntroText from "./intro-text";
import { BONSAI_ART } from "./bonsai-art";

export default function Body(){

    return(
        <div className="flex justify-center items-center">

            <div className="flex flex-col justify-start">
                <TextType 
                className="text-4xl text-white mb-8"
                loop={false}
                typingSpeed={50}
                pauseDuration={4200}
                showCursor
                cursorCharacter="|"
                text="> Hi, I'm Ethan "
                cursorBlinkDuration={1}
                />

                <div className="max-w-80">
                    <IntroText />
                </div>
            </div>

            <div>
                <DecryptAscii
                    text={BONSAI_ART}
                    className="overflow-x-auto whitespace-pre font-[ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace] text-[9px] leading-none"
                />
            </div>







        </div>


    )


}