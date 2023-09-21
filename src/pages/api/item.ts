import type { NextApiRequest, NextApiResponse } from 'next'
import { env } from "~/env.mjs";
import * as uuid from 'uuid';
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand
} from '@aws-sdk/client-dynamodb';
import { string } from 'zod';

const client = new DynamoDBClient({
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  region: env.AWS_REGION_NAME,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const Item = {
      id: { S: uuid.v4() },
      content: { S: req.body.content }
    };
    await client.send(
      new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item,
      })
    );

    return res.status(201).json(Item);
  }

  if (req.method === 'GET') {
    const { Item } = await client.send(
      new GetItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: req.query.id }
        }
      })
    );

    return res.status(200).json(Item);
  }

  if (req.method === 'POST') {
    const { Attributes } = await client.send(
      new UpdateItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: req.body.id }
        },
        UpdateExpression: 'set content = :c',
        ExpressionAttributeValues: {
          ':c': { S: req.body.content }
        },
        ReturnValues: 'ALL_NEW'
      })
    );

    return res.status(200).json(Attributes);
  }

  if (req.method === 'DELETE') {
    await client.send(
      new DeleteItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: req.body.id }
        }
      })
    );

    return res.status(204).json({});
  }
}