import { RegisterForm } from 'eventapp/components/auth/RegisterForm';
import { HeadCustom } from 'eventapp/components/layout/HeadCustom';
import { Layout } from 'eventapp/components/layout/Layout';
import { Section } from 'eventapp/components/layout/Section';
import { NextPage } from 'next';
import Head from 'next/head';

const Register: NextPage = () => {
  return (
    <>
      <HeadCustom title="Registro" />        
      <Layout variant='navigation'>
        <Section variant='contained'>
          <RegisterForm/>
        </Section>
      </Layout>
    </>
  )
}

export default Register;