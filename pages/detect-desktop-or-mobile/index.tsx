import { GetServerSideProps } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { parse, UserAgent } from 'next-useragent'

type Props = {
  uaString: string | undefined
}

const DesktopContent = dynamic(() => import('../../components/desktop-content'))
const MobileContent = dynamic(() => import('../../components/mobile-content'))

function Page(props: Props) {
  let ua: UserAgent;
  if (props.uaString) {
    ua = parse(props.uaString)
  } else {
    ua = parse(window.navigator.userAgent)
  }

  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>

      <p>{ ua.source }</p>
      { ua.isMobile ? (
        <MobileContent />
      ) : (
        <DesktopContent />
      ) }
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      uaString: req.headers['user-agent']
    },
  }
}

export default Page