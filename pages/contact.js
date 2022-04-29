import ContactForm from "../components/contact/contact-form";
import Head from 'next/head';
import {Fragment} from 'react';

function ContactPage() {
  return (
  <Fragment>
      <Head>
          <meta name="description" content="Send me your contact info"/>
      </Head>
      <ContactForm/>
      </Fragment>
  );
}

export default ContactPage;
