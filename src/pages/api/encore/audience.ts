//import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import json_audience from '../../../data/json/audience.json';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //console.log(json_domain);
  res.status(200).json(json_audience);
}
