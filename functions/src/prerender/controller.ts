import * as express from 'express';
import * as functions from 'firebase-functions';
import {errorMiddleware} from '../middlewares/error.middleware';

export function prerenderOpenSearch(req: express.Request, res: express.Response) {
  // TODO support language selection - opensearch.xml?lang=he

  const body = `
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>Sign-Emote</ShortName>
  <Description>Translate on Sign-Emote</Description>
  <Image height="16" type="image/icon" width="16">https://sign.mt/assets/icons/favicon.ico</Image>
  <Url type="text/html" method="get" template="https://sign.mt/?text={searchTerms}&amp;utm_source=opensearch"/>
  <Query role="example" searchTerms="Hello"></Query>
</OpenSearchDescription>`;

  res.set('Content-Type', 'application/opensearchdescription+xml; charset=UTF-8');
  res.set('Cache-Control', 'public, max-age=86400'); // one day
  res.send(body);
}

export const prerenderFunctions = () => {
  const app = express();
  app.get('/opensearch.xml', prerenderOpenSearch);
  app.use(errorMiddleware);
  return functions.https.onRequest(app);
};
