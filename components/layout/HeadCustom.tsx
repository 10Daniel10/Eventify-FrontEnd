import  Head from 'next/head';
import React, { FC, PropsWithChildren } from 'react';

interface IHeadCustom extends PropsWithChildren {
    title?: string,    
  }

export const HeadCustom : FC<IHeadCustom> = ({ title }) => {    
  
    const metaDescription = 'Planifica tu evento de forma sencilla y eficaz';


    return (
        <Head>
            <title>Eventify | {title ?? metaDescription}</title>
            <meta property='og:title' content='Eventify' key='title'></meta>
            <meta
            name='description'
            content='Planifica tu evento de forma sencilla y eficaz'
            />
            <meta charSet='utf-8' />
            <meta name='evento, app de eventos, organización de eventos, organización' />
            <meta
            name='viewport'
            content='width=device-width, initial-scale=1'
            ></meta>
            <link rel='icon' href='/favicon.ico' />
        </Head>
    )
  }