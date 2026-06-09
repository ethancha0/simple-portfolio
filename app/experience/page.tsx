import Card from "@/components/experience-card/card";

export default function Experience(){

    return(
        <div className="flex flex-col items-start justify-center h-screen gap-12">

            <div className="flex flex-col gap-10">
                <Card
                    dateString="September 2026 — Present"
                    title="UCI ICS Student Council"
                    description="Developing software to drive fundraising and corporate outreach"
                    image="/projects/icssc.png"
                    link="https://studentcouncil.ics.uci.edu/projects"
                />

                <Card
                    dateString="November 2026 — June 2027"
                    title="FUSION Engineering"
                    description="Built software for Philipinx-American Community"
                    image="/projects/fusion.png"
                    link=""
                />                   
            </div>
   

        </div>


    );


}