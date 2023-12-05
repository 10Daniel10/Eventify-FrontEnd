import { AccountForm } from 'eventapp/components/auth/accountForm';
import { Layout } from 'eventapp/components/layout/Layout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { getUserById } from 'eventapp/services/users/users.service';
import { IUser } from 'interfaces';
import { Loader } from 'eventapp/components/loader/Loader';

const UserId: NextPage = () => {

  const router = useRouter();
  const { userId } = router.query;
  const id = Number(userId);

  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const userData = await getUserById(id);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error al obtener usuario:', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Head>
        <title>Eventify | Mi perfil</title>
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
      <Layout>
        {user ? (
        <AccountForm user={user} />
      ) : (
        <Loader/>
      )}
      </Layout>
    </>
  )
}

export default UserId;