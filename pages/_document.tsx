import Document, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
  DocumentProps,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { dynamics, BASE_PATH_ASSET } from 'config';
import createCache from '@emotion/cache';
import {
  documentGetInitialProps,
  DocumentHeadTags,
  DocumentHeadTagsProps,
} from '@mui/material-nextjs/v13-pagesRouter';
import createEmotionServer from '@emotion/server/create-instance';

const cache = createCache({ key: 'mui', prepend: true });

const getEmotionStyleTags = (html: string) => {
  const emotionServer = createEmotionServer(cache);
  const emotionStyles = emotionServer.extractCriticalToChunks(html);

  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return emotionStyleTags;
};

type MyDocumentProps = DocumentProps & DocumentHeadTagsProps;

export default class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props) =>
            sheet.collectStyles(<App emotionCache={cache} {...props} />),
        });

      const initialProps = await documentGetInitialProps(ctx, {
        emotionCache: cache,
      });

      const emotionStyleTags = getEmotionStyleTags(initialProps.html);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            {emotionStyleTags}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <DocumentHeadTags {...this.props} />

          <link rel="manifest" href={`${BASE_PATH_ASSET}/manifest.json`} />
          <link
            rel="icon"
            href={`${BASE_PATH_ASSET}/favicon.ico`}
            sizes="any"
          />
          <link
            rel="icon"
            type="image/svg+xml"
            href={`${BASE_PATH_ASSET}/favicon-1080x1080.svg`}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${BASE_PATH_ASSET}/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href={`${BASE_PATH_ASSET}/favicon-192x192.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`${BASE_PATH_ASSET}/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`${BASE_PATH_ASSET}/favicon-16x16.png`}
          />
          <meta name="title" content="Knine Finance Admin" />
          <meta property="og:type" content="website" />
          <meta name="twitter:site" content="@kninefinance" />
          <meta name="twitter:creator" content="@kninefinance" />
          <meta name="currentChain" content={String(dynamics.defaultChain)} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100..800&display=swap"
            rel="stylesheet"
          />
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src={`${BASE_PATH_ASSET}/runtime/window-env.js`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
