// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable no-console */

import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

import { AptosClient, AptosAccount, CoinClient, FaucetClient, Types } from "aptos";
import { NODE_URL, FAUCET_URL } from "./common";

const client = new AptosClient(NODE_URL);
const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL); 


const acc1 = AptosAccount.fromAptosAccountObject({
    address: process.env.APTOS_ADDRESS || '',
    publicKeyHex: process.env.APTOS_PUBLICKEY || '',
    privateKeyHex: process.env.APTOS_PRIVATEKEY || '',
  });

  const acc2 = AptosAccount.fromAptosAccountObject({
    address: process.env.APTOS_ADDRESS_bob || '',
    publicKeyHex: process.env.APTOS_PUBLICKEY_bob || '',
    privateKeyHex: process.env.APTOS_PRIVATEKEY_bob || '',
  });


  
  
(async () => {
  // Create API and faucet clients.
  // :!:>section_1
  const client = new AptosClient('https://fullnode.testnet.aptoslabs.com/v1');

  let data = await axios
            .get('https://fullnode.testnet.aptoslabs.com/v1')
            .then((response) => {
                return response.data;
            });

            const entryFunctionPayload = {
              arguments: [],
              function: "0x1::managed_coin::register",
              type: "entry_function_payload",
              type_arguments: [] as string[],
            }; 
            console.log("Entry function :",entryFunctionPayload)


const payload = {
    function:"0x1::aptos_account::transfer",
    type_arguments:[
    ],
    arguments:[
    acc2.address(),1500,
    ],
    }
    console.log("payload is : ",payload)

const transaction = await client.generateTransaction(acc1.address(),payload);
const sign = await client.signTransaction(acc1,transaction)
const submit = await client.submitTransaction(sign)

console.log(submit.hash)

  
})();
