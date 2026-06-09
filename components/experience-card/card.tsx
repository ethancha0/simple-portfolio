
import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";


interface CardProps{

dateString: string,
title: string,
image: string,
link: string,
}


export default function Card({dateString, title, image, link}: CardProps){

    return(
        <div className="flex items-center gap-20">
            <div>

                <Typography color="textSecondary">{dateString}</Typography>

                <Typography variant="h5">{title}</Typography>
            </div>

            <Link
                href={link}
                className="group block"
                target="_blank"
            >
                <Image
                    src={image}
                    alt="icssc"
                    width={400}
                    height={100}
                    className="transition-[filter] duration-200 group-hover:brightness-75"
                />
            </Link>
            

           
        </div>


    );


}