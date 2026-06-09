
import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";


interface CardProps{

dateString: string,
title: string,
description: string,
image: string,
link: string,
}


export default function Card({dateString, title, description, image, link}: CardProps){

    return(
        <div className="flex items-center gap-20">
            <div>

                <Typography color="textSecondary">{dateString}</Typography>

                <Typography variant="h5">{title}</Typography>
                <Typography color="textSecondary">{description}</Typography>
            </div>

            <Link
                href={link}
                className="group block ml-auto"
                target="_blank"
            >
                <Image
                    src={image}
                    alt="icssc"
                    width={250}
                    height={75}
                    className="transition-[filter] ml-auto duration-200 group-hover:brightness-75"
                />
            </Link>
            

           
        </div>


    );


}