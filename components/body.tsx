import TextType from "./animations/TextType";

export default function Body(){

    return(
        <div>


            <TextType 
            className="text-4xl text-white"
            loop={false}
            typingSpeed={50}
            pauseDuration={4200}
            showCursor
            cursorCharacter="|"
            text="> Hi, I'm Ethan "
            cursorBlinkDuration={1}
            />

        </div>


    )


}