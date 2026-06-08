import TextType from "./animations/TextType";

export default function Body(){

    return(
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
            
                <p className="text-2xl">
                    Currently leading a team to build <a href="https://zotmeet.com/" target="_blank" className="underline">ZotMeet</a> for 
                    UC Irvine students. There, I also study Software Engineering & Health Infomatics
                </p>


            </div>







        </div>


    )


}