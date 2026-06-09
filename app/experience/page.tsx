import Card from "@/components/experience-card/card";

export default function Experience(){

    return(
        <div className="flex flex-col items-center justify-center h-screen gap-12">
            <Card
                dateString="September 2026 — Present"
                title="UCI ICS Student Council"
                image="/projects/icssc.png"
                link="https://studentcouncil.ics.uci.edu/projects"
            />

        </div>


    );


}